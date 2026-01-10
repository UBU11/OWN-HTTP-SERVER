import * as net from "net";

type TCPConn = {
  socket: net.Socket;

  reader: null | {
    resolve: (value: Buffer) => void,
    reject: (reason: Error) => void
  };
};


function initConn(socket: net.Socket):TCPConn{

  const conn : TCPConn = {
    socket: socket,
    reader:null
  }

  socket.on('data', (data:Buffer)=>{

    console.log("TCP connection initilizing",conn.reader);

    conn.socket.pause()

    conn.reader!.resolve(data)
    conn.reader = null
  })

  return conn;
}

function readConn(conn: TCPConn): Promise<Buffer> {

console.assert(!conn.reader)

return new Promise((resolve, reject)=>{

  conn.reader = {resolve: resolve , reject: reject}

  conn.socket.resume()
})

};
function writeConn(conn: TCPConn, data: Buffer): Promise<void> {


};
