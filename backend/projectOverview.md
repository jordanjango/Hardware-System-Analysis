# System Hardware and Vulnerebilities Analysis

The idea behind this project is that we will plotting out real time consumption of CPU,GPU and Memory.
This will help us to keep track of our system components and also make sure if we have any vulnerabilites.

# Tech Stack used

Typescript : Used to make sure we have strict check on the types and have error free code.
Socket.io : Socket.io is a node.js library that helps us in real time communication between client and server

1.  ### Working of Socket.io

- **Connections**: when a client connects to the server a websocket connection is established between client and server
- **events**:Socket.io is an event drivern that means both client and server communicate with each other with the help of events. - **socket.emit(event,data)** : This will emit the event and initiate the change.(Publisher) - **socket.on(event,data)** : This will catch the change and help us in initiating the function (Subscriber). - **Namespaces**: Socket.IO supports namespaces, which allow you to split the logic of your application over a single shared connection. Namespaces are identified by a leading slash (e.g., `/chat`).
  It will help us to split the knowledge into smaller knowledge.

PostgresSql : Postgres is used as the relational database
React : For frontend, we will be using relational database [PostgresSQL].
