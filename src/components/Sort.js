import React from "react";

export default function Sort({ sortBy, setSortBy }) {
  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="date">Sort by Date</option>
      <option value="priority">Sort by Priority</option>
      <option value="name">Sort by Name</option>
    </select>
  );
}
