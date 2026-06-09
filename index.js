import http from "node:http";
import { WebSocketServer } from "ws";
import fs from "node:fs/promises";
import path from "path";
import { redisPublish, redisSubscribe } from "./redis-client.js";

const PORT = process.env.PORT ?? 3000;

const httpServer = http.createServer(async (req, res) => {
  const htmlFile = await fs.readFile(path.resolve("./index.html"), "utf-8");
  res.setHeader("Content-Type", "text/html");
  return res.end(htmlFile);
});

const wsServer = new WebSocketServer({ server: httpServer });

redisSubscribe.subscribe('ws-messages');
redisSubscribe.on('message', (channel, message) => {
    if(channel === 'ws-messages'){
        wsServer.clients.forEach((client) => {
            client.send(message.toString())
        })
    }
})

wsServer.on("connection", (websocket) => {
  console.log("WebSocket Connection Initialized....");

  websocket.on("message", async (data) => {
    const messageText = data.toString();

    console.log("Message From Client: ",messageText);
    
    await redisPublish.publish('ws-messages', messageText)
  });

});

httpServer.listen(PORT, () => {
  console.log(`The Server is Up & Running on port: `, { PORT });
});
