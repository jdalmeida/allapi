export * as github from "./github";

export function customApiClient(baseURL: string) {
  return async function request(path: string, options?: RequestInit) {
    const res = await fetch(`${baseURL}${path}`, options);
    if (!res.ok) throw new Error("Erro na requisição");
    return res.json();
  };
}
