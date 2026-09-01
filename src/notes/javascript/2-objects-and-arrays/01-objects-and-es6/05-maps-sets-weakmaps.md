# 🗺️ Maps, Sets, WeakMaps & WeakSets

> [!TIP]
> **The 30-Second Interview Pitch**
> `Map` and `Set` are ES6 data structures. A `Map` is a collection of key-value pairs where keys can be *any* data type (unlike objects where keys are strings/symbols), and it remembers insertion order. A `Set` is a collection of *unique* values. `WeakMap` and `WeakSet` are similar, but they strictly only accept objects as keys/values and are weakly referenced, meaning they do not prevent garbage collection if the object is deleted elsewhere.

---

## 1. Map

A `Map` holds key-value pairs and remembers the original insertion order of the keys.

### Why use Map over an Object?
- **Key Types:** Object keys must be Strings or Symbols. A Map's keys can be *anything* (functions, objects, arrays, primitives).
- **Size:** Map has a built-in `.size` property.
- **Iteration:** Maps are inherently iterable (e.g., using `for...of`).

```javascript
const myMap = new Map();

// Using different data types as keys
myMap.set("name", "Shubham");
myMap.set(1, "Number One");
myMap.set(true, "Boolean True");

// Using an object as a key!
const objKey = { id: 1 };
myMap.set(objKey, "Object Value");

console.log(myMap.get(objKey)); // "Object Value"
console.log(myMap.size); // 4
console.log(myMap.has("name")); // true

myMap.delete(1);
```

---

## 2. Set

A `Set` is a collection of values where each value must be **unique**.

### Why use Set?
- **Removing Duplicates:** The fastest way to remove duplicates from an array is by passing it into a Set.

```javascript
const numbers = [1, 2, 2, 3, 4, 4, 5];

// Convert Array to Set (removes duplicates)
const uniqueSet = new Set(numbers);

// Convert Set back to Array using Spread operator
const uniqueArray = [...uniqueSet]; 
console.log(uniqueArray); // [1, 2, 3, 4, 5]

uniqueSet.add(6);
uniqueSet.add(6); // Ignored, 6 is already in the Set

console.log(uniqueSet.has(3)); // true
```

---

## 3. WeakMap & WeakSet

These are special, "weakly referenced" versions of Map and Set. 

> [!IMPORTANT]
> **The Garbage Collection Rule:** In a standard Map/Set, if you use an object as a key, that object is kept alive in memory *forever* as long as the Map/Set exists, even if you delete the original reference to the object. In a `WeakMap`/`WeakSet`, the object is allowed to be garbage collected!

### Rules of WeakMap & WeakSet:
1. **Keys/Values MUST be Objects:** You cannot use primitive values (strings, numbers) in Weak structures.
2. **Not Iterable:** You cannot loop over them (no `.keys()`, `.values()`, or `.size`). Because the garbage collector can remove items unpredictably, the JS engine doesn't allow iteration.

### WeakMap Example
```javascript
let user = { name: "Shubham" };

const weakMap = new WeakMap();
weakMap.set(user, "Premium Subscriber");

console.log(weakMap.get(user)); // "Premium Subscriber"

// If we remove the reference to the original object...
user = null;

// The object { name: "Shubham" } is now erased from memory!
// It is automatically removed from the WeakMap as well.
```

---

## 🎯 Common Interview Questions

**Q: When would you use a WeakMap?**
- **A:** WeakMaps are perfect for caching data (like memoization) or storing private data for an object without causing memory leaks. If the DOM element or object is deleted by the user, the WeakMap automatically clears the associated cache!

**Q: What is the time complexity of searching a Set?**
- **A:** Searching for an item using `Set.has(value)` is generally `O(1)`, which is significantly faster than using `Array.includes(value)` which is `O(n)`.
