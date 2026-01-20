import React from "react";

export default function Search({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      placeholder="Search tasks..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
