import { apiGet, apiPost } from "./client";

// 자가진단 답변 제출 (answers: 8개 문항의 선택 인덱스 배열)
export function submitAssessment(answers) {
  return apiPost("/assessment/submit", { answers });
}

// 자가진단 결과 조회
// → { assessment_level, assessment_type, assessment_score, assessed_at }
export function getAssessmentResult() {
  return apiGet("/assessment/result");
}
