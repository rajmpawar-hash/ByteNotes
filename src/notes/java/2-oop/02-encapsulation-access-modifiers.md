# 💊 2.2 Encapsulation & Access Modifiers
**★★★ Deep**

> [!TIP]
> **The 30-Second Interview Pitch**
> "Encapsulation is the mechanism of bundling data and the methods that operate on that data into a single unit, while restricting direct access to the internal state. In Java, this is achieved by making fields `private` and exposing controlled `public` getter and setter methods. This ensures data validation, hides complex implementation details, and forms the bedrock for creating **Immutable** and thread-safe objects."

## 📊 1. The Visibility Matrix

Java provides four levels of access control. Understanding this matrix is mandatory for any backend engineer.

| Modifier | Same Class | Same Package | Subclass (Diff Package) | Global (Anywhere) |
| :--- | :---: | :---: | :---: | :---: |
| **`private`** | ✅ | ❌ | ❌ | ❌ |
| **`default`** (No keyword) | ✅ | ✅ | ❌ | ❌ |
| **`protected`** | ✅ | ✅ | ✅ | ❌ |
| **`public`** | ✅ | ✅ | ✅ | ✅ |

### Class-Level vs Member-Level Modifiers
The matrix above applies to **members** (fields, methods, inner classes). 
However, a **Top-Level Class** (a standard `.java` file) is restricted. It can ONLY be:
1. **`public`**: The class is visible everywhere.
2. **`default`** (no modifier): The class is **package-private**. It is completely hidden from any code outside of its folder/package.

*(Note: You **cannot** declare a top-level class as `private` or `protected`. Those only apply to members!)*

## 🌉 Node.js & C++ Translation
> [!NOTE]
> **Node.js Developers:** Historically, JavaScript classes had no real private fields (everything was public). Even with modern `#private` fields, encapsulation is often skipped in Node. In Java, making fields `public` is considered a massive architectural failure.
> **C++ Developers:** Java's `private` and `public` are identical to C++. However, Java's `protected` is slightly wider—it allows access to *any* class in the same package, plus subclasses. C++ `protected` ONLY allows subclasses. Also, Java introduces the `default` (package-private) level when you omit a modifier entirely.

## 🛡️ 2. Encapsulation Mechanics
Encapsulation means hiding the internal state and requiring all interaction to be performed through an object's methods.

**Why?**
- **Validation:** You can prevent a user from setting `age = -5`.
- **Flexibility:** You can change the internal data structure later without breaking the API used by other classes.
- **Read-Only:** You can provide a getter but no setter.

### The Standard Java Bean
A "Java Bean" is a standard class that safely encapsulates its properties.
```java
public class User {
    // 1. Hide the state
    private String username;
    private int age;

    // 2. Expose controlled access
    public void setAge(int age) {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
        this.age = age;
    }

    public int getAge() {
        return this.age;
    }
}
```

## 🧊 3. Immutability (Highly Tested)
An **Immutable Object** is an object whose internal state remains constant after it has been entirely created. This is heavily tested in interviews because immutable objects are inherently **Thread-Safe** (you don't need `synchronized` blocks if the data can't change!).

**How to create an Immutable Class:**
1. Make the class `final` so it can't be extended (subclasses could try to mutate state).
2. Make all fields `private` and `final`.
3. Provide **NO** setter methods.
4. Set all values exclusively via the Constructor.

```java
public final class ImmutableConfiguration {
    private final String url;
    private final int port;

    public ImmutableConfiguration(String url, int port) {
        this.url = url;
        this.port = port;
    }

    // Only getters provided!
    public String getUrl() { return url; }
    public int getPort() { return port; }
}
```

## 🪤 4. The `protected` Trap
A common interview trick is asking about the exact definition of the `protected` keyword.

Many developers think `protected` means "Only subclasses can access this." **That is false in Java.** 
In Java, `protected` means: "Accessible to subclasses anywhere, **AND accessible to ANY class in the exact same package**."

If you truly want something to be visible *only* to a subclass in a different package, Java actually has no modifier for that. `protected` always grants package-wide access as a side effect.

## 🛑 5. Right vs Wrong: Public Fields

```java
// ❌ ERROR (Architectural): Exposing mutable fields directly
public class BankAccount {
    public double balance; // Anyone can do: account.balance = -999999;
}

// ✅ CORRECT: Encapsulate and validate
public class BankAccount {
    private double balance;

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        }
    }
}
```

## 🎯 Common Interview Questions

**Q1: What is the difference between `default` and `protected` access?**
`default` (package-private) restricts access strictly to classes within the exact same package. `protected` grants the exact same package-level access, but *additionally* allows subclasses in *different* packages to inherit and access the member.

**Q2: How do you make a class completely immutable?**
Declare the class as `final`, make all fields `private final`, do not provide any setter methods, initialize everything via the constructor, and if your class holds mutable objects (like an `ArrayList` or `Date`), return a *deep copy* (clone) in the getter rather than returning the original reference.

**Q3: Why is Encapsulation important for maintainability?**
It decouples the internal implementation from the external API. If a field `age` changes its internal type from `int` to a `Date` of birth, the external world doesn't need to know. You simply update the `getAge()` method to calculate the int on the fly, and no external code breaks.
