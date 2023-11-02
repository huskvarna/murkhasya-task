import { useState } from "react";
import { NewTaskForm } from "./NewTaskForm";

export default function App() {
  const [tasks, setTasks] = useState([]);

  //Add 0 in front of the current minute if it's length is smaller than 2
  //To have the same format as local-datetime's minute used in reminder's input
  function getRealMinute(minute) {
    if (minute.length < 2) {
      return "0" + minute;
    } else {
      return minute;
    }
  }

  //TODO: check the year and month.
  //Function to handle reminders, checks if the year and month and minute
  //of a task are the same as the local time
  //When it's the same minute, it sends an reminder alert
  //Function triggers once every minute
  function handleReminders() {
    setInterval(() => {
      console.log("check started");
      tasks.forEach((task) => {
        const now = new Date();
        //Checking the year
        const reminderMinute = task.reminder.toString().slice(-2);
        const nowMinute = now.getMinutes();
        console.log(nowMinute);
        console.log(reminderMinute);
        if (getRealMinute(nowMinute).toString() == reminderMinute) {
          alert("Reminder for task " + task.title);
        }
      });
    }, 60000); // 60000 milliseconds = 1 minute
  }

  handleReminders();

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
      return currentTasks.filter((todo) => todo.id !== id);
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
                Reminder at: {task.reminder.replace("T", " ")}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
