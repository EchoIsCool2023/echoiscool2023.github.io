const WebSocket = require("ws");

// Create the WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Current song data
let currentSong = {
    songName: "Despacito",
    currentTime: 0,
    duration: 192,
    artworkUrl: "https://example.com/despacito-artwork.png",
    listeners: 0
};

// Broadcast function to send updates to all clients
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Increment song progress every second
setInterval(() => {
    if (currentSong.currentTime < currentSong.duration) {
        currentSong.currentTime++;
        broadcast(currentSong);
    }
}, 1000);

// Handle client connections
wss.on("connection", (ws) => {
    console.log("New client connected");
    currentSong.listeners++;

    // Send current song info to the new client
    ws.send(JSON.stringify(currentSong));

    // Handle client disconnect
    ws.on("close", () => {
        console.log("Client disconnected");
        currentSong.listeners--;
        broadcast(currentSong);
    });
});

console.log("WebSocket server is running on ws://localhost:8080");
