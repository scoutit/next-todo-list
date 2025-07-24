"use client";
import { useState, useEffect } from "react";

type Todo = {
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (idx: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === idx ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <main style={{ maxWidth: 400, margin: "40px auto", fontFamily: "sans-serif", background: "#b09494ff", padding: 20, borderRadius: 8 }}>
      <h1 className={"title-header"}>Jobs for which my ass needs to apply</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task"
          style={{ flex: 1, padding: 8 }}
        />
        <button className={"bg-blue-500 add-remove-button"} onClick={addTodo}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo, idx) => (
          <li
            key={idx}
            style={{
              background: "#f3f3f3",
              marginBottom: 8,
              padding: 10,
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              textDecoration: todo.done ? "line-through" : "none",
              cursor: "pointer",
              color: todo.done ? "#6d6d6dff" : "initial",
              fontStyle: todo.done ? "italic" : "normal"
            }}
            onClick={() => toggleTodo(idx)}
          >
            <span style={{ flex: 1 }}>{todo.text}</span>
            <button
              className={"bg-pink-500 add-remove-button"}
              style={{ marginLeft: 10 }}
              onClick={e => {
                e.stopPropagation();
                removeTodo(idx);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}