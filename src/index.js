// import { compareAsc, format } from "date-fns";

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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

    addProject(key) {
        this.projectList[key] = [];
    }

    deleteProject(key) {
        delete this.projectList[key];
    }

    getProjectList() {
        return this.projectList;
    }
}

class LogicController {
    // Creating a Controller object immediately initializes all btn logic
    constructor(project) {
        this.project = project;
        this.init();
    }

    init() {
        this.addTaskCtrl();
        this.addProjectCtrl();
        this.delProjectCtrl();
        project.populateProjectButtons();
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

            // Re-display

            // Hide the form
            addTaskForm.style.display = "none";
        });
    }

    addProjectCtrl() {
        const addProjectBtn = document.querySelector("#add-project-btn");
        const closeProjectFormBtn = document.querySelector(
            ".project-form-close-btn"
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

            // Hide the form
            addProjectForm.style.display = "none";
        });
    }

    delProjectCtrl() {
        // const delProjectBtn = document.querySelector("#del-project-btn");
        // const delProjectForm = document.querySelector(".form-container");
        // // Show form logic
        // delProjectBtn.addEventListener("click", () => {});
    }
}

class DisplayController {
    constructor(project) {
        this.project = project;
    }

    displayAllProject(projects) {}

    displayProject(project) {}

    displayToDo(toDo) {
        const content = document.querySelector("#id");

        // Creation of card
        const card = document.createAttribute("div");
        card.className = "card";

        // Appending of card
    }
}

const project = new Project();
const logicController = new LogicController(project);
const displayController = new DisplayController(project);

const todo1 = new ToDo("hello", "test", "12/02/23", "high");
const todo2 = new ToDo("hello", "test", "12/02/23", "low");
const todo3 = new ToDo("hello", "test", "12/02/23", "high");

project.addToDo("today", todo1);
project.addToDo("today", todo2);
project.addToDo("today", todo3);
