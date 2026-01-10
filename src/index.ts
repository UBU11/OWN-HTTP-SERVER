import * as net from "net";
import { newConn } from "./utils/New-Conn.ts";

let server = net.createServer({ allowHalfOpen: true, pauseOnConnect: true   });

server.on("connection", newConn);

server.on("listening", () => {
  console.log("server is running");
});

server.once("close", () => {
  console.log("connection is ended");
});

server.on("error", (err: Error) => {
  throw err;
});

// server.listen({host:"127.0.0.1",port:1234})
server.listen(1234, "127.0.0.1");
