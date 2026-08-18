import { apiGet, apiPost } from "./client";

export function createDiaryEntry({ audio, textContent }) {
  const form = new FormData();
  if (audio) form.append("audio", audio);
  if (textContent) form.append("text_content", textContent);
  return apiPost("/diary/entries", form, { isForm: true });
}

export function getDiaryEntries(limit) {
  return apiGet(`/diary/entries${limit ? `?limit=${limit}` : ""}`);
}

export function getDiarySummary(days) {
  return apiGet(`/diary/summary${days ? `?days=${days}` : ""}`);
}
