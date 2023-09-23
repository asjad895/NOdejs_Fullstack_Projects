
# Server Documentation: Real-Time Chat Application

## Introduction
The server code for the Real-Time Chat Application is a Node.js application built using Express.js and Socket.io. This server acts as the backend for the chat application, handling HTTP requests, WebSocket communication, and interactions with a MongoDB database. This document provides an overview of the server code, including middleware, routes, controllers, socket events, and other essential components.

## Middleware
- **cors**: CORS (Cross-Origin Resource Sharing) middleware is used to enable communication between the frontend and the server. It allows requests from the specified frontend origin.
- **express.json()**: This middleware parses JSON requests and makes the request body available as a JavaScript object.

## Routes
The server defines and mounts several routes to handle various API endpoints:

### Groups Router (`groupsRouter`)
- `GET /api/groups`: Fetch existing group data.
- `POST /api/newgroups`: Create a new chat group.
- `GET /api/groups/{groupname}`: Fetch data for a specific group.

### Messages Router (`messagesRouter`)
- `GET /api/messages`: Fetch chat messages for a specific group.
- `POST /api/messages`: Send a chat message to a specific group.

## Socket.io Events
The server uses Socket.io to handle real-time communication with clients. Here are the key socket events and their functionality:

- `connection`: Handles the initial connection when a client joins the server.
- `joinRoom`: Allows users to join specific chat rooms. It emits a 'botm' event to welcome the user and a 'user_joined' event to notify other users in the room.
- `sendMessage`: Handles the sending of chat messages within a room. Messages are broadcasted to all clients in the same room.
- `UserDisconnect`: Manages user disconnections from the server. It notifies other users in the room when someone leaves.

## Socket Room Management
- The `socketToRoom` object stores a mapping of socket IDs to room names, allowing users to join and leave specific rooms.
- The "AiBot" is a predefined username used for system-generated messages.

## Conclusion
The server code for the Real-Time Chat Application is a critical component that handles HTTP requests, WebSocket communication, and manages chat rooms. It enables real-time messaging and group chat functionality, making it a core part of the overall chat application architecture. This documentation provides an overview of the server's key components, routes, and socket events, highlighting its role in facilitating seamless communication between clients.
