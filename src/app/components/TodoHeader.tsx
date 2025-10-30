import React from "react";

type TodoHeaderProps = {
  input: string;
  setInput: (val: string) => void;
  addTodo: () => void;
};

export default function TodoHeader({
  input,
  setInput,
  addTodo,
}: TodoHeaderProps) {
  return (
    <>
      <h1 className={"title-header"}>Jobs To-Do</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new company to your to-do list"
          style={{ flex: 1, padding: 8 }}
        />
        <button className={"bg-blue-500 add-remove-button"} onClick={addTodo}>
          Add
        </button>
      </div>
    </>
  );
}
