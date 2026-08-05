const GITHUB_USERNAME = "AIworking860-art";

/**
 * Repositories to hide from the portfolio display.
 * These repos remain on GitHub — only filtered on the frontend.
 * Add/remove names here to control visibility (case-insensitive).
 */
export const EXCLUDED_REPOS = ["portfolio", "aiworking860-art", "aiworking-art"];

/**
 * Helper to determine if a repository homepage link is a valid external project demo.
 * Ignores links that point back to the portfolio site itself.
 */
export function getLiveDemoUrl(homepage) {
  if (!homepage || typeof homepage !== "string") return null;
  const cleaned = homepage.trim().toLowerCase();
  if (!cleaned || cleaned === "#" || cleaned === "/") return null;

  // Filter out URLs that point back to the portfolio itself
  const currentHost = typeof window !== "undefined" ? window.location.hostname.toLowerCase() : "";
  if (
    cleaned.includes("portfolio-m8u7.vercel.app") ||
    cleaned.includes("portfolio-nexora-labs") ||
    (currentHost && currentHost.length > 3 && cleaned.includes(currentHost))
  ) {
    return null;
  }

  return homepage.trim();
}

/**
 * Dynamically fetches authentic public repositories from GitHub API.
 * Automatically excludes repos listed in EXCLUDED_REPOS.
 * Returns exact data array from https://api.github.com/users/AIworking860-art/repos
 * sorted by most recently updated. No hardcoded or fake projects.
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

  // Filter out excluded repositories (case-insensitive & trimmed comparison)
  const normalizedExclusions = EXCLUDED_REPOS.map((name) => name.toLowerCase().trim());

  return data.filter(
    (repo) => repo && repo.name && !normalizedExclusions.includes(repo.name.toLowerCase().trim())
  );
}

/**
 * Fetches a single repository's full details from the GitHub API.
 * Used by the individual project detail page.
 * Blocks details if repo is in EXCLUDED_REPOS.
 */
export async function fetchGithubRepoDetail(repoName) {
  const normalizedExclusions = EXCLUDED_REPOS.map((name) => name.toLowerCase().trim());
  if (normalizedExclusions.includes(repoName.toLowerCase().trim())) {
    throw new Error("Repository is excluded from portfolio display.");
  }

  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API HTTP ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export { GITHUB_USERNAME };