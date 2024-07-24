// import { compareAsc, format } from "date-fns";
import "./style.css";

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }
}

class Project {
    projectList = {
        inbox: [],
        today: [],
        pending: [],
        completed: [],
    };

    addToDo(key, todo) {
        const project = this.projectList[key];
        project.push(todo);
    }

    populateProjectButtons() {
        const projectsBtnGrp = document.querySelector("#projects-btn-grp");

        projectsBtnGrp.innerHTML = "";

        const size = Object.keys(this.projectList).length;

        for (let i = 0; i < size; i++) {
            const key = Object.keys(this.projectList)[i];

            const button = document.createElement("button");

            button.id = key + "-btn";

            const img = document.createElement("img");
            img.src = "../src/assets/icons/box-icon.svg";
            img.alt = "Box Icon";
            img.className = "icon";

            button.append(img);
            button.append(key);

            projectsBtnGrp.append(button);
        }
    }

    addProjectButtonsEventListener(displayController) {
        // Add for all project button
        const allProjectsBtn = document.querySelector("#all-projects-btn");

        allProjectsBtn.addEventListener("click", () => {
            displayController.displayAllProject();
        });

        // Add for other project button
        const size = Object.keys(this.projectList).length;

        for (let i = 0; i < size; i++) {
            // Get the id
            const key = Object.keys(this.projectList)[i];
            const btnId = key + "-btn";

            // Query the id
            const btn = document.querySelector("#" + btnId);

            // Add event listener
            if (btn) {
                btn.addEventListener("click", () => {
                    displayController.displayProject(
                        key,
                        this.projectList[key]
                    );
                });
            }
        }
    }

    addProject(key) {
        this.projectList[key] = [];
    }

    deleteProject(key) {
        delete this.projectList[key];
    }

    getProjectList() {
        return this.projectList;
    }

    moveToCompleted(key, toDo) {
        // Find the project and remove the specific task
        const project = this.projectList[key];
        if (project) {
            const index = project.indexOf(toDo);
            if (index > -1) {
                project.splice(index, 1); // Remove the task from the original project
            }
        }
        this.addToDo("completed", toDo);
    }
}

class LogicController {
    // Creating a Controller object immediately initializes all btn logic
    constructor(project, displayController) {
        this.project = project;
        this.displayController = displayController;
        this.init();
    }

    init() {
        this.addTaskCtrl();
        this.addProjectCtrl();
        this.delProjectCtrl();
        project.populateProjectButtons();
        project.addProjectButtonsEventListener(displayController);
    }

