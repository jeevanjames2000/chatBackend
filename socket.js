const connectedUsers = {};
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);
    connectedUsers[socket.id] = socket.id;
    io.emit("updateUserList", Object.keys(connectedUsers));
    socket.on("sendMessage", ({ sender, recipientId, text }) => {
      console.log(`Message from ${sender} to ${recipientId}: ${text}`);
      if (connectedUsers[recipientId]) {
        io.to(recipientId).emit("receiveMessage", {
          sender,
          text,
        });
      } else {
        console.log(`Recipient ${recipientId} is not connected.`);
      }
    });
    socket.on("callUser", ({ recipientId, callType }) => {
      console.log(`${socket.id} is calling ${recipientId} with ${callType}`);
      if (connectedUsers[recipientId]) {
        io.to(recipientId).emit("callUser", { from: socket.id, callType });
      } else {
        console.log(`Recipient ${recipientId} is not connected.`);
      }
    });
    socket.on("sendOffer", ({ offer, to }) => {
      console.log(`${socket.id} sent an offer to ${to}`);
      if (connectedUsers[to]) {
        io.to(to).emit("receiveOffer", { offer, from: socket.id });
      }
    });
    socket.on("sendAnswer", ({ answer, to }) => {
      console.log(`${socket.id} sent an answer to ${to}`);
      if (connectedUsers[to]) {
        io.to(to).emit("receiveAnswer", { answer });
      }
    });
    socket.on("sendIceCandidate", ({ candidate, to }) => {
      console.log(`${socket.id} sent an ICE candidate to ${to}`);
      if (connectedUsers[to]) {
        io.to(to).emit("iceCandidate", { candidate });
      }
    });
    socket.on("disconnect", () => {
      console.log(`A user disconnected: ${socket.id}`);
      delete connectedUsers[socket.id];
      io.emit("updateUserList", Object.keys(connectedUsers));
    });
  });
};
