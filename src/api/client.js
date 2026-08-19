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

// GET 응답 캐시 — 탭을 오갈 때마다 페이지가 다시 마운트되면서 매번 새로 로딩 스피너부터
// 보여주는 걸 막기 위함. apiGet은 성공할 때마다 여기에 최신값을 채워두고,
// getCached()로 마지막 값을 동기적으로 읽어 초기 상태로 쓰면 재방문 시 로딩 없이
// 바로 이전 데이터를 보여주고, 뒤에서 조용히 새로고침할 수 있다.
const getCache = new Map();

export const getCached = (path) => getCache.get(path);

export const apiGet = (path) => request(path).then((data) => {
  getCache.set(path, data);
  return data;
});
export const apiPost = (path, body, opts) => request(path, { method: "POST", body, ...opts });
export const apiPatch = (path, body) => request(path, { method: "PATCH", body });
export const apiDelete = (path) => request(path, { method: "DELETE" });
