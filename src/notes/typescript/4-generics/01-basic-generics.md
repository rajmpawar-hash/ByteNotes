# Generics (The Core of Reusability)

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Generics allow us to write reusable, flexible functions and classes where the exact Type is provided as a variable (usually denoted as `<T>`) when the function is called, rather than when it is defined. This prevents us from having to write duplicate functions for different data types, and it strictly enforces that the type of the input structurally matches the type of the output."*

If you write a highly reusable function (like a `useFetch` hook or a `debounce` utility), you **must** use Generics.

## 1. The Problem without Generics

Imagine we want a function that takes an item and returns it in an array.

```typescript
// ❌ If we use a specific type, it's not reusable for numbers!
function makeArray(item: string): string[] {
  return [item];
}

// ❌ If we use 'any', we lose all type safety! 
function makeArray(item: any): any[] {
  return [item];
}
// TS won't warn us if we do: makeArray("hello").push(123)
```

## 2. The Solution: Generics `<T>`

Generics act as a placeholder variable for a Type. 

```typescript
// ✅ The Generic 'T' captures the type of the input, and guarantees it is the type of the output!
function makeArray<T>(item: T): T[] {
  return [item];
}

// TS automatically infers T is a string! Output is string[]
const strArr = makeArray("hello"); 

// TS automatically infers T is a number! Output is number[]
const numArr = makeArray(42); 
```

## 3. Multiple Generics
You can use multiple generic variables (conventionally `T`, `U`, `V`, etc.).

```typescript
function makePair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Result is explicitly typed as: [string, number]
const pair = makePair("Alice", 25); 
```

## 4. Generic Constraints (`extends`)

Sometimes you want a Generic to be flexible, but you need it to meet a *minimum requirement*. You can constrain a Generic using the `extends` keyword.

```typescript
// We guarantee that WHATEVER 'T' is passed in, it MUST have a 'length' property!
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

logLength("hello"); // ✅ string has .length
logLength([1, 2, 3]); // ✅ array has .length
logLength({ length: 10, name: "Box" }); // ✅ object has .length

// logLength(42); // ❌ Error: number does not have a .length property!
```

## 5. Generic Defaults
Just like default function parameters, you can provide a default type for a Generic if the user doesn't provide one.

```typescript
interface ApiResponse<T = string> {
  data: T;
  status: number;
}

// Uses the default 'string'
const response1: ApiResponse = { data: "Success", status: 200 };

// Overrides the default with a custom object
const response2: ApiResponse<{ id: number }> = { data: { id: 1 }, status: 200 };
```
