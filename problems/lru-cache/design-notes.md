# LRU Cache — Design Notes

> Brainstorming — thinking out loud

---


Let’s start by recalling exactly what we need.

An LRU cache has:
- A fixed capacity, and it should never exceed that capacity. 
- Each key maps to exactly one value.
- Every value exists only once in the cache.
- Recency order is preserved across all operations.
- get and put run in O(1).

`Those are our invariants — they must always hold.`


We will use the given pattern for recency order:
- Most recently used (MRU) items should be at the front.
- Least recently used (LRU) at the back.

Now, let’s think about the operations: 
- put(key, value) -> add or update value. Add/Move the element to the front.
- get(key) -> retrieve value. Move element to the front.


Two important questions to consider:
1. How do we know the key exists?

2. How do we maintain the recency order?


## 🧠 Idea 1: Simple Array

### Put Operation

Check if the key exists:
  - Scan the entire array, checking each element. 
  - If the index is -1, the key does not exist.
  - If we get a valid index, the key exists.

That scanning itself is O(n).

Once we know the key exists, we need to move it to the MRU position (front) and update the value.<br/>
Moving the element to the front involves shifting other elements — again **O(n)**.

<b>If the cache is full</b>, we first check if the key exists (O(n) scan), then we add the new key to the front and remove the element at the back (LRU). 

Every single operation here is O(n).

  

### Get Operation

It’s very similar.

To retrieve a value, we first check if the key exists (O(n) scan). <br/>
Then we move the element to the MRU position to maintain recency.<br/>
If the key does not exist, we scan the array anyway to confirm absence.


So now we are dealing with two different problems that we need to solve to achieve O(1) complexity:

1. Locating the key.
2. Moving the element to the correct position to maintain recency.

---

<br/>
Let’s tackle the problem of checking key existence efficiently.

## 🧠 Idea 2: Array + HashMap

`HashMap: key → index lookup`

With that, we reduce the existence check from O(n) to O(1).

That’s a win 🎉 

Now, to check if the key exists, we just look up the HashMap and get the array index -> O(1).


But let's not celebrate yet — we still have to tackle one more problem:
`the movement problem`. We still need to shift elements in the array to maintain recency, which is O(n).

> 🔍 [!IMPORTANT]<br>
>Using the hash map also introduces a  trade-off:<br>
> We must keep it perfectly in sync. <br>
> On every put, get, or eviction, the hash map must reflect the current state — <br/>    <b>Stale data is UNACCEPTABLE.</b>

---

<br>
Now, let’s focus on the movement problem.

## 🧠 Idea 3: A Quick Detour — Flipping MRU and LRU

At this point, I briefly considered flipping the order.

Instead of keeping MRU at the front and LRU at the back, what if I reversed it?

Append new or recently used elements at the end and evict from the front.

On paper, appending seems cheaper than inserting at the front.

But in practice, nothing fundamentally changes.

Even if we flip MRU and LRU, the fundamental cost of shifting elements in an array remains.<br>
Whether we insert at the front or append at the back, one side of the array still requires shifting.<br>
Accessing an element in the middle and moving it to the “recent” position still costs O(n).

The array remains the bottleneck.

> **This isn’t an ordering problem.<br> It’s a data structure problem.**


Arrays and stacks don’t help here; moving elements requires shifting.

Since arrays fail due to shifting, we need a structure that supports fast insertions and deletions.

```
What about a linked list?
```

## 🧠 Idea 4: Singly Linked List  + HashMap

A singly linked list seems promising — we can insert at the head and remove from the tail.

But WAIT!!!

Removing an element in the middle requires access to the previous node, which a singly linked list doesn’t provide.

We end up scanning again — O(n) — so the 🔄 problem persists.

We do have a doubly linked list which supports previous and next. Can that solve our problem?<br>
Let's give it a try.


## 🧠 Idea 5: Doubly Linked List + HashMap

We will re-iterate all the operations again with DLL + HashMap:

1. How do we know the key exists?
HashMap will work as a lookup for us → key = Node → O(1).

2. Moving the element to the correct position to maintain recency:<br>
Once we get the node from HashMap, we will perform the following operations:
    - Add the node to the head → O(1).
    - Remove the node from the middle, if the key exists:
      - Get node from HashMap
      - node.prev.next = node.next
      - node.next.prev = node.prev<br>

      Done. We removed the element and added it to the head → O(1). No scan.

---

Finally, a doubly linked list (DLL) solves this elegantly. With DLL + HashMap.

- HashMap gives O(1) access to the node for a given key.
- DLL allows instant removal and insertion at any position (MRU front, LRU back), since every node has both prev and next pointers.
- Eviction of the LRU node at the back is O(1).
- Maintaining recency order is O(1) for both put and get.


This combination satisfies all our invariants:

- Capacity is never exceeded.

- Each key has one value.

- Each value exists only once.

- Operations are O(1).



---


## Complexity & Learnings Summary

| Approach                          | get()      | put()      | What worked                           | What broke / Why it failed                          | Key learning |
|----------------------------------|------------|------------|----------------------------------------|-----------------------------------------------------|--------------|
| Array only                        | O(n)       | O(n)       | Simple, easy to reason                 | Full scan + shifting on every operation             | Arrays don’t model recency efficiently |
| Array + HashMap (index lookup)   | O(n)       | O(n)       | O(1) existence check                   | Element movement still requires shifting            | Lookup ≠ movement |
| MRU back / LRU front (array)     | O(n)       | O(n)       | Faster append                          | Removal from front still O(n)                        | Orientation doesn’t fix structure limits |
| Singly LL + HashMap              | O(n)       | O(n)       | O(1) lookup                            | Can’t remove arbitrary node without prev pointer    | Traversal kills performance |
| Doubly LL + HashMap              | O(1)       | O(1)       | O(1) lookup + O(1) movement            | Extra memory, pointer management                    | Constraints force composite structures |

