# 🧵 Template Literals & Strings

> [!TIP]
> **The 30-Second Interview Pitch**
> Template Literals, introduced in ES6, provide an elegant way to create strings in JavaScript. By using backticks (`` ` ``) instead of quotes, they allow for multi-line strings and string interpolation (embedding variables or expressions directly using `${expression}`).

## 1. String Interpolation

Before ES6, concatenating strings and variables required the cumbersome `+` operator. Template literals solve this cleanly.

### The Old Way (Concatenation):
```javascript
const name = "Raj";
const age = 25;

const greeting = "Hello, my name is " + name + " and I am " + age + " years old.";
```

### The ES6 Way (Template Literals):
```javascript
const name = "Raj";
const age = 25;

// Notice the backticks instead of single/double quotes!
const greeting = `Hello, my name is ${name} and I am ${age} years old.`;
```

---

## 2. Expressions inside `${}`

You aren't limited to just variables. You can put *any* valid JavaScript expression inside the `${}` block, including math, function calls, or ternaries!

```javascript
const a = 10;
const b = 20;

console.log(`The sum of a and b is ${a + b}.`); 
// "The sum of a and b is 30."

const isPremium = true;
console.log(`User status: ${isPremium ? 'Pro' : 'Free'}`); 
// "User status: Pro"
```

---

## 3. Multi-line Strings

Creating strings that span multiple lines used to require adding newline characters (`\n`) manually. Template literals preserve whitespace and newlines natively.

### The Old Way:
```javascript
const html = "<div>\n" +
             "  <h1>Title</h1>\n" +
             "</div>";
```

### The ES6 Way:
```javascript
const html = `
<div>
  <h1>Title</h1>
</div>
`;
```

---

## 4. Escape Notation (`\`)

Sometimes you need to use a character inside a string that would otherwise break the string (like a quote inside a quoted string). You use the backslash (`\`) as an escape character.

```javascript
// Escaping quotes
const msg1 = 'It\'s a beautiful day'; // Escaping a single quote inside single quotes
const msg2 = "He said, \"Hello!\"";   // Escaping double quotes inside double quotes

// Escaping backticks inside a template literal
const msg3 = `This is a backtick: \``; 

// Newlines and Tabs
const msg4 = "First Line\nSecond Line"; // \n creates a new line
const msg5 = "Item 1\tItem 2";          // \t creates a tab space
```
