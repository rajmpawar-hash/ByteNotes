# Microservices and API Gateways

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Node.js is an industry standard for microservices because its lightweight footprint and fast startup times make it ideal for containerized environments like Docker and Kubernetes. Because it excels at asynchronous I/O, Node is most commonly used to implement the **API Gateway** or Backend-For-Frontend (BFF) pattern, where a single Node service orchestrates and aggregates network calls to dozens of other downstream microservices without blocking."*

In modern industry (Netflix, Uber, PayPal), monolithic applications are frequently broken down into Microservices. Node.js is uniquely positioned for this architecture.

## Why Node.js for Microservices?

1. **Lightweight & Container Friendly:** A basic Node.js Docker container can be incredibly small (Alpine Linux + Node is ~50MB). It starts up in milliseconds, allowing Kubernetes to aggressively scale instances up and down to match traffic spikes.
2. **I/O Bound Supremacy:** Microservices spend the vast majority of their time waiting on the network (talking to other microservices or databases). Thanks to `libuv` and the Event Loop, Node handles thousands of concurrent network connections without needing massive RAM allocations for OS threads.

## The API Gateway Pattern (Backend-For-Frontend)

The most common architectural pattern for Node.js in a microservice ecosystem is the **API Gateway**.

Instead of a React or mobile frontend making 5 different HTTP requests to 5 different microservices (Users, Orders, Inventory, Payments, Notifications), the frontend makes **one** request to the Node.js API Gateway.

The Node.js Gateway then fans out the requests asynchronously:

```javascript
app.get('/api/dashboard', async (req, res) => {
  try {
    // Fire all microservice requests in parallel!
    // Node doesn't block the thread while waiting for these to return.
    const [userRes, ordersRes, notificationsRes] = await Promise.all([
      axios.get('http://user-service:8001/me'),
      axios.get('http://order-service:8002/latest'),
      axios.get('http://notification-service:8003/unread')
    ]);

    // Aggregate the data and send a single response to the client
    res.json({
      user: userRes.data,
      orders: ordersRes.data,
      notifications: notificationsRes.data
    });
    
  } catch (err) {
    res.status(500).json({ error: 'Upstream service failed' });
  }
});
```
*Because of the Event Loop, Node can do this for 10,000 concurrent users without breaking a sweat.*

## Inter-Service Communication

How do microservices talk to each other?

1. **Synchronous (REST / HTTP):** Simple, but causes tight coupling. If the Order service calls the Payment service, and the Payment service is down, the Order service crashes.
2. **Synchronous (gRPC):** An extremely fast, binary-based remote procedure call framework developed by Google. Much faster than JSON over HTTP. Very popular in Node microservices.
3. **Asynchronous (Message Brokers):** The industry standard for decoupled microservices. Node.js services push events into a queue like **RabbitMQ** or **Apache Kafka**. 
   - *Example:* The Order Service publishes an `OrderCreated` event to Kafka. The Payment Service and Email Service both listen for that event and process it independently.

## Industry Best Practices

> [!IMPORTANT]
> **1. Statelessness**
> Microservices must be completely stateless. You cannot store user sessions in memory (RAM). If Kubernetes kills your Node container and spins up a new one, the data is lost. Always store session state in a centralized, fast cache like **Redis**.

> [!WARNING]
> **2. CPU Bound Separation**
> Never put heavy CPU tasks (like video encoding or machine learning) in your Node.js API Gateway. It will block the Event Loop and take down the entire routing layer. Offload heavy computation to microservices written in Go, Rust, or Python.

> [!NOTE]
> **3. Health Checks**
> Every Node.js microservice must expose a `/health` endpoint. Kubernetes constantly pings this endpoint. If your Node service gets deadlocked or the Event Loop freezes, the `/health` endpoint will timeout, and Kubernetes will automatically terminate and replace the broken container.
