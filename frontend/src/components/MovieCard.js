import React from "react";
import { Link } from "react-router-dom";
const MovieCard = (movie) => {
  return (
    <div className="col-md-3 col-sm-6 col-6 mb-2">
      <Link
        to={`movies/${movie.movie.id}`}
        className="text-dark text-decoration-none"
      >
        <div className="card">
          <img
            src={movie.movie.image}
            className="card-img-top img-fluid"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{movie.movie.name}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default MovieCard;
