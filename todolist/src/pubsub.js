let pubsub = (function () {
  let topics = {};

  let subscribe = function (eventName, callback) {
    if (!topics[eventName]) {
      topics[eventName] = [];
    }
    topics[eventName].push(callback);
  };

  let publish = function (eventName, data) {
    if (!topics[eventName]) {
      return;
    }
    topics[eventName].forEach((callback) => callback(data));
  };

  return {
    subscribe,
    publish,
    topics,
  };
})();

export { pubsub };
