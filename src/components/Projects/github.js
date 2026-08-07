const GITHUB_USERNAME = "AIworking860-art";

// Repos to HIDE from portfolio (still exist on GitHub)
export const HIDDEN_REPOS = ["Portfolio", "AIworking860-art"];

/**
 * Fetches public repos from GitHub and filters out hidden ones.
 */
export async function fetchGithubProjects() {
  const url = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API HTTP ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid GitHub API response format");
  }

  // Filter out hidden repos
  return data.filter((repo) => !HIDDEN_REPOS.includes(repo.name));
}

export { GITHUB_USERNAME };