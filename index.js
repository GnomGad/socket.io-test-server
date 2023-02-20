const io = require("socket.io")(3000, {
    cors: {
        origin: "http://192.168.0.101:8080",
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);
});
