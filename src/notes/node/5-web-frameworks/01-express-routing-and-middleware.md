# Express.js: Routing and Middleware

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Express.js is a minimalist web framework for Node.js. Its core architectural concept is the **Middleware Pattern** (often visualized as an onion model). When a request enters the server, it passes sequentially through a pipeline of middleware functions. Each function can modify the request/response objects, end the cycle, or pass control to the next middleware using the `next()` function."*

## 1. Basic Server Setup

In interviews, you may be asked to quickly wire up an Express server to prove you know the basics.

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 2. The Middleware Pipeline (The Onion)

Middleware functions are functions that have access to the request (`req`), response (`res`), and the `next` function.

```javascript
// A custom logging middleware
const logger = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  
  // If you forget to call next(), the request hangs forever!
  next(); 
};

// Apply globally to all routes
app.use(logger);
```

### Route-Specific Middleware
You can chain multiple middlewares before the final route handler. This is commonly used for authentication.

```javascript
const requireAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next(); // User is authenticated, proceed to the route
};

// Route uses the middleware
app.get('/api/dashboard', requireAuth, (req, res) => {
  res.send("Welcome to the secret dashboard");
});
```

## 3. Global Error Handling

Express has a specific signature for Error Handling middleware. It **must** have 4 arguments: `(err, req, res, next)`.
If you pass an error to `next(err)`, Express will skip all regular middleware and jump straight to your Error Handler.

```javascript
// 1. A route that throws an error
app.get('/error', (req, res, next) => {
  const error = new Error("Database connection failed");
  next(error); // Triggers the error handler
});

// 2. The Global Error Handler (must be defined LAST, after all routes)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ 
    success: false, 
    message: err.message || "Internal Server Error" 
  });
});
```

## 4. CORS (Cross-Origin Resource Sharing)

If your React frontend runs on `localhost:5173` and your Node API runs on `localhost:3000`, the browser will block the requests due to the Same-Origin Policy.

To fix this, you must enable CORS in Express using the official `cors` package.

```javascript
const cors = require('cors');

// Allow all origins (Development only)
app.use(cors());

// Restrict to specific origins (Production)
app.use(cors({
  origin: 'https://my-frontend-domain.com',
  methods: ['GET', 'POST'],
  credentials: true // Required if you are sending cookies
}));
```
