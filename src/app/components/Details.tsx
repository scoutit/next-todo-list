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
                            width: "250px",
                            overflow: "hidden",
                            color: "#001affff",
                          }}
                        >
                          <Link
                            href={detail.url}
                            title={detail.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              maxWidth: "100%",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              color: "#001affff",
                              textDecoration: "underline",
                            }}
                          >
                            {detail.url}
                          </Link>
                        </div>
                        <div
                          style={{ width: "345px", wordBreak: "break-word" }}
                        >
                          {detail.position}
                        </div>
                        <div style={{ width: "60px" }}>{detail.salary}</div>
                        <div style={{ width: "55px" }}>
                          {detail.dateApplied}
                        </div>
                        <div
                          style={{ width: "185px", wordBreak: "break-word" }}
                        >
                          {detail.notes}
                        </div>
                      </div>
                      <div
                        id="buttonPill"
                        className="details-actions"
                        style={{
                          display: "flex",
                          background: "#f0f0f0",
                          borderRadius: "20px",
                          padding: "2px",
                          width: "fit-content",
                          overflow: "hidden",
                        }}
                      >
                        <button
                          className={"bg-green-500 add-remove-button"}
                          style={{
                            cursor: detail.done ? "not-allowed" : "pointer",
                            borderRadius: "18px 0 0 18px",
                            margin: 0,
                            border: "none",
                            padding: "4px 6px",
                          }}
                          onClick={() => handleClickDoneJobDetails(detail.id)}
                          disabled={detail.done}
                        >
                          Done
                        </button>
                        <button
                          className={"bg-cyan-500 add-remove-button"}
                          style={{
                            cursor: detail.done ? "not-allowed" : "pointer",
                            borderRadius: 0,
                            margin: 0,
                            border: "none",
                            borderLeft: "1px solid rgba(255,255,255,0.2)",
                            borderRight: "1px solid rgba(255,255,255,0.2)",
                            padding: "4px 4px",
                          }}
                          onClick={() => handleClickEditJobDetails(detail.id)}
                          disabled={detail.done}
                        >
                          Edit
                        </button>
                        <button
                          className={"bg-pink-500 add-remove-button"}
                          style={{
                            cursor: "pointer",
                            borderRadius: "0 18px 18px 0",
                            margin: 0,
                            border: "none",
                            padding: "4px 6px",
                          }}
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
