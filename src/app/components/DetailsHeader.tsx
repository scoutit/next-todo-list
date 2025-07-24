import React from "react";
import type { JobDetails } from "../types/JobDetails";

type DetailsHeaderProps = {
  inputJobDetails: JobDetails;
  setInputJobDetails: (val: JobDetails) => void;
  addJobDetails: () => void;
};

export default function DetailsHeader({
  inputJobDetails,
  setInputJobDetails,
  addJobDetails,
}: DetailsHeaderProps) {
  const canAddJobDetail =
    inputJobDetails.company.trim() !== "" &&
    inputJobDetails.position.trim() !== "" &&
    inputJobDetails.dateApplied.trim() !== "";

  return (
    <>
      <h1 className={"title-header"}>Job Applications</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={inputJobDetails.company}
          onChange={(e) =>
            setInputJobDetails({ ...inputJobDetails, company: e.target.value })
          }
          placeholder="Company"
          style={{ flex: 1, padding: 8 }}
        />
        <input
          value={inputJobDetails.url}
          onChange={(e) =>
            setInputJobDetails({ ...inputJobDetails, url: e.target.value })
          }
          placeholder="URL"
          style={{ flex: 1, padding: 8 }}
        />
        <input
          value={inputJobDetails.position}
          onChange={(e) =>
            setInputJobDetails({ ...inputJobDetails, position: e.target.value })
          }
          placeholder="Position"
          style={{ flex: 1, padding: 8 }}
        />
        <input
          value={inputJobDetails.dateApplied}
          onChange={(e) =>
            setInputJobDetails({
              ...inputJobDetails,
              dateApplied: e.target.value,
            })
          }
          placeholder="Date Applied"
          style={{ flex: 1, padding: 8 }}
        />
        <input
          value={inputJobDetails.notes}
          onChange={(e) =>
            setInputJobDetails({
              ...inputJobDetails,
              notes: e.target.value,
            })
          }
          placeholder="Notes"
          style={{ flex: 1, padding: 8 }}
        />
        <button
          className={"bg-blue-500 add-remove-button"}
          onClick={addJobDetails}
          disabled={!canAddJobDetail}
        >
          Add
        </button>
      </div>
    </>
  );
}
