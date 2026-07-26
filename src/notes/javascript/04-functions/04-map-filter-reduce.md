# Map, Filter, and Reduce

`map`, `filter`, and `reduce` are the three most famous built-in Higher-Order Functions in JavaScript. They are attached to the `Array.prototype`, meaning you can use them on any array.

## `map()`
The `map` method is used to transform an array. It iterates over every element, applies a callback function to it, and returns a **brand new array** with the transformed values.

```javascript
const arr = [5, 1, 3, 2, 6];

// Double every number
const double = arr.map(x => x * 2);
console.log(double); // [10, 2, 6, 4, 12]

// Get binary representation
const binary = arr.map(x => x.toString(2));
console.log(binary); // ["101", "1", "11", "10", "110"]
```

## `filter()`
The `filter` method is used to filter elements out of an array based on a condition. If the callback returns `true`, the element is kept. If `false`, it is removed. It returns a **brand new array**.

```javascript
const arr = [5, 1, 3, 2, 6];

// Keep only odd numbers
const odds = arr.filter(x => x % 2 !== 0);
console.log(odds); // [5, 1, 3]

// Keep numbers greater than 4
const greaterThanFour = arr.filter(x => x > 4);
console.log(greaterThanFour); // [5, 6]
```

## `reduce()`
The `reduce` method is a bit different. It is used when you want to take an array of many values and reduce it down to a **single value** (like a sum, finding the maximum number, etc.).

The callback takes two parameters:
1. `accumulator`: Accumulates the result (like a running total).
2. `currentValue`: The current element in the array.

You also provide an initial value for the accumulator as the second argument to `reduce`.

```javascript
const arr = [5, 1, 3, 2, 6];

// Sum all numbers in the array
const sum = arr.reduce(function(acc, curr) {
    return acc + curr;
}, 0); // 0 is the initial value of 'acc'

console.log(sum); // 17

// Find the maximum number in the array
const max = arr.reduce(function(acc, curr) {
    if (curr > acc) {
        acc = curr;
    }
    return acc;
}, 0);

console.log(max); // 6
```

## Chaining
Because `map` and `filter` return arrays, you can chain these methods together to perform complex data transformations in a very readable way!

```javascript
const users = [
    { firstName: "akshay", lastName: "saini", age: 26 },
    { firstName: "donald", lastName: "trump", age: 75 },
    { firstName: "elon", lastName: "musk", age: 50 },
    { firstName: "deepika", lastName: "padukone", age: 26 },
];

// Goal: Find the first names of all users who are less than 30 years old

const result = users
    .filter(x => x.age < 30) // First, filter the array
    .map(x => x.firstName);  // Then, extract just the first name

console.log(result); // ["akshay", "deepika"]
```
