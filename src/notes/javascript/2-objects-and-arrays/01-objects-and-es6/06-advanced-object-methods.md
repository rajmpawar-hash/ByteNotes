# 🛠️ Advanced Object Methods (Proxy, Reflect, Frozen)

> [!TIP]
> **The 30-Second Interview Pitch**
> JavaScript provides powerful methods to manipulate and protect objects. We can lock down objects using `Object.freeze()` and `Object.seal()`, or precisely control property behavior using `Object.defineProperty()`. For ultimate control, ES6 introduced the `Proxy` object, which acts as a middleman to intercept and customize fundamental object operations (like getting or setting properties), often paired with the `Reflect` API to maintain default behaviors safely.

---

## 1. Protecting Objects (Freeze vs Seal)

By default, JavaScript objects are entirely mutable. You can add, change, or delete properties at will. Sometimes, we need to lock them down.

### `Object.freeze()`
Makes the object **completely immutable**.
- Cannot add new properties.
- Cannot change existing properties.
- Cannot delete properties.

```javascript
const config = { theme: "dark" };
Object.freeze(config);

config.theme = "light"; // Fails silently (or throws error in Strict Mode)
config.newProp = "test"; // Fails
delete config.theme; // Fails

console.log(Object.isFrozen(config)); // true
```

### `Object.seal()`
Makes the object **partially immutable**.
- Cannot add new properties.
- Cannot delete existing properties.
- **CAN modify existing properties!**

```javascript
const user = { name: "Raj" };
Object.seal(user);

user.name = "Shubham"; // ✅ Works! We can change existing values.
user.age = 25;         // ❌ Fails. Cannot add new properties.
delete user.name;      // ❌ Fails. Cannot delete.

console.log(Object.isSealed(user)); // true
```

---

## 2. Advanced Property Checking

### `in` operator vs `hasOwnProperty()`
How do you check if a property exists on an object?

```javascript
const car = { brand: "Toyota" };

// 1. The 'in' operator (Checks object AND its prototype chain)
console.log("brand" in car); // true
console.log("toString" in car); // true (Inherited from Object.prototype)

// 2. hasOwnProperty (Checks ONLY the object itself, NOT prototypes)
console.log(car.hasOwnProperty("brand")); // true
console.log(car.hasOwnProperty("toString")); // false
```

### The `delete` keyword
Used to completely remove a property from an object.
```javascript
const person = { name: "Raj", age: 25 };
delete person.age;
console.log(person); // { name: "Raj" }
```

---

## 3. Proxy & Reflect (ES6 Metaprogramming)

### 🕵️ Proxy
A `Proxy` is a "middleman" that wraps around an object and intercepts interactions with it. 

**Syntax:** `new Proxy(target, handler)`
- **target**: The original object you want to wrap.
- **handler**: An object containing "traps" (functions like `get`, `set`, `deleteProperty`) that define the custom behavior.

```javascript
const user = { name: "Shubham", age: 25 };

const proxyUser = new Proxy(user, {
    // Intercept reading a property
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return "Property Not Found!"; // Custom fallback!
        }
    },
    // Intercept writing to a property (Validation!)
    set(target, prop, value) {
        if (prop === "age" && typeof value !== "number") {
            throw new Error("Age must be a number!");
        }
        target[prop] = value;
        return true; // Indicate success
    }
});

console.log(proxyUser.name); // "Shubham"
console.log(proxyUser.city); // "Property Not Found!" (Intercepted!)

proxyUser.age = 26; // Works
// proxyUser.age = "twenty"; // Throws Error: Age must be a number!
```
*Real-World Use Cases:* Form validation, logging, formatting, creating reactive frameworks (Vue 3 uses Proxies under the hood for reactivity).

### 🪞 Reflect
`Reflect` is a built-in object that provides methods exactly matching the Proxy traps (e.g., `Reflect.get()`, `Reflect.set()`).

**Why use Reflect?** It is best practice to use `Reflect` inside a Proxy trap to forward the operation to the original target safely, rather than mutating `target[prop]` directly.

```javascript
const targetObj = { data: 100 };

const safeProxy = new Proxy(targetObj, {
    get(target, prop) {
        console.log(`[LOG]: Accessing ${prop}`);
        // Safely perform the default 'get' behavior
        return Reflect.get(target, prop); 
    }
});

console.log(safeProxy.data); 
// Output:
// [LOG]: Accessing data
// 100
```
