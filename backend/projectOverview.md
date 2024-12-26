# System Hardware and Vulnerebilities Analysis

The idea behind this project is that we will plotting out real time consumption of CPU,GPU and Memory.
This will help us to keep track of our system components and also make sure if we have any vulnerabilites.

# Tech Stack used

Typescript : Used to make sure we have strict check on the types and have error free code.
Socket.io : Socket.io is a node.js library that helps us in real time communication between client and server

1.  ### Working of Socket.io

- **Connections**: when a client connects to the server a websocket connection is established between client and server
- **events**:Socket.io is an event drivern that means both client and server communicate with each other with the help of events. 
- **socket.emit(event,data)** : This will emit the event and initiate the change.(Publisher) 
- **socket.on(event,data)** : This will catch the change and help us in initiating the function (Subscriber). 
- **Namespaces**: Socket.IO supports namespaces, which allow you to split the logic of your application over a single shared connection. Namespaces are identified by a leading slash (e.g., `/chat`).
  It will help us to split the knowledge into smaller knowledge.

PostgresSql : Postgres is used as the relational database
React : For frontend, we will be using relational database [PostgresSQL].

# Dockerising the application

## What is docker and why do we need to make sure we are dockerising our application?

Docker is a tool which helps us to run our application in an isolated environment and can provide our application on multiple platforms.

**Why are we dockerising the application?**
Advantages of dockerising the application
1. It will be running your application in isolation which will help in making sure application will run fine in other platforms.
2. It will be giving us simplified dependency management i.e it will help in the encapsulation of our requirements and packages which can be run on across devices.
3. We can run various instances of our application which will help in scaling.
4. Docker images can be deployed to any environment that supports Docker, making it easier to deploy your application to different cloud providers or on-premises servers.

# MVP Version
https://github.com/user-attachments/assets/d0e3c076-1e45-4cb2-a084-ca23d1ac17b9


# Development Metrics in this application

### **1. Performance Monitoring**
These parameters give insights into how your PC is performing in real time:

