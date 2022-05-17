import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import {
  Landing,
  Movies,
  MovieDetails,
  Register,
  Login,
  AdminLogin,
  AdminMovies,
  AdminAddMovie,
  AdminMovieDetails,
} from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:slug" element={<MovieDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*">Not Found</Route>
          </Route>

          <Route path="/admin">
            <Route index element={<AdminLogin />} />
            <Route path="/admin/movies" element={<AdminMovies />} />
            <Route path="/admin/movies/new" element={<AdminAddMovie />} />
            <Route path="/admin/movies/:slug" element={<AdminMovieDetails />} />
            <Route path="*">Not Found</Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
