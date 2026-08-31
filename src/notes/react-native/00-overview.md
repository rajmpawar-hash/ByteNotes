# 📱 React Native — Master Navigation Hub

Welcome to the React Native section. Since you are already proficient in React, this guide completely skips the basics of components, props, hooks, and state. 

Instead, this section focuses entirely on the **differences** between Web and Mobile, the underlying React Native Architecture, and specific mobile performance bottlenecks frequently asked in interviews.

## 📂 Section Index

### 🏗️ 1. Core Architecture (Interview Critical)
| Section | Topics |
|:--------|:-------|
| [**01-the-bridge-vs-fabric**](/react-native/1-core-architecture/01-the-bridge-vs-fabric) | The Old Architecture (The Bridge), The New Architecture (JSI / Fabric), Asynchronous vs Synchronous communication. |
| [**02-hermes-engine**](/react-native/1-core-architecture/02-hermes-engine) | JavaScript Core (JSC) vs Hermes, Ahead-of-Time (AOT) compilation, memory efficiency. |

### 🎨 2. Components & Styling Differences
| Section | Topics |
|:--------|:-------|
| [**01-core-components**](/react-native/2-components-and-styling/01-core-components) | Mapping Web to Mobile (`div` -> `View`, `p` -> `Text`, `button` -> `Pressable`). |
| [**02-styling-and-flexbox**](/react-native/2-components-and-styling/02-styling-and-flexbox) | `StyleSheet.create`, Flexbox differences (default `column`), avoiding inline styles. |

### 🚀 3. Lists & Scroll Performance
| Section | Topics |
|:--------|:-------|
| [**01-lists-and-scrollview**](/react-native/3-lists-and-performance/01-lists-and-scrollview) | Why `.map()` is bad for mobile, `ScrollView` vs `FlatList`, Virtualization, `SectionList`. |

### 🌍 4. Mobile Ecosystem
| Section | Topics |
|:--------|:-------|
| [**01-expo-vs-cli**](/react-native/4-mobile-ecosystem/01-expo-vs-cli) | Managed Workflow (Expo) vs Bare Workflow (React Native CLI). |
| [**02-platform-specifics**](/react-native/4-mobile-ecosystem/02-platform-specifics) | Using `Platform.OS`, file extensions (`.ios.js`), AsyncStorage vs localStorage. |
