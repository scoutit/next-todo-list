import React from "react";
import Link from "next/link";
import type { JobDetails } from "../types/JobDetails";

type DetailsProperties = {
  jobDetails: JobDetails[];
  removeJobDetails: (id: string) => void;
  handleClickEditJobDetails: (detailsId: string) => void;
};

export default function Details({
  jobDetails,
  removeJobDetails,
  handleClickEditJobDetails,
}: DetailsProperties) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {jobDetails.map((detail) => (
        <li key={detail.id} className="details-list-item">
          <div className="details-info">
            <div style={{ width: "100px" }}>{detail.company}</div>
            <div
              style={{
                width: "200px",
                overflow: "hidden",
                color: "#001affff",
              }}
            >
              <Link href={detail.url}>{detail.url}</Link>
            </div>
            <div style={{ width: "250px", wordBreak: "break-word" }}>
              {detail.position}
            </div>
            <div style={{ width: "60px" }}>{detail.salary}</div>
            <div style={{ width: "60px" }}>{detail.dateApplied}</div>
            <div style={{ width: "90px", wordBreak: "break-word" }}>
              {detail.notes}
            </div>
          </div>
          <div className="details-actions">
            <button
              className={"bg-cyan-500 add-remove-button"}
              style={{ marginRight: 5, cursor: "pointer" }}
              onClick={() => handleClickEditJobDetails(detail.id)}
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
      ))}
    </ul>
  );
}
