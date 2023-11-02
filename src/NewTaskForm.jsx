import { useState } from "react";

export function NewTaskForm({ onSubmit }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskReminder, setNewTaskReminder] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(newTaskTitle, newTaskReminder);

    setNewTaskTitle("");
    setNewTaskReminder("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <div className="task-adder">
        <label htmlFor="task">New Task </label>
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          type="text"
          id="task"
        />
      </div>
      <div className="reminder-adder">
        <label>Set a Reminder </label>
        <input
          value={newTaskReminder}
          onChange={(e) => setNewTaskReminder(e.target.value)}
          type="datetime-local"
          id="reminder"
        ></input>
      </div>
      <button className="btn">Add</button>
    </form>
  );
}
