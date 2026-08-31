# Mobile Platform Specifics

When building for mobile, you frequently need to execute different code depending on whether the user is on an iPhone or an Android device.

## 1. `Platform.OS`

React Native provides the `Platform` module to detect the current operating system at runtime.

```jsx
import { Platform, Text, View } from 'react-native';

export default function OSCheck() {
  return (
    <View>
      {Platform.OS === 'ios' ? (
        <Text>Hello iPhone User!</Text>
      ) : (
        <Text>Hello Android User!</Text>
      )}
    </View>
  );
}
```

You can also use `Platform.select()` to dynamically assign styles or components:

```jsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // Adds a 40px margin on iOS to avoid the notch, but 0px on Android
    marginTop: Platform.select({ ios: 40, android: 0 }),
  },
});
```

## 2. Platform-Specific File Extensions

If the differences between your iOS and Android implementations are massive (e.g., you are building a custom native date picker for each), using `if/else` blocks will clutter your file.

Instead, you can create two separate files:
- `DatePicker.ios.js`
- `DatePicker.android.js`

When you import the component in your main code:
```jsx
// React Native's bundler (Metro) automatically picks the correct file based on the OS!
import DatePicker from './DatePicker'; 
```

## 3. Storage (`AsyncStorage` vs `localStorage`)

On the web, we use `localStorage.setItem()` to persist data synchronously.

In React Native, there is no `localStorage`. The mobile equivalent is **`AsyncStorage`**.
As the name implies, it is completely **asynchronous** and returns Promises. It stores data on the physical device's encrypted disk storage.

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('@auth_token', token);
  } catch (e) {
    console.error("Failed to save token");
  }
};

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@auth_token');
    if (value !== null) {
      console.log("Token retrieved:", value);
    }
  } catch (e) {
    console.error("Failed to fetch token");
  }
};
```
