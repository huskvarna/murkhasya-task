import { useState } from "react";
import { NewTaskForm } from "./NewTaskForm";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [timerDictionary, setTimerDictionary] = useState({});

  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedReminder, setEditedReminder] = useState(null);

  const handleEditReminder = (taskId) => {
    setEditingTaskId(taskId);
    setEditedReminder(tasks.find((task) => task.id === taskId).reminder);
  };

  const handleUpdateReminder = (taskId) => {
    clearTimeout(taskId);
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          reminder: editedReminder,
        };
      }
      return task;
    });
    setTasks(updatedTasks);
    addReminder(
      updatedTasks.find((task) => task.id === taskId).title,
      updatedTasks.find((task) => task.id === taskId).reminder,
      taskId
    );
    setEditingTaskId(null);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].title);
  };

  const handleSave = (index) => {
    clearTimeout(timerDictionary[tasks[index].id]);
    const updatedTasks = [...tasks];
    updatedTasks[index].title = editedTask;
    setTasks(updatedTasks);
    addReminder(
      updatedTasks[index].title,
      updatedTasks[index].reminder,
      updatedTasks[index].id
    );
    setEditingIndex(null);
  };

  // Function to add an item to the dictionary
  const addToDictionary = (key, value) => {
    setTimerDictionary((prevDictionary) => ({
      ...prevDictionary,
      [key]: value,
    }));
  };

  // Function to remove an item from the dictionary
  const removeFromDictionary = (key) => {
    const { [key]: removedItem, ...restOfDictionary } = timerDictionary;
    setTimerDictionary(restOfDictionary);
  };

  //Function to add tasks upon submitting
  //Transfered to NewTaskForm for use there
  function addTask(title, reminder) {
    const generatedId = crypto.randomUUID();
    setTasks((currentTasks) => {
      return [
        ...currentTasks,
        {
          id: generatedId,
          title,
          reminder,
          completed: false,
        },
      ];
    });
    addReminder(title, reminder, generatedId);
  }

  function addReminder(title, reminder, generatedId) {
    const currentTime = new Date();
    const currentTimedOutTask = title;

    if (reminder <= currentTime) {
      alert("Reminder set too early.");
    } else {
      const timeDifference = reminder - currentTime;

      const timerId = setTimeout(() => {
        alert("Reminder for " + currentTimedOutTask);

        removeFromDictionary(generatedId);
      }, timeDifference);
      addToDictionary(generatedId, timerId);
    }
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

  //Deletes the task and clears the reminder timeout
  function deleteTask(id) {
    clearTimeout(timerDictionary[id]);
    removeFromDictionary(id);
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
        {tasks.map((task, index) => {
          return (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => checkTask(task.id, e.target.checked)}
                />
              </label>
              {editingIndex === index ? (
                <label>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={() => handleSave(index)}>Save</button>
                </label>
              ) : (
                <label>
                  {task.title}
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </label>
              )}

              <button
                onClick={() => deleteTask(task.id)}
                className="btn-delete"
              >
                Delete
              </button>
              {task.id === editingTaskId ? (
                <div>
                  <DatePicker
                    selected={editedReminder}
                    onChange={(date) => setEditedReminder(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                  />
                  <button onClick={() => handleUpdateReminder(task.id)}>
                    Update
                  </button>
                </div>
              ) : (
                <div>
                  {task.reminder ? (
                    <span>{task.reminder.toString()}</span>
                  ) : (
                    <span>No reminder set</span>
                  )}
                  <button onClick={() => handleEditReminder(task.id)}>
                    Edit Reminder
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
