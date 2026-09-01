# Type vs Interface

> [!TIP]
> **The 30-Second Interview Pitch**
> *"In modern TypeScript, `type` and `interface` are almost completely interchangeable for defining object shapes. However, `interface` is strictly limited to objects and supports **Declaration Merging** (which is useful for patching global Window or 3rd-party library types). `type` is much more flexible, as it supports primitives, Unions (`|`), Intersections (`&`), and utility mapping, making it the preferred choice for defining complex functional data structures."*

This is the most frequently asked TypeScript interview question. If you are asked this, provide the following specific examples to prove you understand the underlying mechanics.

## 1. When they act EXACTLY the same

For 90% of your codebase (defining the shape of an object or React props), you can use either.

```typescript
// Interface
interface User {
  id: number;
  name: string;
}

// Type
type User = {
  id: number;
  name: string;
};
```

## 2. When you MUST use `interface` (Declaration Merging)

The unique superpower of `interface` is **Declaration Merging**. If you declare an `interface` twice with the same name, TypeScript will automatically merge them into a single interface!

```typescript
interface Window {
  myCustomGlobalVariable: string;
}

// Somewhere else in the codebase...
interface Window {
  anotherVariable: number;
}

// ✅ TypeScript merges them! The Window object now requires BOTH properties.
const w: Window = {
  myCustomGlobalVariable: "Hello",
  anotherVariable: 42
};
```
*You cannot do this with `type`. If you declare a `type` twice, TypeScript will throw a "Duplicate identifier" error.*

## 3. When you MUST use `type` (Unions & Primitives)

`interface` can ONLY be used for objects. If you need to define a primitive, a Union, or an Intersection, you **must** use `type`.

### Union Types (`|`)
Allows a value to be one of several types.
```typescript
type ID = string | number; // ❌ Cannot do this with interface

let userId: ID;
userId = 123;     // ✅
userId = "uuid";  // ✅
```

### Intersection Types (`&`)
Combines multiple types into one.
```typescript
type Name = { name: string };
type Age = { age: number };

// Combines the two types
type Person = Name & Age; // ❌ Cannot do this directly with interface

const john: Person = { name: "John", age: 30 };
```

> [!IMPORTANT]
> **The Industry Standard**
> In the React community, the standard best practice is to **default to `type`** for props and state, and only use `interface` when you are writing a library meant to be published (so users can utilize declaration merging to extend your library's types).
