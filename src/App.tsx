import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import Box from "./components/Box";

const KEY = import.meta.env.VITE_APIKEY;

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Array<Movie>>([]);

  useEffect(() => {
    async function getMovies() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        setMovies(data.Search);
      } catch (e) {
        console.error(e);
      }
    }

    const dataTimeout = setTimeout(() => {
      getMovies();
    }, 500);

    return () => clearTimeout(dataTimeout);
  }, [query]);

  return (
    <>
      <Navbar setQuery={setQuery} totalResults={movies?.length || 0} />
      <main className="main">
        <Box>
          {movies ? <MovieList movies={movies} /> : <p>Search for a movie</p>}
        </Box>
        <Box>
          <div className="watchedMovies">Watched Movies</div>
          <div className="movieDetails">Movie details</div>
        </Box>
      </main>
    </>
  );
}

export default App;
