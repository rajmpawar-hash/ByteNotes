# Clustering and Child Processes

> [!TIP]
> **The 30-Second Interview Pitch**
> *"By default, a Node.js process runs on a single CPU core. If you deploy a Node server on an 8-core machine, 7 cores will sit idle. The `cluster` module allows you to easily fork the main process into multiple worker processes (one for each core). All workers share the same server port, allowing Node to automatically load-balance incoming HTTP requests across all available CPU cores, maximizing server throughput."*

While **Worker Threads** are used for parallelizing *specific CPU-heavy tasks* within an app, **Clustering** is used to scale the *entire application* to handle more traffic.

## How the Cluster Module Works

When you use the `cluster` module, you create one **Master** process. The Master process doesn't run your application logic; its only job is to fork **Worker** processes and manage them.

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers. One for each CPU core.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // If a worker crashes, restart it immediately
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
  
} else {
  // Workers can share any TCP connection.
  // In this case, it is an HTTP server.
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from Worker ${process.pid}\n`);
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

### The Magic of Shared Ports
Usually, if you try to run two Node servers on Port 8000, you get an `EADDRINUSE` (Address already in use) error.
However, the `cluster` module allows all forked workers to share the same port. The Master process listens on the port and uses a round-robin algorithm to distribute incoming connections to the idle workers.

## PM2 (The Industry Standard)

In modern production environments, you rarely write raw `cluster` code yourself. Instead, developers use a process manager like **PM2**.

PM2 handles clustering automatically under the hood. You simply run:
```bash
pm2 start server.js -i max
```
This tells PM2 to launch your server on every available CPU core and automatically restart any process if it crashes.

## Other Child Processes
For interviews, know the difference between these three:
1. `exec()`: Spawns a shell and runs a command (e.g., `ls -la`). Buffers the output in memory.
2. `spawn()`: Runs a command but returns a **Stream**. Used for massive outputs (e.g., executing a Python script that returns 5GB of data).
3. `fork()`: A special type of `spawn()` designed specifically to spawn new Node.js processes and establish a communication channel (IPC) between them. (This is what `cluster` uses under the hood!).
