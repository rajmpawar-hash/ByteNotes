# 📦 1.5 Packages & Java 9 Modules (Encapsulation Architecture)
**★★ Medium**

> [!TIP]
> **The 30-Second Interview Pitch**
> "In Java, **packages** act as namespaces that mirror the physical directory structure of the code, preventing class name conflicts. However, historically, if a class was `public`, it was accessible to *any* application that had it on its classpath, leading to 'JAR Hell'. To fix this, Java 9 introduced the **Module System (JPMS)**. Modules allow us to strongly encapsulate entire packages, using a `module-info.java` file to strictly define which packages are exposed (`exports`) and which external modules are needed (`requires`), bringing true architectural boundaries to the JVM."

## 🌉 Node.js & C++ Translation
> [!NOTE]
> **Node.js Developers:** Java's `package` acts like a folder structure. Java's `import` is similar to `require()` or ES6 `import`. However, Java 9 Modules (`module-info.java`) act like your `package.json`—they define the high-level dependencies and exactly what your "library" exposes to the outside world.
> **C++ Developers:** Java's `package` system is the exact equivalent of C++ `namespace`. It prevents naming collisions (e.g., your `Util` class vs a library's `Util` class).

## 📁 1. Packages (The Namespace)
A package groups related classes together and strictly mirrors the operating system's directory structure.

1. **Declaration:** Must be the absolute first line of code in the `.java` file.
2. **Naming Convention:** Reverse domain name (e.g., `com.company.project.module`).

```java
// File lives in: src/com/bytenotes/math/Calculator.java
package com.bytenotes.math;

public class Calculator {
    // ...
}
```

## 📥 2. Imports
If you want to use a class from a different package, you must `import` it. Classes in the *same* package, or in the `java.lang` package (like `String`, `System`), are imported automatically.

```java
import java.util.List; // Imports only the List interface
import java.util.*;    // Imports EVERYTHING in java.util (Frowned upon in enterprise)

// Static Import: Allows you to use static methods without the class name
import static java.lang.Math.PI;
import static java.lang.Math.pow;

public class Circle {
    double area(double radius) {
        return PI * pow(radius, 2); // No need to write Math.PI
    }
}
```

## 🧱 3. The "JAR Hell" Problem (Pre-Java 9)
Before Java 9, we packaged our compiled classes into a `.jar` (Java ARchive) file.
- We would put all `.jar` files onto the **Classpath**.
- The JVM would flatten everything. If a class inside `LibraryA.jar` was `public`, *anyone* could use it, even if the authors of `LibraryA` intended it to be an internal utility!
- If `LibraryA.jar` and `LibraryB.jar` both contained a class named `com.utils.Helper`, the JVM would just blindly use whichever one it found first on the Classpath.

## 🛡️ 4. Java 9 Modules (JPMS)
To solve JAR Hell and secure the JDK itself, Java 9 introduced the **Java Platform Module System (JPMS)**. 
A Module is a group of closely related packages bundled with a `module-info.java` file at the root.

### The `module-info.java` File
This file dictates exactly what goes *in* and what comes *out* of the JAR.

```java
module com.bytenotes.core {
    // 1. WHAT WE NEED (Dependencies)
    requires java.sql;      // We need the SQL module to compile/run
    requires org.slf4j;     // We need the logging module
    
    // 2. WHAT WE EXPOSE (API)
    // Only classes inside this specific package are visible to the outside world.
    exports com.bytenotes.core.api; 
    
    // Classes in 'com.bytenotes.core.internal' remain hidden, EVEN IF they are 'public'!
    
    // 3. REFLECTION ACCESS (For frameworks like Spring/Hibernate)
    // Allows Spring to use reflection on our entities to inject data.
    opens com.bytenotes.core.entities; 
}
```

## 🛑 5. Right vs Wrong: Import Practices

```java
// ❌ ERROR: Wildcard imports pollute the namespace and can cause collisions.
import java.util.*;
import java.awt.*;
// If both packages have a 'List' class, the compiler will crash complaining about ambiguity.

// ✅ CORRECT: Explicitly define what you need.
import java.util.List;
import java.util.ArrayList;
```

## 🎯 Common Interview Questions

**Q1: If a class is marked `public`, can it be accessed from anywhere?**
Prior to Java 9, yes, as long as it was on the classpath. In Java 9+, if the class is inside a Module, it can only be accessed from the outside if its specific package is explicitly `exports`'d in the `module-info.java` file. If it's not exported, it is strongly encapsulated and hidden, even if it is `public`.

**Q2: What is the difference between `requires` and `exports` in a module?**
`requires` declares what *other* modules your module depends on to function. `exports` declares which of *your* internal packages are allowed to be seen and used by the outside world.

**Q3: What does the `opens` keyword do in Java modules?**
Frameworks like Spring and Hibernate rely heavily on **Reflection** to inspect classes and inject dependencies at runtime. By default, Java 9 Modules block deep reflection from outside modules. The `opens` keyword allows a package to be accessed via reflection without exposing it for standard compile-time usage.
