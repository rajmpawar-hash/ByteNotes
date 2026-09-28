# 📦 2.7 Modern Data Carriers (Records & Sealed Classes)
**★★ Medium**

> [!TIP]
> **The 30-Second Interview Pitch**
> "Modern Java has completely eliminated traditional POJO boilerplate. Java 14/16 introduced **Records** (`record`), which are immutable data carriers that automatically generate constructors, getters, `equals()`, `hashCode()`, and `toString()`. Java 15/17 introduced **Sealed Classes** (`sealed`), which allow a parent class to strictly define exactly which classes are permitted to extend it. Together, these features enable powerful, exhaustive **Pattern Matching** in `switch` expressions, bringing modern functional paradigms to Java."

## 🌉 Node.js & C++ Translation
> [!NOTE]
> **Node.js Developers:** In JavaScript, you can create a simple data object instantly: `const user = { name: "Alice", age: 30 }`. Before Java 16, doing this in Java required 40 lines of boilerplate code! Java Records finally give you a clean, one-line way to declare immutable data structures.
> **C++ Developers:** A Java Record is very similar to a C++ `struct`, but with one massive difference: Java Records are strictly **immutable**. Once created, their data cannot change.

## 📝 1. The Boilerplate Problem (Pre-Java 16)
Historically, if you wanted to create a simple object just to pass data around (a Data Transfer Object or DTO), you had to write a **POJO** (Plain Old Java Object).

To make a simple `User` object, you had to write all of this:
```java
public class User {
    private final String name;
    private final int age;

    public User(String name, int age) { this.name = name; this.age = age; }
    public String getName() { return name; }
    public int getAge() { return age; }
    
    // PLUS 20 more lines overriding equals(), hashCode(), and toString()!
}
```

## 🚀 2. Java 16 Records (The Solution)
A **Record** is a special type of class designed purely to hold immutable data. The compiler automatically generates the constructor, getters, `equals`, `hashCode`, and `toString` for you!

```java
// That entire 40-line POJO is now just this ONE line:
public record User(String name, int age) { }
```

### Accessing Data in a Record
Notice that Records do NOT use the traditional `getAge()` naming convention. The getter is just the name of the variable:
```java
User u = new User("Alice", 30);
System.out.println(u.name()); // Correct! (Not u.getName())
```

### Compact Constructors
You can still add validation logic to a Record using a **Compact Constructor** (you don't have to re-assign the variables, the compiler does it for you):
```java
public record User(String name, int age) {
    public User { // Compact Constructor! No arguments defined.
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
    }
}
```

## 🔒 3. Java 17 Sealed Classes
Before Java 17, if a class was `public`, *anyone* could extend it. If you made it `final`, *no one* could extend it. There was no middle ground.

**Sealed Classes** allow you to explicitly define a whitelist of classes that are permitted to extend your class.

```java
// This interface strictly permits ONLY Car and Truck to implement it.
public sealed interface Vehicle permits Car, Truck { }

// The Compiler forces permitted subclasses to choose their inheritance path:
public final class Car implements Vehicle { } // 1. Stops inheritance here
public non-sealed class Truck implements Vehicle { } // 2. Opens inheritance back up

// ❌ ERROR: Bike is not in the 'permits' list of Vehicle!
public final class Bike implements Vehicle { } 
```

> [!WARNING]
> **The Subclass Declaration Rule**
> Yes, this is a strict compile-time rule! If a class implements or extends a `sealed` type, the compiler **forces** you to explicitly declare that subclass as exactly one of three things:
> 1. `final`: The inheritance tree stops here. No one can extend it.
> 2. `sealed`: The subclass is also sealed, and must provide its own `permits` list to continue the controlled hierarchy.
> 3. `non-sealed`: You are deliberately breaking the seal. *Any* class in the world is now allowed to extend this subclass.

## 🧩 4. Pattern Matching (The Ultimate Combo)
Because Sealed Classes restrict the exact number of children, and Records provide predictable data, Java can now perform **Exhaustive Pattern Matching**.

```java
public String checkVehicle(Vehicle v) {
    // We don't need a "default" branch! 
    // The compiler knows Vehicle can ONLY ever be a Car or a Truck.
    return switch (v) {
        case Car c -> "This is a car!";
        case Truck t -> "This is a truck with capacity: " + t.capacity();
    };
}
```

## 🛑 5. Right vs Wrong: Mutating Records

```java
// ❌ ERROR: Trying to mutate a record
public record Point(int x, int y) { }

Point p = new Point(10, 20);
p.x = 15; // Compiler Error! Record fields are strictly 'final' and cannot be changed.

// ✅ CORRECT: If you need to mutate state, use a standard Class, not a Record.
```

## 🎯 Common Interview Questions

**Q1: Can a Record extend another class?**
No. Every Record implicitly extends `java.lang.Record`. Because Java does not support multiple class inheritance, a Record cannot extend any other class. However, a Record *can* implement interfaces!

**Q2: Are Java Records completely immutable?**
*Shallowly* immutable, yes. The fields inside the Record are `final`. However, if one of the fields is a mutable object (like an `ArrayList` or a `Date`), the contents of that List can still be modified! (e.g., `myRecord.myList().add("Hacked!");`).

**Q3: What is the purpose of a Sealed Class?**
To restrict the inheritance hierarchy. It allows the creator of an API to dictate exactly which subclasses are allowed to exist, making the domain model strictly controlled and allowing the compiler to perform exhaustive checks in `switch` statements.
