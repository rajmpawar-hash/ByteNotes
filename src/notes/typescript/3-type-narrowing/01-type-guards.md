# Type Guards & Narrowing

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Type Narrowing is the process of taking a broad type (like a Union or `unknown`) and writing logical checks to narrow it down to a specific, safe type at runtime. TypeScript is smart enough to analyze our `if` and `switch` statements using operators like `typeof`, `instanceof`, or the `in` operator, and will automatically infer the narrowed type inside that block. For complex custom objects, we use Custom Type Predicates with the `is` keyword."*

If you are dealing with an API that returns multiple different object shapes, you must use Type Guards to handle them safely.

## 1. Native JS Type Guards

Because TypeScript compiles away, Type Guards must be valid runtime JavaScript code!

### The `typeof` Guard (For Primitives)
```typescript
function formatPrice(price: number | string) {
  // ❌ ERROR: TS doesn't know if price has .toFixed() yet!
  // price.toFixed(2); 

  if (typeof price === "number") {
    // ✅ Inside this block, TS knows `price` is specifically a number
    return `$${price.toFixed(2)}`;
  }

  // ✅ TS infers that it MUST be a string down here
  return `$${parseFloat(price).toFixed(2)}`;
}
```

### The `instanceof` Guard (For Classes)
```typescript
class Car { drive() {} }
class Boat { sail() {} }

function operate(vehicle: Car | Boat) {
  if (vehicle instanceof Car) {
    vehicle.drive(); // TS knows it's a Car
  } else {
    vehicle.sail(); // TS knows it's a Boat
  }
}
```

### The `in` Operator (For Objects)
If you have plain objects instead of classes, you can check if a specific property exists using the `in` operator.
```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim(); // TS knows it's a Fish
  } else {
    animal.fly(); // TS knows it's a Bird
  }
}
```

## 2. Custom Type Predicates (`is`)

Sometimes the `in` operator gets messy. You can extract the logic into a reusable function called a **Custom Type Guard**.

Notice the return type: `pet is Fish`. This tells the TypeScript compiler: *"If this function returns true, you can safely assume the object is a Fish."*

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };

// The Custom Type Guard
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Usage
function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // ✅ TS knows pet is Fish
  } else {
    pet.fly();  // ✅ TS knows pet is Bird
  }
}
```
