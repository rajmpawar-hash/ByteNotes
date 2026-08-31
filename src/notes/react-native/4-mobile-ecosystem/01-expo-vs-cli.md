# The Ecosystem: Expo vs React Native CLI

When starting a React Native project, you have to choose between two fundamentally different workflows.

## 1. Expo (The Managed Workflow)
Expo is a framework and toolchain built around React Native. Think of Expo as what Next.js is to React web. 

**Pros:**
- **No Native Code Needed:** You never have to touch Xcode or Android Studio. You write pure JavaScript.
- **Expo Go:** You can test your app instantly on your physical device by scanning a QR code using the Expo Go app.
- **Over-The-Air (OTA) Updates:** You can deploy Javascript updates directly to users' phones bypassing the App Store / Play Store review process!
- **Pre-configured libraries:** Push notifications, camera access, and maps are pre-configured out of the box.

**Cons:**
- Historically, if you needed a custom native module (like a highly specific Bluetooth SDK written in C++), you had to "Eject" from Expo. *(Note: Expo has largely solved this recently with Expo Prebuilds and Custom Dev Clients).*

## 2. React Native CLI (The Bare Workflow)
This is the raw, untamed version of React Native.

**Pros:**
- Complete control. You have direct access to the `ios/` and `android/` folders.
- You can write custom Swift/Kotlin code and easily bridge it to JavaScript.

**Cons:**
- High barrier to entry. You must configure and maintain Xcode and Android Studio environments.
- Upgrading React Native versions can be a painful, manual process of modifying native Gradle and Podfiles.

> [!TIP]
> **Interview Stance**
> The official React Native documentation now explicitly recommends starting all new projects with **Expo**. The stigma of "Expo is only for toys" is dead. Expo is the industry standard for modern React Native development.
