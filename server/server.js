import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./src/backend/routes/authRoutes.js";
import attendanceRoutes from "./src/backend/routes/attendanceRoutes.js";
import assessmentRoutes from "./src/backend/routes/assessmentRoutes.js";
import finalGradesRoutes from "./src/backend/routes/finalGradesRoutes.js";
import behaviorRoutes from "./src/backend/routes/behaviorRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/grades", finalGradesRoutes);
app.use("/api/behavior", behaviorRoutes);

// Websocket example
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  socket.on("disconnect", () => console.log("User disconnected", socket.id));
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
