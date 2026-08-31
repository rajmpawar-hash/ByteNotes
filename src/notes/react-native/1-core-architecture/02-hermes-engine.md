# The Hermes Engine

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Hermes is an open-source JavaScript engine optimized specifically for React Native. Unlike traditional engines like V8 or JavaScriptCore (JSC) that compile JS at runtime (JIT), Hermes uses Ahead-Of-Time (AOT) compilation to precompile JS into bytecode during the build process. This drastically reduces the app's Time To Interactive (TTI), shrinks the APK/IPA bundle size, and significantly lowers memory usage on mobile devices."*

## The Problem with Traditional JS Engines

For years, React Native used Safari's **JavaScriptCore (JSC)** to run JavaScript on the device.

Standard engines like JSC and Chrome's V8 are designed for web browsers. They use **Just-In-Time (JIT) compilation**. 
When a web app loads, the engine takes the raw JavaScript text, parses it, compiles it, and executes it *all at runtime on the user's device*.

On a powerful desktop, JIT is incredibly fast. But on a low-end Android phone with limited RAM and CPU, parsing and compiling megabytes of JavaScript at runtime causes massive delays in the app's startup time (Time To Interactive).

## The Hermes Solution: AOT Compilation

Meta built the **Hermes Engine** from scratch to solve this mobile-specific problem.

Instead of waiting until the app is opened on the user's phone to compile the code, Hermes introduces **Ahead-Of-Time (AOT) compilation**. 

When you build your app for the App Store, the Hermes compiler translates your JavaScript into optimized **Bytecode** on your CI server/developer machine.

### The Benefits
When the user opens the app, the device doesn't have to parse or compile anything. It just instantly executes the precompiled Bytecode.

1. **Faster Startup Time (TTI):** The app opens almost instantly because the heavy lifting was done during the build step.
2. **Reduced Memory Footprint:** The device doesn't need to load a massive JS compiler into RAM.
3. **Smaller App Size:** Bytecode is significantly smaller than raw, uncompressed JavaScript files.

> [!NOTE]
> As of React Native 0.70, Hermes is the default engine for all new React Native applications.
