import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AllMovies } from "../../components";
import { API_URL } from "../../constants";
export const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const data = await axios.get(API_URL + "movies/");
    const output = data.data;
    if (output.success) {
      setMovies(output.data);
    } else {
      setMessage(output.message);
    }
  };

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken === undefined || adminToken === null) {
      navigate("/admin");
    }
  }, [navigate]);
  return (
    <div>
      <div className="container">
        <h3 className="text-center mt-5">
          All Movies{" "}
          <Link className="btn btn-primary" to="/admin/movies/new">
            Add new Movie
          </Link>
        </h3>
        <div className="mt-5">
          {message !== "" && (
            <div className="form-group">
              <div className="alert alert-warning">{message}</div>
            </div>
          )}
          <AllMovies movies={movies} />
        </div>
      </div>
    </div>
  );
};
