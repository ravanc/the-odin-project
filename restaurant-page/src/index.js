import generateHome from "./home";
import generateMenu from "./menu";
import generateAbout from "./about";
import "./style.css";

const homeButton = document.querySelector(".home");
const menuButton = document.querySelector(".menu");
const aboutButton = document.querySelector(".about");
const content = document.querySelector("#content");

const buttons = [homeButton, menuButton, aboutButton];
buttons.forEach((button) =>
  button.addEventListener("click", () => {
    let main = document.querySelector(".main");
    main.remove();
  })
);

homeButton.addEventListener("click", () => content.appendChild(generateHome()));
menuButton.addEventListener("click", () => content.appendChild(generateMenu()));
aboutButton.addEventListener("click", () =>
  content.appendChild(generateAbout())
);
