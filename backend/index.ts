/**
 * !CPU consumption : The amount of CPU that is being used by the system.
 * ?What do we understand by amount? what is being used by the system in CPU?
 * The amount of processing power that is being used by the system.
 * The CPU is th central processing unit of the computer.
 */

/**
 * !Memory usage: The amount of memory that is being used by the system.
 * ?Does the system have varying memory usage?
 * *yes the system will have varying memory usage
 * *but where is most of the meory going?
 * *the memory is being used by various system components and applications like the operating system,the browser, the applications that are running in the background.
 */

import express from "express";
import authRouter from "./routers/authRouter";
import { checkConnection } from "./config/dbConfig";
import Systeminformation from "systeminformation";
import { io } from "socket.io-client";
import { connectSocketServer } from "./sockets/EventHandler";
import { mockClientConnection } from "./sockets/client/mockClient";
/**
 * !In the context of Socket.IO, socket.on and socket.emit are
 * !used for handling events and sending events, respectively.
 */
const app = express();
const PORT = 5000;
// This is the mock client for testing
const mockClient = io("http://localhost:3000");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);
// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

checkConnection();

connectSocketServer(Systeminformation);

mockClientConnection(mockClient);

