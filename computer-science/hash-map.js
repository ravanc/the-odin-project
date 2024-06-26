const LinkedListNode = function (key, value) {
  return {
    key: key,
    value: value ?? null,
    nextNode: null,
  };
};

const LinkedList = function () {
  return {
    append(key, value) {
      if (this.head == undefined) {
        this.head = LinkedListNode(key, value);
      } else {
        let currentNode = this.head;
        while (currentNode.nextNode != null) {
          currentNode = currentNode.nextNode;
        }
        const newNode = LinkedListNode(key, value);
        currentNode.nextNode = newNode;
      }
    },

    get size() {
      let count = 0;
      if (this.head == undefined) return 0;
      let currentNode = this.head;
      while (currentNode != null) {
        count++;
        currentNode = currentNode.nextNode;
      }
      return count;
    },

    at(index) {
      let currentNode = this.head;
      for (let i = 0; i < index; i++) {
        if (currentNode == null) {
          return "No node found";
        }
        currentNode = currentNode.nextNode;
      }
      return currentNode;
    },

    head: undefined,

    get toString() {
      if (this.head == undefined) return "null";
      let output = "";
      let currentNode = this.head;
      while (currentNode != null) {
        output += `( ${currentNode.key} : ${currentNode.value} ) -> `;
        currentNode = currentNode.nextNode;
      }
      output += "null";
      return output;
    },

    find(key) {
      let index = 0;
      let currentNode = this.head;
      while (currentNode != null) {
        if (currentNode.key == key) {
          return index;
        } else {
          index++;
          currentNode = currentNode.nextNode;
        }
      }
      return null;
    },

    pop() {
      if (this.head == undefined) return;
      if (this.head.nextNode == null) {
        this.head = undefined;
        return;
      }
      let currentNode = this.head.nextNode;
      let previousNode = this.head;
      while (currentNode.nextNode != null) {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      previousNode.nextNode = null;
    },

    contains(key) {
      if (this.head == undefined) return false;
      let currentNode = this.head;
      while (currentNode != null) {
        if (currentNode.key == key) {
          return true;
        } else {
          currentNode = currentNode.nextNode;
        }
      }
      return false;
    },

    insertAt(value, index) {
      let currentNode = this.head;
      let previousNode;
      for (let i = 0; i < index; i++) {
        if (currentNode == null) {
          return "Index does not exist";
        }
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      const newNode = LinkedListNode(value);
      previousNode.nextNode = newNode;
      newNode.nextNode = currentNode;
    },

    removeAt(index) {
      if (index == 0) {
        this.head = undefined;
        return;
      }
      let currentNode = this.head;
      let previousNode;
      for (let i = 0; i < index; i++) {
        if (currentNode == null) {
          return "Index does not exist";
        }
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      previousNode.nextNode = currentNode.nextNode;
    },
  };
};

// Limit array access
// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
// }

const HashMap = function () {
  let capacity = 16;
  let buckets = new Array(capacity);
  const loadFactor = 0.75;

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= capacity;
    }
    return hashCode;
  }

  return {
    expandBuckets() {
      capacity *= 2;
      const tempBucket = new Array(capacity);
      const entries = this.entries();
      for (let i = 0; i < entries.length; i++) {
        const hashCode = hash(entries[i][0]);
        if (tempBucket[hashCode] === undefined) {
          tempBucket[hashCode] = LinkedList();
        }
        tempBucket[hashCode].append(entries[i][0], entries[i][1]);
      }
      console.log("\n\nexpanding bucket\n\n");
      buckets = tempBucket;
      console.log(buckets);
    },

    set(key, value) {
      const hashCode = hash(key);
      if (buckets[hashCode] === undefined) {
        buckets[hashCode] = LinkedList();
      }
      if (buckets[hashCode].contains(key)) {
        const keyIndex = buckets[hashCode].find(key);
        buckets[hashCode].removeAt(keyIndex);
      }
      buckets[hashCode].append(key, value);
      console.log(
        `key: ${key}\nhashCode: ${hashCode}\nlinkedlist: ${buckets[hashCode].toString}`
      );
      if (this.entries().length > capacity * loadFactor) {
        this.expandBuckets();
      }
    },

    get(key) {
      const hashCode = hash(key);
      const keyIndex = buckets[hashCode].find(key);
      return keyIndex !== null ? buckets[hashCode].at(keyIndex).value : null;
    },

    has(key) {
      const hashCode = hash(key);
      return buckets[hashCode].contains(key);
    },

    remove(key) {
      const hashCode = hash(key);
      if (!buckets[hashCode].contains(key)) {
        return false;
      } else {
        const keyIndex = buckets[hashCode].find(key);
        buckets[hashCode].removeAt(keyIndex);
        return true;
      }
    },

    length() {
      let count = 0;
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] !== undefined) {
          count += buckets[i].size;
        }
      }
      return count;
    },

    clear() {
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] !== undefined) {
          while (buckets[i].head !== undefined) {
            buckets[i].pop();
          }
        }
      }
    },

    keys() {
      let keyList = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] !== undefined) {
          let currentNode = buckets[i].head;
          while (currentNode !== null) {
            keyList.push(currentNode.key);
            currentNode = currentNode.nextNode;
          }
        }
      }
      return keyList;
    },

    values() {
      let valuesList = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] !== undefined) {
          let currentNode = buckets[i].head;
          while (currentNode !== null) {
            valuesList.push(currentNode.value);
            currentNode = currentNode.nextNode;
          }
        }
      }
      return valuesList;
    },

    entries() {
      let entriesList = [];
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] !== undefined) {
          let currentNode = buckets[i].head;
          while (currentNode !== null) {
            entriesList.push([currentNode.key, currentNode.value]);
            currentNode = currentNode.nextNode;
          }
        }
      }
      return entriesList;
    },
  };
};

const test = HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
test.set("octopus", "purple");
test.set("piano", "black");
test.set("quilt", "white");
test.set("robot", "gray");
test.set("sun", "yellow");
test.set("tree", "green");
test.set("umbrella", "blue");
test.set("vase", "golden");
test.set("water", "transparent");
