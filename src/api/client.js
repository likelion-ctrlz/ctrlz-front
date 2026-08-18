// 공용 API 클라이언트 — 세션 토큰 자동 첨부 + {status, data|message} 응답 형식 처리
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "");

async function request(path, { method = "GET", body, isForm = false } = {}) {
  const headers = {};
  const token = localStorage.getItem("session_token");
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined && !isForm) headers["Content-Type"] = "application/json";

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : isForm ? body : JSON.stringify(body),
  });

  const json = await res.json();
  if (json.status === "error") {
    throw new Error(json.message || "요청에 실패했어요");
  }
  return json.data;
}

export const apiGet = (path) => request(path);
export const apiPost = (path, body, opts) => request(path, { method: "POST", body, ...opts });
export const apiPatch = (path, body) => request(path, { method: "PATCH", body });
export const apiDelete = (path) => request(path, { method: "DELETE" });
