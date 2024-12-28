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
        console.log("Memory usage:", memoryUsage, "%");
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

export const monitorSwaps = (socket: any, Systeminformation: any) => {
  const interval = setInterval(async () => {
    try {
      const swapData = await Systeminformation.mem();
      console.log(swapData.swaptotal)
      console.log(swapData.swapused)
      console.log(swapData.swapfree)
      const swapUsage = (swapData.swapused / swapData.swaptotal) * 100;
      console.log("Swap usage:", swapUsage, "%");
      socket.emit("swap-usage-change", swapUsage);
    } catch (err) {
      console.error("Error monitoring swap usage:", err);
      socket.emit("error", { message: "Error monitoring swap usage" });
    }
  }, 5000);
  //stop monitoring when the client disconnects
  socket.on("disconnect", () => {
    clearInterval(interval); // Stop monitoring when the client disconnects
    console.log(`Stopped monitoring memory usage for client: ${socket.id}`);
  });
};
