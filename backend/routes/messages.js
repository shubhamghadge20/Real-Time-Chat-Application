const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Save message to database
router.post("/", async (req, res) => {
  try {
    const { sender, content, timestamp } = req.body;
    const newMessage = new Message({ sender, content, timestamp });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Message not saved" });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Cannot fetch messages" });
  }
});

// Mark message as read
router.put("/:id/read", async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) return res.status(404).json({ error: "Message not found" });

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ error: "Cannot update message" });
  }
});

module.exports = router;
