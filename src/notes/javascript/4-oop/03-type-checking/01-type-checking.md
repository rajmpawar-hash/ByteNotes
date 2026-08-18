# 🔍 Type Checking in JavaScript

JavaScript is a dynamically typed language, which means variables can hold values of any type without any type enforcement. While this is flexible, it often leads to confusing bugs. 

Knowing how to properly check types is a crucial skill for interviews and writing robust code!

## 1. The `typeof` Operator

The `typeof` operator returns a string indicating the type of the unevaluated operand.

```javascript
typeof "hello"   // "string"
typeof 42        // "number"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof Symbol()  // "symbol"
typeof 10n       // "bigint"
typeof function(){} // "function"
```

### 🚨 The `typeof null` Bug
One of the most famous bugs in JavaScript (that will never be fixed for backward compatibility reasons):
```javascript
typeof null // "object"  ❌ Should ideally be "null"
```

## 2. The `instanceof` Operator

`instanceof` tests to see if the `prototype` property of a constructor appears anywhere in the prototype chain of an object. It is used to check specifically what kind of **Object** something is.

```javascript
const arr = [1, 2, 3];
const date = new Date();

console.log(arr instanceof Array); // true
console.log(date instanceof Date); // true

// Since everything inherits from Object:
console.log(arr instanceof Object); // true
```

### ⚠️ The `instanceof` Pitfall (Cross-frame Execution)
Why shouldn't you just use `instanceof` everywhere? It fails when dealing with **multiple windows or iframes**.

Every window or iframe on a web page has its *own* separate global environment. This means an iframe has its own isolated `Array` constructor.

If you pass an array from an iframe to your main window, and check it with `arr instanceof Array`, it will return `false`! Why? Because the `Array` constructor inside the iframe is literally a different object in memory than the `Array` constructor in your main window. 

> 💡 **Analogy:** Think of it like two different countries having two different definitions of what a "Passport" is. A passport from Country A is not an `instanceof` Country B's Passport, even though they are both passports!

## 3. The Ultimate Array Check: `Array.isArray()`

Because of the `instanceof` pitfall and because `typeof []` returns `"object"`, the modern and foolproof way to check if a value is an array is:

```javascript
const arr = [1, 2, 3];

console.log(typeof arr); // "object" (Not helpful!)
console.log(Array.isArray(arr)); // true ✅
```

## 4. Checking for `NaN` (Not-a-Number)

`NaN` is a special numeric value representing an invalid number.
Ironically, its type is number!

```javascript
typeof NaN // "number"
```

### The old `isNaN()` vs modern `Number.isNaN()`
- `isNaN("hello")` returns `true` (because it coerces the string to a number first).
- `Number.isNaN("hello")` returns `false` (it strictly checks if the value is *actually* `NaN`).

**Always use `Number.isNaN()` for strict checking.**

## 5. The "God Mode" Type Check

If you need a 100% accurate, bulletproof way to get the exact type of *any* value (especially useful for plain objects vs arrays vs null), you can use the internal `[[Class]]` property via `Object.prototype.toString.call()`.

```javascript
function trueTypeOf(value) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

console.log(trueTypeOf([]));       // "array"
console.log(trueTypeOf({}));       // "object"
console.log(trueTypeOf(null));     // "null" 
console.log(trueTypeOf(new Date)); // "date"
console.log(trueTypeOf(/regex/));  // "regexp"
```

---

## 🎯 Interview Checklist
- [ ] Understand why `typeof null` is `"object"`.
- [ ] Know the difference between `typeof` (for primitives) and `instanceof` (for objects).
- [ ] Always use `Array.isArray()` to check for arrays.
- [ ] Always use `Number.isNaN()` instead of global `isNaN()`.
