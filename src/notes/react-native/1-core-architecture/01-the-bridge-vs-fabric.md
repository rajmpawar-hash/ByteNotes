# The Bridge vs Fabric (The New Architecture)

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Historically, React Native used 'The Bridge', an asynchronous queue that serialized all communication between JavaScript and Native code into JSON strings. This created massive performance bottlenecks during rapid UI updates (like scrolling). The New Architecture introduces JSI (JavaScript Interface) and Fabric, allowing JavaScript to hold direct memory references to C++ native objects. This enables **synchronous** communication, bypassing the JSON serialization bottleneck entirely, and resulting in native-level performance."*

To pass any senior React Native interview, you MUST understand how the underlying architecture works.

## 🌉 The Old Architecture: The Bridge

React Native consists of two realms:
1. **The JavaScript Realm:** Where your React code runs.
2. **The Native Realm:** The actual iOS (Objective-C/Swift) or Android (Java/Kotlin) UI.

Historically, these two realms were entirely separate. They communicated by passing messages across **The Bridge**. 

Whenever JS wanted to render a `<View>`, it had to serialize that instruction into a JSON string, push it onto an asynchronous queue, send it across the Bridge, and the Native side would parse the JSON and render the UI.

### The Bottleneck
Because the Bridge is asynchronous and relies on JSON serialization/deserialization, it becomes a massive bottleneck during high-frequency events (like animations, complex gestures, or rapid scrolling). 
If you send too many messages over the bridge at once, the queue backs up, the main thread blocks, and the app stutters.

## 🚀 The New Architecture: JSI and Fabric

To solve the Bridge bottleneck, Meta (Facebook) completely rewrote the core of React Native, rolling out the "New Architecture".

### 1. JSI (JavaScript Interface)
The New Architecture eliminates the JSON Bridge entirely. Instead, it uses **JSI**. 
JSI allows the JavaScript engine to hold **direct memory references** to C++ host objects. 
Instead of sending a JSON string saying *"Hey native, please update this view"*, JavaScript can now directly invoke native methods synchronously, just like calling a normal JS function!

### 2. Fabric (The New Renderer)
Fabric is the new rendering system built on top of JSI. 
- **Synchronous Layouts:** Because JS can talk directly to native C++, Fabric can measure and calculate layouts synchronously. This eliminates the "visual jumping" that used to occur when rendering complex UIs asynchronously over the Bridge.
- **Concurrent React:** Fabric was specifically designed to support React 18's Concurrent Features (`useTransition`), allowing React to interrupt rendering on mobile just like it does on the web.

> [!IMPORTANT]
> **Interview Gotcha**
> If asked *"Is React Native truly native?"*, the answer is **Yes**. Unlike Cordova or Ionic, which render web HTML inside a hidden browser (WebView), React Native invokes the *actual* OEM native UI widgets (e.g., `UIView` on iOS, `ViewGroup` on Android). It simply uses JavaScript as the orchestrator to tell those native widgets what to do.
