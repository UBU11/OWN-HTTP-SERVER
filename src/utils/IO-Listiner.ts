import * as net from "net";
import type { TCPConn } from "./IO-Conn";

type TCPListner = {
  listner: net.Server;
  host: {
    port: number;
    address: string;
  };
  close: () => void;

  error: Error | null
};

function soListen(listen: net.Server): TCPListner {
  const lister: TCPListner = {
    
    error: null,
    listner: listen,

  };

  socket.on("data", (data: Buffer) => {
    // just check ip + port are there, if there are active then connect or else return an error(no connetion)
  });

  return lister;
}

function soAccept(): Promise<TCPConn> {
  return new Promise((resolve, reject) => {});
}
