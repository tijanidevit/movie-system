import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Landing, Movies, MovieDetails } from "./pages";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="*">Not Found</Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
