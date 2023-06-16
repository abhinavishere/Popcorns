import { useEffect, useState } from "react";

const KEY = import.meta.env.VITE_APIKEY;

const MovieDetails = ({ id }: { id: string | undefined }) => {
  const [movie, setMovie] = useState<Movie | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getMovieById() {
      setLoading(true);
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
        );
        const data = await res.json();
        setMovie(data);
        setLoading(false);

        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
    if (!id) return;
    getMovieById();

    return () => setMovie(undefined);
  }, [id]);

  return (
    <div className="movieDetails">
      {!id && <p>Click on the movie to see details</p>}
      {loading && !movie && <p>Loading...</p>}
      {id && movie && (
        <>
          <div className="movieDetailsBanner">
            <div className="movieDetailsPoster">
              <img src={movie?.Poster} alt={movie?.Title} />
            </div>
            <div className="movieDetailsBody">
              <h3>{movie?.Title}</h3>
              <p>
                <span>{movie?.Released}</span>
                {" | "}
                <span>{movie?.Runtime}</span>
              </p>
              <p>{movie?.Genre}</p>
              <div className="ratingsContainer">
                {movie?.Ratings?.map((rating, index) => (
                  <RatingsWrapper
                    key={index}
                    source={rating?.Source}
                    value={rating?.Value}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="movieDescription">
            {/* RatingComponent */}
            <p>
              <i>{movie?.Plot}</i>
            </p>
            <p>{`Starring ${movie?.Actors}`}</p>
            <p>{`Directed By ${movie?.Director}`}</p>
          </div>
        </>
      )}
    </div>
  );
};

function RatingsWrapper({ source, value }: { source: string; value: string }) {
  return (
    <div className="ratingsWrapper">
      <p>{source}</p>
      <p className="ratings">
        <img src="/star-filled.svg" />
        {value}
      </p>
    </div>
  );
}

export default MovieDetails;