    addTaskCtrl() {
        const addTaskBtn = document.querySelector("#add-task-btn");
        const closeProjectFormBtn = document.querySelector(
            ".task-form-close-btn"
        );
        const taskForm = document.querySelector(".add-task-form");
        const addTaskForm = document.querySelector(".task-form-container");

        // Show form
        addTaskBtn.addEventListener("click", () => {
            addTaskForm.style.display = "flex";

            // Get project list
            const projectKeys = Object.keys(project.getProjectList());

            // Get drop down id
            const dropdown = document.querySelector("#taskProjectDropdown");

            // Create and append the default option to the dropdown
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "Select an option";
            defaultOption.selected = true;
            defaultOption.disabled = true;
            dropdown.appendChild(defaultOption);

            projectKeys.forEach((key) => {
                const option = document.createElement("option");
                option.value = key;
                option.textContent = key;
                dropdown.appendChild(option);
            });
        });

        // Close the form
        closeProjectFormBtn.addEventListener("click", () => {
            addTaskForm.style.display = "none";

            // Reset form and dropdown
            taskForm.reset();

            const dropdown = document.querySelector("#taskProjectDropdown");
            dropdown.innerHTML = "";
        });

        // Add a task
        taskForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(taskForm);

            const taskName = formData.get("taskName");
            const taskDesc = formData.get("taskDescription");
            const taskDueDate = formData.get("taskDueDate");
            const taskPriority = formData.get("taskPriority");
            const taskProject = formData.get("taskProject");

            // Create toDo
            const toDo = new ToDo(
                taskName,
                taskDesc,
                taskDueDate,
                taskPriority
            );

            // Add toDo
            project.addToDo(taskProject, toDo);

            // Clear and re-display

            displayController.displayAllProject();

            // Hide the form
            addTaskForm.style.display = "none";

            // Reset form and dropdown
            taskForm.reset();

            const dropdown = document.querySelector("#taskProjectDropdown");
            dropdown.innerHTML = "";
        });
    }

    addProjectCtrl() {
        const addProjectBtn = document.querySelector("#add-project-btn");
        const closeProjectFormBtn = document.querySelector(
            ".add-project-form-close-btn"
        );
        const projectForm = document.querySelector(".add-project-form");
        const addProjectForm = document.querySelector(".form-container");

        // Show form
        addProjectBtn.addEventListener("click", () => {
            addProjectForm.style.display = "flex";
        });

        // Close the form
        closeProjectFormBtn.addEventListener("click", () => {
            addProjectForm.style.display = "none";

            // Clear form field
            const projectName = document.querySelector(".project-name");
            projectName.value = "";
        });

        // Add a project
        projectForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(projectForm);

            const projectName = formData.get("projectName");

            // Add to the project list
            project.addProject(projectName);

            // Re-display the list
            project.populateProjectButtons();

            // Add event-listener
            project.addProjectButtonsEventListener(displayController);

            // Hide the form
            addProjectForm.style.display = "none";

            projectForm.reset();
        });
    }

    delProjectCtrl() {
        const delProjectBtn = document.querySelector("#del-project-btn");
        const delProjectFormContainer = document.querySelector(
            ".del-form-container"
        );

        // Show form logic
        delProjectBtn.addEventListener("click", () => {
            delProjectFormContainer.style.display = "flex";
        });

        // Close form logic
        const delProjectFormCloseBtn = document.querySelector(
            ".del-project-form-close-btn"
        );

        delProjectFormCloseBtn.addEventListener("click", () => {
            delProjectFormContainer.style.display = "none";

            delProjectForm.reset();
        });

        // Form submission logic
        const delProjectForm = document.querySelector(".delete-project-form");

        delProjectForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(delProjectForm);

            const projectName = formData.get("projectName");
            project.deleteProject(projectName);

            // Re-display the list
            project.populateProjectButtons();

            // Hide the form
            delProjectFormContainer.style.display = "none";

            // Reset form
            delProjectForm.reset();
        });
    }
}

class DisplayController {
    constructor(project) {
        this.project = project;
        this.editTaskFormContainer = document.querySelector(
            ".edit-task-form-container"
        );
        this.editTaskForm = document.querySelector(".edit-task-form");
        this.editTaskFormCloseBtn = document.querySelector(
            ".edit-task-form-close-btn"
        );
        this.dropdown = document.querySelector("#delTaskProjectDropdown");
        this.currentToDo = null;
        this.currentProjectKey = null;
        this.init();
        this.initEventListeners();
    }

    init() {
        this.displayAllProject();
    }

    displayAllProject() {
        // Clear all toDo
        const content = document.querySelector("#content");
        content.innerHTML = "";

        const rightHeader = document.querySelector("#right-header");
        rightHeader.innerHTML = "ALL PROJECTS";

        // Display Projects
        const projectList = project.getProjectList();
        const projectKeys = Object.keys(projectList);

        projectKeys.forEach((key) => {
            projectList[key].forEach((toDo) => {
                // This check ensures that it doesn't show completed items
                if (key !== "completed") {
                    this.displayToDo(toDo, key);
                }
            });
        });
    }

    displayProject(projectTitle, toDoList) {
        // Clear all toDo
        const content = document.querySelector("#content");
        content.innerHTML = "";

        const rightHeader = document.querySelector("#right-header");
        rightHeader.innerHTML = projectTitle.toUpperCase();

        if (toDoList) {
            toDoList.forEach((toDo) => {
                this.displayToDo(toDo, projectTitle);
            });
        }
    }

