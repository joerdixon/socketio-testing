import { io } from "socket.io-client";

// The message text box
const messageInput = document.getElementById("message-input");
// The room textbox
const roomInput = document.getElementById("room-input");
// The join button
const joinRoomButton = document.getElementById("room-button");
// The whole form (the submit handler is on the send message button)
const form = document.getElementById("form");

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

    // Reset the input field
    messageInput.value = ""
})

// When the join button is clicked
joinRoomButton.addEventListener("click", () => {
    // Store the value
    const room = roomInput.value;
})

function displayMessage(message) {
    const div = document.createElement("div");
    div.textContent = message;
    document.getElementById("chatspace").append(div)
}