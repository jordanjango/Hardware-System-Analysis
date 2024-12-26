import { monitorMemoryUsage } from "./memAnalysis";
import { monitorCpuSpeed, cpuUsage } from "./cpuAnalysis";
import { Server } from "socket.io";
const socketServer = new Server(3000, {
  cors: {
    origin: "*", // Allow all origins (use specific domains in production)
  },
});

let lastCpuSpeed: number | null = null;
let lastMemoryUsage: number | null = null;
let lastCpuUsage: number | null = null;

export const connectSocketServer = (Systeminformation: any) =>
  socketServer.on("connection", (socket: any) => {
    console.log(`User connected: ${socket.id}`);
    // Start monitoring CPU speed, memory usage, and disk usage
    monitorCpuSpeed(socket, Systeminformation, lastCpuSpeed);
    monitorMemoryUsage(socket, Systeminformation, lastMemoryUsage);
    cpuUsage(socket, Systeminformation, lastCpuUsage);
    // Handle client disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

// Handle server errors
socketServer.on("error", (error: any) => {
  console.error("Socket.IO Error:", error);
});
