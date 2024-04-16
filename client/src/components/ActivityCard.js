import React, { useState } from "react";

function ActivityCard({ activity, handleUpdateActivity, handleDeleteActivity }) {
  const { id, title, picture, date, duration } = activity;
  const [updatedDate, setUpdatedDate] = useState(date);
  const [updatedDuration, setUpdatedDuration] = useState(duration);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedActivity = {
      ...activity,
      date: e.target.date.value,
      duration: parseInt(updatedDuration) // Convert duration to integer
    };
    handleUpdate(updatedActivity);
  };

  const handleUpdate = async (updatedActivity) => {
    // No need for datetime module in JavaScript
    // updatedActivity.date = datetime.strptime(updatedActivity.date, '%Y-%m-%d');
  
    const response = await fetch(`/fitness-activities/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedActivity),
    });
    const data = await response.json();
    handleUpdateActivity(data);
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`/fitness-activities/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleDeleteActivity(id);
      alert("Deleted Successfully 🌼");
    }
  };

  return (
    <li className="activity-card">
      <img className="activity-image" src={picture} alt={title} />
      <div className="activity-details">
        <h4 className="activity-title">{title}</h4>
        <p className="activity-date">Date: {date}</p>
        <p className="activity-duration">Duration: {duration}</p>
      </div>
      <form className="activity-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          placeholder="New date..."
          name="date"
          value={updatedDate}
          onChange={(e) => setUpdatedDate(e.target.value)}
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
    </li>
  );
}

export default ActivityCard;
