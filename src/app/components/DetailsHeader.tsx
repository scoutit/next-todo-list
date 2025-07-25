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
      <h1 className={"title-header"}>These Are My Job Applications</h1>
      <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
        <input
          value={inputJobDetails.company}
          onChange={(e) =>
            setInputJobDetails({ ...inputJobDetails, company: e.target.value })
          }
          placeholder="Company"
        />
        <input
          value={inputJobDetails.url}
          onChange={(e) =>
            setInputJobDetails({ ...inputJobDetails, url: e.target.value })
          }
          placeholder="URL"
          style={{ flex: 1 }}
        />
        <input
          value={inputJobDetails.position}
          onChange={(e) =>
            setInputJobDetails({ ...inputJobDetails, position: e.target.value })
          }
          placeholder="Position"
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
          style={{ width: 100 }}
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
