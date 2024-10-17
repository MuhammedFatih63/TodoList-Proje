
# Todo List Application

This is a simple Todo List application that allows users to add tasks with deadlines and priority levels, manage tasks, and store them using Local Storage.

## Features

- **Add New Task**: Users can input a task, assign a deadline, and set the priority (Low, Medium, or High).
- **Task List**: All tasks are displayed with their associated deadlines and priority levels.
- **Delete Tasks**: Users can delete individual tasks or clear all tasks at once.
- **Local Storage**: Tasks are stored in the browser's Local Storage, so they persist even after a page refresh.

## Project Structure

- **index.html**: The main HTML file that includes the structure of the Todo List interface. It uses Bootstrap for styling and a form to add new tasks. The tasks are listed in an unordered list with delete buttons for each task.
- **script.js**: Contains the JavaScript code that handles adding, deleting, and displaying tasks. It manages task storage using Local Storage and defines all event listeners for the form and task list interactions.
- **style.css**: Provides basic custom styling for the application. It includes minimal styles like setting the link color to white.

## How to Use

1. **Add a Task**: Fill in the task name, select a deadline, choose a priority, and click the "+" button to add the task to the list.
2. **Delete a Task**: Click the "x" button next to a task to remove it.
3. **Delete All Tasks**: Click the "Delete All" button to clear all tasks from the list.
4. **Persistence**: All tasks are saved in Local Storage, so they will remain even if you close the browser or refresh the page.

## Technologies Used

- **HTML5**: For the structure and layout of the page.
- **CSS3**: For custom styling and layout.
- **Bootstrap 4.1.3**: For responsive design and ready-to-use UI components.
- **JavaScript**: For task management logic and Local Storage handling.
- **Font Awesome**: For icons used in the application.

## Installation

No installation is required. Simply open the `index.html` file in a browser, and the application will run.

## License

This project is open-source and can be used freely for any personal or commercial projects.
