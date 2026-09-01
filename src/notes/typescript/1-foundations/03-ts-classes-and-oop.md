# 🏛️ TypeScript Classes & OOP

> [!TIP]
> **The 30-Second Interview Pitch**
> TypeScript supercharges JavaScript ES6 Classes by adding **Access Modifiers** (`public`, `private`, `protected`) to control visibility, and the `implements` keyword to enforce that a class adheres to a specific `Interface`. It also provides shorthand syntax for initializing class properties directly in the constructor.

## 1. Access Modifiers

By default, all members (properties and methods) in a JavaScript class are public. TypeScript allows you to explicitly control visibility using access modifiers.

- **`public` (Default):** Accessible from anywhere.
- **`private`:** Accessible **only** within the class that defines it.
- **`protected`:** Accessible within the class that defines it AND any child classes that inherit from it.

```typescript
class Employee {
    public name: string;
    private salary: number;
    protected department: string;

    constructor(name: string, salary: number, department: string) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }

    public getSalary(): number {
        return this.salary; // ✅ OK: Accessed inside the class
    }
}

const emp = new Employee("Raj", 50000, "IT");
console.log(emp.name);       // ✅ OK
// console.log(emp.salary);  // ❌ Error: Property 'salary' is private
// console.log(emp.department); // ❌ Error: Property 'department' is protected

class Manager extends Employee {
    public getDepartment() {
        return this.department; // ✅ OK: Accessed inside a child class
    }
}
```

> [!NOTE]
> TypeScript access modifiers are enforced at **compile-time**. When the code is compiled to JavaScript, `private` and `protected` are removed, meaning they do not provide true runtime security. (For true runtime privacy, use modern JS `#` private fields).

---

## 2. Parameter Properties (Shorthand)

TypeScript offers a brilliant shorthand for declaring and initializing class properties in one step inside the constructor.

### The Long Way:
```typescript
class User {
    private id: number;
    public name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
```

### The Shorthand Way (Using Access Modifiers in Constructor):
```typescript
class User {
    // Adding the modifier in the parameter list automatically creates the property!
    constructor(private id: number, public name: string) {}
}
```

---

## 3. `extends` vs `implements`

These two keywords serve entirely different purposes in Object-Oriented Programming.

### `extends` (Inheritance)
Used when a class inherits from another **Class**. The child class inherits the actual implementation (code) from the parent class.
```typescript
class Animal {
    move() { console.log("Moving..."); }
}

class Dog extends Animal {
    bark() { console.log("Woof!"); }
}

const dog = new Dog();
dog.move(); // Inherited implementation
```

### `implements` (Contracts/Interfaces)
Used when a class wants to guarantee that it matches the shape of an **Interface**. It does not inherit any code; it forces you to write the code yourself to fulfill the contract.
```typescript
interface Printable {
    print(): void;
}

// The class MUST implement the print() method, otherwise TS throws an error
class Report implements Printable {
    print() {
        console.log("Printing the report...");
    }
}
```

---

## 4. `readonly` and `static`

### `readonly`
Prevents a property from being changed after it is initialized in the constructor.
```typescript
class Car {
    readonly vin: string;
    constructor(vin: string) {
        this.vin = vin; // ✅ OK to assign here
    }
    
    changeVin() {
        // this.vin = "123"; // ❌ Error: Cannot assign to 'vin' because it is a read-only property
    }
}
```

### `static`
Belongs to the class itself, not to instances of the class.
```typescript
class MathUtils {
    static PI: number = 3.14159;
    
    static calculateCircumference(radius: number) {
        return 2 * this.PI * radius;
    }
}

// Called directly on the class, no 'new' required!
console.log(MathUtils.PI);
console.log(MathUtils.calculateCircumference(10));
```
