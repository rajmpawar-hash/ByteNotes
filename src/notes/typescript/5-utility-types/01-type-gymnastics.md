# Utility Types (Type Gymnastics)

> [!TIP]
> **The 30-Second Interview Pitch**
> *"TypeScript Utility Types allow us to perform 'Type Gymnastics'—taking an existing, complex type and deriving a new type from it without rewriting any code. This adheres to the DRY (Don't Repeat Yourself) principle. The most common utility types are `Partial` (making all properties optional), `Pick` and `Omit` (selecting specific properties from an object), and `Record` (mapping keys to values)."*

Interviewers will often give you a massive `User` interface and ask you to create an `UpdateUserPayload` type. If you copy-paste the `User` interface and make the fields optional manually, you will fail the interview. You must use Utility Types.

Here is our base type for the examples:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "USER";
}
```

## 1. `Partial<T>`
Takes a type and makes ALL of its properties optional (`?`). Perfect for update payloads.

```typescript
// All fields are now optional!
type UpdateUserPayload = Partial<User>;

const payload: UpdateUserPayload = {
  name: "Alice" // We don't need id, email, or role!
};
```

## 2. `Pick<T, Keys>`
Creates a new type by picking *only* the specified keys from an existing type.

```typescript
// We only want the name and email
type UserContactInfo = Pick<User, "name" | "email">;

const contact: UserContactInfo = {
  name: "Alice",
  email: "alice@example.com",
  // id: 1 ❌ ERROR: 'id' does not exist in type 'UserContactInfo'
};
```

## 3. `Omit<T, Keys>`
The exact opposite of `Pick`. It creates a new type by stripping out the specified keys.

```typescript
// Create a new user (we don't have an ID yet because the DB generates it)
type CreateUserPayload = Omit<User, "id">;

const newUser: CreateUserPayload = {
  name: "Bob",
  email: "bob@example.com",
  role: "USER"
};
```

## 4. `Record<Keys, Type>`
Used to strongly type an object dictionary (like a hash map).

```typescript
// An object where the keys are strings, and the values are numbers
const scores: Record<string, number> = {
  Alice: 100,
  Bob: 95
};

// You can use Unions for the Keys to strictly limit what keys are allowed!
type Environment = "development" | "production" | "testing";
const apiUrls: Record<Environment, string> = {
  development: "http://localhost:3000",
  production: "https://api.com",
  testing: "https://test.api.com",
  // ❌ TS Error if you miss one of the environments!
};
```

## 5. `ReturnType<T>` (Advanced)
Extracts the return type of a function. This is incredibly useful when you are using a 3rd party library function and they didn't export the return type, but you need to use it.

```typescript
function generateRandomHex() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// Extracts 'string' because the function returns a string!
type HexColor = ReturnType<typeof generateRandomHex>;

const myColor: HexColor = "#ffffff";
```
