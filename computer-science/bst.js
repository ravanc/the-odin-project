const TreeNode = function (value, left, right) {
  return {
    value: value,
    left: left ?? null,
    right: right ?? null,
  };
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const Tree = function (array) {
  function buildTree(array) {
    if (array.length === 0) return null;
    if (array.length === 1) return TreeNode(array[0]);
    //   if (array.length < 2) return;
    //   if (array.length == 2) return TreeNode(array[0], null, TreeNode(array[1]));

    array.sort((a, b) => a - b);
    const cleanedArray = Array.from(new Set(array));
    //   const cleanedArray = array.filter((element, index) => {
    //     return array.indexOf(element) === index;
    //   });

    const midpoint = Math.floor(cleanedArray.length / 2);
    const leftArray = cleanedArray.slice(0, midpoint);
    const rightArray = cleanedArray.slice(midpoint + 1, cleanedArray.length);

    return TreeNode(
      cleanedArray[midpoint],
      buildTree(leftArray),
      buildTree(rightArray)
    );
  }

  function levelOrderHelper(queue, values, callback) {
    if (queue.length === 0) return;
    let node = queue[0];
    values.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
    if (callback) callback(node);
    queue.shift();
    return levelOrderHelper(queue, values, callback);
  }

  function inOrderHelper(node, values, callback) {
    if (node.left) inOrderHelper(node.left, values, callback);
    values.push(node.value);
    if (node.right) inOrderHelper(node.right, values, callback);
    if (callback) callback(node);
  }

  function preOrderHelper(node, values, callback) {
    values.push(node.value);
    if (node.left) preOrderHelper(node.left, values, callback);
    if (node.right) preOrderHelper(node.right, values, callback);
    if (callback) callback(node);
  }

  function postOrderHelper(node, values, callback) {
    if (node.left) postOrderHelper(node.left, values, callback);
    if (node.right) postOrderHelper(node.right, values, callback);
    values.push(node.value);
    if (callback) callback(node);
  }

  function heightHelper(node) {
    if (node.left === null && node.right === null) return 0;
    let leftHeight = 0;
    let rightHeight = 0;
    if (node.left) leftHeight = heightHelper(node.left);
    if (node.right) rightHeight = heightHelper(node.right);
    return leftHeight > rightHeight ? leftHeight + 1 : rightHeight + 1;
  }

  function balancedHelper(node) {
    if (node === null) return { height: 0, balanced: true };

    let left = balancedHelper(node.left);
    let right = balancedHelper(node.right);

    return {
      height: Math.max(left.height, right.height) + 1,
      balanced:
        left.balanced &&
        right.balanced &&
        Math.abs(left.height - right.height) <= 1,
    };
  }

  return {
    root: buildTree(array),

    insert(value) {
      let previousNode;
      let currentNode = this.root;
      while (currentNode !== null) {
        if (currentNode.value === value) return;
        previousNode = currentNode;
        if (value > currentNode.value) {
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
      previousNode.value > value
        ? (previousNode.left = TreeNode(value))
        : (previousNode.right = TreeNode(value));
    },

    deleteItem(value) {
      let previousNode;
      let currentNode = this.root;
      while (currentNode.value !== value) {
        if (currentNode === null) return `Node with value ${value} not found.`;
        previousNode = currentNode;
        if (value > currentNode.value) {
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
      if (currentNode.right === null && currentNode.left === null) {
        currentNode.value > previousNode.value
          ? (previousNode.right = null)
          : (previousNode.left = null);
      } else if (currentNode.right !== null && currentNode.left !== null) {
        let replacementNode = currentNode.right;
        while (replacementNode.left !== null) {
          replacementNode = replacementNode.left;
        }
        const newValue = replacementNode.value;
        this.deleteItem(newValue);
        currentNode.value = newValue;
      } else {
        currentNode.value > previousNode.value
          ? (previousNode.right = currentNode.left ?? currentNode.right)
          : (previousNode.left = currentNode.left ?? currentNode.right);
      }
    },

    find(value) {
      let currentNode = this.root;
      while (currentNode.value !== value) {
        if (value > currentNode.value) {
          currentNode = currentNode.right;
        } else {
          currentNode = currentNode.left;
        }
      }
      //   console.log("Found", currentNode, value);
      return currentNode;
    },

    levelOrder(callback) {
      let queue = [this.root];
      let values = [];
      levelOrderHelper(queue, values, callback);
      return values;
    },

    inOrder(callback) {
      let values = [];
      inOrderHelper(this.root, values, callback);
      return values;
    },

    preOrder(callback) {
      let values = [];
      preOrderHelper(this.root, values, callback);
      return values;
    },

    postOrder(callback) {
      let values = [];
      postOrderHelper(this.root, values, callback);
      return values;
    },

    height(node) {
      const heightNode = this.find(node);
      const height = heightHelper(heightNode);
      return height;
    },

    depth(node) {
      let height = 0;
      let currentNode = this.root;
      while (currentNode.value !== node) {
        if (node > currentNode.value) {
          currentNode = currentNode.right;
          height++;
        } else {
          currentNode = currentNode.left;
          height++;
        }
      }
      return height;
    },

    // isBalanced() {
    //   let maxHeightDifference = 0;
    //   this.levelOrder((node) => {
    //     let heightDifference;
    //     if (node.left === null && node.right === null) {
    //       heightDifference = 0;
    //     } else if (node.left === null || node.right === null) {
    //       heightDifference =
    //         node.left === null
    //           ? this.height(node.right.value)
    //           : this.height(node.left.value);
    //     } else {
    //       heightDifference = Math.abs(
    //         this.height(node.right.value) - this.height(node.left.value)
    //       );
    //     }
    //     maxHeightDifference = Math.max(maxHeightDifference, heightDifference);
    //   });
    //   return maxHeightDifference > 1 ? false : true;
    // },

    isBalanced() {
      return balancedHelper(this.root).balanced;
    },

    rebalance() {
      const newArray = this.inOrder();
      this.root = buildTree(newArray);
    },
  };
};

let a = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
a.insert(12);
a.insert(15);
a.insert(100);
a.insert(16);
a.insert(8);
// prettyPrint(a.root);
// a.deleteItem(8);
prettyPrint(a.root);
console.log(a.levelOrder());
console.log(a.inOrder());
console.log(a.preOrder());
console.log(a.postOrder());
// console.log(a.height(4));
// console.log(a.depth(6345));
console.log(a.isBalanced());
a.rebalance();
prettyPrint(a.root);
console.log(a.isBalanced());
