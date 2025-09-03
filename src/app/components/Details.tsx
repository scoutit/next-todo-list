import React from "react";
import Link from "next/link";
import type { JobDetails } from "../types/JobDetails";

type DetailsProperties = {
  jobDetails: JobDetails[];
  removeJobDetails: (id: string) => void;
  handleClickEditJobDetails: (detailsId: string) => void;
};

type DoneState = {
  [id: string]: boolean;
};

export default function Details({
  jobDetails,
  removeJobDetails,
  handleClickEditJobDetails,
}: DetailsProperties) {
  const [doneState, setDoneState] = React.useState<DoneState>({});

  const handleDone = (id: string) => {
    setDoneState((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {jobDetails.map((detail) => {
        const isDone = doneState[detail.id];
        return (
          <li key={detail.id} className="details-list-item">
            <div className={`details-info${isDone ? " details-done" : ""}`}>
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
              <div style={{ width: "245px", wordBreak: "break-word" }}>
                {detail.position}
              </div>
              <div style={{ width: "60px" }}>{detail.salary}</div>
              <div style={{ width: "55px" }}>{detail.dateApplied}</div>
              <div style={{ width: "85px", wordBreak: "break-word" }}>
                {detail.notes}
              </div>
            </div>
            <div className="details-actions">
              <button
                className={"bg-green-500 add-remove-button"}
                style={{
                  marginRight: 5,
                  cursor: isDone ? "not-allowed" : "pointer",
                }}
                onClick={() => handleDone(detail.id)}
                disabled={isDone}
              >
                Done
              </button>
              <button
                className={"bg-cyan-500 add-remove-button"}
                style={{
                  marginRight: 5,
                  cursor: isDone ? "not-allowed" : "pointer",
                }}
                onClick={() => handleClickEditJobDetails(detail.id)}
                disabled={isDone}
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
        );
      })}
    </ul>
  );
}
