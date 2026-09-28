# 🔀 1.4 Control Flow & Operators (Modern Switch & Loops)
**★★ Medium**

> [!TIP]
> **The 30-Second Interview Pitch**
> "Java's control flow is highly structured and strictly typed. Unlike dynamic languages, Java completely lacks 'truthy' or 'falsy' evaluation—all conditions must evaluate strictly to a `boolean`. In modern Java (14+), the `switch` statement has evolved into a powerful **Switch Expression** that can return values directly using the `yield` keyword and arrow syntax (`->`), completely eliminating the classic 'fall-through' bugs of older versions."

## 🌉 Node.js & C++ Translation
> [!NOTE]
> **Node.js / C++ Developers:** Both JavaScript and C++ allow you to write `if (myObject)` or `if (1)`. **Java prohibits this.** A condition in an `if` or `while` loop MUST be exactly `boolean`. You must write `if (myObject != null)` or `if (x == 1)`. 
> Also, JavaScript's `===` (strict equality) does not exist in Java. In Java, `==` compares primitives by value, and objects by their memory address reference.

## ⚖️ 1. Modern Switch Expressions (Java 14+)
Historically, Java's `switch` statement was identical to C++: clunky, required `break` statements everywhere, and was prone to "fall-through" bugs. 

Java 14 introduced **Switch Expressions**, which use arrow syntax `->` and can actually return a value directly to a variable.

### The Old Way (Pre-Java 14 - Error Prone)
```java
int day = 3;
String type;
switch (day) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        type = "Weekday";
        break; // If you forget this, it falls through to Weekend!
    case 6:
    case 7:
        type = "Weekend";
        break;
    default:
        type = "Invalid";
}
```

### The Modern Way (Java 14+ - Clean & Safe)
```java
int day = 3;

// Notice how the switch actually RETURNS a value into 'type'
String type = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> {
        // If you need a multi-line block, use the 'yield' keyword to return the value
        System.out.println("Unknown day: " + day);
        yield "Invalid"; 
    }
};
```
*Benefits:* No `break` required. No accidental fall-through. Multiple comma-separated cases.

## 🔄 2. Loops & Labeled Breaks
Java supports the standard `for`, `while`, and `do-while` loops. 

### The Enhanced For-Loop (For-Each)
Introduced in Java 5, this is the standard way to iterate over Arrays and Collections.
```java
String[] names = {"Alice", "Bob", "Charlie"};
for (String name : names) {
    System.out.println(name);
}
```

### Labeled Break / Continue
Java does not have `goto`. However, if you are deep inside nested loops, you can label a loop and break out of the specific outer loop.
```java
outerLoop: // This is a label
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j > 10) {
            break outerLoop; // Instantly breaks the outer 'for' loop, not just the inner one!
        }
    }
}
```

## 🧮 3. Crucial Operators

### Logical Short-Circuiting vs Bitwise (`&&` vs `&`)
- **`&&` and `||` (Short-Circuit Logical):** Used for booleans. If the left side determines the outcome (e.g., left of `&&` is `false`), Java skips executing the right side entirely.
- **`&` and `|` (Bitwise / Non-Short-Circuit):** 
  - When used on **numbers**, they perform bit-by-bit binary operations (e.g., `5 & 3` compares their binary bits `0101 & 0011 = 0001`).
  - When used on **booleans**, they act as logical operators BUT they **force both sides to evaluate**, even if the first side already determines the result.

```java
// SAFE (Short-Circuit): If 'obj' is null, the right side is skipped. No NullPointerException.
if (obj != null && obj.isActive()) { ... } 

// DANGEROUS (Non-Short-Circuit): Even if 'obj' is null, it STILL evaluates the right side and crashes!
if (obj != null & obj.isActive()) { ... } 
```

### The Ternary Operator
A shorthand `if-else` that returns a value.
```java
int age = 20;
String status = (age >= 18) ? "Adult" : "Minor";
```

## 🛑 4. Right vs Wrong: Truthy Evaluation

```java
int count = 5;

// ❌ ERROR: Java does not evaluate numbers as truthy/falsy.
if (count) { 
    System.out.println("We have items!");
}

// ✅ CORRECT: Must evaluate to a strict boolean.
if (count > 0) {
    System.out.println("We have items!");
}
```

## 🎯 Common Interview Questions

**Q1: What is the difference between `break` and `yield` in a switch statement?**
`break` is used in traditional switch statements to exit the block and prevent fall-through. `yield` is used in modern Java 14+ Switch Expressions inside a code block `{}` to explicitly return a value from the switch expression to the assigned variable.

**Q2: What is the difference between `==` and `.equals()`?**
`==` is an operator that compares primitive values directly. For Objects, `==` compares their *memory addresses* (whether they are the exact same instance on the Heap). `.equals()` is a method meant to be overridden to compare the actual *meaningful contents* of two different objects.

**Q3: Can a `switch` statement evaluate a `String`?**
Yes. Since Java 7, `switch` can evaluate `String` objects (under the hood, it uses the String's `.hashCode()` and `.equals()`). It can also evaluate `int`, `char`, `byte`, `short`, and `Enums`.
