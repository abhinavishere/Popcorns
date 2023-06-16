const Navbar = ({
  setQuery,
  totalResults,
}: {
  setQuery: (arg: string) => void;
  totalResults: number | undefined;
}) => {
  return (
    <header>
      <nav>
        <h1>POPCORNS</h1>
        <input
          type="text"
          placeholder="Search movie by title"
          onChange={(e) => setQuery(e.target.value)}
        />
        <p>
          <span>{totalResults || 0}</span> Movies found.
        </p>
      </nav>
    </header>
  );
};

export default Navbar;
