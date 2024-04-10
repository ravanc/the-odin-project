import { pubsub } from "./pubsub.js";
// import { projects } from "./projectForm.js";
import {
  createTag,
  createTagWithAttributes,
  getLocalStorageJSON,
} from "./helper.js";

const body = document.querySelector("body");
const sidebar = document.querySelector("ul.sidebar");
const main = document.querySelector("main");

let currentProjectID = undefined;

function loadSidebar() {
  console.log("Loading Sidebar");
  let projects = getLocalStorageJSON("projects");
  sidebar.innerHTML = "";

  let allProjects = createTag(
    "li",
    ["sidebar-project", "sidebar-active-project"],
    "All Projects"
  );
  allProjects.addEventListener("click", () => {
    loadAllProjects();
    sidebar.childNodes.forEach((child) =>
      child.classList.remove("sidebar-active-project")
    );
    allProjects.classList.add("sidebar-active-project");
  });
  sidebar.appendChild(allProjects);
  console.log(sidebar);

  projects.forEach((project) => {
    let sidebarItem = createTag("li", "sidebar-project", project.projectName);
    sidebarItem.addEventListener("click", () => {
      sidebar.childNodes.forEach((child) =>
        child.classList.remove("sidebar-active-project")
      );
      currentProjectID = project.projectID;
      loadMain(project);
      sidebarItem.classList.add("sidebar-active-project");
    });
    sidebar.appendChild(sidebarItem);
  });
}

function loadMain(_project) {
  let projects = getLocalStorageJSON("projects");
  let project = projects.find(
    (project) => project.projectID == _project.projectID
  );

  console.log(`Loading ${project.projectName}`);
  main.innerHTML = "";

  let projectRibbon = createTag("div", "project-ribbon", "");

  projectRibbon.appendChild(
    createTag("div", "project-name-title", project.projectName)
  );

  let projectActions = createTag("div", "project-actions", "");

  // Create To Do Button
  let addToDoBtn = createTag("button", "add-to-do-button", "New To Do");
  addToDoBtn.addEventListener("click", () => {
    createToDoDialog(project);
  });
  projectActions.appendChild(addToDoBtn);

  // Delete Project Button
  let deleteProjectBtn = createTag(
    "button",
    "delete-project-button",
    "Delete Project"
  );
  deleteProjectBtn.addEventListener("click", () => {
    pubsub.publish("projectDeleted", currentProjectID);
    loadSidebar();
    loadAllProjects();
  });
  projectActions.appendChild(deleteProjectBtn);

  projectRibbon.appendChild(projectActions);
  main.appendChild(projectRibbon);

  // Loads to Dos
  project["toDoList"].forEach((toDo) => {
    // Create container for each to do
    let toDoItem = createTag("div", "to-do-item", "");

    // Completed button
    let checkbox = createTag("button", "to-do-check", "✅");
    checkbox.addEventListener("click", () => {
      pubsub.publish("toDoCompletion", toDo);
      toDoItem.classList.toggle("to-do-completed");
      loadMain(_project);
    });
    if (toDo.completed) {
      toDoItem.classList.add("to-do-completed");
    }
    toDoItem.appendChild(checkbox);

    // Little piece of information about the to do
    toDoItem.appendChild(createTag("div", "to-do-title", toDo.title));
    toDoItem.appendChild(
      createTag("div", "to-do-due-date", `Due: ${toDo.dueDate.toString()}`)
    );

    // Show more information using dialog
    let info = createTag("button", "to-do-info", "ℹ️");
    info.addEventListener("click", () => createInfoDialog(toDo));
    toDoItem.appendChild(info);

    // Delete to do
    let deleteBtn = createTag("button", "to-do-delete", "🗑️");
    deleteBtn.addEventListener("click", () => {
      pubsub.publish("toDoDeleted", toDo);
      let projects = getLocalStorageJSON("projects");
      let updatedProject = projects.find(
        (_project) => _project.projectID == project.projectID
      );
      loadMain(updatedProject);
    });
    toDoItem.appendChild(deleteBtn);

    main.appendChild(toDoItem);
  });
}

function loadAllProjects() {
  console.log("Loading all projects");
  main.innerHTML = "";

  let projectRibbon = createTag("div", "project-ribbon", "");
  projectRibbon.appendChild(
    createTag("div", "project-name-title", "All Projects")
  );
  main.appendChild(projectRibbon);

  let projects = getLocalStorageJSON("projects");

  projects.forEach((project) =>
    project.toDoList.forEach((toDo) => {
      // Create container for each to do
      let toDoItem = createTag("div", "to-do-item", "");

      // Completed button
      let checkbox = createTag("button", "to-do-check", "✅");
      checkbox.addEventListener("click", () => {
        pubsub.publish("toDoCompletion", toDo);
        toDoItem.classList.toggle("to-do-completed");
        loadAllProjects();
      });
      if (toDo.completed) {
        toDoItem.classList.add("to-do-completed");
      }
      toDoItem.appendChild(checkbox);

      // Little piece of information about the to do
      toDoItem.appendChild(createTag("div", "to-do-title", toDo.title));
      toDoItem.appendChild(
        createTag("div", "to-do-due-date", `Due: ${toDo.dueDate.toString()}`)
      );

      // Show more information using dialog
      let info = createTag("button", "to-do-info", "ℹ️");
      info.addEventListener("click", () => createInfoDialog(toDo));
      toDoItem.appendChild(info);

      // Delete to do
      let deleteBtn = createTag("button", "to-do-delete", "🗑️");
      deleteBtn.addEventListener("click", () => {
        pubsub.publish("toDoDeleted", toDo);
        loadAllProjects();
      });
      toDoItem.appendChild(deleteBtn);

      main.appendChild(toDoItem);
    })
  );
}

