# Scalable Real-Time Chat Application

### A highly scalable real-time chat application built with Node.js WebSockets and a Redis Pub/Sub backend.
Normally, if you run multiple instances of a WebSocket server, users connected to Server A cannot talk to users on Server B. This architecture solves that problem. By using Redis as a central message broker, all server instances stay synced. A message sent anywhere is safely broadcast to everyone everywhere.
------------------------------
## 🛠️ Tech Stack

* Backend: Node.js (node:http, node:fs)
* Real-time Engine: ws (WebSockets)
* Message Broker: ioredis (Redis Pub/Sub)
* Frontend: Vanilla HTML5 & JavaScript

------------------------------
## 🏗️ Architecture: How It Works

[ Client 1 ] <---> ( WebSocket Server :3000 ) <---\
                                                  |---> [ Redis Pub/Sub Broker ]
[ Client 2 ] <---> ( WebSocket Server :3001 ) <---/

## The 4-Step Message Lifecycle

   1. Client Sends: A user types a message in index.html and clicks send. The browser transmits this text over a persistent WebSocket connection to the specific server port they are connected to.
   2. Server Publishes: That specific server receives the data buffer. It converts the data to a text string and instantly publishes it to a Redis channel named ws-messages using the redisPublish client.
   3. Redis Syncs: Redis acts as the central brain. It broadcasts the new message out to every node server instance that is listening.
   4. Servers Broadcast: Every active server instance detects the message via their redisSubscribe client. They immediately loop through all of their own locally connected browser clients and deliver the chat text.

------------------------------
## 🚀 Getting Started## 1. Prerequisites
Make sure you have Node.js and Redis running locally. You can quickly spin up Redis using Docker:

docker run -d --name local-redis -p 6379:6379 redis:7

## 2. Installation
Clone the repository and install the dependencies:

git clone https://github.com
cd Web-Sockets
npm install

## 3. Run the Project
Start your first server instance on the default port (3000):

npm start

## 4. Testing Horizontal Scaling
To see the scalability in action, open a second terminal window and start another server on a different port:

* On Windows PowerShell:

$env:PORT=3001; npm start

* On Linux/macOS:

PORT=3001 npm start


Open two separate browser tabs:

* Tab 1: http://localhost:3000
* Tab 2: http://localhost:3001

Type a message in Tab 1. You will see it instantly appear in Tab 2!
------------------------------
If you want to keep improving this project, tell me if you want to:

* Add a Docker Compose file to launch both your servers and Redis together with one command
* Enable unique usernames so you can see who is typing each message


