const io = require("socket.io")(3000, {
    cors: {
        origin: "http://192.168.0.101:8080",
        credentials: true,
    },
});
const connectedUsers = {};

io.on("connection", (socket) => {
    console.log(socket.id);
    connectedUsers[socket.id] = socket;
    socket.on("disconnect", (reason) => {
        console.log("disconnect ", socket.id);
        delete connectedUsers[socket.id];
    });
    socket.on("client-to-server-message", (data) => {
        // TODO: вынести это в отдельный модуль
        let message = "В базе нет такого";
        let name = "BOT";
        if (data.message.toLowerCase() === "привет") {
            message = "Приветствую";
        } else if (data.message.includes("погод")) {
            message = "Сегодня облачно, от +5 до -2";
        }
        if (connectedUsers.hasOwnProperty(data.id)) {
            connectedUsers[data.id].emit("server-to-client-message", {
                name: name,
                message: message,
            });
        }
    });
});
