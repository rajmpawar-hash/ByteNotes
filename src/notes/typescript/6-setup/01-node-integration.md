# Setup & Configuration (Node.js Integration)

A senior developer is expected to know how to set up a project from scratch, not just write code in a pre-configured template. 

Here is how to set up TypeScript in a Node.js environment.

## 1. Initializing a New Project

1. Initialize a basic Node project:
```bash
npm init -y
```

2. Install TypeScript and the Node types (as `devDependencies`):
```bash
npm install -D typescript @types/node
```

3. Generate the `tsconfig.json` file:
```bash
npx tsc --init
```

## 2. Understanding `tsconfig.json`

The `tsconfig.json` file tells the TypeScript compiler (`tsc`) how strictly it should check your code and how it should compile the final JavaScript output.

Here are the most critical settings for a Node.js backend:

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "es2022",       // Compiles TS down to modern JS (Node supports it!)
    "module": "commonjs",     // Use Node's standard require() system
    
    /* Modules */
    "rootDir": "./src",       // Where your raw .ts files live
    "outDir": "./dist",       // Where the compiled .js files will be dumped
    
    /* Strict Type-Checking Options */
    "strict": true,           // ENABLES ALL STRICT CHECKS! (Never turn this off)
    "noImplicitAny": true,    // Forces you to type variables instead of defaulting to 'any'
    
    /* Interoperability */
    "esModuleInterop": true,  // Allows you to use 'import' on legacy CommonJS packages
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]     // Only compile files in the src directory
}
```

## 3. Running TypeScript in Development

Node.js cannot execute `.ts` files natively (yet). 

During development, you don't want to manually run `npx tsc` to compile your code to `.js` every time you save a file. Instead, we use **`ts-node`** (or modern alternatives like `tsx`).

`ts-node` compiles and executes your TypeScript code in memory on the fly!

1. Install it:
```bash
npm install -D ts-node nodemon
```

2. Add a `dev` script to your `package.json`:
```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

> [!WARNING]
> **Production Gotcha**
> **NEVER use `ts-node` in production.** Compiling TypeScript on the fly consumes massive amounts of CPU and RAM. 
> In production, you must run your `build` script (`npx tsc`) on your CI/CD server, and then execute the raw compiled JavaScript files (`node dist/index.js`).
