const body = document.querySelector("body");
const container = document.querySelector(".container");

function getResolution() {
    resolution = prompt("Enter the new resolution:")
    if (isNaN(+resolution) || +resolution < 16 || +resolution > 100) {
        alert("Invalid input! Enter a number from 16 to 100.")
    } else {
        return +resolution
    }
}

function addResolutionButton() {
    const resolutionButton = document.createElement("button");
    resolutionButton.textContent = "Change Box Resolution";
    resolutionButton.addEventListener("click", () => {
        clearPixels();
        addPixels(getResolution());
    });
    body.appendChild(resolutionButton);
}

function addClearButton() {
    const clearButton = document.createElement("button");
    clearButton.textContent = "Clear Pixels";
    clearButton.addEventListener("click", () => {
        const pixels = document.querySelectorAll(".pixel");
        pixels.forEach((pixel) => pixel.style.backgroundColor = "rgba(0, 0, 0, 0)");
    });
    body.appendChild(clearButton);
}

function changeHoverStyle() { // Default hover style will be colorful
    const colorButton = document.createElement("button");
    colorButton.textContent = "Colorful Mode";
    const bwButton = document.createElement("button");
    bwButton.textContent = "Black and White Mode";
    colorButton.addEventListener("click", () => {
        const pixels = document.querySelectorAll(".pixel");
        pixels.forEach((pixel) => {
            pixel.removeEventListener("mouseover", shade);
            pixel.addEventListener("mouseover", randomPixelColor);
        });
    });
    bwButton.addEventListener("click", () => {
        const pixels = document.querySelectorAll(".pixel");
        pixels.forEach((pixel) => {
            pixel.removeEventListener("mouseover", randomPixelColor);
            pixel.addEventListener("mouseover", shade);
        });
    })
    body.appendChild(colorButton);
    body.appendChild(bwButton);
}

function addPixels(pixelCount) {
    for (i = 0; i < (pixelCount ** 2); i++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");
        const pixelSide = 800 / pixelCount;
        pixel.style.boxSizing = "border-box";
        pixel.style.width = pixelSide + "px";
        pixel.style.height = pixelSide + "px";
        pixel.addEventListener("mouseover", randomPixelColor);
        container.appendChild(pixel);
    }
}

function clearPixels() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => pixel.remove());
}

function getRandomColor() {
    const redValue = Math.floor(Math.random() * 255);
    const greenValue = Math.floor(Math.random() * 255);
    const blueValue = Math.floor(Math.random() * 255);
    return `rgb(${redValue}, ${greenValue}, ${blueValue})`
}

function randomPixelColor() {
    this.style.backgroundColor = getRandomColor();
}

function shade() {
    const backgroundColor = window.getComputedStyle(this).getPropertyValue("background-color");
    var regex = /^rgba\(\w*, \w*, \w*, (\w(?:\.\w)?)\)$/;
    if (regex.test(backgroundColor)) 
    {
        var result = regex.exec(backgroundColor);
        opacity = +result[1];
        if (opacity < 1) {
            var newOpacity = opacity += 0.1;
        };
        this.style.backgroundColor = `rgba(0, 0, 0, ${newOpacity})`;
    }
}

addPixels(20);
addResolutionButton();
addClearButton();
changeHoverStyle();