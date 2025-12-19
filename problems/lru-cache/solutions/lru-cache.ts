// LRUCache Invariants:
// 1. Key exists check
// 2. Key does not exist case
// 3. size should not exceed capacity
// 4. HashMap should be in sync — no stale data

class ListNode<K, V> {
  key: K;
  value: V;
  prev: ListNode<K, V> | null;
  next: ListNode<K, V> | null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache<K, V> {
  capacity: number;
  // Dummy sentinel nodes — keys/values are never read
  head: ListNode<K, V> = new ListNode<K,V>(null as unknown as K, null as unknown as V);
  tail: ListNode<K, V> = new ListNode<K,V>(null as unknown as K, null as unknown as V);
  lookup: Map<K, ListNode<K, V>> = new Map();

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error('Capacity must be positive');
    }
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private addToFront(node: ListNode<K, V>): void {
    node.prev = this.head;
    node.next = this.head.next;
    if(this.head.next) {
      this.head.next.prev = node;
    }
    this.head.next = node;
  }

  private removeNode(node: ListNode<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }


  private moveToFront(node: ListNode<K, V>): void {
    this.removeNode(node);
    this.addToFront(node);
  }

  private evictLRUIfCacheFull(): void {
    if (this.lookup.size === this.capacity) {
      const evictedNode: ListNode<K, V> = this.tail.prev!;
      this.removeNode(evictedNode);
      this.lookup.delete(evictedNode.key);
    }
  }

  public put(key: K, value: V): void {
    const node: ListNode<K, V> | undefined = this.lookup.get(key);
    if (node) {
      node.value = value;
      this.moveToFront(node);
    } else {
      this.evictLRUIfCacheFull();
      const newNode: ListNode<K, V> = new ListNode(key, value);
      this.addToFront(newNode);
      this.lookup.set(key, newNode);
    }
  }

  public get(key: K): V | null {
    const node: ListNode<K, V> | undefined = this.lookup.get(key);
    if (node) {
      this.moveToFront(node);
      return node.value;
    }
    return null;
  }


}