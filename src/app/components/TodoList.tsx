import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";

type Todo = {
  text: string;
  done: boolean;
};

type TodoListProps = {
  todos: Todo[];
  toggleTodo: (idx: number) => void;
  removeTodo: (idx: number) => void;
  onReorder: (newOrder: Todo[]) => void;
};

export default function TodoList({
  todos,
  toggleTodo,
  removeTodo,
  onReorder,
}: TodoListProps) {
  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const reordered = Array.from(todos);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onReorder(reordered);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todoListDroppable">
        {(provided: DroppableProvided) => (
          <ul
            style={{ listStyle: "none", padding: 0 }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {todos.map((todo, idx) => (
              <Draggable key={idx} draggableId={String(idx)} index={idx}>
                {(
                  provided: DraggableProvided,
                  snapshot: DraggableStateSnapshot
                ) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      background: snapshot.isDragging ? "#e0e7ff" : "#f3f3f3",
                      marginBottom: 8,
                      padding: 10,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      textDecoration: todo.done ? "line-through" : "none",
                      cursor: "pointer",
                      color: todo.done ? "#6d6d6dff" : "initial",
                      fontStyle: todo.done ? "italic" : "normal",
                      ...provided.draggableProps.style,
                    }}
                    onClick={() => toggleTodo(idx)}
                  >
                    <span style={{ flex: 1 }}>{todo.text}</span>
                    <button
                      className={"bg-pink-500 add-remove-button"}
                      style={{ marginLeft: 10 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTodo(idx);
                      }}
                    >
                      Remove
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
