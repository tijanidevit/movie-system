import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleMovie } from "../../components";
import { API_URL } from "../../constants";

export const AdminMovieDetails = () => {
  let { slug } = useParams();
  const [movie, setMovie] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (movie.length === 0) {
      fetchMovie();
    }
  }, [movie]);
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
        {movie.length !== 0 && (
          <>
            <h3 className="text-center mt-5">{movie.movie.name}</h3>
            <SingleMovie movie={movie.movie} comments={movie.comments} />
          </>
        )}

        {message !== "" && (
          <>
            <h3 className="alert alert-warning">{message}</h3>
          </>
        )}
      </div>
    </div>
  );
};
