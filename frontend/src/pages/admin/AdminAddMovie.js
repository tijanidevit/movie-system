import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";

const MovieSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  releaseDate: Yup.date("Invalid Date").required("Release Date is required"),
  rating: Yup.number("Please enter a digit value")
    .required("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must not be more than 5"),
  ticketPrice: Yup.number("Please enter a digit value").required(
    "Ticket Price is required"
  ),
  description: Yup.string()
    .required("Description is required")
    .min(6, "Description length must be upto six characters"),
  country: Yup.string().required("Country is required"),
  genre: Yup.string().required("Genre is required"),
  photo: Yup.mixed().required("Photo is required"),
});

export const AdminAddMovie = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken === undefined || adminToken === null) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "85vh" }}
    >
      <h1>
        Add new movie{" "}
        <Link to="/admin/movies" className="btn btn-primary">
          All Movies
        </Link>
      </h1>
      <Formik
        initialValues={{
          name: "",
          releaseDate: "",
          rating: "",
          genre: "",
          country: "",
          ticketPrice: "",
          description: "",
          photo: null,
        }}
        validationSchema={MovieSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const res = await axios.post(API_URL + "movies/", values, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            let output = res.data;
            if (output.success) {
              resetForm({ values: "" });
              setMessage("Movie added successfully. Add More");
            } else {
              setMessage(output.message);
            }
          } catch (error) {
            setMessage(error.message);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form style={{ width: "40vw" }} encType="multipart/form-data">
            {message !== "" && (
              <div className="form-group">
                <div className="alert alert-warning">{message}</div>
              </div>
            )}
            <div className="form-group">
              <label>Movie name</label>
              <Field name="name" className="form-control" />
              {errors.name && touched.name ? (
                <div className="text-danger">{errors.name}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Description</label>
              <Field
                name="description"
                as="textarea"
                className="form-control"
              ></Field>
              {errors.description && touched.description ? (
                <div className="text-danger">{errors.description}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Release date</label>
              <Field name="releaseDate" type="date" className="form-control" />
              {errors.releaseDate && touched.releaseDate ? (
                <div className="text-danger">{errors.releaseDate}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Rating</label>
              <Field
                name="rating"
                min="1"
                max="5"
                type="number"
                className="form-control"
              />
              {errors.rating && touched.rating ? (
                <div className="text-danger">{errors.rating}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Ticket Price</label>
              <Field name="ticketPrice" className="form-control" />
              {errors.ticketPrice && touched.ticketPrice ? (
                <div className="text-danger">{errors.ticketPrice}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Country</label>
              <Field name="country" type="text" className="form-control" />
              {errors.country && touched.country ? (
                <div className="text-danger">{errors.country}</div>
              ) : null}
            </div>

            {/* Will be back to change this to genres in the database. Add new tables (genre and movieGenre) */}
            <div className="form-group">
              <label>Genre(s)</label>
              <Field name="genre" type="text" className="form-control" />
              {errors.genre && touched.genre ? (
                <div className="text-danger">{errors.genre}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Photo</label>

              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(event) => {
                  setFieldValue("photo", event.currentTarget.files[0]);
                }}
              />
              {errors.photo && touched.photo ? (
                <div className="text-danger">{errors.photo}</div>
              ) : null}
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
