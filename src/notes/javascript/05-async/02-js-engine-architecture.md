# ⚙️ JS Engine Architecture (V8)

A JavaScript engine is not a machine. It's a highly complex piece of software that takes your human-readable JavaScript code and translates it into machine code that the computer can actually execute.

```mermaid
flowchart TD
    A[JavaScript Code] --> B(Parsing)
    B --> C(Compilation & Interpretation)
    C --> D(Execution)
    
    subgraph Engine Core
        C
        D
    end
```

## 🏗️ 1. Parsing Phase
Before doing anything, the engine reads your code.
1. **Lexical Analysis:** Breaks code into "tokens" (keywords, variables, operators).
2. **Syntax Analysis (AST):** Converts those tokens into an Abstract Syntax Tree (AST).

```mermaid
flowchart LR
    A[const a = 5;] --> B[Tokens: const, a, =, 5] --> C[AST]
```

## ⚡ 2. Compilation (JIT Compilation)
Historically, languages were either interpreted (fast to start, slow to run) or compiled (slow to start, fast to run). 
Modern JS engines (like V8) use **Just-In-Time (JIT) Compilation**, which combines the best of both!

1. The **Interpreter** (called Ignition in V8) quickly translates AST to unoptimized Bytecode so the program can start running immediately.
2. The **Profiler** watches the code as it runs, looking for "hot" areas (code that runs repeatedly, like loops).
3. The **Compiler** (called TurboFan in V8) takes those hot areas and compiles them down to highly optimized Machine Code.

## 🏃 3. Execution Phase
The optimized machine code is executed using two main memory structures:

- **Memory Heap:** A large unstructured region of memory used for storing objects and functions (reference types).
- **Call Stack:** Structured LIFO memory used for keeping track of the Execution Contexts and primitive variables.

```mermaid
flowchart TD
    A[Memory Heap] -->|Stores| B(Objects, Arrays, Functions)
    C[Call Stack] -->|Stores| D(Primitives, Execution Contexts)
```

## 🧹 Garbage Collection
JavaScript handles memory management automatically. It uses an algorithm called **Mark and Sweep**.
- It starts at the root (the global object).
- It "marks" all objects that are reachable/referenced.
- It "sweeps" (deletes) anything that is not marked, freeing up the memory in the Heap!
