
import express from "express";
import { WebSocketServer } from "ws";

const app = express();

// Render exposes a PORT environment variable
const PORT = process.env.PORT || 3000;

// Create HTTP server
const server = app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});

// Attach WebSocket server to HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (msg) => {
        console.log("Received:", msg.toString());
        ws.send("You said: " + msg);
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
