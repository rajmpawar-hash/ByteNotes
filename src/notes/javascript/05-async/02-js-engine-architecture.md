# JS Engine Architecture (Google V8)

JavaScript is not a machine code that your computer's CPU can understand directly. It needs an engine to translate it. The most famous engine is **V8** (built by Google and used in Chrome and Node.js).

## The Journey of JS Code

When you write JavaScript, it goes through three major steps inside the engine:
1. **Parsing**
2. **Compilation**
3. **Execution**

### 1. Parsing
The engine reads your code line by line and breaks it down into small tokens (like `let`, `a`, `=`, `10`). 
Then, a Syntax Parser takes these tokens and builds an **Abstract Syntax Tree (AST)**. You can think of an AST as a giant JSON object that maps out the structure of your entire program.

### 2. Compilation (JIT Compilation)
Historically, programming languages were either *interpreted* (translated line-by-line during runtime, which is slow) or *compiled* (translated all at once before running, which is fast).

Modern JavaScript engines use **Just-In-Time (JIT) Compilation**, which is the best of both worlds!
- The code goes to an **Interpreter** which starts running the code immediately (line by line).
- At the exact same time, the code is sent to a **Compiler**.
- As the Interpreter runs the code, the Compiler watches. If it sees code that is run multiple times (like a loop), it compiles that specific chunk into highly optimized machine code on the fly and swaps it out!

### 3. Execution
The compiled machine code and the interpreted code are fed into the **Execution Context** and the **Call Stack** (which is part of the JS Engine).

This phase relies heavily on:
- **Memory Heap:** A large unstructured pool of memory where variables and objects are stored.
- **Garbage Collector:** A background process that constantly runs using an algorithm called "Mark and Sweep". It finds variables and objects in the memory heap that are no longer being used by your code and deletes them to free up space.
