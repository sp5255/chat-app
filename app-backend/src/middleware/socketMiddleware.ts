import { sharedToken } from "@/constants/sharedTokenMap";
import { verifyJwtToken } from "@/middleware/auth.middleware";
import type { Socket } from "socket.io";

export const verifySocketToken = (socket: Socket, next: any) => {
  const token = socket.handshake.auth.token;
  const { id, email } = verifyJwtToken(token);

  if (sharedToken.get(id) === token) {
    socket.data.user = { id, email };
  } else {
    socket.data.authError = true;
  }
  next();
};
