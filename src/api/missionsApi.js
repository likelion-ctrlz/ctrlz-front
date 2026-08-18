import { apiGet, apiPost } from "./client";

export function getRecommendedMissions(limit) {
  return apiGet(`/missions/recommended${limit ? `?limit=${limit}` : ""}`);
}

export function getMissionDetail(missionId) {
  return apiGet(`/missions/${missionId}`);
}

export function submitMission(missionId, { photo, gpsLat, gpsLng, takenAt }) {
  const form = new FormData();
  form.append("photo", photo);
  form.append("gps_lat", gpsLat);
  form.append("gps_lng", gpsLng);
  form.append("taken_at", takenAt);
  return apiPost(`/missions/${missionId}/submit`, form, { isForm: true });
}

export function getMissionResult(missionId) {
  return apiGet(`/missions/${missionId}/result`);
}

export function getMissionHistory(date) {
  return apiGet(`/missions/history${date ? `?date=${date}` : ""}`);
}
