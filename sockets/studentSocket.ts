import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { sessionDB } from "../db/sessionDB";
import { Socket, Server as SocketIOServer } from "socket.io";

export default function studentSocket(
  io: SocketIOServer<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) {
  io.of("/student-socket").on("connection", (socket: Socket) => {
    const sessionId = socket.handshake.query.sessionId as string;
    const session = sessionDB.find((s) => s.id === sessionId);

    if (!session) {
      socket.emit("session-not-found", "Session not found");
      socket.disconnect();
      return;
    }

    if (session.connect) {
      socket.emit("session-already-connected", "Session already connected");
      socket.disconnect();
      return;
    }

    session.connect = true;
    socket.join(`student-${sessionId}`);
    socket.emit("student-session-connect", {
      msg: "Student session created successfully",
    });

    socket.on("update-code", async (data: { newCode: string }) => {
      io.of("/mentor-socket").emit("receive-update-code", {
        sessionId: sessionId,
        newCode: data.newCode,
      });
    });

    socket.on("disconnect", () => {
      const session = sessionDB.find((s) => s.id === sessionId);

      if (!session) socket.emit("session-not-found", "Session not found");
      else {
        session.connect = false;
        socket.emit("session-disconnect", "Session disconnect successfully");
      }
    });
  });
}
