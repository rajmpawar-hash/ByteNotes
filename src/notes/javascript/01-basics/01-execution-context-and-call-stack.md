# 🧠 Execution Context & Call Stack

Everything in JavaScript happens inside an **Execution Context**. Think of it as a massive box where your code is evaluated and executed.

Imagine this simple code:
```javascript
var n = 2;
function square(num) {
    var ans = num * num;
    return ans;
}
var square2 = square(n);
```

When you run this code, an Execution Context is created. It has two distinct parts: **Memory** and **Code**.

```mermaid
flowchart TB
    subgraph ExecutionContext [Global Execution Context]
        direction LR
        subgraph Memory [Memory Phase 1]
            direction TB
            N["n: undefined"]
            Sq["square: { ... }"]
            Sq2["square2: undefined"]
        end
        subgraph Code [Code Execution Phase 2]
            direction TB
            L1["Line 1: n = 2"]
            L6["Line 6: square2 = square(2)"]
        end
        Memory ~~~ Code
    end
```

## 📦 1. The Two Phases of Execution
When JavaScript runs, the Global Execution Context (GEC) is created in two phases:

### 🧠 Phase 1: Memory Creation
- JS skims through the code line by line.
- It finds `var n`, allocates memory, and assigns it `undefined`.
- It finds `function square`, and stores the *entire function code* in memory.
- It finds `var square2`, allocates memory, and assigns it `undefined`.
- *No code is actually run yet!*

### ⚡ Phase 2: Code Execution
- JS runs the code again, line by line.
- `n` is assigned the actual value of `2`.
- It skips the function declaration.
- On line 6, it sees `square(n)`. This is a function invocation!

---

## 🏗️ 2. Local Execution Contexts
Whenever a function is invoked (called), a brand new **Local Execution Context** is created *inside* the global one!

```mermaid
flowchart TB
    subgraph GEC [Global Execution Context]
        direction LR
        subgraph Memory1 [Global Memory]
            direction TB
            M_N["n: 2"]
            M_Sq["square: { ... }"]
            M_Sq2["square2: undefined"]
        end
        subgraph Code1 [Global Code]
            direction TB
            
            subgraph LEC ["Local Execution Context for square(2)"]
                direction LR
                subgraph LocalMemory [Local Memory]
                    LM_Num["num: 2"]
                    LM_Ans["ans: 4"]
                end
                subgraph LocalCode [Local Code]
                    LC_L1["ans = 2 * 2"]
                    LC_L2["return ans"]
                end
                LocalMemory ~~~ LocalCode
            end
        end
        Memory1 ~~~ Code1
    end
```

Once `return ans` happens, the Local Execution Context is completely **deleted**, and the value `4` is passed back to the Global Execution Context and assigned to `square2`.

---

## 🥞 3. The Call Stack

With all these Execution Contexts being created and deleted, how does JavaScript keep track? **The Call Stack**.

```mermaid
flowchart BT
    subgraph Stack ["The Call Stack (LIFO)"]
        direction BT
        B["square Local Execution Context"]
        A["Global Execution Context"]
    end
    
    A -.->|"Pushed when program starts"| A
    B -.->|"Pushed when square() is called"| B
    B -.->|"Popped when return is hit"| StackOut["Destroyed"]
```

- 📥 It operates on the **LIFO (Last In, First Out)** principle.
- 🌍 The **Global Execution Context** is pushed to the bottom of the stack the moment the program starts.
- 📦 Whenever a function is invoked, its Execution Context is pushed to the top of the stack.
- 🗑️ When the function finishes executing, its context is popped off the stack.
- 🛑 When the whole program finishes, the GEC is popped off, and the Call Stack is empty!
