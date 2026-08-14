const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 닉네임으로 로그인(온보딩)
export async function loginWithNickname(nickname) {
  const res = await fetch(`${BASE_URL}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nickname }),
  });
  const json = await res.json();

  if (json.status === "error") {
    throw new Error(json.message);
  }

  localStorage.setItem("session_token", json.data.session_token);
  return json.data;
}

// 로그아웃
export async function logout() {
  const token = localStorage.getItem("session_token");

  const res = await fetch(`${BASE_URL}/session`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await res.json();

  if (json.status === "error") {
    throw new Error(json.message);
  }

  localStorage.removeItem("session_token");
}