import React from "react";

export default function Filter({ filter, setFilter, clearCompleted }) {
  return (
    <div className="filter">
      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Pending")}>Pending</button>
      <button onClick={() => setFilter("Completed")}>Completed</button>
      <button onClick={clearCompleted}>Clear Completed</button>
    </div>
  );
}
