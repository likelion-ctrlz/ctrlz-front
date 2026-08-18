import { apiGet, apiPatch } from "./client";

export function getMe() {
  return apiGet("/users/me");
}

export function updateMe(payload) {
  return apiPatch("/users/me", payload);
}
