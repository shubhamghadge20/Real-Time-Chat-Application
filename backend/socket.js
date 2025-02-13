const { Server } = require("socket.io");

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // Listen for new messages
    socket.on("sendMessage", async (data) => {
      io.emit("receiveMessage", { ...data, read: false }); // Default to unread
    });

    // Typing Indicator
    socket.on("typing", (user) => {
      socket.broadcast.emit("userTyping", user);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

  return io;
};

module.exports = initializeSocket;
