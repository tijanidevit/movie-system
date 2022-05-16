import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banner, AllMovies } from "../components";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {}, []);
  return (
    <div>
      <Banner />
      <div className="container">
        <h3 className="text-center">Latest Movies</h3>
        <AllMovies />
      </div>
    </div>
  );
};
