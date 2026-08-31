# Styling and Flexbox in React Native

Styling in React Native looks very similar to CSS, but it is fundamentally different under the hood. There are no stylesheets, no CSS classes, and **no cascading**.

All styles are written in JavaScript objects.

## 1. `StyleSheet.create`

While you *can* use inline styles, the standard practice is to use `StyleSheet.create`.

```jsx
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello Mobile!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the whole screen
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  }
});
```
*Note: `StyleSheet.create` is highly optimized. It sends the style object over the Bridge only once, whereas inline styles are recreated on every render.*

## 2. The Flexbox Differences (Interview Gotcha)

React Native uses the Yoga engine to implement Flexbox. However, there are three massive differences from Web CSS that trip up web developers:

> [!WARNING]
> **1. `flexDirection` defaults to `column`!**
> On the web, if you apply `display: flex`, the children align in a `row` (horizontally). 
> In React Native, everything defaults to `column` (vertically), because mobile phone screens are vertical!

> [!WARNING]
> **2. Everything is `display: flex` by default.**
> You don't need to write `display: 'flex'` on your components. Every `<View>` is already a flex container by default.

> [!WARNING]
> **3. No `px` or `rem` units.**
> React Native uses **Density-Independent Pixels**. You just provide raw numbers (e.g., `padding: 20`, not `padding: '20px'`). The engine automatically scales these units based on the screen density (retina vs non-retina displays).
