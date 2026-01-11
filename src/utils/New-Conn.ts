import * as net from "net";
import serverClient from "./IO-Conn";

export const newConn = async (socket: net.Socket): Promise<void> => {
  console.log(
    "mew connection estbalished",
    socket.remotePort,
    socket.remoteAddress
  );

  try {
    await serverClient(socket);
  } catch (error) {
    console.error("exeception:", error);
  } finally {
    socket.destroy();
  }

  socket.on("end", () => {
    // fin msg recevied,
    console.log("EOF");
  });

  socket.on("data", (data: Buffer) => {
    console.log("date:", data);
    socket.write(data);

    if (data.includes("q")) {
      console.log("closing");
      socket.end();
    }
  });
};
