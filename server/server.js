// Create our Socket.io instance serverside with port and options object
const io = require("socket.io")(3000, {
    // Options object telling cors that its ok if people connect via 8080 even though we are hosted on 3000
    cors: {
        origin: ["http://localhost:8080"],
    },
});

// On a succesfull connection to our declared port (8080)
io.on("connection", socket => {
    // Console log the id was connected to
    console.log(socket.id)

    // .on referencing the custom event we declared on the client side and any parameters we included.
    // In this case we are checking for message content and the room they intend the message for.
    socket.on("send-message", (message, room) => {
        // If no room is specified.
        if (room === "") {
            // BROADCAST (keyword and difference) the recieved message to every OTHER connected socket.
            socket.broadcast.emit("recieve-message", message);
        } else {
            // Send the message to a specific room if one is given.
            // .to functions the same as .broadcast in that it doesnt send the message to the requesting client.
            socket.to(room).emit("recieve-message", message);
        }
        // Console log the message serverside.
        console.log(message)
    })

    // When we get a join-room emit from the client side.
    // The callback function must always be the last parameter passed in.
    socket.on("join-room", (room, cb) => {
        // Join them to that room
        socket.join(room)
        // Use our callback function (which displays a message on the client side.) To notify the user of what room they joined
        cb(`Joined ${room}`)
    })
})