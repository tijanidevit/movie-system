import React from "react";
import MovieCard from "../components/MovieCard";

export const AllMovies = ({ movies }) => {
  return (
    <div className="row" style={{ marginBottom: 60 }}>
      {movies.length > 0 &&
        movies.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}

      {movies.length === 0 && (
        <div className="alert alert-info"> No movies added yet! </div>
      )}
    </div>
  );
};
