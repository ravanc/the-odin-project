function fibs(n) {
  if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  }
  let arr = [0, 1];
  for (let i = 1; i < n - 1; i++) {
    arr.push(arr[i - 1] + arr[i]);
    // console.log(i);
  }
  return arr;
}

// console.log(`Non-recursive: ${fibs(8)}`);

function fibsRec(n) {
  let fibsRecMemo = { 1: 0, 2: 1 };

  function fib(n) {
    // console.log("fib called");
    if (n === 1) {
      //   console.log("fib(1)");
      return 0;
    } else if (n === 2) {
      //   console.log("fib(2)");
      return 1;
    }
    if (!fibsRecMemo[n]) {
      //   console.log("value not found");
      fibsRecMemo[n] = fib(n - 1) + fib(n - 2);
      //   console.log("value added to dict");
      //   console.log(fibsRecMemo);
    }
    // console.log("returning value found");
    return fibsRecMemo[n];
  }

  fib(n);
  console.log(Object.values(fibsRecMemo));
}

function merge(leftArr, rightArr) {
  let i = 0,
    j = 0;
  let result = [];
  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] < rightArr[j]) {
      result.push(leftArr[i]);
      i++;
    } else {
      result.push(rightArr[j]);
      j++;
    }
  }
  while (i < leftArr.length) {
    result.push(leftArr[i]);
    i++;
  }
  while (j < rightArr.length) {
    result.push(rightArr[j]);
    j++;
  }
  return result;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  let midPoint = Math.floor(arr.length / 2);
  let leftArr = mergeSort(arr.slice(0, midPoint));
  let rightArr = mergeSort(arr.slice(midPoint));
  return merge(leftArr, rightArr);
}

function sumRange(number) {
  if (number == 1) return 1;
  return number + sumRange(number - 1);
}

function power(base, exponent) {
  if (exponent == 0) return 1;
  return base * power(base, exponent - 1);
}

function factorial(number) {
  if (number == 1) return 1;
  return number * factorial(number - 1);
}

function all(arr, callback) {
  if (arr.length == 0) return true;
  let current = arr.pop();
  if (callback(current)) {
    return all(arr, callback);
  } else {
    return false;
  }
}

function productOfArray(arr) {
  if (arr.length == 0) return 1;
  let current = arr.pop();
  return current * productOfArray(arr);
}

function contains(obj) {}
