const WebSocket = require("ws");

// Create the WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Data structures
let playbackSequence = [
    { category: "Songs", count: 3 },
    { category: "Break Audios", count: 1 },
];
let currentCategoryIndex = 0;
let categoryPlayCount = 0;

let categories = {
    Songs: [
        { songName: "Song 1", duration: 180, artworkUrl: "song1.png" },
        { songName: "Song 2", duration: 200, artworkUrl: "song2.png" },
        { songName: "Song 3", duration: 150, artworkUrl: "song3.png" },
    ],
    "Break Audios": [
        { songName: "Break Audio 1", duration: 60, artworkUrl: "break1.png" },
    ],
};

// Current song info
let currentSong = {};

// Helper: Broadcast updates to all clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Playback loop
function playNext() {
    const currentCategory = playbackSequence[currentCategoryIndex];
    const items = categories[currentCategory.category];

    if (!items || items.length === 0) {
        console.log(`No items found for category: ${currentCategory.category}`);
        return;
    }

    if (categoryPlayCount < currentCategory.count) {
        // Play the next item in the category
        const itemIndex = Math.floor(Math.random() * items.length);
        currentSong = { ...items[itemIndex], listeners: 0, currentTime: 0 };
        categoryPlayCount++;

        console.log(`Now playing: ${currentSong.songName} from ${currentCategory.category}`);
        broadcast({ type: "nowPlaying", song: currentSong });
    } else {
        // Move to the next category and reset
        currentCategoryIndex = (currentCategoryIndex + 1) % playbackSequence.length;
        categoryPlayCount = 0;
        playNext(); // Start the next category immediately
    }
}

// Increment song progress and switch to the next song
setInterval(() => {
    if (currentSong.currentTime < currentSong.duration) {
        currentSong.currentTime++;
        broadcast({ type: "songProgress", currentTime: currentSong.currentTime });
    } else {
        playNext(); // Move to the next song when the current one ends
    }
}, 1000);

// Handle client connections
wss.on("connection", (ws) => {
    console.log("New client connected");

    // Send current song info and playback sequence to the new client
    ws.send(JSON.stringify({ type: "nowPlaying", song: currentSong }));
    ws.send(JSON.stringify({ type: "playbackSequence", sequence: playbackSequence }));
	
    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "admin") {
            // Handle admin messages, like adding songs
            console.log("Admin action received:", data.action);
        } else if (data.type === "listener") {
            // Handle listener updates
            console.log("Listener update received");
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});

console.log("WebSocket server is running on ws://localhost:8080");

// Start the first song
playNext();
