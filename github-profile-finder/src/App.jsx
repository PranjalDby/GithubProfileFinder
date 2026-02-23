import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ProfileCard from "./components/ProfileCard";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python:     "#3572A5",
  Java:       "#b07219",
  CSS:        "#563d7c",
  HTML:       "#e34c26",
  Go:         "#00ADD8",
  Rust:       "#dea584",
  Ruby:       "#701516",
  C:          "#555555",
  "C++":      "#f34b7d",
  PHP:        "#4F5D95",
  Swift:      "#F05138",
  Kotlin:     "#A97BFF",
  Shell:      "#89e051",
};

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + "k" : n);

export default function App() {
  const [query,   setQuery]   = useState("");
  const [user,    setUser]    = useState(null);
  const [repos,   setRepos]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const search = async (e) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${query.trim()}`),
        fetch(`https://api.github.com/users/${query.trim()}/repos?sort=stars&per_page=6`),
      ]);

      if (!userRes.ok) {
        throw new Error(
          userRes.status === 404 ? "User not found." : "GitHub API error."
        );
      }

      const [userData, reposData] = await Promise.all([
        userRes.json(),
        reposRes.json(),
      ]);

      setUser(userData);
      setRepos(Array.isArray(reposData) ? reposData : []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="grid-bg" />

      <div className="content">
        <div className="header">
          <div className="header-label">// tool</div>
          <h1>GitHub<br /><span>Profile</span> Finder</h1>
        </div>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={search}
          loading={loading}
        />

        {loading && (
          <div className="loading">Fetching profile...</div>
        )}

        {error && (
          <div className="error">⚠ {error}</div>
        )}

        {user && (
          <ProfileCard
            user={user}
            repos={repos}
            fmt={fmt}
            langColors={LANG_COLORS}
          />
        )}

        {!user && !loading && !error && (
          <div className="hint">Search for any GitHub user above</div>
        )}
      </div>
    </div>
  );
}