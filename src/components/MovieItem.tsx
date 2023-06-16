import { Dispatch, SetStateAction } from "react";

const MovieItem = ({
  movie,
  onClick,
}: {
  movie: Partial<Movie>;
  onClick: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { Title, Year, imdbID, Type, Poster } = movie;
  return (
    <li className="movieItem" key={imdbID} onClick={() => onClick(imdbID)}>
      <div className="moviePoster">
        <img src={Poster} alt={Title} />
      </div>
      <div className="movieText">
        <h4 className="movieTitle">{Title}</h4>
        <p className="movieType">{Type}</p>
        <p className="movieYear">{Year}</p>
      </div>
    </li>
  );
};

export default MovieItem;
