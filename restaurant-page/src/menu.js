import { generateTag, generateImage } from "./elementFactory";
import riceIcon from "./braisedPorkRice.jpg";
import noodleIcon from "./beefNoodles.jpg";
import chickenIcon from "./chicken.jpg";
import beanIcon from "./beans.jpg";
import friesIcon from "./fries.jpg";
import wontonIcon from "./wonton.jpg";
import fizzIcon from "./fizz.jpg";
import matchaIcon from "./matcha.jpg";

const MAINS = [
  {
    name: "Braised Pork Rice",
    icon: riceIcon,
    description:
      "A comforting and deeply savory dish featuring fatty pork belly braised in a rich soy-based sauce, served over fluffy white rice.",
  },
  {
    name: "Beef Noodles",
    icon: noodleIcon,
    description:
      "The national dish of Taiwan! Tender chunks of beef braised in a rich broth with noodles, aromatics, and a hint of five-spice powder.",
  },
  {
    name: "Three-Cup Chicken",
    icon: chickenIcon,
    description:
      "A fragrant and flavorful dish featuring chicken stir-fried in a sauce made with soy sauce, rice wine, and sesame oil.",
  },
];

const SIDES = [
  {
    name: "Crispy Garlic Green Beans",
    icon: beanIcon,
    description:
      "Fresh green beans stir-fried until crisp and blistered, tossed with fragrant garlic and a touch of soy sauce.",
  },
  {
    name: "Taiwanese-Style Sweet Potato Fries",
    icon: friesIcon,
    description:
      "Crispy sweet potato fries seasoned with a blend of Taiwanese five-spice powder and a touch of brown sugar, offering a sweet and savory contrast.",
  },
  {
    name: "Sichuan Chili Oil Wontons",
    icon: wontonIcon,
    description:
      "Succulent pork and shrimp dumplings bathed in a fiery chili oil sauce. This classic Sichuan dish is a must-try for any spice lover.",
  },
];

const BEVERAGES = [
  {
    name: "The Vibrato Fizz",
    icon: fizzIcon,
    description:
      "A butterfly pea flower tea provides a vibrant blue base, transforming it to a beautiful purple when a squeeze of lemon is added.",
  },
  {
    name: "Celestial Melody",
    icon: matchaIcon,
    description:
      "Matcha green tea is whisked to a froth and combined with steamed oat milk, for the wary traveller.",
  },
];

export default function generateMenu() {
  const div = document.createElement("div");

  div.appendChild(generateTag("div", "Menu", "title"));

  const mains = generateTag("div", "", "mains");
  mains.appendChild(generateTag("div", "MAINS", "subtitle"));
  MAINS.forEach((main) => {
    let item = document.createElement("div");
    item.classList.add("menu-item");
    item.appendChild(generateTag("div", main["name"], "menu-item-name"));
    item.appendChild(generateTag("div", main["description"], "text"));
    item.appendChild(generateImage(main["icon"], "menu-img"));
    mains.appendChild(item);
  });

  const sides = generateTag("div", "", "sides");
  sides.appendChild(generateTag("div", "SIDES", "subtitle"));
  SIDES.forEach((side) => {
    let item = document.createElement("div");
    item.classList.add("menu-item");
    item.appendChild(generateTag("div", side["name"], "menu-item-name"));
    item.appendChild(generateTag("div", side["description"], "text"));
    item.appendChild(generateImage(side["icon"], "menu-img"));
    sides.appendChild(item);
  });

  const beverages = generateTag("div", "", "beverages");
  beverages.appendChild(generateTag("div", "BEVERAGES", "subtitle"));
  BEVERAGES.forEach((beverage) => {
    let item = document.createElement("div");
    item.classList.add("menu-item");
    item.appendChild(generateTag("div", beverage["name"], "menu-item-name"));
    item.appendChild(generateTag("div", beverage["description"], "text"));
    item.appendChild(generateImage(beverage["icon"], "menu-img"));
    beverages.appendChild(item);
  });

  div.appendChild(mains);
  div.appendChild(sides);
  div.appendChild(beverages);
  div.classList.add("main");
  return div;
}
