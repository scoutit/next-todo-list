import React from "react";
import Link from "next/link";
import type { JobDetails } from "../types/JobDetails";

type DetailsProperties = {
  jobDetails: JobDetails[];
  removeJobDetails: (id: string) => void;
};

export default function Details({
  jobDetails,
  removeJobDetails,
}: DetailsProperties) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {jobDetails.map((detail) => (
        <li
          key={detail.id}
          style={{
            background: "#f3f3f3",
            color: "#333333",
            marginBottom: 8,
            padding: 10,
            borderRadius: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid #ccc",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            width: "100%",
            fontSize: "0.9em",
          }}
        >
          <div>{detail.company}</div>
          <div
            style={{
              maxWidth: "230px",
              overflow: "hidden",
              color: "#001affff",
            }}
          >
            <Link href={detail.url}>{detail.url}</Link>
          </div>
          <div style={{ width: "300px", wordBreak: "break-word" }}>
            {detail.position}
          </div>
          <div>{detail.salary}</div>
          <div>{detail.dateApplied}</div>
          <div
            style={{
              maxWidth: "230px",
              wordBreak: "break-word",
            }}
          >
            {detail.notes}
          </div>
          <button
            className={"bg-pink-500 add-remove-button"}
            onClick={() => removeJobDetails(detail.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}
