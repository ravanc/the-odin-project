import {
  getLocalStorageJSON,
  increaseIDcount,
  setLocalStorageJSON,
} from "./helper";
import { pubsub } from "./pubsub";
// import { projects } from "./projectForm";

pubsub.subscribe("toDoAdded", addToDo);
pubsub.subscribe("toDoDeleted", deleteToDo);
pubsub.subscribe("toDoCompletion", toDoCompletion);

// let toDoID = 0;
if (!localStorage.getItem("toDoID")) {
  localStorage.setItem("toDoID", "0");
}

function addToDo(toDo) {
  console.log("Add to do");
  let projects = getLocalStorageJSON("projects");
  let projectIndex = projects.findIndex(
    (project) => project.projectID == toDo.projectID
  );
  toDo.completed = false;
  toDo.toDoID = parseInt(localStorage.getItem("toDoID"));
  //   toDoID++;
  increaseIDcount("toDoID");
  projects[projectIndex].toDoList.push(toDo);
  setLocalStorageJSON("projects", projects);
  console.log("To do Added");
}

function toDoCompletion(toDo) {
  console.log("To do completed");
  let projects = getLocalStorageJSON("projects");
  let projectIndex = projects.findIndex(
    (project) => project.projectID == toDo.projectID
  );
  let toDoIndex = projects[projectIndex]["toDoList"].findIndex(
    (_toDo) => _toDo.toDoID == toDo.toDoID
  );

  // Sets completed property of to do to true/false
  if (projects[projectIndex]["toDoList"][toDoIndex].completed) {
    projects[projectIndex]["toDoList"][toDoIndex].completed = false;
  } else {
    projects[projectIndex]["toDoList"][toDoIndex].completed = true;
  }
  setLocalStorageJSON("projects", projects);
}

function deleteToDo(toDo) {
  console.log("To do deleted");
  let projects = getLocalStorageJSON("projects");
  let projectIndex = projects.findIndex(
    (project) => project.projectID == toDo.projectID
  );
  let toDoIndex = projects[projectIndex]["toDoList"].findIndex(
    (_toDo) => _toDo.toDoID == toDo.toDoID
  );

  // Remove to do from project array
  projects[projectIndex]["toDoList"].splice(toDoIndex, 1);
  setLocalStorageJSON("projects", projects);
}

// export { toDoID };
