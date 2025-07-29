// // Least Recent 

// class LRUCache {
//     #removeNode (node) {
//         if (!node) return;

//         if (node.prev) {
//             node.prev.next = node.next;
//         }
//         if (node.next) {
//             node.next.prev = node.prev;
//         }
//         if (node === this.head) {
//             this.head = node.next;
//         }
//         if (node === this.tail) {
//             this.tail = node.prev;
//         }
//     }


// get(key) {
//     if (!this.map.has(key)) return null;
//     const node = this.map.get(key);

//     this.#removeNode(node);
//     node.prev = null;
//     node.next = this.head;

//     if (this.head !== null) {
//         this.head.prev = node;
//     }

//     this.head = node;

//     return node.value;
// }

// put(key, value) {
//     // check if we have capacity
//     if (this.length === this.capacity) {
//         if (!this.map.has(key)) {
//             this.#removeNode(this.tail);
//             this.length-=1;
//         }
//     }

//     // Case : If the key is already in cache storage
//     if (this.map.has(key)) {
//         // Remove Older node
//         this.#removeNode(this.map.get(key));
//     }

//     const node = {
//         next = this.head,
//         prev: null,
//         key,
//         value,
//     };

//     this.map.set(key, node);

//     if (this.head !== null) {
//         this.head.prev = node;
//     }

//     this.head = node;

//     if (this.tail === null) {
//         this.tail = node;
//     }

//     this.length +=1;
// }
// debug() {
//     let current = this.head;
//     const arr = [];

//     while (current !== null) {
//         arr.push(current);
//         current = current.next;
//     }
// }



// }


// const cache = new LRUCache(3);
// cache.put(1,10);
// cache.put(2,20);
// cache.put(3,30);
// cache.put(4,40);

// console.log(cache.debug());



/**
 * Node {
 * next : Node || null
 * prev : Node || null
 * value : Actual value
 * }
 * 
 */

class LRUCache {
    constructor (capacity) {
        this.capacity = Number(capacity);
        this.length = 0;
        this.head = null;
        this.tail = null; //LRU node
        this.map = new Map();  // <Key> : <Node Address>
    }

    get(key) {

    }

    #removeNode(node) {
        if (!node) return;    // if node is not present we simply return it

        if (Node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
    }


    put(key,value) {
        // Check if the capacity is full
        if (this.length === this.capacity) {
            if (!this.map.has(key)) {
                this.#removeNode(this.tail);   // the tail will be removed
            }
        }
        // for key already present
        if (this.map.has(key)) {
            // remove the older node
            this.#removeNode(this.map.get(key));
        }

        const node = {    // update values
            next : this.head,
            prev : null,
            value,
            key,
        }

        this.map.set(key, node);
        this.head = node;

        if (this.tail === null) {
            this.tail = node;
        }
        this.length +=1;

    }

    debug() {
        let current = this.head;
        const arr = [];

        while (current !== null) {
            arr.push(current);
            current = current.next;
        }

        return arr.reduce(
            (acc, curr) => acc.concat('-->[ [${curr.key}] : [${cur.value}] ] -->'),
        );
    }
}

const cache = new LRUCache(3);
cache.put(1,10);
cache.put(2,20);
cache.put(3,30);
cache.put(4,40);

console.log(cache.debug());