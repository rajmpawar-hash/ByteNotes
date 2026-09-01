# Node.js Machine Coding Tasks

In senior interviews, you will often be asked to write actual Node.js code on a whiteboard or in a shared IDE to prove you understand the underlying runtime.

Here are the Top 4 most frequently asked Node.js machine coding tasks.

---

## 1. Build an API Rate Limiter (Express Middleware)

**The Goal:** Write an Express middleware that blocks an IP address if it makes more than 5 requests in a 10-second window.
**The "Gotcha":** You need to maintain an in-memory dictionary of IP addresses and their request counts, and use `setTimeout` to clear them.

```javascript
const express = require('express');
const app = express();

// In-memory store: { "192.168.1.1": { count: 3, timer: <Timeout> } }
const requestCounts = {};

const rateLimiter = (req, res, next) => {
  const ip = req.ip;

  if (!requestCounts[ip]) {
    // First request from this IP
    requestCounts[ip] = {
      count: 1,
      // Clear the record after 10 seconds
      timer: setTimeout(() => {
        delete requestCounts[ip];
      }, 10000)
    };
    return next();
  }

  // Increment the count
  requestCounts[ip].count++;

  if (requestCounts[ip].count > 5) {
    return res.status(429).json({ error: "Too many requests. Please try again in 10 seconds." });
  }

  next();
};

app.use(rateLimiter);

app.get('/api/data', (req, res) => res.send("Success!"));
```

---

## 2. Build a Basic HTTP Server (Without Express)

**The Goal:** Write a working web server using *only* the native `http` module. It should return JSON on `/api/users` and a 404 for anything else.
**The "Gotcha":** You must manually set the `Content-Type` headers and manually route using `req.url`.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // 1. Check the URL and Method
  if (req.url === '/api/users' && req.method === 'GET') {
    // 2. Set the headers
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    // 3. Send the stringified data and end the response
    res.end(JSON.stringify([{ id: 1, name: "Alice" }]));
  } else {
    // 4. Handle 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route Not Found');
  }
});

server.listen(3000, () => {
  console.log("Native server running on port 3000");
});
```

---

## 3. Process a Massive File (Streams)

**The Goal:** Copy a 10GB file from `input.txt` to `output.txt` without crashing the server.
**The "Gotcha":** You cannot use `fs.readFile`. You must use streams and `.pipe()`.

```javascript
const fs = require('fs');

const processLargeFile = () => {
  // 1. Create a readable stream from the source
  const readStream = fs.createReadStream('./input.txt');
  
  // 2. Create a writable stream to the destination
  const writeStream = fs.createWriteStream('./output.txt');

  // 3. Pipe them together (automatically handles backpressure!)
  readStream.pipe(writeStream);

  // 4. Handle completion and errors
  writeStream.on('finish', () => console.log("File copied successfully!"));
  readStream.on('error', (err) => console.error("Error reading file", err));
  writeStream.on('error', (err) => console.error("Error writing file", err));
};

processLargeFile();
```

---

## 4. Build a Custom EventEmitter

**The Goal:** Write your own version of Node's `EventEmitter` class from scratch.
**The "Gotcha":** You need an internal dictionary where the keys are event names, and the values are arrays of callback functions.

```javascript
class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  // Publish an event
  emit(eventName, ...args) {
    const callbacks = this.events[eventName];
    
    if (callbacks) {
      callbacks.forEach(callback => {
        callback(...args); // Execute each callback with the provided arguments
      });
    }
  }

  // Remove a listener
  off(eventName, callbackToRemove) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callbackToRemove
      );
    }
  }
}

// Testing it
const myEmitter = new MyEventEmitter();

const greet = (name) => console.log(`Hello ${name}`);
myEmitter.on('greet', greet);

myEmitter.emit('greet', 'Alice'); // Output: Hello Alice
myEmitter.off('greet', greet);
myEmitter.emit('greet', 'Alice'); // No output
```
