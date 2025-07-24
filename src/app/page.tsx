"use client";
import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoHeader from "./components/TodoHeader";
import DetailsHeader from "./components/DetailsHeader";
import Details from "./components/Details";
import type { JobDetails } from "./types/JobDetails";

type Todo = {
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [jobDetails, setJobDetails] = useState<JobDetails[]>([]);
  const [inputJobDetails, setInputJobDetails] = useState<JobDetails>({
    company: "",
    url: "",
    position: "",
    dateApplied: "",
    notes: "",
  });

  useEffect(() => {
    let saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));

    saved = null;
    saved = localStorage.getItem("jobDetails");
    if (saved) setJobDetails(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("jobDetails", JSON.stringify(jobDetails));
  }, [todos, jobDetails]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (idx: number) => {
    setTodos(
      todos.map((todo, i) => (i === idx ? { ...todo, done: !todo.done } : todo))
    );
  };

  const removeTodo = (idx: number) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  const addJobDetails = () => {
    if (!inputJobDetails.company.trim()) return;
    setJobDetails([...jobDetails, { ...inputJobDetails }]);
    setInputJobDetails({
      company: "",
      url: "",
      position: "",
      dateApplied: "",
      notes: "",
    });
  };

  const removeJobDetails = (idx: number) => {
    setJobDetails(jobDetails.filter((_, i) => i !== idx));
  };

  return (
    <main
      style={{
        maxWidth: activeTab === "tab1" ? 500 : 950,
        margin: "40px auto",
        fontFamily: "sans-serif",
        background: "#b09494ff",
        padding: 20,
        borderRadius: 8,
      }}
    >
      {/* Tab Buttons */}
      <div style={{ display: "flex", borderBottom: "1px solid #ccc" }}>
        <button
          onClick={() => handleTabClick("tab1")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            border: "none",
            background: activeTab === "tab1" ? "#eee" : "white",
          }}
        >
          To-Do
        </button>
        <button
          onClick={() => handleTabClick("tab2")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            border: "none",
            background: activeTab === "tab2" ? "#eee" : "white",
          }}
        >
          Applications
        </button>
      </div>

      {/* Tab Content */}
      <div
        style={{ padding: "20px", border: "1px solid #ccc", borderTop: "none" }}
      >
        {activeTab === "tab1" && (
          <>
            <TodoHeader input={input} setInput={setInput} addTodo={addTodo} />
            <TodoList
              todos={todos}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          </>
        )}
        {activeTab === "tab2" && (
          <>
            <DetailsHeader
              inputJobDetails={inputJobDetails}
              setInputJobDetails={setInputJobDetails}
              addJobDetails={addJobDetails}
            />
            {jobDetails.length === 0 ? (
              <p style={{ textAlign: "center", color: "#888" }}>
                No job applications added yet.
              </p>
            ) : (
              <Details
                jobDetails={jobDetails}
                removeJobDetails={removeJobDetails}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
