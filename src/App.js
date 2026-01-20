import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";
import Search from "./components/Search";
import Sort from "./components/Sort";
import AddTaskModal from "./components/AddTaskModal";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [darkMode, setDarkMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const updateTask = (id, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)),
    );
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const clearCompleted = () =>
    setTasks((prevTasks) => prevTasks.filter((t) => !t.completed));

  return (
    <div className={darkMode ? "App dark" : "App"}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="controls">
        <button onClick={() => setModalOpen(true)}>Add Task</button>
        <Search search={search} setSearch={setSearch} />
        <Filter
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
        <Sort sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      <TodoList
        tasks={tasks}
        filter={filter}
        search={search}
        sortBy={sortBy}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />

      {modalOpen && (
        <AddTaskModal
          closeModal={() => setModalOpen(false)}
          addTask={addTask}
        />
      )}
    </div>
  );
}

export default App;
