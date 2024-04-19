import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
//import mongoose, { ConnectOptions } from "mongoose";
import codeBlockRoutes from "./routes/codeBlockRoutes";
import sessionRoutes from "./routes/SessionRoutes";
import mentorSocket from "./sockets/mentorSocket";
import studentSocket from "./sockets/studentSocket";
import cors from "cors";
//
const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const corsParams = {
  origin: [
    "http://localhost:8080",
    "https://main--sharejscodef.netlify.app",
    "https://main--sharejscodef.netlify.app/*",
  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeader: ["Content-Type", "Authorization"],
};
const io = new SocketIOServer(server, {
  cors: corsParams,
});

app.use(cors(corsParams));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/code-blocks", codeBlockRoutes);
app.use("/api/sessions", sessionRoutes);

// mongoose.connect('mongodb://localhost/codeblocks')
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

mentorSocket(io);
studentSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
