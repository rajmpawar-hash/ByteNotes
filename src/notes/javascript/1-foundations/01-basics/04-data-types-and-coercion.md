# 🧱 Data Types & Coercion

> [!TIP]
> **The 30-Second Interview Pitch**
> JavaScript has Primitive data types (String, Number, BigInt, Boolean, Undefined, Null, Symbol) which are immutable and passed by value, and Non-Primitive/Reference data types (Objects, Arrays, Functions) which are mutable and passed by reference. Type Coercion is JavaScript's automatic conversion of values from one data type to another during operations (e.g., `"42" + 42` vs `"42" - 42`).

## 1. Primitive vs. Non-Primitive

### Primitive Data Types
Primitive data types store single values directly in memory. **They are completely immutable.**

- `String`
- `Number`
- `BigInt`
- `Boolean`
- `Undefined` (Variable declared, but no value assigned)
- `Null` (Explicitly assigned absence of a value)
- `Symbol` (Unique and immutable identifier)

```javascript
let count = 10;
// Reassigning creates a NEW primitive value in memory; it doesn't mutate the old '10'
count = 20; 
```

### Non-Primitive (Reference) Data Types
Reference types store a memory address pointing to the actual data structure in the heap. **They are mutable.**

- `Objects` (`{}`)
- `Arrays` (`[]`)
- `Functions`
- `Date`, etc.

```javascript
const user = { name: "Raj" };
// Even though it's 'const', the reference doesn't change, but the contents can!
user.name = "Pawar"; // ✅ Valid mutation
```

---

## 2. Deep Dive: Symbols

Symbols are unique, immutable primitives introduced in ES6. Their primary purpose is to create **guaranteed unique property keys** on objects that won't accidentally collide with other keys.

```javascript
const id1 = Symbol("id");
const id2 = Symbol("id");

console.log(id1 === id2); // ❌ false - every Symbol() is unique!
```

> [!NOTE]
> **Symbol vs Symbol.for()**
> While `Symbol()` creates a new unique symbol every time, `Symbol.for()` checks a global registry. If a symbol with that key exists, it reuses it; otherwise, it creates a new one.

```javascript
const shared1 = Symbol.for("shared");
const shared2 = Symbol.for("shared");

console.log(shared1 === shared2); // ✅ true
console.log(Symbol.keyFor(shared1)); // "shared"
```

---

## 3. Type Coercion & Conversion

**Type Coercion** is implicit (automatic) conversion, while **Type Conversion** is explicit.

### Explicit Conversion
You explicitly tell JS to change the type:

```javascript
Number("42"); // 42
String(100);  // "100"
Boolean(1);   // true
```

### Implicit Coercion (The Gotchas!)

> [!WARNING]
> **Gotcha: The `+` vs `-` Operator**
> The `+` operator triggers string concatenation if any operand is a string. However, the `-` operator (and `*`, `/`) triggers numeric coercion!

```javascript
// ❌ WRONG ASSUMPTION
console.log("42" + 42); // You might expect 84
console.log("42" - 42); // You might expect an error

// ✅ UNDER THE HOOD
console.log("42" + 42); // Output: "4242" (Number 42 is coerced to String)
console.log("42" - 42); // Output: 0 (String "42" is coerced to Number)
```

**Why does this happen?** 
When JS sees a `-`, it knows strings cannot be subtracted, so it tries its best to convert the string to a number. When it sees a `+`, it assumes string concatenation takes priority if a string is present.
