# Callback Functions

Since JavaScript treats functions as First-Class Citizens, you can pass a function into another function as an argument. The function that you pass in is called a **Callback Function**.

## Why are they called Callbacks?
Because you give a function to another function and say, *"Here is some code, please **call it back** later when you are ready."*

Callbacks are essential in JavaScript because it is a synchronous, single-threaded language. Callbacks allow us to do asynchronous things without blocking the main thread.

## Example: `setTimeout`

The most common example of a callback is using timers.

```javascript
setTimeout(function() {
    console.log("Timer is done!");
}, 5000);

console.log("Hello");
```

In the code above, we pass an anonymous function to `setTimeout`. JavaScript doesn't wait for 5 seconds. It immediately prints "Hello", and 5 seconds later, it *calls back* our function and prints "Timer is done!".

## Example: Event Listeners

Event listeners rely heavily on callbacks. You register a callback function that will be executed only when a specific event occurs.

```javascript
document.getElementById("btn").addEventListener("click", function callback() {
    console.log("Button was clicked!");
});
```

The `callback()` function sits in memory and waits. It only executes when the user clicks the button.

## The Problem with Callbacks: Callback Hell

While callbacks are powerful, nesting them too deeply leads to **Callback Hell** (also known as the Pyramid of Doom). The code grows horizontally and becomes extremely difficult to read and maintain.

```javascript
api.createOrder(cart, function(orderId) {
    api.proceedToPayment(orderId, function(paymentInfo) {
        api.showOrderSummary(paymentInfo, function() {
            api.updateWalletBalance();
        });
    });
});
```

Another massive issue is **Inversion of Control**. By passing our callback to `api.createOrder`, we lose control of our code. We have to blindly trust that `createOrder` will call our callback exactly once, at the right time, and with the right arguments.

To fix Callback Hell and Inversion of Control, modern JavaScript introduced **Promises**.
