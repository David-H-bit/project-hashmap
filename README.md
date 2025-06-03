# HashMap (JavaScript)

This is a custom implementation of a HashMap in JavaScript. It supports string (or string-convertible) keys and any values. The map handles collisions using separate chaining (arrays at each bucket) and resizes automatically when the load factor is exceeded.

## Features:

- Store key-value pairs with set(key, value)
- Retrieve values using get(key)
- Check for key existence with has(key)
- Delete keys with remove(key)
- Get the number of stored keys with length()
- Clear all entries with clear()
- Get all keys with keys()
- Get all values with values()
- Get all [key, value] pairs with entries()
- Automatically doubles capacity when load factor is exceeded

## Usage example:

const map = new HashMap(0.75, 4);

map.set('apple', 'red');
map.set('banana', 'yellow');

console.log(map.get('apple')); // "red"
console.log(map.has('banana')); // true
console.log(map.length()); // 2

map.remove('banana');
console.log(map.has('banana')); // false

console.log(map.keys()); // ['apple']
console.log(map.values()); // ['red']
console.log(map.entries()); // [['apple', 'red']]

map.clear();
console.log(map.length()); // 0

## Resizing:

The map resizes (doubles capacity) automatically when the ratio of size to capacity reaches or exceeds the load factor:

this.size / this.capacity >= this.loadFactor

All entries are rehashed and redistributed when this happens.

## Implementation Details:

- Hashing:

Uses a polynomial rolling hash based on ASCII character codes.

All keys are converted to strings before hashing.

- Collision handling:

Buckets are arrays of [key, value] pairs.

Keys are checked directly in the appropriate bucket.

- Performance:

Amortized O(1) for set, get, and remove under normal conditions.

Resizing takes O(n), but occurs infrequently.

- Example: Resizing in Action

const map = new HashMap(0.75, 4);

map.set('a', 1);
map.set('b', 2);
map.set('c', 3);
map.set('d', 4); // Still under load factor
map.set('e', 5); // Triggers resize here

console.log(map.capacity); // 8