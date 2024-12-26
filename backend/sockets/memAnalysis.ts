export const monitorMemoryUsage = (
  socket: any,
  Systeminformation: any,
  lastMemoryUsage: number | null
) => {
  const interval = setInterval(async () => {
    try {
      const memoryData = await Systeminformation.mem();
      const memoryUsage = (memoryData.used / memoryData.total) * 100; // Memory usage percentage

      if (memoryUsage !== lastMemoryUsage) {
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
