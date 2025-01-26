function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Get the current list of tasks from localStorage or initialize an empty array
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTask = { text: taskText }; // Save task as an object with a 'text' property
  // Add the new task to the array
  tasks.push(newTask);

  // Save the updated task list to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear the input field
  taskInput.value = "";

  // Show success message AFTER the task has been successfully added
  alert("Task successfully added!");

  // Optionally, display the task immediately in the current page
  displayTasks();
}

// Function to display tasks (with edit and delete options)
function displayTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the current list

  // Get tasks from localStorage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Populate the task list with the saved tasks
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskText = document.createElement("strong");
    taskText.textContent = task.text; // Access the 'text' property of the task object
    li.appendChild(taskText);

    // Create a "Delete" button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
      deleteTask(index);
    };

    // Create an "Edit" button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn"); 
    editButton.onclick = function () {
      editTask(index);
    };

    // The container created to hold buttons 
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Append buttons to the list item
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);
   
    // Append the button container to the list item
    li.appendChild(buttonContainer);

    // Append the list item to the task list
    taskList.appendChild(li);
  });
}

// Function to delete a task
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Remove the task at the specified index
  tasks.splice(index, 1);

  // Save the updated task list to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Re-render the task list
  displayTasks();
}

// Function to edit a task
function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTask = prompt("Edit task:", tasks[index].text); // Access 'text' property for editing

  if (newTask !== null && newTask.trim() !== "") {
    tasks[index].text = newTask.trim(); // Update the 'text' property
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
  }
}

// Call displayTasks when the page loads to show the saved tasks
window.onload = displayTasks;