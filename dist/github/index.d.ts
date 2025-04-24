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
export declare function createGitHubApiClient(config: GitHubApiConfig): {
    getUser: (username: string) => Promise<GitHubApiResponse<unknown>>;
    getRepository: (owner: string, repo: string) => Promise<GitHubApiResponse<unknown>>;
    listRepositories: (username: string, page?: number, perPage?: number) => Promise<GitHubApiResponse<unknown[]>>;
    createIssue: (owner: string, repo: string, title: string, body: string, labels?: string[]) => Promise<GitHubApiResponse<unknown>>;
    listIssues: (owner: string, repo: string, state?: "open" | "closed" | "all") => Promise<GitHubApiResponse<unknown[]>>;
    createPullRequest: (owner: string, repo: string, title: string, head: string, base: string, body?: string) => Promise<GitHubApiResponse<unknown>>;
    getPullRequest: (owner: string, repo: string, pullNumber: number) => Promise<GitHubApiResponse<unknown>>;
    listBranches: (owner: string, repo: string) => Promise<GitHubApiResponse<unknown[]>>;
    getContent: (owner: string, repo: string, path: string) => Promise<GitHubApiResponse<unknown>>;
    createWebhook: (owner: string, repo: string, url: string, events?: string[]) => Promise<GitHubApiResponse<unknown>>;
    request: <T>(endpoint: string, method?: "GET" | "POST" | "PUT" | "DELETE", body?: unknown) => Promise<GitHubApiResponse<T>>;
};
export {};
