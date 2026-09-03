# 🧵 String Methods

> [!TIP]
> **The 30-Second Interview Pitch**
> Strings in JavaScript are primitive data types, meaning they are immutable. Any string method that appears to modify a string is actually returning a completely *new* string. JavaScript temporarily wraps primitive strings in a String Object to allow access to these methods, then immediately discards the wrapper.

## 1. Extraction Methods

Interviewers frequently test the differences between `substring`, `slice`, and `substr`.

- **`slice(start, end)`**: Extracts a part of a string and returns a new string. **Supports negative indexes.**
- **`substring(start, end)`**: Same as slice, but **does not support negative indexes** (treats them as 0).
- **`substr(start, length)`**: Extracts starting from `start` for a specific `length`. *(Note: Considered legacy, avoid in modern code).*

```javascript
const name = "rajzz";

console.log(name.slice(-2));        // "zz" (Counts from the end)
console.log(name.substring(2, 5));  // "ubh" (Characters from index 2 up to 4)
```

## 2. Searching & Regular Expressions

### Basic Searching
- **`indexOf(substr)`**: Returns the first index of the substring, or `-1` if not found.
- **`lastIndexOf(substr)`**: Returns the last index of the substring.
- **`includes(substr)`**: Returns `true` or `false`.

### Regex Searching
- **`search(regex)`**: Returns the index of the first match of the regular expression.
- **`match(regex)`**: Returns an array of matching elements.

```javascript
const text = "Learning JavaScript is fun with JavaScript";

// search() with case-insensitive flag 'i'
console.log(text.search(/javascript/i)); // 9

// match() with case-insensitive 'i' and global 'g' flags
console.log(text.match(/javascript/gi)); // ['JavaScript', 'JavaScript']
```

## 3. Formatting and Transformation

Because strings are immutable, all these methods return **new** strings:
- **`replace(search, new_value)`**: Replaces the first match (use regex `/g` to replace all).
- **`trim()`**: Removes whitespace from both ends.
- **`toLowerCase()` / `toUpperCase()`**: Changes casing.
- **`charAt(index)`**: Returns the character at the specified index.
- **`charCodeAt(index)`**: Returns the unicode value of the character.

## 4. Converting: Strings ↔️ Arrays

A very common pattern is converting a string to an array to manipulate it, then converting it back.

- **`split(separator)`**: String ➡️ Array
- **`join(separator)`**: Array ➡️ String

```javascript
const sentence = "Hello World";

// 1. Split into array of words
const words = sentence.split(" "); // ["Hello", "World"]

// 2. Join back with dashes
const dashed = words.join("-"); // "Hello-World"
```

---

> [!WARNING]
> **Gotcha: Primitive Strings vs String Objects**
> If you declare a string using `new String()`, you are creating an Object, not a primitive! This can cause bugs in strict equality checks. Use `.valueOf()` to extract the primitive value from a String Object.

```javascript
const primitiveStr = "Raj";
const objectStr = new String("Raj");

console.log(primitiveStr === objectStr); // ❌ false! One is a string, one is an object.
console.log(primitiveStr === objectStr.valueOf()); // ✅ true
```
