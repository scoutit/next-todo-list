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

const DEFAULT_JOB_DETAILS: JobDetails = {
  id: "",
  company: "",
  url: "",
  position: "",
  salary: "",
  dateApplied: "",
  notes: "",
  done: false,
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");
  const [isEditing, setIsEditing] = useState(false);
  const [jobDetails, setJobDetails] = useState<JobDetails[]>([]);
  const [inputJobDetails, setInputJobDetails] =
    useState<JobDetails>(DEFAULT_JOB_DETAILS);

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

    const newId =
      inputJobDetails.company.trim().toLowerCase().replace(/\s+/g, "-") +
      "-" +
      inputJobDetails.position.trim().toLowerCase().replace(/\s+/g, "-") +
      "-" +
      inputJobDetails.dateApplied.trim().toLowerCase().replace(/\s+/g, "-") +
      "-" +
      Date.now();
    setJobDetails([...jobDetails, { ...inputJobDetails, id: newId }]);
    setInputJobDetails(DEFAULT_JOB_DETAILS);
  };

  const removeJobDetails = (id: string) => {
    if (isEditing) return;
    setJobDetails(jobDetails.filter((_) => _.id !== id));
  };

  const toggleJobDetailsDone = (id: string) => {
    setJobDetails(
      jobDetails.map((details) =>
        details.id === id ? { ...details, done: !details.done } : details
      )
    );
  };

  const editJobDetails = (id: string) => {
    if (!isEditing) return;
    setJobDetails(
      jobDetails.map((details) =>
        details.id === id ? { ...details, ...inputJobDetails } : details
      )
    );
    setInputJobDetails(DEFAULT_JOB_DETAILS);
    setIsEditing(false);
  };

  const handleClickEditJobDetails = (id: string) => {
    if (activeTab !== "tab2") return;
    const details = jobDetails.find((_) => _.id === id);
    if (details) {
      setInputJobDetails(details);
      setIsEditing(true);
    }
  };

  return (
    <main
      style={{
        maxWidth: activeTab === "tab1" ? 570 : 1020,
        margin: "40px auto",
        fontFamily: "sans-serif",
        background: "#b09494ff",
        padding: 20,
        borderRadius: 8,
      }}
    >
      {/* Tab Buttons */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #ccc",
          color: "#333333",
        }}
      >
        <button
          onClick={() => handleTabClick("tab1")}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            border: "none",
            background: activeTab === "tab1" ? "white" : "#888",
            fontWeight: activeTab === "tab1" ? "bold" : "normal",
            fontSize: activeTab === "tab1" ? "1em" : ".8em",
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
            background: activeTab === "tab2" ? "white" : "#888",
            fontWeight: activeTab === "tab2" ? "bold" : "normal",
            fontSize: activeTab === "tab2" ? "1em" : ".8em",
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
              isEditing={isEditing}
              editJobDetails={editJobDetails}
            />
            {jobDetails.length === 0 ? (
              <p style={{ textAlign: "center", color: "#888" }}>
                No job applications added yet.
              </p>
            ) : (
              <Details
                jobDetails={jobDetails}
                removeJobDetails={removeJobDetails}
                handleClickEditJobDetails={handleClickEditJobDetails}
                handleClickDoneJobDetails={toggleJobDetailsDone}
                onReorder={setJobDetails}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
