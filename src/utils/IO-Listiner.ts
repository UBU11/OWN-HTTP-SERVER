import * as net from "net";
import type { TCPConn } from "./IO-Conn";

type TCPListner = {
  listner: net.Server;
};

function soListen(port: number, host: string): TCPListner | void {
  if (!port || !host) {
    return;
  }
  const server = net.createServer();
  return {
    listner: server.listen(port, host),
  };
}

function soAccept(listen: TCPListner): Promise<TCPConn> {
  return new Promise((resolve, reject) => {
    const onConn = (conn: TCPConn) => {
      clearUp();
      resolve(conn);
    };

    const onError = (err: Error) => {
      clearUp();
      reject(err);
    };

    function clearUp() {
      listen.listner.off("connection", onConn);
      listen.listner.off("error", onError);
    }

    // just check ip + port are there, if there are active then connect or else return an error(no connetion)
    listen.listner.on("connection", onConn);
    listen.listner.on("error", onError);
  });
}
