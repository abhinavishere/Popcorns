import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import MovieDetails from "./components/MovieDetails";
import useMovies from "./hooks/useMovies";

function App() {
  const [query, setQuery] = useState("");
  const { value: movies, isLoading } = useMovies<Array<Movie> | undefined>({
    query,
  });
  const [selectedId, setSelectedId] = useState<string | undefined>("");

  return (
    <>
      <Navbar setQuery={setQuery} totalResults={movies?.length} />
      <main className="main">
        <Box>
          {!query && <p>Search for a movie.</p>}
          {isLoading && !movies && <p>Loading...</p>}
          {!isLoading && movies && (
            <MovieList movies={movies} setSelected={setSelectedId} />
          )}
        </Box>
        <Box>
          <MovieDetails id={selectedId} />
        </Box>
      </main>
    </>
  );
}

export default App;
