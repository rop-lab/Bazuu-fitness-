import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuthStore from './authStore'; // Import the useAuthStore hook
import { useHistory } from 'react-router-dom'; // Import useHistory hook to redirect

function NewActivityForm({ onAddActivity }) {
  const { isLoggedIn, userId, checkSession } = useAuthStore(); // Destructure isLoggedIn and checkSession from the store
  const history = useHistory(); // Initialize useHistory hook

  useEffect(() => {
    checkSession(); // Check session when component mounts
  }, [checkSession]);

  const initialValues = {
    title: "",
    picture: "",
    description: "",
    duration: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    picture: Yup.string().required("Picture URL is required"),
    description: Yup.string().required("Description is required"),
    duration: Yup.number().required("Duration is required").positive("Duration must be positive"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      if (!isLoggedIn) {
        // If user is not logged in, redirect to login page
        alert("Please log in!");
        history.push('/login');
        return;
      }
  
      // Step 1: Add the activity to the FitnessActivities endpoint
      const response = await fetch("/fitness-activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        // Handle error if adding activity fails
        console.error("Error adding activity:", response.statusText);
        return;
      }
  
      const newActivity = await response.json();
  
      // Step 2: Create a new entry in the UserFitnessActivities endpoint
      const userFitnessActivityResponse = await fetch("/user-fitness-activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          fitness_activity_id: newActivity.id, // Provide the fitness_activity_id
          access: "owner",
        }),
      });
  
      if (!userFitnessActivityResponse.ok) {
        // Handle error if adding user fitness activity fails
        console.error("Error adding user fitness activity:", userFitnessActivityResponse.statusText);
        return;
      }
  
      const newUserFitnessActivity = await userFitnessActivityResponse.json();
  
      // Step 3: Notify parent component about the new activity
      onAddActivity(newActivity);
  
      // Step 4: Reset the form fields after successful submission
      resetForm();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  
  

  return (
    <div className="new-activity-form">
      <h2>Share a New Activity</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="form-field">
              <label htmlFor="title" className="label-bold">Activity Title</label>
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="picture" className="label-bold">Picture URL</label>
              <Field type="text" name="picture" />
              <ErrorMessage name="picture" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="description" className="label-bold">Description</label>
              <Field type="text" name="description" />
              <ErrorMessage name="description" component="div" className="error-message" />
            </div>
            <div className="form-field">
              <label htmlFor="duration" className="label-bold">Duration</label>
              <Field type="number" name="duration" />
              <ErrorMessage name="duration" component="div" className="error-message" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Activity"}
            </button>
          </Form>
        )}
      </Formik>
      <style>{`
        .label-bold {
          font-weight: bold;
        }
        .error-message {
          color: red;
        }
      `}</style>
    </div>
  );
}

export default NewActivityForm;
