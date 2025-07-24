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
  const [activeTab, setActiveTab] = useState('tab1');

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

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <main style={{ maxWidth: activeTab === 'tab1' ? 500 : 950, margin: "40px auto", fontFamily: "sans-serif", background: "#b09494ff", padding: 20, borderRadius: 8 }}>
      {/* Tab Buttons */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        <button
          onClick={() => handleTabClick('tab1')}
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: activeTab === 'tab1' ? '#eee' : 'white' }}
        >
          To-Do
        </button>
        <button
          onClick={() => handleTabClick('tab2')}
          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', background: activeTab === 'tab2' ? '#eee' : 'white' }}
        >
          Applications
        </button>
      </div>

      {/* Tab Content */}
      <div style={{ padding: '20px', border: '1px solid #ccc', borderTop: 'none' }}>
        {activeTab === 'tab1' && (
          <>
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
          </>
        )}
        {activeTab === 'tab2' && (
          <div>
            <h2>My Application's Status'?</h2>
            <p>N/A</p>
          </div>
        )}
      </div>
    </main>
  );
}