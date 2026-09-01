# TypeScript Basics: Primitives and Types

Before diving into advanced Type Gymnastics, you must be perfectly comfortable writing the foundational types in a whiteboard interview.

## 1. Primitives

TypeScript supports all standard JavaScript primitives.

```typescript
let isDone: boolean = false;
let age: number = 25;
let firstName: string = "Alice";
```

## 2. Arrays and Tuples

### Arrays
There are two ways to type an array. Both are perfectly valid and do the exact same thing:
```typescript
// Approach 1 (Preferred)
let scores: number[] = [100, 95, 80];

// Approach 2 (Generic Syntax)
let names: Array<string> = ["Alice", "Bob"];
```

### Tuples
A Tuple is an array with a **fixed length** and **known types** at specific indexes.
```typescript
// A Tuple representing a coordinate [x, y, name]
let location: [number, number, string];

location = [10, 20, "Home"]; // ✅ Valid
location = ["Home", 10, 20]; // ❌ Error: Type 'string' is not assignable to type 'number' at index 0.
```

## 3. Enums

Enums allow you to define a set of named constants. By default, they are numeric (starting at 0).

```typescript
enum Direction {
  Up,     // 0
  Down,   // 1
  Left,   // 2
  Right   // 3
}

let move: Direction = Direction.Left; // move is 2
```

> [!TIP]
> **Interview Gotcha: String Enums vs Numeric Enums**
> Numeric enums can cause weird reverse-mapping bugs. It is highly recommended in production to use **String Enums** because they are strictly checked and easier to debug when printed to a console.
> ```typescript
> enum Status {
>   Pending = "PENDING",
>   Active = "ACTIVE",
>   Failed = "FAILED"
> }
> ```

## 4. Functions

When typing functions, you must specify both the **parameter types** and the **return type**.

```typescript
// Regular function
function add(x: number, y: number): number {
  return x + y;
}

// Arrow function
const multiply = (x: number, y: number): number => {
  return x * y;
}
```

### Optional Parameters
Use a `?` for optional parameters. Optional parameters MUST come after required parameters.

```typescript
function buildName(first: string, last?: string): string {
  if (last) {
    return `${first} ${last}`;
  }
  return first;
}

console.log(buildName("Alice")); // ✅ "Alice"
```

### Default Parameters
If you provide a default value, TypeScript will **automatically infer** the type. You do not strictly need to type it, but you can for clarity.

```typescript
// TS infers that 'greeting' is a string because of the default value.
function greet(name: string, greeting = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greet("Alice")); // ✅ "Hello, Alice!"
console.log(greet("Bob", "Good morning")); // ✅ "Good morning, Bob!"
```
