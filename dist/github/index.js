"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGitHubApiClient = createGitHubApiClient;
function createGitHubApiClient(config) {
    const { token, baseUrl = "https://api.github.com", version = "2022-11-28", userAgent = "GitHubApiClient", } = config;
    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": version,
        "User-Agent": userAgent,
    };
    function makeRequest(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, method = "GET", body) {
            const url = `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
            const response = yield fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : undefined,
            });
            const data = (yield response.json());
            const responseHeaders = {};
            response.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });
            return {
                data,
                status: response.status,
                headers: responseHeaders,
            };
        });
    }
    return {
        getUser: (username) => makeRequest(`/users/${username}`),
        getRepository: (owner, repo) => makeRequest(`/repos/${owner}/${repo}`),
        listRepositories: (username, page = 1, perPage = 30) => makeRequest(`/users/${username}/repos?page=${page}&per_page=${perPage}`),
        createIssue: (owner, repo, title, body, labels) => makeRequest(`/repos/${owner}/${repo}/issues`, "POST", {
            title,
            body,
            labels,
        }),
        listIssues: (owner, repo, state = "open") => makeRequest(`/repos/${owner}/${repo}/issues?state=${state}`),
        createPullRequest: (owner, repo, title, head, base, body) => makeRequest(`/repos/${owner}/${repo}/pulls`, "POST", {
            title,
            head,
            base,
            body,
        }),
        getPullRequest: (owner, repo, pullNumber) => makeRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}`),
        listBranches: (owner, repo) => makeRequest(`/repos/${owner}/${repo}/branches`),
        getContent: (owner, repo, path) => makeRequest(`/repos/${owner}/${repo}/contents/${path}`),
        createWebhook: (owner, repo, url, events = ["push"]) => makeRequest(`/repos/${owner}/${repo}/hooks`, "POST", {
            config: { url, content_type: "json" },
            events,
            active: true,
        }),
        // Add custom request method for flexibility
        request: (endpoint, method, body) => makeRequest(endpoint, method, body),
    };
}
