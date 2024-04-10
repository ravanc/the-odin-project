function setLocalStorageJSON(key, object) {
  let string = JSON.stringify(object);
  localStorage.setItem(key, string);
}

function getLocalStorageJSON(key) {
  let objectString = localStorage.getItem(key);
  return JSON.parse(objectString);
}

function pushLocalStorageJSON(key, object) {
  let arrayString = localStorage.getItem(key);
  let array = JSON.parse(arrayString);
  array.push(object);
  arrayString = JSON.stringify(array);
  localStorage.setItem(key, arrayString);
}

function increaseIDcount(idKey) {
  localStorage.setItem(
    idKey,
    (parseInt(localStorage.getItem(idKey)) + 1).toString()
  );
}

function createTag(tag, cls, text) {
  let element = document.createElement(tag);
  if (typeof cls == "object") {
    cls.forEach((cl) => {
      element.classList.add(cl);
    });
  } else if (typeof cls == "string") {
    element.classList.add(cls);
  } else if (!cls) {
  }
  element.innerHTML = text;
  return element;
}

function createTagWithAttributes(tag, cls, attributes, text) {
  let element = document.createElement(tag);
  if (cls) {
    element.classList.add(cls);
  }
  attributes.forEach((attribute) => {
    element.setAttribute(attribute[0], attribute[1]);
  });
  element.innerHTML = text;
  return element;
}

export {
  setLocalStorageJSON,
  getLocalStorageJSON,
  pushLocalStorageJSON,
  createTag,
  createTagWithAttributes,
  increaseIDcount,
};
