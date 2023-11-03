import { useCallback, useEffect, useState } from "react";
import { NewTaskForm } from "./NewTaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);

  //Add 0 in front of the current minute if it's length is smaller than 2
  //To have the same format as local-datetime's minute used in reminder's input
  function getRealMinute(minute) {
    if (minute.toString().length < 2 && minute.toString() !== "0") {
      return "0" + minute;
    } else {
      return minute;
    }
  }
  console.log(tasks);
  //Function to add tasks upon submitting
  //Transfered to NewTaskForm for use there
  function addTask(title, reminder) {
    setTasks((currentTasks) => {
      return [
        ...currentTasks,
        {
          id: crypto.randomUUID(),
          title,
          reminder,
          completed: false,
        },
      ];
    });
  }

  //If task gets checked then mark it as completed
  function checkTask(id, completed) {
    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed };
        }
        return task;
      });
    });
  }

  function deleteTask(id) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task) => task.id !== id);
    });
  }

  return (
    <>
      <h1 className="header">ToDo List</h1>
      <NewTaskForm onSubmit={addTask} />
      <ul className="list">
        {tasks.length === 0 && "Nothing in tasks. Enjoy your empty tasklist."}
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <label>
                {task.title}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => checkTask(task.id, e.target.checked)}
                />
              </label>
              <button className="btn-edit">Edit</button>
              <button
                onClick={() => deleteTask(task.id)}
                className="btn-delete"
              >
                Delete
              </button>
              <p className="reminder-text">
                Reminder at: {task.reminder.toString()}{" "}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
