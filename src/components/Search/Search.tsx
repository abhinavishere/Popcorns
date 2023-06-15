import "./Search.css";

const Search = () => {
  return (
    <header className="header">
      <h1>Popcorns</h1>
      <input type="text" placeholder="Title of the movie" />
      <p>
        Total <span>0</span> found.
      </p>
    </header>
  );
};

export default Search;
