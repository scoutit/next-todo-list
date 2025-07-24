import React from "react";

type Todo = {
  text: string;
  done: boolean;
};

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (idx: number) => void;
  removeTodo: (idx: number) => void;
};

export default function TodoList({ todos, toggleTodo, removeTodo }: TodoListProps) {
  return (
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
  );
}