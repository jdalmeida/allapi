interface GitHubApiConfig {
  token: string;
  baseUrl?: string;
  version?: string;
  userAgent?: string;
}

interface GitHubApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export function createGitHubApiClient(config: GitHubApiConfig) {
  const {
    token,
    baseUrl = "https://api.github.com",
    version = "2022-11-28",
    userAgent = "GitHubApiClient",
  } = config;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": version,
    "User-Agent": userAgent,
  };

  async function makeRequest<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: unknown,
  ): Promise<GitHubApiResponse<T>> {
    const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = (await response.json()) as T;

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      data,
      status: response.status,
      headers: responseHeaders,
    };
  }

  return {
    getUser: (username: string) => makeRequest<unknown>(`/users/${username}`),

    getRepository: (owner: string, repo: string) =>
      makeRequest<unknown>(`/repos/${owner}/${repo}`),

    listRepositories: (username: string, page = 1, perPage = 30) =>
      makeRequest<unknown[]>(
        `/users/${username}/repos?page=${page}&per_page=${perPage}`,
      ),

    createIssue: (
      owner: string,
      repo: string,
      title: string,
      body: string,
      labels?: string[],
    ) =>
      makeRequest<unknown>(`/repos/${owner}/${repo}/issues`, "POST", {
        title,
        body,
        labels,
      }),

    listIssues: (
      owner: string,
      repo: string,
      state: "open" | "closed" | "all" = "open",
    ) =>
      makeRequest<unknown[]>(`/repos/${owner}/${repo}/issues?state=${state}`),

    createPullRequest: (
      owner: string,
      repo: string,
      title: string,
      head: string,
      base: string,
      body?: string,
    ) =>
      makeRequest<unknown>(`/repos/${owner}/${repo}/pulls`, "POST", {
        title,
        head,
        base,
        body,
      }),

    getPullRequest: (owner: string, repo: string, pullNumber: number) =>
      makeRequest<unknown>(`/repos/${owner}/${repo}/pulls/${pullNumber}`),

    listBranches: (owner: string, repo: string) =>
      makeRequest<unknown[]>(`/repos/${owner}/${repo}/branches`),

    getContent: (owner: string, repo: string, path: string) =>
      makeRequest<unknown>(`/repos/${owner}/${repo}/contents/${path}`),

    createWebhook: (
      owner: string,
      repo: string,
      url: string,
      events: string[] = ["push"],
    ) =>
      makeRequest<unknown>(`/repos/${owner}/${repo}/hooks`, "POST", {
        config: { url, content_type: "json" },
        events,
        active: true,
      }),

    // Add custom request method for flexibility
    request: <T>(
      endpoint: string,
      method?: "GET" | "POST" | "PUT" | "DELETE",
      body?: unknown,
    ) => makeRequest<T>(endpoint, method, body),
  };
}