#### a. **CPU Metrics**
- **CPU Usage (%)**: Measures the percentage of CPU resources currently in use.
- **Clock Speed**: Tracks CPU speed in GHz.
- **Core/Thread Utilization**: Utilization percentage of individual cores or threads.
- **Temperature**: Tracks CPU temperature to prevent overheating. [Can't be done due to permission issues]
- **Processes**: List top processes consuming CPU resources. [Next metric to be implemented]

#### b. **Memory Metrics**
- **RAM Usage**: Total and percentage of memory used.
- **Swap Usage**: Usage of virtual memory (swap space).
- **Memory Faults/Page Swaps**: Tracks memory paging/swapping rates.

#### c. **Disk Metrics**
- **Disk Usage (%)**: Percentage of storage space used.
- **Read/Write Speeds**: Measures the speed of disk operations (MB/s).
- **I/O Operations**: Tracks the input/output operations per second.
- **Disk Temperature**: Monitors health for HDD/SSD.
- **SMART Status**: Self-monitoring and analysis for disk drives.

#### d. **Network Metrics**
- **Bandwidth Usage**: Upload and download speeds.
- **Active Connections**: Tracks open ports and active connections.
- **Packet Loss**: Measures network reliability.
- **Latency**: Tracks delays in data transmission.
- **Data Usage by Applications**: Identifies resource-hungry apps.

---

### **2. Security & Vulnerability Monitoring**
Monitoring for potential risks or breaches:

#### a. **System Vulnerabilities**
- **Outdated Software**: Check if OS, drivers, and applications are up-to-date.
- **Antivirus/Firewall Status**: Ensure these are enabled and updated.
- **Ports & Services**: Monitor open ports for unauthorized activity.
- **Privilege Escalation Risks**: Identify apps/services with unnecessary admin rights.

#### b. **Malware Detection**
- **Virus/Malware Scans**: Regular scans for malicious software.
- **Rogue Processes**: Identify processes that exhibit abnormal behavior.
- **System Logs**: Monitor logs for unusual activity.

#### c. **Network Vulnerabilities**
- **Unencrypted Connections**: Detect unsecured connections (HTTP, open Wi-Fi).
- **Unauthorized Access**: Monitor login attempts and access to shared resources.

#### d. **Patch Management**
- **Critical Updates**: Check for pending critical OS or software updates.
- **Security Bulletins**: Monitor vulnerabilities reported for your OS or software stack.

---

### **3. System Health Monitoring**
Ensure your PC is physically and logically healthy:

#### a. **Temperature Monitoring**
- **CPU, GPU, Disk Temps**: Monitor temperatures to avoid thermal throttling or hardware failure.

#### b. **Power Supply Metrics**
- **Battery Health (Laptops)**: Monitor capacity and charge cycles.
- **Power Usage**: Measure overall energy consumption and system efficiency.

#### c. **GPU Metrics** (for graphics-intensive tasks)
- **GPU Utilization**: Percentage of GPU in use.
- **VRAM Usage**: Memory usage of the GPU.
- **Render Times**: Tracks frame rendering performance.

#### d. **System Logs**
- **Windows Event Viewer/UNIX Logs**: Monitor logs for errors or warnings.
- **Error Rates**: Identify frequently failing services or hardware.

---

### **4. Additional Insights**
#### a. **Application Insights**
- **Startup Programs**: Identify and disable unnecessary startup programs.
- **Top Resource-Consuming Applications**: List apps using the most resources.

#### b. **Performance Benchmarks**
- Compare your system’s performance to similar systems using tools like Cinebench, Geekbench, or PassMark.

#### c. **Hardware Lifespan Predictions**
- **SSD Wear Level**: Monitor SSD endurance and write limits.
- **RAM Errors**: Check for memory errors (using MemTest86).
- **Fan Speed**: Ensure cooling fans are functioning optimally.

---

### Tools You Can Use:
#### a. **Performance Monitoring Tools**:
- **Windows Task Manager** or **Resource Monitor**.
- **Linux Performance Commands**: `top`, `htop`, `iostat`, `vmstat`.
- **3rd Party Tools**: HWMonitor, CPU-Z, GPU-Z.

#### b. **Vulnerability Scanning Tools**:
- **Built-in Scanners**:
  - Windows Defender Security Center.
  - Linux: `chkrootkit`, `rkhunter`.
- **3rd Party Scanners**:
  - Nessus (vulnerability scanning).
  - Nmap (network scanning).
  - Malwarebytes (malware detection).

#### c. **Advanced Tools**:
- **AIDA64**: Comprehensive diagnostics for performance and hardware.
- **S.M.A.R.T Monitoring**: Tools like CrystalDiskInfo for HDD/SSD health.

---

### **How to Integrate in the Project**
1. **Real-Time Monitoring Dashboard**:
   - Use **Socket.IO** for live updates of metrics on a web-based dashboard.
   - Metrics: CPU, Memory, Disk, Network.

2. **Automated Vulnerability Checks**:
   - Schedule vulnerability scans using tools like `Nessus`.
   - Use APIs to fetch scan results and display alerts in real-time.

3. **Alerts for Threshold Breaches**:
   - Set thresholds (e.g., CPU > 90%, Disk Usage > 80%) and notify users via Socket.IO.

4. **Export Data**:
   - Export monitoring data in JSON/CSV for further analysis.

5. **Historical Data Storage**:
   - Use a database (e.g., MongoDB) to store time-series metrics for trend analysis.

---

### Final List of Parameters
- **Performance**: CPU, RAM, Disk I/O, Network.
- **Security**: Patches, Malware, Open Ports.
- **Health**: Temperatures, Logs, Disk SMART Data.
- **Insights**: Application Usage, Benchmarks.

This integration will provide a complete picture of both performance and vulnerabilities on the PC.
