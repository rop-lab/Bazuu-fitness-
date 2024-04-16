import { useState } from "react";

function NewActivityForm({ onAddActivity }) {
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/fitness-activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        picture: picture,
        description: description,
        duration: duration,
      }),
    })
      .then((r) => r.json())
      .then((newActivity) => onAddActivity(newActivity));
  }

  return (
    <div className="new-activity-form">
      <h2>New Activity</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Activity Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="picture"
          placeholder="Picture URL"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}

export default NewActivityForm;