function createInfoDialog(toDo) {
  let dialog = createTag("dialog", "info-dialog", "");
  dialog.appendChild(createTag("div", "dialog-title", toDo.title));
  dialog.appendChild(
    createTag(
      "div",
      "dialog-to-do-description",
      `Description: ${toDo.description}`
    )
  );
  dialog.appendChild(
    createTag("div", "dialog-to-do-due-date", `Due: ${toDo.dueDate.toString()}`)
  );
  dialog.appendChild(
    createTag("div", "dialog-to-do-priority", `Priority: ${toDo.priority}`)
  );
  let completion;
  if (toDo.completed) {
    completion = "Complete";
  } else {
    completion = "Incomplete";
  }
  dialog.appendChild(
    createTag("div", "dialog-to-do-completion", `Status: ${completion}`)
  );

  dialog.appendChild(
    createTag("div", "dialog-to-do-notes", `Notes: ${toDo.notes}`)
  );
  let closeDialog = createTag("button", "close-dialog", "Close");
  closeDialog.addEventListener("click", () => dialog.remove());
  dialog.appendChild(closeDialog);
  body.appendChild(dialog);
  dialog.showModal();
}

function createToDoDialog() {
  let projects = getLocalStorageJSON("projects");
  let dialog = createTag("dialog", "to-do-creation", "");
  dialog.appendChild(createTag("div", "dialog-title", "New To Do"));

  // Title
  dialog.appendChild(
    createTagWithAttributes("label", "", [["for", "title"]], "Title")
  );
  let title = createTagWithAttributes("input", "", [["id", "title"]], "");
  dialog.appendChild(title);

  // Description
  dialog.appendChild(
    createTagWithAttributes(
      "label",
      "",
      [["for", "description"]],
      "Description"
    )
  );
  let description = createTagWithAttributes(
    "input",
    "",
    [["id", "description"]],
    ""
  );
  dialog.appendChild(description);

  // Due Date
  dialog.appendChild(
    createTagWithAttributes("label", "", [["for", "due-date"]], "Due Date")
  );
  let dueDate = createTagWithAttributes(
    "input",
    "",
    [
      ["id", "due-date"],
      ["type", "date"],
    ],
    ""
  );
  dialog.appendChild(dueDate);

  // Priority
  dialog.appendChild(
    createTagWithAttributes("label", "", [["for", "priority"]], "Priority")
  );
  let selectPriority = createTagWithAttributes(
    "select",
    "",
    [["id", "priority"]],
    ""
  );
  let priorities = ["Low", "Medium", "High"];
  priorities.forEach((priority) =>
    selectPriority.appendChild(
      createTagWithAttributes(
        "option",
        "",
        [["value", priority]],
        `${priority} priority`
      )
    )
  );
  dialog.appendChild(selectPriority);

  // Notes
  dialog.appendChild(
    createTagWithAttributes("label", "", [["for", "notes"]], "Notes")
  );
  let notes = createTagWithAttributes("textarea", "", [["id", "notes"]], "");
  dialog.appendChild(notes);

  let closeDialogButton = createTag("button", "close-dialog", "Cancel");
  closeDialogButton.addEventListener("click", () => dialog.remove());
  dialog.appendChild(closeDialogButton);

  let createToDoButton = createTag("button", "create-to-do", "Create To Do");
  createToDoButton.addEventListener("click", () => {
    let toDoObject = {
      projectID: currentProjectID,
      title: title.value,
      description: description.value,
      dueDate: dueDate.value,
      priority: selectPriority.value,
      notes: notes.value,
    };
    pubsub.publish("toDoAdded", toDoObject);
    let projects = getLocalStorageJSON("projects");
    dialog.remove();
    let projectIndex = projects.findIndex(
      (project) => project.projectID == currentProjectID
    );
    loadMain(projects[projectIndex]);
  });
  dialog.appendChild(createToDoButton);
  dialog.classList.add("to-do-dialog");
  body.appendChild(dialog);
  dialog.showModal();
}

function createProjectDialog() {
  let dialog = createTag("dialog", "project-dialog", "");
  dialog.appendChild(createTag("div", "dialog-title", "New Project"));

  // Title
  dialog.appendChild(
    createTagWithAttributes("label", "", [["for", "name"]], "Project Name")
  );
  let name = createTagWithAttributes("input", "", [["id", "name"]], "");
  dialog.appendChild(name);

  let closeDialogButton = createTag("button", "close-dialog", "Cancel");
  closeDialogButton.addEventListener("click", () => dialog.remove());
  dialog.appendChild(closeDialogButton);

  let createProjectButton = createTag(
    "button",
    "create-project",
    "Create Project"
  );
  createProjectButton.addEventListener("click", () => {
    pubsub.publish("projectAdded", name.value);
    dialog.remove();
    loadSidebar();
  });
  dialog.appendChild(createProjectButton);
  body.appendChild(dialog);
  dialog.showModal();
}

export { createProjectDialog, loadAllProjects, loadSidebar };
