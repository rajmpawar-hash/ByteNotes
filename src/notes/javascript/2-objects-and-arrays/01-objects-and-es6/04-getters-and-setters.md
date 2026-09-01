# 🛡️ Getters & Setters

> [!TIP]
> **The 30-Second Interview Pitch**
> Getters (`get`) and Setters (`set`) in JavaScript allow you to define object properties that bind to a function instead of a fixed value. They provide a mechanism for Encapsulation, allowing you to intercept property access to inject logic, formatting, or validation before a value is read or written, without changing how the consumer interacts with the object.

Getter and Setter methods are used to provide **controlled access** to object properties. Instead of directly exposing internal data (which can lead to bugs or invalid states), they let you add logic when reading or writing properties.

## 1. Why Use Them?

The two main reasons to use Getters and Setters are:
1. **Encapsulation:** Hiding the true internal state (often denoted by an underscore prefix like `_price`).
2. **Validation/Formatting:** Running logic before a value is saved or returned.

## 2. Implementation

Notice how you access `product.price` just like a normal property, but under the hood, it's executing a function!

```javascript
const product = {
    // 1. The "private" internal state
    _price: 0,
    
    // 2. The Setter (Intercepts writes)
    set price(value) {
        if (value < 0) {
            throw new Error("Price must be positive!");
        }
        this._price = value;
    },
    
    // 3. The Getter (Intercepts reads)
    get price() {
        return `$${this._price.toFixed(2)}`;
    }
};

// --- Usage ---

// Calls the setter function
product.price = 50;  

// Calls the getter function
console.log(product.price); // Output: "$50.00"

// ❌ Validation catches bad data
product.price = -10; // Error: Price must be positive!
```

> [!WARNING]
> **Gotcha: Infinite Loops (Maximum call stack size exceeded)**
> A very common mistake is using the exact same name for the property and the setter inside the setter function. This causes an infinite loop!

```javascript
// ❌ WRONG
const badProduct = {
    set price(value) {
        // This triggers the setter again! And again! And again!
        this.price = value; 
    }
};

// ✅ CORRECT
const goodProduct = {
    set price(value) {
        // Save it to a differently named internal property (e.g. _price)
        this._price = value; 
    }
};
```
