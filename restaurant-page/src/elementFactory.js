function generateTag(tag, text, cls) {
  const element = document.createElement(tag);
  element.textContent = text;
  element.classList.add(cls);
  return element;
}

function generateImage(src, cls) {
  const img = document.createElement("img");
  img.src = src;
  if (cls) {
    img.classList.add(cls);
  }
  return img;
}

export { generateTag, generateImage };
