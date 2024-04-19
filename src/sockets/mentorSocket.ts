import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { codeDB } from "../db/codeDB";
import { sessionDB } from "../db/sessionDB";
import { Socket, Server as SocketIOServer } from "socket.io";
const { v4: uuidv4 } = require("uuid");

//!! in both socket we do the same import so we need to extract them to one shared file !!

export default function mentorSocket(
  io: SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  io.of("/mentor-socket").on("connection", (socket: Socket) => {
    const codeBlockId = socket.handshake.query.codeBlockId as string;
    const sessionId = uuidv4();
    sessionDB.push({ id: sessionId, connect: false, codeBlockId });
    socket.join(`mentor-${sessionId}`);
    socket.emit("mentor-session-connect", {
      msg: "Mentor session created successfully",
      sessionId: sessionId,
    });

    socket.on("disconnect", () => {
      const sessionIdx = sessionDB.findIndex((s) => s.id === sessionId);

      if (sessionIdx != -1)
        socket.emit("session-not-found", "Session not found");
      else {
        sessionDB.splice(sessionIdx, 1);
        socket.emit("session-disconnect", "Session disconnect successfully");
      }
    });
  });
}
