# 🚀 The Deep-Dive Java Revision Cheat Sheet

This document serves as a high-speed revision guide for all Java concepts. Use it to quickly refresh your memory before an interview. It is strictly organized by atomic micro-concepts.

---

*(This cheat sheet will be incrementally populated as we generate the deep-dive notes.)*

## ⚙️ 1. Foundations & Execution Environment

### 1.1 The Execution Engine
Java is compiled to **bytecode** (platform-independent), which is then interpreted and natively compiled by the **JVM**.
- **JDK:** Contains JRE + Dev Tools (`javac`).
- **JRE:** Contains JVM + Core Libraries.
- **JVM:** The actual engine. Uses a **ClassLoader** to load `.class` files, an **Interpreter** for fast startup, and a **JIT Compiler** to natively compile "hot" code for peak performance.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Platform Independence** | Bytecode is universal. The JVM itself is OS-specific and translates bytecode to native OS code. |
| **ClassLoader Delegation** | Application ClassLoader delegates to Extension, which delegates to Bootstrap ClassLoader. |
| **Java 11+ Scripting** | `java File.java` runs single-file scripts in memory without generating a `.class` file on disk. |

> *Related Notes: [1.1 The Execution Engine (JVM Internals & Bytecode)](./1-foundations/01-execution-engine.md)*

### 1.2 Variables, Primitives & Pass-by-Value
Java has 8 primitive types stored on the Stack. **Wrapper classes** (like `Integer`) live on the Heap and are required for Collections. **Autoboxing/Unboxing** translates between them automatically. Java is strictly **pass-by-value**.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Pass-by-Value Trap** | Passing an object passes a *copy* of the reference. Modifying properties affects the original; reassigning the reference does not. |
| **Autoboxing Performance** | Autoboxing inside tight loops creates thousands of temporary objects on the Heap, triggering GC pauses. |
| **Unboxing NPE** | Unboxing a `null` Wrapper class (e.g., `int x = myNullInteger;`) throws a `NullPointerException`. |

> *Related Notes: [1.2 Variables & Primitives (Types, Wrappers & Pass-by-Value)](./1-foundations/02-variables-primitives.md)*

### 1.3 Memory Management Basics
Java divides memory primarily into the **Stack** and the **Heap**.
- **Stack:** Thread-local, LIFO. Stores method frames, local primitives, and references. Fast, automatic allocation/deallocation.
- **Heap:** Globally shared. Stores Objects and their instance variables. Managed by the Garbage Collector.
- **Metaspace:** Stores class metadata and static variables.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Instance Primitives** | An `int` declared inside a method lives on the Stack. An `int` declared as a class field lives on the Heap. |
| **StackOverflowError** | Caused by infinite recursion filling up the Stack frames. |
| **OutOfMemoryError** | Caused by the Heap filling up with objects the GC cannot delete (e.g., Memory Leaks from static Lists/Maps). |

> *Related Notes: [1.3 Memory Management Basics (Stack vs Heap)](./1-foundations/03-memory-management.md)*

### 1.4 Control Flow & Operators
Java strictly requires `boolean` evaluations (no truthy/falsy). 
- **Modern Switch (Java 14+):** Uses `->` to prevent fall-through and can return values. Uses `yield` to return values from multi-line blocks.
- **Labeled Breaks:** Allows breaking out of specific outer loops (`break outerLabel;`).
- **Short-circuiting:** `&&` and `||` stop evaluating early. `&` and `|` always evaluate both sides.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **No Truthy/Falsy** | `if(1)` or `if(obj)` causes a compile-time error. Must be `if(x == 1)` or `if(obj != null)`. |
| **`yield` Keyword** | Used exclusively in Switch Expressions to return a value from a block `{}`. |
| **String in Switch** | Supported since Java 7. Uses `hashCode()` under the hood. |

> *Related Notes: [1.4 Control Flow & Operators (Modern Switch & Loops)](./1-foundations/04-control-flow-operators.md)*

### 1.5 Packages & Modules (JPMS)
Java uses **Packages** for namespaces (mirroring the OS directory structure). Java 9 introduced **Modules** (`module-info.java`) to strongly encapsulate packages at the JAR level.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **`public` isn't always public** | In Java 9+, a `public` class inside a module is only accessible externally if its package is `exports`'d. |
| **`requires` vs `exports`** | `requires` = What my module needs. `exports` = What my module lets others see. |
| **`opens` for Reflection** | Spring/Hibernate need `opens` to use reflection on your module's classes at runtime. |
| **Static Imports** | `import static java.lang.Math.PI;` lets you use `PI` without the `Math.` prefix. |

> *Related Notes: [1.5 Packages & Java 9 Modules](./1-foundations/05-packages-and-modules.md)*

## 🧬 2. Object-Oriented Programming (OOP)

### 2.1 Classes, Objects & Constructors
- **Constructors:** Have no return type and match the class name. If you write one, the compiler removes the default no-args constructor.
- **`this` Keyword:** Refers to the current instance. Used for shadowing resolution and constructor chaining (`this()`).
- **Initialization Order:** Static Blocks (run once on load) -> Instance Blocks (run on `new`) -> Constructor.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Initialization Blocks** | `static {}` runs exactly once per class load. `{}` runs before the constructor on every `new` call. |
| **`this()` Chaining** | Must be the absolute first line in a constructor. Mutually exclusive with `super()`. |
| **Constructor Typos** | Adding `void` to a constructor accidentally turns it into a standard method. |
| **Private/Default Access** | Private constructor prevents instantiation (used for Singletons). No modifier makes it package-private. |
| **Destructors** | Java has no destructors. Memory is handled by the Garbage Collector. |

