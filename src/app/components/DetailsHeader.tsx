import React from "react";
import type { JobDetails } from "../types/JobDetails";

type DetailsHeaderProps = {
  inputJobDetails: JobDetails;
  isEditing: boolean;
  setInputJobDetails: (val: JobDetails) => void;
  addJobDetails: () => void;
  editJobDetails: (id: string) => void;
};

export default function DetailsHeader({
  inputJobDetails,
  isEditing,
  setInputJobDetails,
  addJobDetails,
  editJobDetails,
}: DetailsHeaderProps) {
  const canAddJobDetail =
    inputJobDetails.company.trim() !== "" &&
    inputJobDetails.position.trim() !== "" &&
    inputJobDetails.dateApplied.trim() !== "";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canAddJobDetail) {
      e.preventDefault();
      isEditing ? editJobDetails(inputJobDetails.id) : addJobDetails();
    }
  };

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
          style={{ width: "120px", color: isEditing ? "#6d6d6dff" : "initial" }}
          disabled={isEditing}
        />
        <input
          value={inputJobDetails.url}
          onChange={(e) =>
            setInputJobDetails({ ...inputJobDetails, url: e.target.value })
          }
          placeholder="URL"
          style={{ width: "250px" }}
          onKeyDown={handleKeyDown}
        />
        <input
          value={inputJobDetails.position}
          onChange={(e) =>
            setInputJobDetails({ ...inputJobDetails, position: e.target.value })
          }
          placeholder="Position"
          style={{ width: "335px", color: isEditing ? "#6d6d6dff" : "initial" }}
          disabled={isEditing}
          onKeyDown={handleKeyDown}
        />
        <input
          value={inputJobDetails.salary}
          onChange={(e) =>
            setInputJobDetails({
              ...inputJobDetails,
              salary: e.target.value,
            })
          }
          placeholder="Salary"
          style={{ width: "60px" }}
          onKeyDown={handleKeyDown}
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
          style={{ width: "100px", color: isEditing ? "#6d6d6dff" : "initial" }}
          disabled={isEditing}
          onKeyDown={handleKeyDown}
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
          onKeyDown={handleKeyDown}
          style={{ width: "260px" }}
        />
        <button
          className={"bg-blue-500 add-remove-button"}
          onClick={
            isEditing ? () => editJobDetails(inputJobDetails.id) : addJobDetails
          }
          disabled={!canAddJobDetail}
          style={{
            cursor: canAddJobDetail ? "pointer" : "not-allowed",
          }}
          onKeyDown={handleKeyDown}
        >
          {isEditing ? `Save` : `Add`}
        </button>
      </div>
    </>
  );
}
