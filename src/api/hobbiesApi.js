import { apiGet, apiPost } from "./client";

export function getRecommendedHobbies() {
  return apiGet("/hobbies/recommended");
}

export function getHobbyDetail(hobbyId) {
  return apiGet(`/hobbies/${hobbyId}`);
}

export function applyHobby(hobbyId) {
  return apiPost(`/hobbies/${hobbyId}/apply`);
}
