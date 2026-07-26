# Promises

Before Promises, we used Callbacks to handle asynchronous code. However, Callbacks suffered from two massive problems:
1. **Callback Hell:** Deeply nested, unreadable code.
2. **Inversion of Control:** We handed over our callback function to a third-party API and lost control over when, how, or if it would ever be executed.

**Promises** were introduced to solve exactly this!

## What is a Promise?

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation.

Instead of passing a callback *into* a function, the function returns a Promise object immediately. We then attach our callbacks to that Promise object.

```javascript
// The old callback way
createOrder(cart, function(orderId) {
    proceedToPayment(orderId);
});

// The modern Promise way
const promise = createOrder(cart);

promise.then(function(orderId) {
    proceedToPayment(orderId);
});
```

### Why is this better?
With Promises, we have resolved **Inversion of Control**. We aren't giving `createOrder` our callback function anymore. `createOrder` returns an object to us. We control that object, and JavaScript guarantees that the `.then()` block will be executed exactly once when the Promise is fulfilled.

## Promise States
A Promise can be in one of three states:
1. **Pending:** Initial state, neither fulfilled nor rejected.
2. **Fulfilled:** The operation completed successfully.
3. **Rejected:** The operation failed (e.g., a network error).

Once a Promise is fulfilled or rejected, it is considered **settled**. A Promise can only settle once. You cannot fulfill it and then reject it later.

## Promise Chaining

To fix Callback Hell, Promises allow us to chain `.then()` blocks. The key to chaining is that **you must always return a value or a new Promise from the previous `.then()` block.**

```javascript
createOrder(cart)
    .then(function(orderId) {
        return proceedToPayment(orderId); // Returns a new Promise
    })
    .then(function(paymentInfo) {
        return showOrderSummary(paymentInfo);
    })
    .catch(function(err) {
        // This catch block will handle an error from ANY of the promises above it!
        console.log("Error:", err.message); 
    });
```
