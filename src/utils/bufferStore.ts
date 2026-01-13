import * as net from "net";
import type { TCPConn } from "./IO-Conn.ts";
import { initConn, readConn, writeConn } from "./IO-Conn.ts";
import { ms } from "zod/locales";

type DynBuf = {
  data: Buffer;
  length: number;
};

function bufPush(buf: DynBuf, data: Buffer) {
  const newLen = buf.length + data.length;

  if (buf.data.length < newLen) {
    let cap = Math.max(buf.data.length, 32);
    while (cap < newLen) {
      return (cap *= 2);
    }

    const grown = Buffer.alloc(cap);
    buf.data.copy(grown, 0, 0);
  }

  data.copy(buf.data, buf.length, 0);
  buf.length = newLen;
}

async function serverClient(socket: net.Socket): Promise<void> {
  const conn: TCPConn = initConn(socket);
  const buf: DynBuf = { data: Buffer.alloc(0), length: 0 };
  while (true) {
    const msg: null | Buffer = cutMessage(buf);

    if (!msg) {
      const data: Buffer = await readConn(conn);
      bufPush(buf, data);

      if (data.length === 0) {
        //EOF
        return;
      }

      continue;
    }

    if (msg.equals(Buffer.from("quit\n"))) {
      await writeConn(conn, Buffer.from("bye.\n"));
      socket.destroy();
      return;
    } else {
      const reply = Buffer.concat([Buffer.from("Echo: "), msg]);
      await writeConn(conn, reply);
    }
  }
}

function cutMessage(buf: DynBuf): Buffer | null {
  const bfx = buf.data.subarray(0, buf.length).indexOf("\n");
  if (bfx < 0) {
    return null;
  }

  const msg = Buffer.from(buf.data.subarray(0, bfx + 1));
  bufPop(buf, bfx + 1);
  return msg;
}

function bufPop(buf: DynBuf, length: number): void {
  buf.data.copyWithin(0, length, buf.length);
  buf.length -= length;
}
