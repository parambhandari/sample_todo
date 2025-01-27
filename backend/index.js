const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const setupWebSocket = require("./src/utils/websocket");
const userRoutes = require("./src/route/userRoutes");
const taskRoutes = require("./src/route/taskRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/user/", userRoutes);
app.use("/api/tasks/", taskRoutes);

const server = http.createServer(app);

setupWebSocket(server);

const PORT = process.env.PORT || 5678;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
