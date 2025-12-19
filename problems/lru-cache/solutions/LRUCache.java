import java.util.*;

// LRUCache Invariants:
// 1. Key exists check
// 2. Key does not exist case
// 3. size should not exceed capacity
// 4. HashMap should be in sync — no stale data

public class LRUCache<K, V> {

    private final int capacity;

    private static class Node<K, V> {

        private final K key;
        private V value;
        Node<K, V> prev;
        Node<K, V> next;

        public Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    Node<K, V> head = new Node<>(null, null);
    Node<K, V> tail = new Node<>(null, null);
    Map<K, Node<K, V>> lookup = new HashMap<>();

    public LRUCache(int capacity) {
        if (capacity <= 0) {
            throw new IllegalArgumentException("Capacity must be positive");
        }
        this.capacity = capacity;
        head.next = tail;
        tail.prev = head;
    }

    private void addToFront(Node<K, V> node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
        
    }

    private void removeNode(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

// check is cache size == capacity -> evict
    private void evictLRUIfCacheFull() {
      if (lookup.size() == this.capacity) {
          Node<K, V> evictedNode = tail.prev;
          removeNode(evictedNode);
          lookup.remove(evictedNode.key);
      }
    }

    private void moveToFront(Node<K, V> node) {
        removeNode(node);
        addToFront(node);
    }

    public void put(K key, V value) {
        Node<K, V> node = lookup.get(key);
        if (node != null) {
            // update the value
            node.value = value;
            moveToFront(node);
        } else {
            evictLRUIfCacheFull();
            Node<K, V> newNode = new Node<>(key, value);
            addToFront(newNode);
            lookup.put(key, newNode);
        }
    }

    public V get(K key) {
        Node<K, V> node = lookup.get(key);
        if (node != null) {
            moveToFront(node);
            return node.value;
        }
        return null;
    }

}
