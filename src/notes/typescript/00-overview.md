# 📘 TypeScript — Master Navigation Hub

Welcome to the TypeScript Master Guide. TypeScript is a structural type system built on top of JavaScript that compiles down to plain JS.

This guide is heavily optimized for interviews, covering the foundational syntax before deep diving into "Type Gymnastics" (Generics, Utility Types, and Type Narrowing).

## 📂 Section Index

### 🧱 1. TypeScript Basics
| Section | Topics |
|:--------|:-------|
| [**01-primitives-and-types**](/typescript/1-basics/01-primitives-and-types) | Primitives, Arrays, Tuples, Enums, and Typing Functions. |

### ⚖️ 2. The Classic Comparisons (Interview Critical)
| Section | Topics |
|:--------|:-------|
| [**01-type-vs-interface**](/typescript/2-classic-comparisons/01-type-vs-interface) | The most asked TS question. Declaration merging, Object vs Union types. |
| [**02-any-vs-unknown**](/typescript/2-classic-comparisons/02-any-vs-unknown) | Why `any` destroys TS, and why `unknown` is the safer alternative. |

### 🔍 3. Type Narrowing & Safety
| Section | Topics |
|:--------|:-------|
| [**01-type-guards**](/typescript/3-type-narrowing/01-type-guards) | Handling Union types safely at runtime using `typeof`, `instanceof`, and custom type predicates (`is`). |
| [**02-type-assertions**](/typescript/3-type-narrowing/02-type-assertions) | Why `as` is dangerous, and when you are forced to use it (DOM elements, JSON). |

### 🧬 4. Generics (The Core of Reusability)
| Section | Topics |
|:--------|:-------|
| [**01-basic-generics**](/typescript/4-generics/01-basic-generics) | Generic functions, Generic Constraints (`extends`), and Default types. |

### 🤸 5. Utility Types (Type Gymnastics)
| Section | Topics |
|:--------|:-------|
| [**01-type-gymnastics**](/typescript/5-utility-types/01-type-gymnastics) | `Partial`, `Pick`, `Omit`, `Record`, and `ReturnType`. |
| [**02-mapped-types-and-keyof**](/typescript/5-utility-types/02-mapped-types-and-keyof) | Using `keyof` and Mapped Types to build custom utility types from scratch. |

### ⚙️ 6. Setup & Configuration (Node.js)
| Section | Topics |
|:--------|:-------|
| [**01-node-integration**](/typescript/6-setup/01-node-integration) | Adding TS to new vs legacy Node projects, `tsconfig.json` explanation, `ts-node`. |
