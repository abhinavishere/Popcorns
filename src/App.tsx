import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Box from "./components/Box";
import MovieDetails from "./components/MovieDetails";

const KEY = import.meta.env.VITE_APIKEY;

function App() {
  const [moviesLoading, setMoviesLoading] = useState<boolean>(false);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Array<Movie> | undefined>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>("");

  useEffect(() => {
    async function getMovies() {
      setMoviesLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        setMovies(data.Search);
        setMoviesLoading(false);
      } catch (e) {
        console.error(e);
      }
    }

    const dataTimeout = setTimeout(() => {
      if (!query) return;
      getMovies();
    }, 500);

    return () => {
      clearTimeout(dataTimeout);
      setMovies(undefined);
    };
  }, [query]);

  return (
    <>
      <Navbar setQuery={setQuery} totalResults={movies?.length || 0} />
      <main className="main">
        <Box>
          {!query && <p>Search for a movie.</p>}
          {moviesLoading && !movies && <p>Loading...</p>}
          {!moviesLoading && movies && (
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
