import { generateTag, generateImage } from "./elementFactory";

const INTRO =
  "Experience the vibrant energy and artistic spirit of Nana Ouyang at Cadenza Cafe. Enjoy our expertly crafted coffee, delicious bites, and a curated space inspired by music and creativity.";
const HOURS = "Tues - Sun: 10am - 4pm";
const ADDRESS = "7 Virtuoso Crescent, Singapore";

export default function generateHome() {
  const div = document.createElement("div");

  div.appendChild(generateTag("div", "Cadenza Cafe", "title"));

  let intro = generateTag("div", "", "intro");
  intro.appendChild(generateTag("div", "About Us", "subtitle"));
  intro.appendChild(generateTag("div", INTRO, "text"));
  div.appendChild(intro);

  let hours = generateTag("div", "", "hours");
  hours.appendChild(generateTag("div", "Operating Hours", "subtitle"));
  hours.appendChild(generateTag("div", HOURS, "text"));
  div.appendChild(hours);

  let address = generateTag("div", "", "address");
  address.appendChild(generateTag("div", "Our Location", "subtitle"));
  address.appendChild(generateTag("div", ADDRESS, "text"));
  div.appendChild(address);

  let actions = generateTag("div", "", "actions");
  actions.appendChild(generateTag("div", "Contact Us!", "subtitle"));
  actions.appendChild(generateTag("button", "Make a Reservation", "a"));
  actions.appendChild(generateTag("button", "Order Online", "a"));
  div.appendChild(actions);

  div.classList.add("main");
  return div;
}
