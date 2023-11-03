import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function NewTaskForm({ onSubmit }) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskReminder, setNewTaskReminder] = useState(new Date());

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(newTaskTitle, newTaskReminder);
    const currentTime = new Date();
    const currentTimedOutTask = newTaskTitle;
    console.log(currentTimedOutTask);
    if (newTaskReminder <= currentTime) {
    } else {
      const timeDifference = newTaskReminder - currentTime;
      setTimeout(() => {
        alert("Reminder for task " + currentTimedOutTask);
      }, timeDifference);
    }
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
        <DatePicker
          selected={newTaskReminder}
          onChange={(date) => setNewTaskReminder(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}