    displayToDo(toDo, projectKey) {
        const content = document.getElementById("content");

        // Creation of card
        const card = document.createElement("div");
        card.className = "card";

        const button = document.createElement("button");
        button.className = "card-btn";

        const cardInfoGroup = document.createElement("div");
        cardInfoGroup.className = "card-info-group";

        const h2 = document.createElement("h2");
        h2.className = "card-title";
        h2.textContent = toDo.getTitle();

        const span1 = document.createElement("span");
        span1.className = "card-description";
        span1.textContent = toDo.getDescription();

        const cardDatePriorityGroup = document.createElement("div");
        cardDatePriorityGroup.className = "card-date-priority-group";

        const span2 = document.createElement("span");
        span2.className = "card-due-date";
        span2.textContent = "Due Date: " + toDo.getDueDate();

        const span3 = document.createElement("span");
        span3.className = "card-priority";
        span3.textContent = "Priority: " + toDo.getPriority();

        const delButton = document.createElement("button");
        delButton.className = "del-card-btn";
        delButton.textContent = "Delete";

        cardDatePriorityGroup.appendChild(span2);
        cardDatePriorityGroup.appendChild(span3);

        cardInfoGroup.appendChild(h2);
        cardInfoGroup.appendChild(span1);
        cardInfoGroup.appendChild(cardDatePriorityGroup);

        // Appending of card
        card.appendChild(button);
        card.appendChild(cardInfoGroup);
        card.appendChild(delButton);

        content.appendChild(card);

        // Add event-listener for button
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            this.project.moveToCompleted(projectKey, toDo);
            this.displayAllProject();
        });

        delButton.addEventListener("click", (event) => {
            event.stopPropagation();
            // Find the project and remove the specific task
            const project = this.project.getProjectList()[projectKey];
            if (project) {
                const index = project.indexOf(toDo);
                if (index > -1) {
                    project.splice(index, 1); // Remove the task from the original project
                }
            }
            this.displayAllProject();
        });

        // Add event-listener for card
        const editTaskFormContainer = document.querySelector(
            ".edit-task-form-container"
        );

        card.addEventListener("click", () => {
            editTaskFormContainer.style.display = "flex";

            // Populate information to the form
            const taskName = document.querySelector("#taskName");
            const taskDescription = document.querySelector("#taskDescription");
            const taskDueDate = document.querySelector("#taskDueDate");
            const taskPriority = document.querySelector("#taskPriority");

            taskName.value = toDo.title;
            taskDescription.value = toDo.description;
            taskDueDate.value = toDo.dueDate;
            taskPriority.value = toDo.priority;

            // Get project list
            const projectKeys = Object.keys(project.getProjectList());

            // Get drop down id
            const dropdown = document.querySelector("#delTaskProjectDropdown");

            // Create and append the default option to the dropdown
            const originalProject = document.createElement("option");
            originalProject.value = projectKey;
            originalProject.textContent = projectKey;
            dropdown.append(originalProject);

            projectKeys.forEach((key) => {
                if (key !== projectKey) {
                    const option = document.createElement("option");
                    option.value = key;
                    option.textContent = key;
                    dropdown.appendChild(option);
                }
            });

            // Update currentToDo and currentProjectKey
            this.currentToDo = toDo;
            this.currentProjectKey = projectKey;
        });

        const editTaskFormCloseBtn = document.querySelector(
            ".edit-task-form-close-btn"
        );
        editTaskFormCloseBtn.addEventListener("click", () => {
            editTaskFormContainer.style.display = "none";

            // Reset dropdown
            const dropdown = document.querySelector("#delTaskProjectDropdown");
            dropdown.innerHTML = "";
        });
    }

    initEventListeners() {
        // Attach the submit event listener only once
        this.editTaskForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Get form data
            const formData = new FormData(this.editTaskForm);
            const taskName = formData.get("taskName");
            const taskDescription = formData.get("taskDescription");
            const taskDueDate = formData.get("taskDueDate");
            const taskPriority = formData.get("taskPriority");
            const taskProject = formData.get("taskProject");

            const newToDo = new ToDo(
                taskName,
                taskDescription,
                taskDueDate,
                taskPriority
            );

            // Find the project and remove the specific task
            const project =
                this.project.getProjectList()[this.currentProjectKey];
            if (project) {
                const index = project.indexOf(this.currentToDo);
                if (index > -1) {
                    project.splice(index, 1); // Remove the task from the original project
                }
            }

            this.project.addToDo(taskProject, newToDo);

            // Re-display
            this.displayAllProject();

            // Reset dropdown
            this.dropdown.innerHTML = "";

            // Close form
            this.editTaskFormContainer.style.display = "none";
        });

        // Attach the close button event listener only once
        this.editTaskFormCloseBtn.addEventListener("click", () => {
            this.editTaskFormContainer.style.display = "none";

            // Reset dropdown
            this.dropdown.innerHTML = "";
        });
    }
}

const project = new Project();

const todo1 = new ToDo("Call Tom", "Rectify error", "12/02/23", "high");
const todo2 = new ToDo("Buy carrots", "For pasta next week", "12/02/23", "low");
const todo3 = new ToDo("Clean my shoes", "To lend Tom", "12/02/23", "high");

project.addToDo("today", todo1);
project.addToDo("today", todo2);
project.addToDo("today", todo3);

const displayController = new DisplayController(project);
const logicController = new LogicController(project, displayController);
