module.exports = {
  socketio: async (req, res) => {
    res.status(200).json({ message: "Socket.IO is running!" });
  },
};
