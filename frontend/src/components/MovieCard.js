import React from "react";
import { Link } from "react-router-dom";
const MovieCard = ({ movie }) => {
  return (
    <div className="col-md-3 col-sm-6 col-6 mb-2">
      <Link
        to={`/movies/${movie.id}`}
        className="text-dark text-decoration-none"
      >
        <div className="card">
          <img src={movie.photo} className="card-img-top img-fluid" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{movie.name}</h5>
            <div className="d-flex   flex-row">
              <p className="card-text">Price: &#8358;{movie.ticketPrice}</p>
              <p className="card-text">Rating: {movie.ticketPrice}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default MovieCard;
