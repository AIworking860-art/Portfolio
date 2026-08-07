const GITHUB_USERNAME = "AIworking860-art";

/**
 * Dynamically fetches authentic public repositories directly from GitHub API.
 * Returns exact data array from https://api.github.com/users/AIworking860-art/repos.
 * No hardcoded, fake, sample, or fallback projects.
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

  return data;
}

export { GITHUB_USERNAME };