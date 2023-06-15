import MovieItem from "./MovieItem";

const MovieList = ({ movies }: { movies: Partial<Movie>[] | null }) => {
  return (
    <ul className="movieList">
      {movies?.length !== 0 ? (
        movies?.map((movie, index) => <MovieItem movie={movie} key={index} />)
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
};

export default MovieList;
