import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({
  tasks,
  toggleComplete,
  deleteTask,
  updateTask,
  filter,
  search,
  sortBy,
}) {
  const displayedTasks = tasks
    .filter((t) => {
      if (filter === "Completed") return t.completed;
      if (filter === "Pending") return !t.completed;
      return true;
    })
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
    });

  return (
    <div className="todo-list">
      {displayedTasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      ))}
    </div>
  );
}
