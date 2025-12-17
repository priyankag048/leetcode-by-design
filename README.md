# LeetCode by Design: Stop Memorizing, Start Reasoning

Most of us who’ve spent time on LeetCode have gone through the usual journey:

Learn the 15–18 common patterns:
  - Sliding window
  - Two pointers
  - Heap
  - DP
  - Greedy


And honestly—huge thanks to the people who identified and explained those patterns. That effort made problem-solving accessible to thousands of engineers.

This repository is <b>not</b> trying to replace that work.

Instead, it takes a different route:

Rather than <i>telling you which pattern to apply</i>, <br/> this repo focuses on how to <b>infer the pattern</b> yourself.


## TL;DR
This repo teaches you to reason from constraints, invariants, and trade-offs — so patterns emerge naturally as consequences, not instructions.


## Why This Matters
Real-world systems don’t come with tags like “use sliding window.”<br/>
Learning to reason under constraints makes you a better engineer.


## What this repo is about

When we say “this is an LRU problem” or “this needs a sliding window”, that conclusion didn’t come from nowhere.
<br/>It came from:

- Constraints
- Invariants
- Access patterns
- Performance expectations
- Trade-offs between data structures


This repo treats each LeetCode problem like a `mini system design` exercise.

We start with:

- What does the system need to do?

- What must always be true? (invariants)

- Where will it break if we choose the wrong data structure?

- Why does a naïve solution fail?

- What forces us toward a particular design?

Only after that do patterns naturally emerge.



## How to read this repo

Each problem follows the same flow:

1. Problem in plain English

    If I can’t explain it to a 5-year-old, I probably don’t understand it well enough.

2. Requirements & constraints

    What the system must support. What it must never violate.

3. Thinking out loud (design notes)
    
    Brute force ideas. Why they fail. What improves. What still hurts.

4. Data structure decisions

    Not “use X”, but why X beats Y under these constraints.

5. Final design

    Clean, minimal, intention-revealing.

6. Code

    Mostly TypeScript and Java — because design should be readable, not verbose.


Patterns will show up.

They always do.

But they show up as consequences, not instructions.


### Visual Flow

`Problem → Constraints → Invariants → Trade-offs → Pattern Emerges → Code`

### Example Snippet

```bash
Example: LRU Cache
- Requirements: O(1) get/put
- Invariants: Cache size ≤ capacity
- Naive approach: Bruteforce → O(n)
- Why it fails: Too slow for constraints
- Design choice: HashMap + Doubly Linked List
```


## Who this repo is for

Anyone who wants to stop memorizing and start reasoning

If you’re looking for:

```
Apply sliding window here
```

this repo is probably not for you.

If you’re looking for:

```
Why sliding window is inevitable here
```

then you’re in the right place.


## Final note

This is not about solving LeetCode faster.

It’s about thinking better — and carrying that thinking beyond interviews and into real systems.

---


⭐ Star this repo if you believe reasoning beats memorization.