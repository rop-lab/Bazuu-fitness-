import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function NewActivityForm({ onAddActivity }) {
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

  const handleSubmit = (values, { resetForm }) => {
    fetch("/fitness-activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((newActivity) => {
        onAddActivity(newActivity);
        resetForm(); // Reset the form fields after successful submission
      });
  };

  return (
    <div className="new-activity-form">
      <h2>New Activity</h2>
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
