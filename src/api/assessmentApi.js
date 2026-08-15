const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getAuthHeaders() {
  const token = localStorage.getItem("session_token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function submitAssessment(answers) {
  const res = await fetch(`${BASE_URL}/assessment/submit`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ answers }),
  });
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message);
  return json.data;
}

export async function getAssessmentResult() {
  const res = await fetch(`${BASE_URL}/assessment/result`, {
    headers: getAuthHeaders(),
  });
  const json = await res.json();
  if (json.status === "error") throw new Error(json.message);
  return json.data;
}