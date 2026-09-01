# 🟢 Node.js — Master Navigation Hub

Welcome to the Node.js Master Guide. Node.js is an asynchronous, event-driven JavaScript runtime built on Chrome's V8 engine.

In senior interviews, you will rarely be tested on simple syntax. You will be rigorously tested on **Architecture (The Event Loop)**, **Performance (Streams & Worker Threads)**, and **Machine Coding**.

## 📂 Section Index

### ⚙️ 1. Core Architecture (Interview Critical)
| Section | Topics |
|:--------|:-------|
| [**01-v8-and-libuv**](/node/1-core-architecture/01-v8-and-libuv) | V8 Engine, `libuv`, The Thread Pool, Single-Threaded Myth. |
| [**02-event-loop**](/node/1-core-architecture/02-event-loop) | The 6 Phases of the Event Loop (Timers, Pending, Idle, Poll, Check, Close). |

### 🔀 2. Async & The Event-Driven Model
| Section | Topics |
|:--------|:-------|
| [**01-event-emitter**](/node/2-async-and-events/01-event-emitter) | The Observer Pattern, `EventEmitter` class, custom events. |
| [**02-macrotasks-vs-microtasks**](/node/2-async-and-events/02-macrotasks-vs-microtasks) | `process.nextTick` vs `setImmediate` vs `setTimeout(0)`. |

### 💾 3. Data & Memory Management
| Section | Topics |
|:--------|:-------|
| [**01-buffers**](/node/3-data-and-memory/01-buffers) | Binary Data, V8 Memory limits. |
| [**02-streams**](/node/3-data-and-memory/02-streams) | Readable, Writable, Duplex, Transform streams. Piping and memory exhaustion. |

### 🚀 4. Scaling & Performance
| Section | Topics |
|:--------|:-------|
| [**01-worker-threads**](/node/4-scaling-and-performance/01-worker-threads) | Offloading CPU-heavy tasks without blocking the Event Loop. |
| [**02-clustering**](/node/4-scaling-and-performance/02-clustering) | The `cluster` module, child processes (`fork`, `spawn`). |
| [**03-microservices-and-api-gateways**](/node/4-scaling-and-performance/03-microservices-and-api-gateways) | Why Node is perfect for microservices, The API Gateway (BFF) pattern, inter-service communication (gRPC, Kafka). |

### 🌐 5. Web Frameworks (Express.js)
| Section | Topics |
|:--------|:-------|
| [**01-express-routing-and-middleware**](/node/5-web-frameworks/01-express-routing-and-middleware) | Basic Setup, The Middleware Onion Model, Error Handling, CORS. |

### 💻 6. Machine Coding & Interview Prep
| Section | Topics |
|:--------|:-------|
| [**01-machine-coding-tasks**](/node/6-interview-prep/01-machine-coding-tasks) | Code a Rate Limiter, Custom EventEmitter, Stream Processor, Native HTTP Server. |
