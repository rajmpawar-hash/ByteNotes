# The `keyof` Operator & Mapped Types

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Mapped Types allow us to iterate over the keys of an existing type to construct a completely new type dynamically. This is the underlying engine behind utility types like `Partial` or `Pick`. We use the `keyof` operator to extract a Union of keys from an object, and then use the `in` keyword within bracket notation (`[K in keyof T]`) to map over those keys and assign them new properties."*

In a senior machine-coding round, an interviewer might ask you: *"Don't use the built-in `Partial` utility. Write your own version of it from scratch."*

To do this, you must understand `keyof` and Mapped Types.

## 1. The `keyof` Operator

The `keyof` operator takes an Object Type and extracts all of its keys, returning them as a **String Union Type**.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Extract the keys!
type UserKeys = keyof User; 
// 👆 UserKeys is exactly equivalent to: "id" | "name" | "email"

// Usage:
let key: UserKeys = "name"; // ✅ Valid
// let badKey: UserKeys = "age"; // ❌ Error: Type '"age"' is not assignable to type 'keyof User'
```

## 2. Mapped Types (Building `Partial` from scratch)

A Mapped Type is basically a `for...in` loop, but for Types.

Let's write our own version of `Partial` (which takes an object and makes all of its properties optional). We'll call it `MyPartial`.

```typescript
// 1. We accept a Generic <T>
type MyPartial<T> = {
  // 2. We use a Mapped Type: For every Key (K) in the keys of T...
  // 3. We add the `?` modifier to make it optional...
  // 4. We assign it the original type of that property (T[K])
  [K in keyof T]?: T[K];
};

// --- Testing it out ---
interface User {
  id: number;
  name: string;
}

type OptionalUser = MyPartial<User>;

// ✅ It works perfectly! All fields are optional.
const tempUser: OptionalUser = {
  name: "Alice" 
};
```

### Breaking down the syntax:
- `[K in keyof T]`: This iterates over all the keys. If `T` is `User`, `K` will be `"id"`, and then it will be `"name"`.
- `?`: This makes the current key optional.
- `T[K]`: This is **Indexed Access**. It looks up the type of the property on the original object. For `"id"`, `T[K]` returns `number`. For `"name"`, `T[K]` returns `string`.

> [!IMPORTANT]
> **Read-Only Mapping**
> You can easily modify this mapped type to create a `Readonly` utility instead of a `Partial` utility by swapping the `?` for the `readonly` keyword:
> ```typescript
> type MyReadonly<T> = {
>   readonly [K in keyof T]: T[K];
> };
> ```
