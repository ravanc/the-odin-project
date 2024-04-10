import "./style.css";

import {
  createProjectDialog,
  loadAllProjects,
  loadSidebar,
} from "./DOMHandler.js";
import "./pubsub.js";
import "./toDoForm.js";
import "./projectForm.js";

const addProjectBtn = document.querySelector("button.add-project");

addProjectBtn.addEventListener("click", createProjectDialog);
loadAllProjects();
loadSidebar();
