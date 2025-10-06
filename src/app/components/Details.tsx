import React from "react";
import Link from "next/link";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import type { JobDetails } from "../types/JobDetails";

interface DetailsProperties {
  jobDetails: JobDetails[];
  jobCounts: { totalJobs: number; activeJobs: number };
  removeJobDetails: (id: string) => void;
  handleClickEditJobDetails: (detailsId: string) => void;
  handleClickDoneJobDetails: (id: string) => void;
  onReorder: (newOrder: JobDetails[]) => void;
}

export default function Details({
  jobDetails,
  jobCounts,
  removeJobDetails,
  handleClickEditJobDetails,
  handleClickDoneJobDetails,
  onReorder,
}: DetailsProperties) {
  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const reordered = Array.from(jobDetails);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onReorder(reordered);
  }

  return (
    <div>
      <div
        style={{
          fontSize: ".9em",
          color: "#555",
          fontStyle: "italic",
        }}
      >
        <span>
          Total: {jobCounts.totalJobs} &nbsp; Active: {jobCounts.activeJobs}
        </span>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="jobDetailsDroppable">
          {(provided: DroppableProvided) => (
            <ul
              style={{ listStyle: "none", padding: 0 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {jobDetails.map((detail, index) => (
                <Draggable
                  key={detail.id}
                  draggableId={detail.id}
                  index={index}
                >
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`details-list-item${
                        snapshot.isDragging ? " dragging" : ""
                      }`}
                      style={{
                        ...provided.draggableProps.style,
                        background: snapshot.isDragging ? "#e0e7ff" : undefined,
                      }}
                    >
                      <div
                        className={`details-info${
                          detail.done ? " details-done" : ""
                        }`}
                      >
                        <div style={{ width: "90px" }}>{detail.company}</div>
                        <div
                          style={{
                            width: "200px",
                            overflow: "hidden",
                            color: "#001affff",
                          }}
                        >
                          <Link href={detail.url}>{detail.url}</Link>
                        </div>
                        <div
                          style={{ width: "245px", wordBreak: "break-word" }}
                        >
                          {detail.position}
                        </div>
                        <div style={{ width: "60px" }}>{detail.salary}</div>
                        <div style={{ width: "55px" }}>
                          {detail.dateApplied}
                        </div>
                        <div style={{ width: "85px", wordBreak: "break-word" }}>
                          {detail.notes}
                        </div>
                      </div>
                      <div className="details-actions">
                        <button
                          className={"bg-green-500 add-remove-button"}
                          style={{
                            marginRight: 5,
                            cursor: detail.done ? "not-allowed" : "pointer",
                          }}
                          onClick={() => handleClickDoneJobDetails(detail.id)}
                          disabled={detail.done}
                        >
                          Done
                        </button>
                        <button
                          className={"bg-cyan-500 add-remove-button"}
                          style={{
                            marginRight: 5,
                            cursor: detail.done ? "not-allowed" : "pointer",
                          }}
                          onClick={() => handleClickEditJobDetails(detail.id)}
                          disabled={detail.done}
                        >
                          Edit
                        </button>
                        <button
                          className={"bg-pink-500 add-remove-button"}
                          style={{ cursor: "pointer" }}
                          onClick={() => removeJobDetails(detail.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
