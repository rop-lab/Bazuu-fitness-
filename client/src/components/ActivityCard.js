import React, { useState } from "react";

function ActivityCard({ activity, handleUpdateActivity, handleDeleteActivity }) {
  const { id, title, picture, description, duration } = activity;
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to track whether to show the update form
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedDuration, setUpdatedDuration] = useState(duration);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedActivity = {
      ...activity,
      description: e.target.description.value,
      duration: parseInt(updatedDuration) // Convert duration to integer
    };
    handleUpdate(updatedActivity);
  };

  const handleUpdate = async (updatedActivity) => {
    const response = await fetch(`/fitness-activities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedActivity),
    });
    const data = await response.json();
    handleUpdateActivity(data);
    setShowUpdateForm(false); // Hide the update form after submission
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`/fitness-activities/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleDeleteActivity(id);
      alert("Deleted Successfully");
    }
  };

  return (
    <li className="activity-card">
      <img className="activity-image" src={picture} alt={title} />
      <div className="activity-details">
        <h4 className="activity-title">{title}</h4>
        <p className="activity-description">Description: {description}</p>
        <p className="activity-duration">Duration: {duration} minutes</p>
      </div>
      {showUpdateForm ? (
        <form className="activity-form" onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="text"
            placeholder="New description..."
            name="description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <input
            className="form-input"
            type="number"
            placeholder="New duration..."
            name="duration"
            value={updatedDuration}
            onChange={(e) => setUpdatedDuration(e.target.value)}
          />
          <div className="button-container">
            <button className="form-button" type="submit">Update</button>
            <button className="delete-button" onClick={handleDeleteClick}>Delete</button>
          </div>
        </form>
      ) : (
        <button className="form-button" onClick={() => setShowUpdateForm(true)}>Update or Delete</button>
      )}
    </li>
  );
}

export default ActivityCard;
