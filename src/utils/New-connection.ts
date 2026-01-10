
import * as net from "net"

export const newConn = (socket:net.Socket)=>{
  console.log('mew connection estbalished', socket.remotePort, socket.remoteAddress)

  socket.on("end", () => {
    // fin msg recevied,
    console.log("EOF")
  })

  socket.on("data",(data:Buffer)=>{
    console.log("date:", data);
    socket.write(data)

    if(data.includes('q')) {
      console.log("closing")
      socket.end()
    }
  })
}
