# any vs unknown vs never

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Using `any` completely disables TypeScript's type checker, defeating the purpose of using TypeScript at all. `unknown` is the type-safe alternative to `any`; it accepts any value, but strictly forces the developer to perform a type-check (Type Narrowing) before they are allowed to perform operations on it. Finally, `never` represents a state that should never logically occur, such as a function that always throws an error or an exhaustive switch statement."*

## 1. The Danger of `any`

When you assign a variable to `any`, TypeScript throws its hands up and says, *"I will no longer check anything you do with this variable."*

```typescript
let userData: any = "Hello World";

// ❌ TypeScript allows this, even though it will cause a runtime crash!
userData.map(item => console.log(item)); 
```
Using `any` is a massive anti-pattern. If you find yourself using `any`, you are just writing vanilla JavaScript with extra steps.

## 2. The Safety of `unknown`

`unknown` is the exact same as `any` (it can hold any value), but it is **type-safe**. 
TypeScript will **prevent** you from doing anything with an `unknown` variable until you prove to the compiler what type it actually is (Type Narrowing).

```typescript
let userData: unknown = "Hello World";

// ❌ ERROR: Object is of type 'unknown'. TypeScript protects you!
userData.toUpperCase(); 

// ✅ VALID: We perform a type check first!
if (typeof userData === "string") {
  // TypeScript now KNOWS it is a string inside this block.
  console.log(userData.toUpperCase()); 
}
```

## 3. The Enigma of `never`

`never` is a type that holds absolutely no values. It represents code that will never finish executing, or an impossible state.

### Use Case A: Functions that never return
```typescript
// This function never returns a value because it crashes the app.
function throwError(message: string): never {
  throw new Error(message);
}

// This function never returns because it loops infinitely.
function infiniteLoop(): never {
  while (true) {}
}
```

### Use Case B: Exhaustive Switch Checks (Advanced)
`never` is incredibly useful for forcing compiler errors when you add a new option to an Enum but forget to handle it.

```typescript
type Shape = "Circle" | "Square";

function getArea(shape: Shape) {
  switch (shape) {
    case "Circle":
      return Math.PI * 2;
    case "Square":
      return 100;
    default:
      // If we handle all cases, `shape` is narrowed down to `never`.
      // If a junior dev adds "Triangle" to the Shape type later, 
      // this line will instantly throw a compiler error, saving production!
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```