> *Related Notes: [2.1 Classes, Objects & Constructors](./2-oop/01-classes-objects-constructors.md)*

### 2.2 Encapsulation & Access Modifiers
Hiding internal state and exposing it via controlled methods.
- **`private`**: Same class only.
- **`default`**: Same package only.
- **`protected`**: Same package + Subclasses in other packages.
- **`public`**: Global access.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Immutability Rules** | `final` class, `private final` fields, no setters, deep copy on mutable objects. |
| **Top-Level Class Rule** | A top-level `.java` class can ONLY be `public` or `default`. It cannot be `private` or `protected`. |
| **Thread Safety** | Immutable objects are inherently thread-safe because their state cannot change. |
| **The `protected` Trap** | `protected` is *wider* than `default`. It includes everything `default` does, plus subclasses. |

> *Related Notes: [2.2 Encapsulation & Access Modifiers](./2-oop/02-encapsulation-access-modifiers.md)*

### 2.3 Inheritance Deep Dive
Establishes an **IS-A** relationship via `extends`. Java enforces **Single Inheritance** for classes.
- **`super`**: Used to access parent methods/fields, or chain to the parent constructor (`super()`).
- **`Object` Class**: The root of all classes. Provides `equals()`, `hashCode()`, and `toString()`.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Hidden `super()`** | The compiler automatically inserts a no-args `super();` on the first line of any constructor unless you explicitly call `super(args)` or `this()`. |
| **Method Hiding** | Static methods cannot be overridden, they are *hidden*. Execution depends on the compile-time reference type. |
| **Composition (HAS-A)** | Favor Composition over Inheritance. Do not use `extends` just to reuse code if the "IS-A" logic doesn't make sense. |

> *Related Notes: [2.3 Inheritance Deep Dive](./2-oop/03-inheritance.md)*

### 2.4 Polymorphism & Method Dispatch
- **Overloading (Compile-Time):** Same name, *different parameters*. Cannot overload by only changing return type.
- **Overriding (Run-Time):** Child replaces parent's method. Same signature. Always use `@Override`.
- **Dynamic Dispatch:** `Parent p = new Child();` The call is resolved at *Run-Time*. The compiler checks `Parent` for method existence, but the JVM dynamically dispatches to `Child`'s overridden implementation on the heap.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Covariant Returns** | An overridden method can return a *subclass* of the original return type (e.g., returning `Dog` instead of `Animal`). |
| **Exception Rule** | An overriding method cannot throw *new* or *broader* Checked Exceptions than the parent method. |
| **Overriding statics** | You cannot override `static` or `private` methods. Statics are hidden, privates are invisible. |

> *Related Notes: [2.4 Polymorphism & Method Dispatch](./2-oop/04-polymorphism.md)*

### 2.5 Abstract Classes vs Interfaces
- **Abstract Class:** Establishes strong "IS-A". Can hold **instance state** and have constructors. Single inheritance only.
- **Interface:** Establishes a "CAN-DO" contract. Cannot hold state (only constants). Supports multiple inheritance.
- **Java 8 `default` Methods:** Allows concrete methods in interfaces to prevent breaking existing implementations.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Interface Diamond Problem** | If two interfaces have the same `default` method, the implementing class *must* override it to resolve the conflict. |
| **Implicit Modifiers** | Interface variables are strictly `public static final`. Methods are strictly `public abstract` (unless `default`/`static`). |
| **Why Abstract Classes?** | Even with Java 8 interfaces, Abstract Classes are the only way to share mutable instance state. |

> *Related Notes: [2.5 Abstract Classes vs Interfaces (Java 8+)](./2-oop/05-abstract-classes-interfaces.md)*

### 2.6 Advanced Class Types & Enums
- **Static Nested Class:** Like a regular class, just grouped inside another. No access to outer instance fields.
- **Inner Class (Non-Static):** Bound to an outer instance. Has access to outer's `private` fields. Can cause memory leaks.
- **Anonymous Class:** A one-time, inline implementation of an interface or class.
- **Enums:** Full classes in Java. Can have fields, methods, and constructors.

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Enum Instantiation** | You cannot use `new` on an Enum. The JVM creates them silently by calling the private constructor (e.g., `public static final CoffeeSize SMALL = new CoffeeSize(250);`). |
| **Inner Class `new` Syntax** | Requires outer object: `Outer.Inner obj = outerObj.new Inner();` |
| **Memory Leak Trap** | Passing around a Non-Static Inner Class object secretly keeps the massive Outer Class object alive in memory. |

> *Related Notes: [2.6 Advanced Class Types & Enums](./2-oop/06-advanced-class-types.md)*

### 2.7 Modern Data Carriers
- **Records (Java 16):** Replaces DTO boilerplate. Automatically generates constructor, `equals`, `hashCode`, `toString`, and getters (e.g., `obj.name()`). Inherently `final` and shallowly immutable.
- **Compact Constructors:** Used in Records purely for validation, without needing to re-assign fields.
- **Sealed Classes (Java 17):** Uses `sealed` and `permits` to whitelist exactly which classes are allowed to extend/implement it. 

| Micro-Concepts & Edge Cases | Detail |
| :--- | :--- |
| **Record Inheritance** | Records cannot `extends` other classes (they already extend `java.lang.Record`). They can `implements` interfaces. |
| **Shallow Immutability** | If a Record holds an `ArrayList`, the reference to the list is `final`, but the contents of the list can still be mutated! |
| **Exhaustive Switch** | If you `switch` on a Sealed Class, you do not need a `default` case if you cover all permitted subclasses. |

> *Related Notes: [2.7 Modern Data Carriers (Records & Sealed Classes)](./2-oop/07-modern-data-carriers.md)*
