# PC Checker Frontend (Angular + Ionic)

This is the frontend application for the PC Checker system, built using Angular and Ionic. It communicates with a backend WebSocket server to retrieve system information and manage processes.

## Features
- Display running processes from the connected PC
- Terminate processes by selecting them from the UI
- Show system uptime (boot time)
- Remotely shut down the PC

## Prerequisites
- Node.js (v16+ recommended)
- Angular CLI
- Ionic CLI

Install dependencies:
```bash
npm install
```

## Running the Application
To start the development server:
```bash
ionic serve
```
This will open the application in your default browser.

## WebSocket Communication
The frontend connects to the WebSocket server at:
```typescript
const WEBSOCKET_URL = 'wss://pc-checker-be.onrender.com/ws';
```

### WebSocket Events
- join: Registers the frontend as a client
- process: Receives the list of running processes
- status: Gets system uptime
- event: Updates process list after an action
- turnOff: Confirms PC shutdown

## Security Considerations
- Ensure only authorized users can send shutdown or terminate commands.
- Use secure WebSocket connections (wss://) in production.


