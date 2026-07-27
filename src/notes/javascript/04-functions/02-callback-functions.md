# 📞 Callback Functions

Because functions in JavaScript are First-Class Citizens, you can pass a function into another function as an argument. The function that you pass in is called a **Callback Function**.

```mermaid
flowchart LR
    A[Main Function] -->|Executes code...| B{Ready!}
    B -->|Calls| C[Callback Function]
```

## ⏳ Why do we need them?
JavaScript is highly asynchronous. We use callbacks to tell JavaScript: *"Hey, do this heavy task in the background. When you are completely finished, call this function."*

## 🎬 Callbacks in Action

```javascript
setTimeout(function() {
    console.log("Timer finished!");
}, 5000);
```
In this example, the anonymous function we pass into `setTimeout` is the callback function. It won't execute immediately; it waits in the Callback Queue until the 5 seconds are up!

## ⚠️ The Downside: Callback Hell
When you have multiple asynchronous tasks that depend on each other, you end up passing callbacks into callbacks into callbacks...

```javascript
api.createOrder(cart, function() {
    api.proceedToPayment(function() {
        api.showSummary(function() {
            console.log("Order complete!");
        });
    });
});
```
This deeply nested, hard-to-read structure is known as **Callback Hell**. It also causes **Inversion of Control** because we lose control of our program and blindly trust `api.createOrder` to execute our callback properly.

*(This is why Promises and `async/await` were invented!)*

---

## 🔗 Callbacks + Closures in the Real World
Callbacks form closures! This is why event listeners can access variables from their outer scope:

```javascript
function attachHandler() {
    let count = 0; // Closed over by the callback below
    
    document.getElementById("btn").addEventListener("click", function() {
        count++;
        console.log("Button clicked " + count + " times");
    });
}
attachHandler();
// Every click prints: "Button clicked 1 times", "Button clicked 2 times", ...
// The callback remembers 'count' via closure even after attachHandler() is done!
```

> **Key Insight:** Every time you pass a callback to `addEventListener`, `setTimeout`, or any async function, that callback forms a **closure** over its surrounding variables. This is closures + callbacks working hand in hand!

