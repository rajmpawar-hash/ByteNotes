# Props and Config Driven UI

If components are functions, then **Props** (short for properties) are the arguments we pass to those functions. They are the primary way data flows through a React application.

## Understanding Props

Props allow you to pass data from a parent component down to a child component. This makes components dynamic and reusable.

### Passing and Receiving Props

You pass props to a component much like you pass attributes to an HTML tag.

```jsx
// 1. Passing props from the Parent
function App() {
  return (
    <div className="app">
      {/* Passing a string prop 'name' and a number prop 'age' */}
      <UserCard name="Alice" age={25} />
      <UserCard name="Bob" age={30} />
    </div>
  );
}

// 2. Receiving props in the Child
function UserCard(props) {
  return (
    <div className="card">
      <h2>Name: {props.name}</h2>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

### Destructuring Props

Instead of writing `props.name` every time, it is a very common and preferred pattern in React to **destructure** the props object directly in the function signature.

```jsx
// Destructuring props directly
function UserCard({ name, age }) {
  return (
    <div className="card">
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}
```

### Props with TypeScript

When using TypeScript, you must define the shape of your props using an `interface` or `type`. This provides excellent autocomplete and catches errors at compile time if you forget to pass a required prop.

```tsx
import React from 'react';

// 1. Define the Props Interface
interface UserCardProps {
  name: string;
  age: number;
  isActive?: boolean; // Optional prop
}

// 2. Apply the interface to the component
const UserCard: React.FC<UserCardProps> = ({ name, age, isActive = true }) => {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

export default UserCard;
```

## Rules of Props

1.  **Read-Only (Immutable):** A component must **never** modify its own props. Props are strictly for reading data coming from above. If a component needs to change data, it should use **State** (`useState`) instead.
2.  **Top-Down Data Flow:** Data always flows downwards, from parent to child. A child cannot directly pass props back up to a parent (though a parent can pass down a *function* via props for the child to call).

## Config Driven UI

A highly common pattern in modern web development (often asked about in system design or machine coding interviews) is **Config Driven UI**.

Instead of hardcoding every UI element, the UI is driven by a configuration object (often fetched from an API). The frontend simply acts as a renderer that loops over the configuration data and mounts the appropriate components.

### Example: Config Driven Restaurant List

Imagine building a food delivery app. The list of restaurants comes from a backend API. We can build our UI to iterate over this config array.

```jsx
// The "Config" (usually fetched from an API)
const restaurantListConfig = [
  { id: 1, name: "KFC", rating: "4.2", cuisines: ["Burgers", "Fast Food"] },
  { id: 2, name: "Dominos", rating: "4.5", cuisines: ["Pizza", "Italian"] },
  { id: 3, name: "Subway", rating: "3.9", cuisines: ["Healthy", "Salads"] },
];

// Reusable Component
const RestaurantCard = ({ name, rating, cuisines }) => {
  return (
    <div className="restaurant-card">
      <h3>{name}</h3>
      <h4>Rating: {rating} ⭐</h4>
      <p>{cuisines.join(", ")}</p>
    </div>
  );
};

// Parent rendering the Config Driven UI
const App = () => {
  return (
    <div className="restaurant-list">
      {/* Loop over the config array and map it to components */}
      {restaurantListConfig.map((restaurant) => (
        <RestaurantCard 
          key={restaurant.id} 
          name={restaurant.name} 
          rating={restaurant.rating} 
          cuisines={restaurant.cuisines} 
        />
      ))}
    </div>
  );
};
```

### Why use Config Driven UI?
*   **Dynamic:** The UI updates automatically when the backend changes the data (e.g., adding a new offer banner, removing a restaurant) without requiring a frontend deployment.
*   **Scalable:** You write the `RestaurantCard` component once, and it can render 10 or 10,000 restaurants based on the config.

## Summary

Props are the inputs to React components, allowing data to flow from parents to children. They are immutable and essential for component reusability. When combined with data structures like arrays, props enable powerful patterns like Config Driven UI, allowing the frontend to dynamically render components based on backend configurations.
