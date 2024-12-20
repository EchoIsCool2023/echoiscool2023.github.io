const WebSocket = require("ws");

// Create the WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Current song and playlist data
let currentSong = {
    songName: "",
    currentTime: 0,
    duration: 0,
    artworkUrl: "",
    listeners: 0
};

let categories = {
    Songs: [],
    "Break Audios": []
};

// Playback sequence: Play 3 songs, then 1 break audio
let playbackSequence = [
    { category: "Songs", count: 3 },
    { category: "Break Audios", count: 1 }
];

let sequenceIndex = 0;
let songIndex = 0;
let currentCategory = playbackSequence[sequenceIndex].category;

// Broadcast function to send updates to all clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Play the next song in the sequence
function playNextSong() {
    const category = playbackSequence[sequenceIndex].category;
    const count = playbackSequence[sequenceIndex].count;

    if (!categories[category] || categories[category].length === 0) {
        console.error(`No songs in category: ${category}`);
        moveToNextCategory();
        return;
    }

    currentSong = {
        ...categories[category][songIndex],
        currentTime: 0,
        listeners: currentSong.listeners
    };

    broadcast({ type: "currentSongUpdate", currentSong });

    songIndex++;
    if (songIndex >= count || songIndex >= categories[category].length) {
        moveToNextCategory();
    }
}

// Move to the next category in the sequence
function moveToNextCategory() {
    sequenceIndex = (sequenceIndex + 1) % playbackSequence.length;
    songIndex = 0;
    currentCategory = playbackSequence[sequenceIndex].category;

    setTimeout(playNextSong, 1000); // Start next song after a brief delay
}

// Increment song progress every second
setInterval(() => {
    if (currentSong.currentTime < currentSong.duration) {
        currentSong.currentTime++;
        broadcast({ type: "currentSongUpdate", currentSong });
    } else {
        playNextSong(); // Move to the next song when the current one finishes
    }
}, 1000);

// Handle client connections
wss.on("connection", (ws) => {
    console.log("New client connected");
    currentSong.listeners++;

    // Send current song info and categories to the new client
    ws.send(JSON.stringify({ type: "currentSongUpdate", currentSong }));
    ws.send(JSON.stringify({ type: "categoriesUpdate", categories }));

    // Listen for messages from the client
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        handleClientMessage(data, ws);
    });

    // Handle client disconnect
    ws.on("close", () => {
        console.log("Client disconnected");
        currentSong.listeners--;
        broadcast({ type: "currentSongUpdate", currentSong });
    });
});

console.log("WebSocket server is running on ws://localhost:8080");

// Handle messages from the client
function handleClientMessage(data, ws) {
    switch (data.type) {
        case "addCategory":
            if (data.category && !categories[data.category]) {
                categories[data.category] = [];
                broadcast({ type: "categoriesUpdate", categories });
            }
            break;

        case "addSong":
            if (data.category && categories[data.category]) {
                categories[data.category].push({
                    name: data.song.name,
                    url: data.song.url,
                    duration: data.song.duration || 0
                });
                broadcast({ type: "categoriesUpdate", categories });
            }
            break;

        case "removeCategory":
            if (data.category && categories[data.category]) {
                delete categories[data.category];
                broadcast({ type: "categoriesUpdate", categories });
            }
            break;

        case "removeSong":
            if (data.category && categories[data.category]) {
                categories[data.category].splice(data.index, 1);
                broadcast({ type: "categoriesUpdate", categories });
            }
            break;

        case "updateSequence":
            playbackSequence = data.sequence || playbackSequence;
            sequenceIndex = 0; // Restart sequence
            songIndex = 0;
            break;

        default:
            console.log("Unknown message type:", data.type);
            break;
    }
}
