import Icon from "./Icon";

export default function RepoCard({ repo, fmt, langColors }) {
  return (
    <a
      className="repo-card"
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
    >
      <div className="repo-name">
        {repo.name}
      </div>

      <div className="repo-desc">
        {repo.description || "No description provided."}
      </div>

      <div className="repo-footer">
        {repo.language && (
          <span>
            <span
              className="lang-dot"
              style={{
                background: langColors[repo.language] || "#6366f1",
              }}
            />
            {repo.language}
          </span>
        )}
        <span>
          <Icon name="star" />
          {fmt(repo.stargazers_count)}
        </span>
        <span>
          <Icon name="fork" />
          {fmt(repo.forks_count)}
        </span>
      </div>
    </a>
  );
}