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

> **What about `let` and `const`?** They are also allocated memory in this phase (they ARE hoisted!), but they are stored in a **separate memory space** (not on the `window` object) and are NOT initialized to `undefined`. Instead, they remain in an inaccessible state called the **Temporal Dead Zone** until their declaration line is executed.

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
flowchart LR
    subgraph Step1 ["Step 1: Program Starts"]
        direction BT
        S1_A["GEC"]
    end
    
    subgraph Step2 ["Step 2: square() Called"]
        direction BT
        S2_B["square EC"]
        S2_A["GEC"]
    end
    
    subgraph Step3 ["Step 3: return hit"]
        direction BT
        S3_X["square EC ❌"]
        S3_A["GEC"]
    end
    
    subgraph Step4 ["Step 4: Program Ends"]
        direction BT
        S4_X["GEC ❌"]
    end
    
    Step1 --> Step2 --> Step3 --> Step4
```

- 📥 It operates on the **LIFO (Last In, First Out)** principle.
- 🌍 The **Global Execution Context** is pushed to the bottom of the stack the moment the program starts.
- 📦 Whenever a function is invoked, its Execution Context is pushed to the top of the stack.
- 🗑️ When the function finishes executing, its context is popped off the stack.
- 🛑 When the whole program finishes, the GEC is popped off, and the Call Stack is empty!

### 💥 Stack Overflow
What happens if a function keeps calling itself forever? The call stack has a **fixed size limit**. If too many execution contexts pile up, you get a **Stack Overflow** error!

```javascript
function infinite() {
    infinite(); // Calls itself forever — no base case!
}
infinite(); // ❌ RangeError: Maximum call stack size exceeded
```

> **This is why recursion always needs a base case** — something that stops the function from calling itself endlessly.



## 🎯 Common Interview Questions

**Q: What is the difference between Execution Context and Scope?**
- **A:** They are two completely different concepts that often get confused:
  - **Scope** is just a set of *rules* about "who can see what variable". It is determined strictly by where you wrote your code in the file.
  - **Execution Context** is the actual *physical workspace* created by the JS engine when your code is running. It holds the actual memory (the variables), determines the value of `this`, and manages the Call Stack.
  
  **Example to make it click:**
  ```javascript
  const globalVar = "I am in the global scope";

  function makeCoffee() {
      // SCOPE: The rules say 'makeCoffee' is allowed to see 'globalVar' because of where it is written.
      // EXECUTION CONTEXT: Nothing actually exists yet until the function is called!
      console.log(globalVar); 
  }

  // The moment we call it, an Execution Context (a physical workspace in memory) is created 
  // to actually run the code and look up the variables defined by the Scope rules.
  makeCoffee(); 
  ```

**Q: What causes a Stack Overflow in JavaScript?**
- **A:** It occurs when the Call Stack size is exceeded, usually due to infinite recursion without a base case.