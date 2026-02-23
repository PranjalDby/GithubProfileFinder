export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <form onSubmit={onSearch}>
      <div className="search-wrap">
        <input
          className="search-input"
          type="text"
          placeholder="Enter a GitHub username..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="search-btn" type="submit" disabled={loading}>
          {loading ? "..." : "Search"}
        </button>
      </div>
    </form>
  );
}