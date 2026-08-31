# Core Components: Web vs Mobile

Because React Native renders true native UI (and not a WebView), you **cannot** use HTML tags like `<div>`, `<span>`, or `<img>`. 

React Native provides a set of Core Components that map directly to their native iOS and Android counterparts.

## The Component Mapping Guide

| Web (HTML) | React Native | iOS Native Widget | Android Native Widget | Use Case |
| :--- | :--- | :--- | :--- | :--- |
| `<div>` | `<View>` | `UIView` | `ViewGroup` | Layout containers, wrappers. |
| `<span>` / `<p>` | `<Text>` | `UITextView` | `TextView` | Rendering any text. |
| `<img>` | `<Image>` | `UIImageView` | `ImageView` | Displaying local/remote images. |
| `<input>` | `<TextInput>` | `UITextField` | `EditText` | Capturing user text input. |
| `<button>` | `<Pressable>` | `UIButton` | `Button` | Handling clicks/touches. |

## 🚨 Crucial Gotchas for Web Developers

### 1. ALL text MUST be inside a `<Text>` component
In React Web, you can throw text anywhere:
```jsx
// ✅ Valid in Web
<div>Hello World</div>
```
In React Native, this will cause a fatal crash. Text MUST be wrapped in a `<Text>` component.
```jsx
// ✅ Valid in React Native
<View><Text>Hello World</Text></View>
```

### 2. `Pressable` vs `TouchableOpacity`
Historically, React Native developers used `<TouchableOpacity>` to make things clickable. It automatically faded the component's opacity when pressed.
However, modern React Native relies on **`<Pressable>`**. `Pressable` provides a much richer API, giving you access to `onPressIn`, `onPressOut`, `onLongPress`, and allowing you to explicitly style the "pressed" state.

```jsx
import { Pressable, Text } from 'react-native';

<Pressable 
  onPress={() => console.log('Tapped!')}
  style={({ pressed }) => [
    { backgroundColor: pressed ? 'gray' : 'blue' }
  ]}
>
  <Text>Submit</Text>
</Pressable>
```
