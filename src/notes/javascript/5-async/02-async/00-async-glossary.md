# 📖 Async JavaScript Glossary

Before diving into the complex mechanics of how JavaScript handles asynchronous operations, let's define the core vocabulary in plain English.

---

### **1. Synchronous Code**
Code that executes line-by-line, top-to-bottom. Each line must finish completely before the next line can start. If a line takes 5 seconds to run, the entire program freezes for 5 seconds.

### **2. Asynchronous Code (Async)**
Code that can start now and finish later, allowing the rest of the program to continue running in the meantime. It prevents the program from freezing during long tasks (like downloading a file or waiting for a timer).

### **3. The Call Stack**
The single thread of execution in JavaScript. It is a data structure that keeps track of what function is currently running. Because it is a single stack, JavaScript can literally only do **one thing at a time**.

### **4. Web APIs (Browser APIs)**
Superpowers provided by the browser (not the JavaScript language itself) that run in the background. Examples include `setTimeout` (timers), `fetch` (network requests), and the DOM (HTML manipulation). They do the heavy lifting while the Call Stack moves on to other things.

### **5. Callback Queue (Task Queue / Macrotask Queue)**
A waiting room where regular asynchronous callbacks wait when their background work is finished (e.g., a timer reaches zero). They wait here until the Call Stack is empty and ready to run them.

### **6. Microtask Queue (VIP Queue)**
A special, high-priority waiting room specifically for Promises (`.then()`, `.catch()`) and `MutationObserver`. Tasks in this queue always skip ahead of the regular Callback Queue.

### **7. The Event Loop**
A continuous mechanism whose sole job is to monitor the Call Stack and the Queues. If the Call Stack is empty, it takes the first task from the Microtask Queue and pushes it to the Call Stack. If the Microtask Queue is empty, it takes tasks from the Callback Queue.

### **8. Promise**
An object representing the eventual success or failure of an asynchronous operation. It acts as a placeholder for data that doesn't exist yet but will arrive in the future.

### **9. Async/Await**
Modern JavaScript syntax built on top of Promises. It allows you to write asynchronous code that *looks* and *reads* like synchronous code, making it much easier to understand.
