import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMovie } from "../components";
import { API_URL } from "../constants";

export const MovieDetails = () => {
  let { slug } = useParams();
  const [movie, setMovie] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetchMovie();
  });
  const fetchMovie = async () => {
    const data = await axios.get(API_URL + "movies/" + slug);
    const output = data.data;
    if (output.success) {
      setMovie(output.data);
    } else {
      setMessage(output.message);
    }
  };

  return (
    <div>
      <div className="container">
        <h3 className="text-center">Latest Movies</h3>
        <SingleMovie movie={movie} />
      </div>
    </div>
  );
};
