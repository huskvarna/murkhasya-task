import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

export function NewTaskForm({ onSubmit }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskReminder, setNewTaskReminder] = useState(new Date());

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(newTaskTitle, newTaskReminder);

    setNewTaskTitle("");
    setNewTaskReminder("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <div className="task-adder">
        <label htmlFor="task" className="text-margin">
          New Task{" "}
        </label>
        <input
          className="input-text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          type="text"
          id="task"
        />
      </div>
      <div className="reminder-adder">
        <label className="text-margin">Set a Reminder </label>
        <DatePicker
          className="input-text"
          selected={newTaskReminder}
          onChange={(date) => setNewTaskReminder(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={5}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <button className="btn-deleteall">Add</button>
    </form>
  );
}
