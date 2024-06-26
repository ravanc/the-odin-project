const LinkedListNode = function (value) {
  return {
    value: value ?? null,
    nextNode: null,
  };
};

const LinkedList = function () {
  return {
    append(value) {
      if (this.head == undefined) {
        console.log("appended with an empty head");
        this.head = LinkedListNode(value);
        console.log(`changed head to value of ${this.head.value}`);
      } else {
        let currentNode = this.head;
        while (currentNode.nextNode != null) {
          currentNode = currentNode.nextNode;
        }
        console.log(
          `tried to append onto node with value ${currentNode.value}`
        );
        console.log(`appended to tail of ${this.tail.value}`);
        const newNode = LinkedListNode(value);
        currentNode.nextNode = newNode;
      }
    },

    prepend(value) {
      if (this.head == undefined) {
        this.head = LinkedListNode(value);
      } else {
        const newHead = LinkedListNode(value);
        console.log(
          `prepended ${newHead.value} to a head of ${this.head.value}`
        );
        newHead.nextNode = this.head;
        this.head = newHead;
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

    head: undefined,

    get tail() {
      if (this.head == undefined) return this.head;
      let currentNode = this.head;
      while (currentNode.nextNode != null) {
        currentNode = currentNode.nextNode;
      }
      return currentNode;
    },

    get toString() {
      if (this.head == undefined) return "null";
      let output = "";
      let currentNode = this.head;
      while (currentNode != null) {
        output += `( ${currentNode.value} ) -> `;
        currentNode = currentNode.nextNode;
      }
      output += "null";
      return output;
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

    pop() {
      if (this.head == undefined) return;
      if (this.head.nextNode == null) {
        this.head = undefined;
      }
      let currentNode = this.head.nextNode;
      let previousNode;
      while (currentNode.nextNode != null) {
        previousNode = currentNode;
        currentNode = currentNode.nextNode;
      }
      previousNode.nextNode = null;
    },

    contains(value) {
      if (this.head == undefined) return false;
      let currentNode = this.head;
      while (currentNode != null) {
        if (currentNode.value == value) {
          return true;
        } else {
          currentNode = currentNode.nextNode;
        }
      }
      return false;
    },

    find(value) {
      let index = 0;
      let currentNode = this.head;
      while (currentNode != null) {
        if (currentNode.value == value) {
          return index;
        } else {
          index++;
          currentNode = currentNode.nextNode;
        }
      }
      return null;
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
