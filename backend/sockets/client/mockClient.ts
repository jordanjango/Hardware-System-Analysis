import { io } from "socket.io-client";
const mockClient = io("http://localhost:3000");

export const mockClientConnection = (mockClient: any) =>
  mockClient.on("connect", () => {
    console.log("Mock client connected to server with ID:", mockClient.id);
    mockClient.on("cpu-usage", (usage: any) => {
        console.log("Detected cpu usage:", usage, "%");
      });
    // Handle server error events
    mockClient.on("error", (err: any) => {
      console.error("Error received from server:", err);
    });
  });

// Handle mock client disconnection
mockClient.on("disconnect", () => {
  console.log("Mock client disconnected from server.");
});
