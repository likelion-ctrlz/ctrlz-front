import { apiGet, apiPatch } from "./client";

// 내 정보 조회
// → { user_id, nickname, region, is_demo, assessment_level, assessment_type,
//     assessment_score, character_level, character_xp, character_xp_next_level,
//     character_image, mission_streak_days, token_balance, today_recommended_mission }
export function getMe() {
  return apiGet("/users/me");
}

// 내 정보 수정 (예: region)
export function updateMe(body) {
  return apiPatch("/users/me", body);
}
