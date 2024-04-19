"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
//import mongoose, { ConnectOptions } from "mongoose";
const codeBlockRoutes_1 = __importDefault(require("./routes/codeBlockRoutes"));
const SessionRoutes_1 = __importDefault(require("./routes/SessionRoutes"));
const mentorSocket_1 = __importDefault(require("./sockets/mentorSocket"));
const studentSocket_1 = __importDefault(require("./sockets/studentSocket"));
const cors_1 = __importDefault(require("cors"));
//
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const corsParams = {
    origin: ["http://localhost:8080", "https://main--sharejscodef.netlify.app/"],
};
const io = new socket_io_1.Server(server, {
    cors: corsParams,
});
app.use((0, cors_1.default)(corsParams));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/code-blocks", codeBlockRoutes_1.default);
app.use("/api/sessions", SessionRoutes_1.default);
// mongoose.connect('mongodb://localhost/codeblocks')
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });
(0, mentorSocket_1.default)(io);
(0, studentSocket_1.default)(io);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
