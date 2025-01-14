const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const socketRoutes = require("./routes/socketRoutes");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.use(express.json());
app.use("/api", socketRoutes);
require("./socket")(io);
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
