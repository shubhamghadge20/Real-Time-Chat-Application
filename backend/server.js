const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messages");
const initializeSocket = require("./socket");

require("dotenv").config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = initializeSocket(server);

app.use(cors());
app.use(express.json());
app.use("/messages", messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
