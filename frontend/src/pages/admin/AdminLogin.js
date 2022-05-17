import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  username: Yup.string().required("Username is required"),
});

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  useEffect(() => {
    const admin = localStorage.getItem("adminToken");
    if (admin !== undefined && admin !== null) {
      navigate("/admin/movies");
    }
  }, [navigate]);
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "85vh" }}
    >
      <h1>Admin Login</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values) => {
          try {
            const res = await axios.post(API_URL + "admin/login", values);
            let output = res.data;
            if (output.success) {
              localStorage.setItem("adminToken", output.token);
              alert("Login Successful");
              navigate("/admin/movies");
            } else {
              setMessage(output.message);
            }
          } catch (error) {
            setMessage(error.message);
            console.log(error);
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
              <label>Username</label>
              <Field name="username" type="text" className="form-control" />
              {errors.username && touched.username ? (
                <div className="text-danger">{errors.username}</div>
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
