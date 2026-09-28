# 🧱 1.2 Variables & Primitives (Types, Wrappers & Pass-by-Value)
**★★★ Deep**

> [!TIP]
> **The 30-Second Interview Pitch**
> "Java features exactly 8 primitive data types that are stored directly in Stack memory for maximum performance. However, because Java is heavily object-oriented, it provides **Wrapper Classes** (like `Integer`) for each primitive, allowing them to be used in generic Collections. The compiler seamlessly translates between the two via **autoboxing** and **unboxing**. Crucially, Java is **strictly pass-by-value**—when passing an object to a method, a copy of the *reference* is passed, not the actual object."

## 🌉 Node.js & C++ Translation
> [!NOTE]
> **Node.js Developers:** JavaScript has `Number`, which is a 64-bit float under the hood. Java forces you to choose the exact memory footprint (`int` is 32-bit, `long` is 64-bit). Also, Java has no `undefined`; uninitialized instance variables default to `0` or `null`, while uninitialized local variables will cause a compile-time error.
> **C++ Developers:** Java **does not have pointers** (`*`) or pass-by-reference (`&`). You cannot pass a memory address by reference to modify what the original pointer points to. Java relies entirely on passing references by value. Also, Java does not have `unsigned` primitives (except for `char`).

## 🔢 1. The 8 Primitive Types
Primitives hold simple, raw values. They are not objects, have no methods, and are stored directly in **Stack memory**, making them incredibly fast.

| Category | Type | Size | Range / Info |
| :--- | :--- | :--- | :--- |
| **Integer** | `byte` | 8-bit | -128 to 127 (Useful for raw data streams) |
| | `short` | 16-bit | -32,768 to 32,767 |
| | `int` | 32-bit | ~ -2.1B to 2.1B (Default choice for numbers) |
| | `long` | 64-bit | Append `L` (e.g., `3000000000L`) |
| **Decimal** | `float` | 32-bit | Append `f` (e.g., `3.14f`) |
| | `double` | 64-bit | (Default choice for decimals) |
| **Text** | `char` | 16-bit | Unicode character (e.g., `'A'`). Uses single quotes. |
| **Logic** | `boolean` | 1-bit | `true` or `false` |

## 🎁 2. Wrapper Classes & Autoboxing
The Java Collections Framework (like `ArrayList`, `HashMap`) can **only store Objects**, not primitives. You cannot create an `ArrayList<int>`. 

To solve this, Java provides a **Wrapper Class** for every primitive (e.g., `int` -> `Integer`, `double` -> `Double`, `char` -> `Character`).

### Autoboxing & Unboxing
You don't have to manually convert them. The Java compiler handles this automatically behind the scenes:

```java
// Autoboxing: Primitive 'int' is automatically converted to Object 'Integer'
Integer myWrapper = 5; 

// Unboxing: Object 'Integer' is automatically converted back to primitive 'int'
int myPrimitive = myWrapper;
```

> [!WARNING]
> While autoboxing is convenient, it has a performance cost! If you autobox inside a massive `for` loop, you are creating millions of temporary Objects on the Heap instead of using fast Stack primitives.

## 🔄 3. The "Pass-by-Value" Trap (Highly Tested)
Java is **strictly pass-by-value**. There is absolutely no pass-by-reference in Java. 

When you pass arguments to a method:
- **Primitives:** The actual raw value (e.g., `5`) is copied.
- **Objects:** The *reference* (the memory address on the Stack) is copied and passed by value.

Because the reference is copied, you can mutate the object it points to in the Heap. However, you **cannot** change what the original reference points to.

```java
public class PassByValueDemo {
    public static void main(String[] args) {
        int a = 10;
        Car myCar = new Car("Toyota");

        modify(a, myCar);

        System.out.println(a); // 10 (Primitive copy was changed, original is safe)
        System.out.println(myCar.model); // "Honda" (Mutated the shared object in Heap)
    }

    static void modify(int num, Car carRef) {
        num = 20; // Only changes the local stack copy

        // carRef is a COPY of the original reference. 
        // It points to the same object in the Heap, so mutation works!
        carRef.model = "Honda"; 

        // Reassigning the reference does nothing to the original reference in main()!
        carRef = new Car("Ford"); 
    }
}
```

## 🛑 4. Right vs Wrong: Reassignment Pitfalls

```java
// ❌ ERROR: Expecting reassignment to affect the caller
public static void swap(Car c1, Car c2) {
    Car temp = c1;
    c1 = c2;
    c2 = temp;
}
// This does nothing! It only swapped the local reference copies on the stack.

// ✅ CORRECT: If you want to modify state, mutate the object properties
public static void swapData(Car c1, Car c2) {
    // Modifies the shared internal state of the objects
    String temp = c1.model;
    c1.model = c2.model;
    c2.model = temp;
}
```

## 🎯 Common Interview Questions

**Q1: Does Java use pass-by-value or pass-by-reference?**
Java uses strictly pass-by-value. For primitive types, the actual value is copied to the stack frame of the method. For object types, a copy of the reference (memory address) is passed by value. This allows you to modify the object's internal state, but you cannot change which object the original reference points to.

**Q2: What is the difference between an `int` and an `Integer`?**
`int` is a primitive type stored on the Stack, making it fast and memory-efficient. `Integer` is a Wrapper Class; it is a full Object stored on the Heap. `Integer` is required when using generic Collections (like `List<Integer>`) and provides utility methods like `Integer.parseInt()`.

**Q3: Can unboxing cause a NullPointerException?**
Yes! If a Wrapper class reference is `null`, and Java attempts to unbox it into a primitive (e.g., `int x = myNullInteger;`), it will throw a `NullPointerException` at runtime because primitives cannot hold `null`.
