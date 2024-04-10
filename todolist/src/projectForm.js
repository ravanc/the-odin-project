import { pubsub } from "./pubsub";
import {
  getLocalStorageJSON,
  setLocalStorageJSON,
  pushLocalStorageJSON,
  increaseIDcount,
} from "./helper";

// let projects = [];
// let projectID = 0;

if (!localStorage.getItem("projects")) {
  setLocalStorageJSON("projects", []);
  localStorage.setItem("projectID", "0");
}

pubsub.subscribe("projectAdded", addProject);
pubsub.subscribe("projectDeleted", deleteProject);

function addProject(projectName) {
  console.log("Project Added");
  let projects = getLocalStorageJSON("projects");
  let projectID = localStorage.getItem("projectID");
  let project = {
    projectName: projectName,
    projectID: projectID,
    toDoList: [],
  };
  //   projectID++;
  increaseIDcount("projectID");
  projects.push(project);
  pushLocalStorageJSON("projects", project);
}

function deleteProject(projectID) {
  console.log("Project deleted");
  let projects = getLocalStorageJSON("projects");
  let projectIndex = projects.findIndex(
    (project) => project.projectID == projectID
  );
  projects.splice(projectIndex, 1);
  console.log(projects);
  setLocalStorageJSON("projects", projects);
}

// export { projects };
