import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

const SignupSchema = Yup.object().shape({
  fullname: Yup.string().required("Fullname is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password length must be upto six characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  profileImage: Yup.mixed().required("Profile Image is required"),
});

export const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken !== undefined && userToken !== null) {
      navigate(-1);
    }
  }, [navigate]);
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "85vh" }}
    >
      <h1>Signup Here</h1>
      <Formik
        initialValues={{
          fullname: "",
          email: "",
          password: "",
          profileImage: null,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const res = await axios.post(API_URL + "users/register", values, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            let output = res.data;
            if (output.success) {
              localStorage.setItem("userToken", output.token);
              alert("Registration Successful");
              navigate(-1);
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
              <label>Fullname</label>
              <Field name="fullname" className="form-control" />
              {errors.fullname && touched.fullname ? (
                <div className="text-danger">{errors.fullname}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <Field name="email" type="email" className="form-control" />
              {errors.email && touched.email ? (
                <div className="text-danger">{errors.email}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Password</label>
              <Field name="password" type="password" className="form-control" />
              {errors.password && touched.password ? (
                <div className="text-danger">{errors.password}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label>Profile Image</label>

              <input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(event) => {
                  setFieldValue("profileImage", event.currentTarget.files[0]);
                }}
              />
              {errors.profileImage && touched.profileImage ? (
                <div className="text-danger">{errors.profileImage}</div>
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
