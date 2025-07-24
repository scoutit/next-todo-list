"use client";
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoHeader from "./components/TodoHeader";

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
      <TodoHeader
        input={input}
        setInput={setInput}
        addTodo={addTodo}
      />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
      />
    </main>
  );
}