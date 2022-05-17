import React from "react";
import "../assets/style.css";
import Comments from "./Comments";
import AddComment from "./AddComment";
export const SingleMovie = ({ movie, comments }) => {
  const userToken = localStorage.getItem("userToken");
  const dateConverter = (date) => {
    var d = new Date(date);
    return d.getUTCDay() + "/" + d.getUTCMonth() + "/" + d.getUTCFullYear();
  };
  return (
    <div>
      <div className="card mb-2">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-12 mb-2">
              <img
                src={movie.photo}
                className="card-img-top img-fluid"
                alt="Movie"
                style={{ minHeight: 500 }}
              />
            </div>
            <div className="col-md-8 col-sm-12 col-12 mb-2">
              <div className="">
                <h2 className="movie-name">{movie.name}</h2>
                <p className="bold">{movie.description}</p>
                <div className="d-flex justify-content-around flex-row">
                  <p className="card-text">Price: &#8358;{movie.ticketPrice}</p>
                  <p className="card-text">Rating: {movie.ticketPrice}</p>
                  <p className="card-text">
                    Released Date: {dateConverter(movie.releaseDate)}
                  </p>
                  <p className="card-text">Country: {movie.country}</p>
                  <p className="card-text">Genre: {movie.genre}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-5">
        <div className="card-body">
          <h2>Comments</h2>
          {userToken !== undefined && userToken !== null && (
            <AddComment movie={movie} />
          )}
          {userToken === undefined ||
            (userToken === null && <p>Please login or register to comment </p>)}
          <Comments comments={comments} />
        </div>
      </div>
    </div>
  );
};
