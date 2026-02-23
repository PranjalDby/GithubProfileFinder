import Icon from "./Icon";
import RepoCard from "./RepoCard";

export default function ProfileCard({ user, repos, fmt, langColors }) {
  if (!user) return null;

  return (
    <div className="profile-card">
      <div className="profile-top">
        <div className="avatar-wrap">
          <img
            className="avatar"
            src={user.avatar_url}
            alt={user.login}
          />
          <div className="avatar-accent" />
        </div>

        <div className="profile-info">
          <div className="profile-name">
            {user.name || user.login}
          </div>

          <div className="profile-login">
            @{user.login}
          </div>

          {user.bio && (
            <div className="profile-bio">
              {user.bio}
            </div>
          )}

          <div className="profile-meta">
            {user.location && (
              <span className="meta-item">
                <Icon name="location" />
                {user.location}
              </span>
            )}

            {user.blog && user.blog.trim() !== "" && (
              <span className="meta-item">
                <Icon name="link" />
                <a
                  href={
                    user.blog.startsWith("http")
                      ? user.blog
                      : `https://${user.blog}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {user.blog.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}

            {user.twitter_username && (
              <span className="meta-item">
                <Icon name="twitter" />
                @{user.twitter_username}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="stats-row">
        {[
          ["Repos",     user.public_repos],
          ["Followers", user.followers],
          ["Following", user.following],
        ].map(([label, val]) => (
          <div className="stat" key={label}>
            <div className="stat-num">{fmt(val)}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {Array.isArray(repos) && repos.length > 0 && (
        <div className="repos-section">
          <div className="repos-title">Top Repositories</div>
          <div className="repos-grid">
            {repos.map((repo) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                fmt={fmt}
                langColors={langColors}
              />
            ))}
          </div>
        </div>
      )}

      <a
        className="view-gh"
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        View full profile on GitHub →
      </a>
    </div>
  );
}