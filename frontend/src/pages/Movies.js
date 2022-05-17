import axios from "axios";
import React, { useEffect, useState } from "react";
import { Banner, AllMovies } from "../components";
import { API_URL } from "../constants";

export const Movies = () => {
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

  return (
    <div>
      <Banner />
      <div className="container">
        <h3 className="text-center">Latest Movies</h3>
        <AllMovies movies={movies} />
      </div>
    </div>
  );
};
