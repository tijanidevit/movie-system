import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
});

export const Login = () => {
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
      <h1>Login Here</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          try {
            const res = await axios.post(API_URL + "users/login", values);
            let output = res.data;
            if (output.success) {
              localStorage.setItem("userToken", output.token);
              alert("Login Successful ");
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
