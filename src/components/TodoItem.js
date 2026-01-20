import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoItem({
  task,
  toggleComplete,
  deleteTask,
  updateTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editCategory, setEditCategory] = useState(task.category);
  const [newSubtaskText, setNewSubtaskText] = useState("");

  const handleSave = () => {
    updateTask(task.id, {
      text: editText,
      priority: editPriority,
      category: editCategory,
    });
    setIsEditing(false);
  };

  const addSubtask = () => {
    if (!newSubtaskText) return;
    const updatedSubtasks = [
      ...task.subtasks,
      { id: uuidv4(), text: newSubtaskText, completed: false },
    ];
    updateTask(task.id, { subtasks: updatedSubtasks });
    setNewSubtaskText("");
  };

  const toggleSubtaskComplete = (subId) => {
    const updatedSubtasks = task.subtasks.map((sub) =>
      sub.id === subId ? { ...sub, completed: !sub.completed } : sub,
    );
    updateTask(task.id, { subtasks: updatedSubtasks });
  };

  const updateSubtaskText = (subId, newText) => {
    const updatedSubtasks = task.subtasks.map((sub) =>
      sub.id === subId ? { ...sub, text: newText } : sub,
    );
    updateTask(task.id, { subtasks: updatedSubtasks });
  };

  const deleteSubtask = (subId) => {
    const updatedSubtasks = task.subtasks.filter((sub) => sub.id !== subId);
    updateTask(task.id, { subtasks: updatedSubtasks });
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />

      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <select
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          >
            <option>Work</option>
            <option>Study</option>
            <option>Personal</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="task-info">
          <h3 className={task.completed ? "completed" : ""}>{task.text}</h3>
          {task.dueDate && <p>Due: {task.dueDate}</p>}
          <p>Priority: {task.priority}</p>
          <p>Category: {task.category}</p>

          <div className="subtasks">
            <h4>Subtasks:</h4>
            {task.subtasks.map((sub) => (
              <div key={sub.id} className="subtask">
                <input
                  type="checkbox"
                  checked={sub.completed}
                  onChange={() => toggleSubtaskComplete(sub.id)}
                />
                <input
                  type="text"
                  value={sub.text}
                  onChange={(e) => updateSubtaskText(sub.id, e.target.value)}
                />
                <button onClick={() => deleteSubtask(sub.id)}>Delete</button>
              </div>
            ))}
            <input
              type="text"
              placeholder="New Subtask"
              value={newSubtaskText}
              onChange={(e) => setNewSubtaskText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSubtask()}
            />
            <button onClick={addSubtask}>Add Subtask</button>
          </div>

          <button onClick={() => setIsEditing(true)}>Edit Task</button>
          <button onClick={() => deleteTask(task.id)}>Delete Task</button>
        </div>
      )}
    </div>
  );
}
