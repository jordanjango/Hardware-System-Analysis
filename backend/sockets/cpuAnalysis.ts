//Function to check and monitor any change in theC CPU speed [This is the clocl speed]
export const monitorCpuSpeed = (
  socket: any,
  Systeminformation: any,
  lastCpuSpeed: number | null
) => {
  const interval = setInterval(async () => {
    try {
      const cpuData = await Systeminformation.cpu();
      const cpuSpeed = cpuData.speed; // Current CPU speed

      if (cpuSpeed !== lastCpuSpeed) {
        lastCpuSpeed = cpuSpeed;
        socket.emit("cpu-speed-change", cpuSpeed); // Notify client of CPU speed change
      } else {
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

//This will be giving cpu usage in perecentage
export const cpuUsage = (
  socket: any,
  Systeminformation: any,
  lastCpuUsage: number | null
) => {
  const interval = setInterval(async () => {
    try {
      const cpuData = await Systeminformation.currentLoad();
      const cpuUsage = cpuData.currentLoad;
      const percentageChangeInCPUUsage =
        ((lastCpuUsage as number) - cpuUsage) * 100;
      if (cpuUsage !== lastCpuUsage) {
        lastCpuUsage = cpuUsage;
        socket.emit("cpu-usage", cpuUsage);
      }
      if(cpuUsage>80){
        socket.emit('cpu-usage-alert',true)
      }
    } catch (err) {
      console.error("Error monitoring CPU usage:", err);
      socket.emit("error", { message: "Error monitoring CPU usage" });
    }
  }, 3000);
  socket.on("disconnect", (socket: any) => {
    clearInterval(interval);
    console.log(`Stopped monitoring CPU usage for client: ${socket.id}`);
  });
};

