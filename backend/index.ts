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
import { jwtAuth } from "./middleware/jwtAuth";
import { checkConnection } from "./config/dbConfig";
import Systeminformation from "systeminformation";
import { Server } from "socket.io";
import { io } from "socket.io-client";

/**
 * !In the context of Socket.IO, socket.on and socket.emit are
 * !used for handling events and sending events, respectively.
 */

const app = express();
const PORT = 5000;

//This is the socker server that will be connected to the client.
const socketServer = new Server(3000, {
  cors: {
    origin: "*", // Allow all origins (use specific domains in production)
  },
});

// This is the mock client for testing
const mockClient = io("http://localhost:3000");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

// Check database connection
checkConnection();

//these variables will store the last values of cpu speed memory usage and disk usage to check real time analysis.
let lastCpuSpeed: number | null = null;
let lastMemoryUsage: number | null = null;

// Function to fetch real-time CPU speed
const monitorCpuSpeed = (socket: any) => {
  const interval = setInterval(async () => {
    try {
      const cpuData = await Systeminformation.cpu();
      const cpuSpeed = cpuData.speed; // Current CPU speed

      if (cpuSpeed !== lastCpuSpeed) {
        console.log("CPU speed changed:", cpuSpeed);
        lastCpuSpeed = cpuSpeed;
        socket.emit("cpu-speed-change", cpuSpeed); // Notify client of CPU speed change
      }
    } catch (err) {
      console.error("Error monitoring CPU speed:", err);
      socket.emit("error", { message: "Error monitoring CPU speed" });
    }
  }, 3000); // Check every 3 seconds
  //stop monitoring this cpu when we have disconnected the client.
  socket.on("disconnect", () => {
    clearInterval(interval); // Stop monitoring when the client disconnects
    console.log(`Stopped monitoring CPU speed for client: ${socket.id}`);
  });
};

// Function to monitor memory usage
const monitorMemoryUsage = (socket: any) => {
  const interval = setInterval(async () => {
    try {
      const memoryData = await Systeminformation.mem();
      console.log(memoryData, "memoryData");
      const memoryUsage = (memoryData.used / memoryData.total) * 100; // Memory usage percentage

      if (memoryUsage !== lastMemoryUsage) {
        console.log("Memory usage changed:", memoryUsage);
        lastMemoryUsage = memoryUsage;
        //socket.emit is useed to send data over server or the client to the server or vice-versa in real tim
        //these will be an event changes that will go in real time
        socket.emit("memory-usage-change", memoryUsage); // Notify client of memory usage change
      }
    } catch (err) {
      console.error("Error monitoring memory usage:", err);
      socket.emit("error", { message: "Error monitoring memory usage" });
    }
  }, 5000); // Check every 5 seconds
  //stop monitoring the memory usage when the client has disconnected.
  socket.on("disconnect", () => {
    clearInterval(interval); // Stop monitoring when the client disconnects
    console.log(`Stopped monitoring memory usage for client: ${socket.id}`);
  });
};



// Socket.IO event handling
socketServer.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Utility function to fetch and emit hardware info
  const emitHardwareInfo = async (
    fetchFunction: () => Promise<any>,
    eventName: string
  ) => {
    try {
      const data = await fetchFunction();
      console.log(`Real-time ${eventName} data:`, data);
      socket.emit(eventName, data);
    } catch (err) {
      console.error(`Error fetching ${eventName} information:`, err);
      socket.emit("error", {
        message: `Error fetching ${eventName} information`,
      });
    }
  };

  // Event listeners for CPU, memory, and disk info
  socket.on("cpu", () => emitHardwareInfo(Systeminformation.cpu, "cpu"));
  socket.on("memory", () => emitHardwareInfo(Systeminformation.mem, "memory"));
  socket.on("disk", () =>
    emitHardwareInfo(Systeminformation.diskLayout, "disk")
  );

  // Start monitoring CPU speed, memory usage, and disk usage
  monitorCpuSpeed(socket);
  monitorMemoryUsage(socket);

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Handle server errors
socketServer.on("error", (error) => {
  console.error("Socket.IO Error:", error);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

/**
 * !This is a mock client to test the socket server we have implemented or built.
 */

// Test the Socket.IO server using a mock client
mockClient.on("connect", () => {
  console.log("Mock client connected to server with ID:", mockClient.id);

  // Test CPU event -we will be having events associated with the cpu, memory and disk.
  mockClient.emit("cpu");
  mockClient.on("cpu", (data) => {
    console.log("Received CPU data:", data);
  });

  // Test Memory event
  mockClient.emit("memory");
  mockClient.on("memory", (data) => {
    console.log("Received Memory data:", data);
  });

  // Test Disk event
  mockClient.emit("disk");
  mockClient.on("disk", (data) => {
    console.log("Received Disk data:", data);
  });

  // Test CPU speed change event
  mockClient.on("cpu-speed-change", (speed) => {
    console.log("Detected CPU speed change:", speed, "GHz");
  });

  // Test Memory usage change event
  mockClient.on("memory-usage-change", (usage) => {
    console.log("Detected Memory usage change:", usage, "%");
  });

  // Test Disk usage change event
  mockClient.on("disk-usage-change", (usage) => {
    console.log("Detected Disk usage change:", usage, "%");
  });

  // Handle server error events
  mockClient.on("error", (err) => {
    console.error("Error received from server:", err);
  });
});

// Handle mock client disconnection
mockClient.on("disconnect", () => {
  console.log("Mock client disconnected from server.");
});
