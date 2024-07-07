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
        test1: [],
        test2: [],
        test3: [],
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
    }

    addTaskCtrl() {}

    addProjectCtrl() {
        const addProjectBtn = document.querySelector("#add-project-btn");
        const closeProjectFormBtn = document.querySelector(
            "#add-project-close-btn"
        );
        const projectForm = document.querySelector("#project-form");

        // Show form logic
        addProjectBtn.addEventListener("click", () => {
            const addProjectForm = document.querySelector("#add-project-form");

            addProjectForm.style.display = "flex";
        });

        // Close the form
        closeProjectFormBtn.addEventListener("click", () => {
            const addProjectForm = document.querySelector("#add-project-form");

            addProjectForm.style.display = "none";

            // Clear form field
            const projectName = document.querySelector("#projectName");
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
        });
    }

    delProjectCtrl() {
        const delProjectBtn = document.querySelector("#del-project-btn");
        const closeProjectFormBtn = document.querySelector(
            "#add-project-close-btn"
        );
        const projectForm = document.querySelector("#project-form");

        // Show form logic
        delProjectBtn.addEventListener("click", () => {
            const addProjectForm = document.querySelector("#add-project-form");

            addProjectForm.style.display = "flex";
        });

        // Close the form
        closeProjectFormBtn.addEventListener("click", () => {
            const addProjectForm = document.querySelector("#add-project-form");

            addProjectForm.style.display = "none";

            // Clear form field
            const projectName = document.querySelector("#projectName");
            projectName.value = "";
        });

        // Delete a project
        projectForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(projectForm);

            const projectName = formData.get("projectName");

            // Delete project from the list
            project.deleteProject(projectName);

            // Re-display the list
            project.populateProjectButtons();
        });
    }
}

class DisplayController {
    displayAllProject(projects) {}

    displayProject(project) {}
}

const todo1 = new ToDo("hello", "test", "12/02/23", "high");
const todo2 = new ToDo("hello", "test", "12/02/23", "high");
const todo3 = new ToDo("hello", "test", "12/02/23", "high");

const project = new Project();
const logicController = new LogicController();
const displayController = new DisplayController();

// project.populateProjectButtons();
// project.deleteProject("test1");
project.populateProjectButtons();

project.addToDo("inbox", todo1);
