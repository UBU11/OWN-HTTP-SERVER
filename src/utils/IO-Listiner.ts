import { Socket } from "dgram";
import * as net from "net";
import { listen } from "node:quic";

type TCPListner = {
  socket: net.Socket;

  listner: null | {
    resolve: (value: Buffer) => void;
    reject: (value: Error) => void;
  };

  err: Error | null;

  ended: boolean;
};

function soListen(socket: net.Socket): TCPListner {
  const lister: TCPListner = {
    ended: true,
    err: null,
    listner: null,
    socket: socket,
  };

  socket.on("data", (data: Buffer) => {
    // just check ip + port are there, if there are active then connect or else return an error(no connetion)
  });

  return lister;
}
