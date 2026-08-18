import { apiGet, apiPost } from "./client";

export function getPrograms(region) {
  return apiGet(`/programs${region ? `?region=${encodeURIComponent(region)}` : ""}`);
}

export function applyProgram(programId, status = "applied") {
  return apiPost(`/programs/${programId}/apply`, { status });
}
