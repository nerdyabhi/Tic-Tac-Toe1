I’ll be using Node.js and [socket.io](http://socket.io) library for creating Multiplayer mode.

### With an interface like this:

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/5b545790-3834-4120-b4d3-1bd8e5c98048/2c514b6b-be9d-4d2f-8fd5-d827ade9f86f/image.png)

### Step -1

1. Let’s start off with the server side code , we have to create a  http server and then upgrade it to websockets. 

```jsx
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});
```

BrainStorming :

- This is how [socket.io](http://socket.io) exactly works?

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/5b545790-3834-4120-b4d3-1bd8e5c98048/bd5e12b0-344b-41b9-bdd9-ab5e73314fba/image.png)

### What to achieve?

1. When User Enters `roomID` and clicks on join , it should 
Check for available rooms and if
a. Room with `roomID` already exists and room have <2 members 
- Join the room and start playing
b).  Else Create another room with roomID and wait for players.

    1. if user clicks on Search for online Players: 
     - Search `rooms`  and filter out ones with <2 members.
        - Make user join room with the first one and gamePlay.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/5b545790-3834-4120-b4d3-1bd8e5c98048/2b295738-2a74-40a0-b289-a2c6f56c81af/image.png)

### Now how to do that?

1. Let’s have a state called `[roomId ]` , now if it’s not null