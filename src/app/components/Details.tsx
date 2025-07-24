import React from "react";
import type { JobDetails } from "../types/JobDetails";

type DetailsProperties = {
  jobDetails: JobDetails[];
  removeJobDetails: (idx: number) => void;
};

export default function Details({
  jobDetails,
  removeJobDetails,
}: DetailsProperties) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {jobDetails.map((detail, idx) => (
        <li
          key={idx}
          style={{
            background: "#f3f3f3",
            marginBottom: 8,
            padding: 10,
            borderRadius: 4,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <strong>Company:</strong> {detail.company}
          </div>
          <div>
            <strong>URL:</strong> {detail.url || "N/A"}
          </div>
          <div>
            <strong>Position:</strong> {detail.position}
          </div>
          <div>
            <strong>Date Applied:</strong> {detail.dateApplied}
          </div>
          <div>
            <strong>Notes:</strong> {detail.notes || "N/A"}
          </div>
          <button
            className={"bg-pink-500 add-remove-button"}
            style={{ marginTop: 10 }}
            onClick={() => removeJobDetails(idx)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
