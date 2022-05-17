import React from "react";
import { Link } from "react-router-dom";
import "../assets/style.css";
export const SingleMovie = ({ movie }) => {
  return (
    <div className="col-md-3 col-sm-6 col-6 mb-2">
      <Link
        to={`/movies/${movie.slug}`}
        className="text-dark text-decoration-none"
      >
        <div className="card hover">
          <img
            src={movie.photo}
            className="card-img-top img-fluid"
            alt="Movie"
            style={{ minHeight: 200, maxHeight: 200 }}
          />
          <div className="card-body">
            <h5 className="card-title">{movie.name}</h5>
            <div className="d-flex justify-content-between flex-row">
              <p className="card-text">Price: &#8358;{movie.ticketPrice}</p>
              <p className="card-text">Rating: {movie.ticketPrice}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
