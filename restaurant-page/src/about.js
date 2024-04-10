import { generateTag, generateImage } from "./elementFactory";

const STORY =
  "Nana Ouyang's passion for both music and hospitality inspired the creation of Cadenza Cafe.  From a young age, she loved the way music could transport her and the way a well-prepared meal could bring people together. This cafe seeks to blend those worlds.";

const CONCEPT =
  "Cadenza Cafe is a gathering space for those seeking both a caffeine boost and a burst of artistic inspiration. The interior is thoughtfully designed with music-inspired elements, comfortable seating, and art pieces.";

const VALUES = [
  "Creativity: Encouraging a sense of artistic expression and fostering connection among customers.",
  "Quality: Sourcing top-notch ingredients for coffee and food offerings.",
  "Community: Creating a welcoming environment for all, a place to spark conversations and collaborations.",
];

export default function generateAbout() {
  const div = document.createElement("div");

  div.appendChild(generateTag("div", "About", "title"));

  let story = generateTag("div", "", "story");
  story.appendChild(generateTag("div", "Our Story", "subtitle"));
  story.appendChild(generateTag("div", STORY, "text"));
  div.appendChild(story);

  let concept = generateTag("div", "", "concept");
  story.appendChild(generateTag("div", "The Concept", "subtitle"));
  story.appendChild(generateTag("div", CONCEPT, "text"));
  div.appendChild(concept);

  div.classList.add("main");
  return div;
}
