const express = require("express");
const router = express.Router();
const SocketController = require("../controllers/socketController");

router.get("/socket", SocketController.socketio);

module.exports = router;
