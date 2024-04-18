import React, { useState, useEffect } from "react"; // Combine useState and useEffect imports
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from 'react-router-dom'; // Import useHistory hook to redirect
import useAuthStore from "./authStore"; // Import useAuthStore hook


function ActivityCard({ activity, handleUpdateActivity, handleDeleteActivity }) {
  const { id, title, picture, description, duration } = activity;
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State to track whether to show the update form
  const { isLoggedIn, userId, checkSession } = useAuthStore(); // Access the checkSession function from useAuthStore
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    checkSession(); // Check session when component mounts
  }, [checkSession]);

  const initialValues = {
    description: description,
    duration: duration.toString(),
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
    duration: Yup.number().required("Duration is required").positive("Duration must be positive"),
  });

  const handleSubmit = async (values) => {
    const updatedActivity = {
      ...activity,
      description: values.description,
      duration: parseInt(values.duration) // Convert duration to integer
    };
    try {
      const response = await fetch(`/fitness-activities/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedActivity),
      });
      const data = await response.json();
      if (response.ok) {
        handleUpdateActivity(data);
        
      } else if (response.status === 403) {
        alert("You are not the owner of this activity. You cannot update it."); // Display alert for FORBIDDEN error
      } 
    } catch (error) {
      console.error("Error:", error);
    }
    setShowUpdateForm(false); // Hide the update form after submission
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`/fitness-activities/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleDeleteActivity(id);
      alert("Deleted Successfully");
    } else if (response.status === 403) {
      alert("You are not the owner of this activity. You cannot delete it."); // Display alert for FORBIDDEN error
    }
    setShowUpdateForm(false);
  };

 
  const handleLikeClick = async () => {
    try {
      if (!isLoggedIn) {
        // If user is not logged in, redirect to login page
        alert("Please log in to like!");
        history.push('/login');
        return;
      }
  
      const userFitnessActivityResponse = await fetch("/user-fitness-activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          fitness_activity_id: id, // Use the activity ID directly from props
          access: "follower",
        }),
      });
  
      if (!userFitnessActivityResponse.ok) {
        // Handle error if adding user fitness activity fails
        console.error("Error adding user fitness activity:", userFitnessActivityResponse.statusText);
        return;
      }
  
      // Notify user that the activity has been liked successfully
      alert("Activity liked successfully!");
  
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  

  return (
    <div>
      <li className="activity-card">
        <img className="activity-image" src={picture} alt={title} />
        <div className="activity-details">
          <h4 className="activity-title">{title}</h4>
          <p className="activity-description">Description: {description}</p>
          <p className="activity-duration">Duration: {duration} minutes</p>
        </div>
        {showUpdateForm ? (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="activity-form">
                <Field className="form-input" type="text" name="description" placeholder="New description..." />
                <ErrorMessage name="description" component="div" className="error-message" />
                <Field className="form-input" type="number" name="duration" placeholder="New duration..." />
                <ErrorMessage name="duration" component="div" className="error-message" />
                <div className="button-container">
                  <button className="form-button" type="submit" disabled={isSubmitting}>Update</button>
                  <button type="button" className="delete-button" onClick={handleDeleteClick}>Delete</button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="button-container">
            <button className="form-button" onClick={() => setShowUpdateForm(true)}>Update or Delete</button>
            <button type="button" className="form-button" onClick={handleLikeClick}>Like</button>
          </div>
        )}
      </li>
    </div>
  );
}

export default ActivityCard;
