# Lists & Scroll Performance

This is arguably the most common technical interview topic for React Native developers. 

## The Web Approach: `.map()`
On the web, to render a list of 1,000 items, you simply map over an array inside a scrollable div.
```jsx
// ❌ DO NOT DO THIS ON MOBILE FOR LARGE LISTS
<ScrollView>
  {data.map(item => <Item key={item.id} data={item} />)}
</ScrollView>
```
If you do this in React Native, the app will render all 1,000 native Views instantly. It will consume massive amounts of memory (RAM) and inevitably crash the app with an Out-Of-Memory (OOM) error. `ScrollView` renders all its children at once, even the ones off-screen!

## The Mobile Solution: `FlatList`

To solve this, React Native provides the `<FlatList>` component. 

`FlatList` uses a technique called **Virtualization**. It only renders the items that are currently visible on the screen (plus a few extra as a buffer). As the user scrolls, it destroys the views that went off-screen and re-uses their memory for the new items appearing on the screen.

```jsx
import { FlatList, Text, View } from 'react-native';

const data = [{ id: '1', title: 'Item 1' }, { id: '2', title: 'Item 2' }];

export default function MyList() {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ padding: 20, borderBottomWidth: 1 }}>
          <Text>{item.title}</Text>
        </View>
      )}
    />
  );
}
```

> [!IMPORTANT]
> **The `keyExtractor` requirement**
> Unlike web `.map()`, where you pass `key={...}` directly to the component, `FlatList` requires a `keyExtractor` function. This allows the internal virtualization algorithm to uniquely identify and track items to maintain extremely high scrolling performance (60fps).

## `SectionList`
If you need a list with sticky headers (like a Contacts app where "A", "B", "C" stick to the top), use `<SectionList>`. It works exactly like `FlatList`, but accepts an array of section objects instead of a flat array.
