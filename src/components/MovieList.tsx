import { Dispatch, SetStateAction } from "react";
import MovieItem from "./MovieItem";

const MovieList = ({
  movies,
  setSelected,
}: {
  movies: Partial<Movie>[] | null;
  setSelected: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <ul className="movieList">
      {movies?.length !== 0 ? (
        movies?.map((movie, index) => (
          <MovieItem movie={movie} key={index} onClick={setSelected} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

export default MovieList;
