import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";

const CommentSchema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),
});

const AddComment = ({ movie }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const userToken = localStorage.getItem("userToken");
  return (
    <div>
      <h4>Add Comment</h4>
      <Formik
        initialValues={{
          comment: "",
        }}
        validationSchema={CommentSchema}
        onSubmit={async (values) => {
          try {
            const res = await axios.post(
              API_URL + "movies/" + movie.id + "/comments",
              values,
              {
                headers: {
                  Authorization: "Bearer " + userToken,
                },
              }
            );
            let output = res.data;
            if (output.success) {
              alert("Comment Added!");
              navigate(0);
            } else {
              setMessage(output.message);
            }
          } catch (error) {
            setMessage(error.message);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            {message !== "" && (
              <div className="form-group">
                <div className="alert alert-warning">{message}</div>
              </div>
            )}

            <div className="form-group">
              <Field as="textarea" name="comment" className="form-control" />
              {errors.comment && touched.comment ? (
                <div className="text-danger">{errors.comment}</div>
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

export default AddComment;
