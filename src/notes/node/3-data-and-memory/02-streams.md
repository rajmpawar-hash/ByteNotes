# Streams (Preventing Server Crashes)

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Streams are collections of data that are processed piece-by-piece (chunk-by-chunk) rather than loading the entire payload into memory at once. They are critical for building scalable Node.js applications. Without streams, attempting to read a 5GB video file would instantly crash a server with 1GB of RAM. Streams allow Node to read, process, and send massive datasets with an incredibly small and stable memory footprint."*

If an interviewer asks: *"How do you process a massive file?"* The answer is ALWAYS **Streams**.

## The Problem (Memory Exhaustion)

Look at this standard way of reading a file:

```javascript
// ❌ DISASTER WAITING TO HAPPEN
const fs = require('fs');
const http = require('require');

http.createServer((req, res) => {
  // If big_video.mp4 is 5GB, this will try to load 5GB of data 
  // into your server's RAM at once. The server will crash.
  fs.readFile(__dirname + '/big_video.mp4', (err, data) => {
    res.end(data);
  });
}).listen(3000);
```

## The Solution (Streams)

Instead of reading the entire file, we read it in small chunks (Buffers) and immediately send that chunk to the user before reading the next one.

```javascript
// ✅ THE RIGHT WAY
const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  const readStream = fs.createReadStream(__dirname + '/big_video.mp4');
  
  // 'pipe' takes the data chunks coming from the file and 
  // pushes them directly into the HTTP response stream.
  readStream.pipe(res);
}).listen(3000);
```
Using `pipe()`, the server might only use 64MB of RAM at any given time, regardless of whether the video is 5MB or 500GB!

## The 4 Types of Streams

1. **Readable:** Streams you can read from (e.g., `fs.createReadStream()`, `http.IncomingMessage`).
2. **Writable:** Streams you can write to (e.g., `fs.createWriteStream()`, `http.ServerResponse`).
3. **Duplex:** Streams that are both Readable and Writable (e.g., a `net.Socket` TCP connection).
4. **Transform:** A special Duplex stream that modifies the data as it passes through (e.g., `zlib.createGzip()` to compress a file on the fly).

## 🚨 Advanced: Backpressure

If a `Readable` stream reads data faster than the `Writable` stream can process it, the data buffers in memory, causing a memory leak. This is called **Backpressure**.

The beauty of the `.pipe()` method is that it handles backpressure automatically! It pauses the Readable stream if the Writable stream gets overwhelmed, and resumes it when it catches up.
