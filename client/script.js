// Import io function from Socket.io client package.
import { io } from "socket.io-client";

// The message text box
const messageInput = document.getElementById("message-input");
// The room textbox
const roomInput = document.getElementById("room-input");
// The join button
const joinRoomButton = document.getElementById("room-button");
// The whole form (the submit handler is on the send message button)
const form = document.getElementById("form");

// Create a socket pointed at where we want to host it.
// This is the connection between the two Socket.io packages (serverside and client)???
const socket = io("http://localhost:3000")
// When somebody connects to the socket, print a connection message to chatspace with their socket id.
socket.on("connect", () => {
    displayMessage(`Connected with id: ${socket.id}`)
})

socket.on("recieve-message", message => {
    displayMessage(message);
})

// "custom-event" is an arbitrary name, anything could go here, same with the parameters. General shape of an emit.
// socket.emit("custom-event", 25, "Socketlearn", {a:"a"})

// When the form is submitted (send button is clicked)
form.addEventListener("submit", event => {
    // Prevent default
    event.preventDefault()
    // Store the value of both inputs
    const message = messageInput.value;
    const room = roomInput.value;

    // If no content, end the function
    if (message === "") {
        return
    }

    // Display the message to the chatspace
    displayMessage(message)

    // After we display the message, send the message to the backend. Add a room if we want the message to only go to a specific room.
    socket.emit("send-message", message, room)

    // Show the message on the browser console.
    console.log(message);

    // Reset the input field
    messageInput.value = ""
})

// When the join button is clicked
joinRoomButton.addEventListener("click", () => {
    // Store the value
    const room = roomInput.value;
    // Emit a join-room request with the room value attached and a callback function.
    socket.emit("join-room", room, message => {
        displayMessage(message);
    });
})

function displayMessage(message) {
    // Create new div
    const div = document.createElement("div");
    // Fill it with the message from the input field
    div.textContent = message;
    // Append it to the chatspace.
    document.getElementById("chatspace").append(div)
}