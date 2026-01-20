import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function AddTaskModal({ closeModal, addTask }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");
  const [subtasks, setSubtasks] = useState([]);
  const [subtaskInput, setSubtaskInput] = useState("");

  const handleAddSubtask = () => {
    if (!subtaskInput.trim()) return;
    setSubtasks([
      ...subtasks,
      { id: uuidv4(), text: subtaskInput, completed: false },
    ]);
    setSubtaskInput("");
  };

  const handleRemoveSubtask = (id) => {
    setSubtasks(subtasks.filter((s) => s.id !== id));
  };

  const handleAddTask = () => {
    if (!text) return;
    addTask({
      id: uuidv4(),
      text,
      completed: false,
      dueDate,
      priority,
      category,
      subtasks,
    });
    closeModal();
  };

  return (
    <div className="modal">
      <h2>Add Task</h2>

      <input
        type="text"
        placeholder="Task name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Work</option>
        <option>Study</option>
        <option>Personal</option>
      </select>

      {/* Subtasks Input */}
      <div className="subtasks">
        <h3>Subtasks</h3>
        <input
          type="text"
          placeholder="Add a subtask"
          value={subtaskInput}
          onChange={(e) => setSubtaskInput(e.target.value)}
        />
        <button type="button" onClick={handleAddSubtask}>
          Add Subtask
        </button>

        <ul>
          {subtasks.map((sub) => (
            <li key={sub.id}>
              {sub.text}{" "}
              <button type="button" onClick={() => handleRemoveSubtask(sub.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
}
