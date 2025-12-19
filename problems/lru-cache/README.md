# LRU Cache

## Problem statement (LeetCode)

**LeetCode:**  [146-lru-cache](https://leetcode.com/problems/lru-cache/description/)


The LRU problem is about designing a cache that:
- Stores a fixed number of items.
- Evicts the least recently accessed item when the cache reaches capacity.
- Supports two operations:
  - `get(key)`: Retrieve the value associated with a given key

    - If the key exists in the cache, return its value
    - If the key doesn't exist, return -1
    - When you access a key, it becomes the most recently used item


  - `put(key, value)`: Insert or update a key-value pair

    - If the key already exists, update its value
    - If the key doesn't exist, add the new key-value pair
    - When the cache reaches its capacity limit, remove the least recently used item before adding the new one
    - Both inserting and updating make the key the most recently used item


Both operations must run in O(1) average time complexity.

Example:

```
capacity: 3
cache: {}

put('a', 1) => cache: {a=1}
put('b', 2) => cache: {a=1, b=2}
get('a') returns 1 and makes key 'a' most recent
put('c', 3) => evicts key 'b' (least recent), cache: {a=1, c=3}
```


## Problem in plain English

This problem is really about eviction.

Imagine a toy box that can hold only 5 toys.

You keep putting toys in and taking them out to play.<br/>
The toy you played with most recently stays near the top.<br/>
The toys you haven’t touched for a long time slowly sink to the bottom.

Now the container is full, and you get a new toy.

`What do you do?`

you remove the one at the bottom (least recently used) to make space for the new one.

That’s all an LRU cache is doing:
- Keep recently used things close
- Remove forgotten things first

## Requirements

- Fixed capacity
- get(key) → return value or -1
- put(key, value) → insert or update
- Every access updates recency
- Eviction is deterministic (least recent first)
- Performance: O(1) for both operations


## Key invariants (must always hold)

These are non-negotiable.

If any of these break, the solution is incorrect — even if some test cases pass.

- Cache size ≤ capacity
- Each key maps to exactly one value
- Every value exists in exactly one position in the cache
- Recency order is preserved across all operations
- Most recent item is promoted on access
- Least recent item is evicted first
- get and put run in O(1)

These invariants will drive the design.


## Core design questions

Once the invariants are clear, tension appears immediately:

- How do we track recency efficiently?
- How do we promote an item without scanning everything?
- How do we evict the correct item in constant time?
- How do we do all of this without violating O(1)?

At this point, we explore ideas and see where they fail.

👉 **[Read the Design Notes](./design-notes.md)** for detailed brainstorming, failed attempts, and trade-offs.


## Final design (high level)

To satisfy all invariants simultaneously, we need:

- One structure that preserves order of usage
- One structure that provides constant-time lookup

This naturally leads to:

- A Doubly Linked List to maintain recency
- A HashMap to locate nodes in O(1)

The commonly known “LRU pattern” appears here — but only as a consequence of the constraints, not as a starting point.



## Implementation

- TypeScript: solution.ts
- Java: solution.java

The code is intentionally simple.<br/>
It mirrors the design.