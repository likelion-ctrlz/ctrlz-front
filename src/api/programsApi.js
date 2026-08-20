import { apiGet, apiPost } from "./client";

export function getPrograms() {
  return apiGet("/programs");
}

export function applyProgram(programId, status = "applied") {
  return apiPost(`/programs/${programId}/apply`, { status });
}
