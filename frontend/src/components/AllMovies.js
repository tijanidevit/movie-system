import React from "react";
import MovieCard from "../components/MovieCard";
const movies = [
  {
    id: 1,
    name: "Xpat",
    image: require("../assets/movie.png"),
  },
  {
    id: 2,
    name: "Xpat 2",
    image: require("../assets/movie.png"),
  },
  {
    id: 3,
    name: "Xpat 3",
    image: require("../assets/movie.png"),
  },
  {
    id: 3,
    name: "Xpat 3",
    image: require("../assets/movie.png"),
  },
  {
    id: 3,
    name: "Xpat 3",
    image: require("../assets/movie.png"),
  },
  {
    id: 3,
    name: "Xpat 3",
    image: require("../assets/movie.png"),
  },
  {
    id: 3,
    name: "Xpat 3",
    image: require("../assets/movie.png"),
  },
  {
    id: 3,
    name: "Xpat 3",
    image: require("../assets/movie.png"),
  },
];
export const AllMovies = () => {
  return (
    <div className="row" style={{ marginBottom: 60 }}>
      {movies.map((movie) => {
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
};
