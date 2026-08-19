import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moroLv1 from "../assets/moro-lv1.png";
import characterShadow from "../assets/character-shadow.svg";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import RESULT_CONTENT from "../data/diagnosisResultContent";
import IMPROVEMENT_CONTENT from "../data/improvementContent";
import { getAssessmentResult } from "../api/diagnosisApi";

// Figma 원본 벡터 경로 (점수 게이지) — Vector 44/46(웨지), Vector 45(물결 캡), Polygon 1(포인터)
const GAUGE_WEDGE_PATH =
  "M42 0L0 41.7391C8.05 54.2609 10.3542 72.4638 10.5 80H70C68.95 39.6522 50.8958 9.85507 42 0Z";
const GAUGE_WAVE_PATH =
  "M209 49.6579L166.588 92C114.469 33.3322 60.9219 67.5551 40.6632 92L0 49.6579C84.8243 -42.0094 179.705 14.7365 209 49.6579Z";
const GAUGE_POINTER_PATH = "M9.95929 0L19.9186 17.25H0L9.95929 0Z";

// 게이지 배지 문구 — 유형이 아니라 점수(0~10, 높을수록 위험) 구간별로 분기
function getBadgeByScore(score) {
  if (score >= 7.5) return "함께 이겨내요!";
  if (score >= 5) return "같이 극복해요!";
  if (score >= 2.5) return "같이 나아가요!";
  return "잘 하고 있어요!";
}

function getResultContent({ type, level }) {
  const byType = RESULT_CONTENT[type] ?? RESULT_CONTENT["은둔형"];
  if (byType.flat) return byType.flat;
  return level <= 2 ? byType.lv12 : byType.lv34;
}

function getImprovementContent(type) {
  return IMPROVEMENT_CONTENT[type] ?? IMPROVEMENT_CONTENT["은둔형"];
}

// 게이지 밴드의 "안쪽" 경계선(점수 숫자와 맞닿는 쪽) 좌표를 실제 렌더링 결과에서 픽셀 단위로
// 측정한 값 (좌우 대칭이라 왼쪽만 측정하고 오른쪽은 반사). 웨지 구간은 평평(y≈134), 중앙 물결
// 캡 구간은 부드러운 곡선으로 y≈58까지 올라옴 — 포인터가 이 선을 그대로 따라가게 함.
// 원래 27개 점 중 양 끝 5개씩(x=0~80, x=246~326)은 웨지 시작점 이전 구간이라 굴곡이 있어
// 제외하고, 실제로 웨지 도형 안쪽인 구간(88~238)만 0~10점에 매핑한다 — 첫 점=0점, 마지막
// 점=10점, 정중앙(163,58 정점)=5점.
const GAUGE_INNER_ARC_POINTS = [
  [88, 126],
  [92, 108],
  [100, 91],
  [108, 82],
  [116, 76],
  [124, 70],
  [132, 66],
  [152, 60],
  [163, 58],
  [174, 60],
  [194, 66],
  [202, 70],
  [210, 76],
  [218, 82],
  [226, 91],
  [234, 108],
  [238, 126],
];

// GAUGE_INNER_ARC_POINTS를 선형보간해서 임의의 x에서의 y를 구함
function interpolateInnerArcY(x) {
  let i = 0;
  while (
    i < GAUGE_INNER_ARC_POINTS.length - 2 &&
    GAUGE_INNER_ARC_POINTS[i + 1][0] < x
  ) {
    i++;
  }
  const [x1, y1] = GAUGE_INNER_ARC_POINTS[i];
  const [x2, y2] = GAUGE_INNER_ARC_POINTS[i + 1];
  const localT = x2 === x1 ? 0 : (x - x1) / (x2 - x1);
  return y1 + (y2 - y1) * localT;
}

// 정수 점수 0~10이 안쪽 라인의 몇 번째 점에 위치하는지 손으로 지정한 값.
// 균등 간격이 아니라 5점(정중앙, idx8)을 기준으로 좌우 대칭이 되도록 골랐음
// (0~3점/7~10점은 완만한 구간이라 점 간격이 넓고, 4점·6점은 급하게 꺾이는
// 중앙 부근이라 점 간격이 좁음).
const SCORE_ANCHOR_INDICES = [0, 1, 2, 3, 6, 8, 10, 13, 14, 15, 16];
const SCORE_X_ANCHORS = SCORE_ANCHOR_INDICES.map(
  (i) => GAUGE_INNER_ARC_POINTS[i][0],
);

// score(0~10, 정수가 아니면 인접 정수 앵커 사이를 선형보간) → x 좌표
function xForScore(score) {
  const clamped = Math.min(Math.max(score, 0), 10);
  const lo = Math.floor(clamped);
  const hi = Math.ceil(clamped);
  if (lo === hi) return SCORE_X_ANCHORS[lo];
  const t = clamped - lo;
  return SCORE_X_ANCHORS[lo] + t * (SCORE_X_ANCHORS[hi] - SCORE_X_ANCHORS[lo]);
}

// score → 밴드 안쪽 경계선 위 좌표 + 그 지점의 접선 방향 회전각.
// 접선은 x 좌우로 같은 거리(±5px) 떨어진 두 점(centered difference)으로 계산 —
// 한쪽 구간의 기울기만 쓰면 정중앙(5점)처럼 대칭인 지점에서도 살짝 기울어져 보이는 문제가 있었음.
const ARC_X_START = GAUGE_INNER_ARC_POINTS[0][0];
const ARC_X_END = GAUGE_INNER_ARC_POINTS[GAUGE_INNER_ARC_POINTS.length - 1][0];

function getPointerTransform(score) {
  const x = xForScore(score);
  const y = interpolateInnerArcY(x);

  const delta = 5;
  const xLo = Math.max(x - delta, ARC_X_START);
  const xHi = Math.min(x + delta, ARC_X_END);
  const dx = xHi - xLo;
  const dy = interpolateInnerArcY(xHi) - interpolateInnerArcY(xLo);
  const normalX = dy;
  const normalY = -dx;
  const rotationDeg = (Math.atan2(normalX, -normalY) * 180) / Math.PI;

  return { x, y, rotationDeg };
}

function DiagnosisResult() {
  const [step, setStep] = useState("result"); // result | improvement | character | character2
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAssessmentResult()
      .then((data) => {
        setAssessment({
          type: data.assessment_type,
          level: data.assessment_level,
          score: data.assessment_score,
        });
      })
      .catch(() => {
        // 결과가 없으면 진단 페이지로 돌려보냄
        navigate("/diagnosis", { replace: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <LoadingScreen message="결과를 불러오는 중..." />;
  }

  if (!assessment) return null;

  const content = getResultContent(assessment);
  const improvement = getImprovementContent(assessment.type);
  const {
    x: pointerX,
    y: pointerY,
    rotationDeg: pointerRotationDeg,
  } = getPointerTransform(assessment.score);

  // 진단 결과
  if (step === "result") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-mint-light">
        <Header
          title="내 진단 확인"
          onBack={() => navigate(-1)}
          titleClassName="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold text-primary tracking-[-0.45px] leading-[44px] whitespace-nowrap"
        />

        {/* 카드 */}
        <main className="flex-1 flex flex-col px-5 pt-[49px]">
          <div className="w-full flex-1 bg-white border border-primary-sub1 rounded-[12px] px-4 pt-[25px] pb-6">
            {/* 게이지 영역 — Figma 벡터 원본(웨지 2개 + 물결 캡) 그대로 재현, 326x145 기준 */}
            <div className="relative w-[326px] h-[145px] mx-auto mb-[54px]">
              <svg
                viewBox="0 0 326 145"
                className="absolute inset-0 w-full h-full"
              >
                {/* 중앙 물결 캡 (초록) — 웨지보다 먼저 그려서 뒤에 깔리게 함.
                    나중에 그리면(웨지보다 위 레이어) 오른쪽 웨지(위험, 빨강) 대부분을
                    덮어버려서 점수 5~8점대에서 화살표가 빨간색이어도 배경이 초록으로
                    보이는 문제가 있었음 — 웨지가 항상 위에 오도록 순서를 바꿈 */}
                <g transform="translate(59,0)">
                  <path d={GAUGE_WAVE_PATH} fill="var(--color-primary)" />
                </g>
                {/* 왼쪽 웨지 (정상, 연초록) — 오른쪽 웨지를 좌우 반전 */}
                <g transform="translate(98,55) scale(-1,1)">
                  <path d={GAUGE_WEDGE_PATH} fill="var(--color-primary-sub3)" />
                </g>
                {/* 오른쪽 웨지 (위험, 빨강) */}
                <g transform="translate(228,55)">
                  <path d={GAUGE_WEDGE_PATH} fill="var(--color-danger)" />
                </g>
                {/* 포인터 — 점수(0~10)에 따라 위치·각도만 바뀌고 색은 항상 빨강으로 고정 */}
                <g
                  transform={`translate(${pointerX},${pointerY}) rotate(${pointerRotationDeg})`}
                >
                  <path
                    d={GAUGE_POINTER_PATH}
                    transform="translate(-9.96,-8.625)"
                    fill="var(--color-danger)"
                  />
                </g>
              </svg>

              {/* 배지 — 점수 구간별 문구, 글자수와 무관하게 항상 가운데 정렬 */}
              <p className="absolute left-[163px] top-[21px] -translate-x-1/2 text-[16px] font-semibold text-white tracking-[-0.4px] whitespace-nowrap">
                {getBadgeByScore(assessment.score)}
              </p>

              {/* 점수 — 자릿수와 무관하게 항상 가운데 정렬 */}
              <p className="absolute left-[163px] top-[97px] -translate-x-1/2 whitespace-nowrap">
                <span className="text-[40px] font-semibold text-primary">
                  {assessment.score}
                </span>
                <span className="text-[16px] text-[#606060]">점</span>
              </p>

              {/* 정상 / 위험 라벨 */}
              <span className="absolute left-0 top-[115px] text-[12px] font-semibold text-primary-sub3 tracking-[-0.3px]">
                정상
              </span>
              <span className="absolute right-0 top-[115px] text-[12px] font-semibold text-danger tracking-[-0.3px]">
                위험
              </span>
            </div>

            {/* 설명 — 유형·레벨별 상세 설명, 마지막 문장만 강조. whitespace-pre-line으로 문장 내 \n을 줄바꿈으로 렌더링 */}
            <p className="text-[14px] font-medium text-gray-detail tracking-[-0.35px] leading-[25px] whitespace-pre-line">
              {content.description.slice(0, -1).join("")}
              <span className="text-primary font-semibold">
                {content.description[content.description.length - 1]}
              </span>
            </p>
          </div>

          {/* 다시 진단하기 */}
          <button
            onClick={() => navigate("/diagnosis")}
            className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] text-center mt-5 mb-[16px]"
          >
            다시 진단하기
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={() => setStep("improvement")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-primary text-primary text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[32px]"
          >
            다음
          </button>
        </main>
      </div>
    );
  }

  // 개선 방안
  if (step === "improvement") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-mint-light">
        <Header
          title="나를 위한 개선 방안"
          onBack={() => setStep("result")}
          titleClassName="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold text-primary tracking-[-0.45px] leading-[44px] whitespace-nowrap"
        />

        <main className="flex-1 flex flex-col px-5 pt-[49px]">
          <div className="relative w-full h-[544px] bg-white rounded-[12px] px-4 pt-[30px] pb-6 overflow-hidden">
            {/* 테두리를 네이티브 border 대신 내부 레이어로 그림 — overflow-hidden은 자신의 border까지
                padding box 기준으로 잘라내서, border 밖으로 오버레이를 빼는 방식은 클리핑돼 버림.
                border를 카드 안쪽 레이어로 옮기고 그 위에 그라데이션을 그려야 테두리도 함께 흐려짐 */}
            <div className="absolute inset-0 rounded-[12px] border border-primary-sub1 pointer-events-none" />

            {/* 왜 개선해야 할까요? */}
            <h3 className="text-[20px] font-semibold text-primary tracking-[-0.5px] leading-[25px] text-center">
              왜 개선해야 할까요?
            </h3>
            <p className="text-[14px] font-medium text-gray-detail tracking-[-0.35px] leading-[25px] mt-[20px]">
              {improvement.why}
            </p>

            {/* 어떻게 개선해야 할까요? */}
            <h3 className="text-[20px] font-semibold text-primary tracking-[-0.5px] leading-[25px] text-center mt-[30px]">
              어떻게 개선해야 할까요?
            </h3>

            <div className="mt-[20px] space-y-[12px]">
              {improvement.steps.map((improvementStep, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[36px] h-[36px] rounded-full bg-primary-sub3 border border-primary flex items-center justify-center shrink-0">
                    <span className="text-[16px] font-medium text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-primary tracking-[-0.35px] leading-[25px]">
                      {improvementStep.title}
                    </p>
                    <p className="text-[10px] font-medium text-gray-detail tracking-[-0.25px] leading-[25px]">
                      {improvementStep.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* 하단 페이드 — Figma 실측 그라데이션. 위에서 border를 내부 레이어로 옮겼기 때문에
                이 오버레이가 같은 레이어 순서상 border 레이어 위에 그려져 테두리도 함께 흐려짐 */}
            <div
              className="absolute inset-x-0 bottom-0 h-[207px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(230,255,248,0.07) 0%, rgb(230,255,248) 79%)",
              }}
            />
          </div>

          <div className="flex-1" />

          {/* 하단 안내 */}
          <p className="text-[16px] font-medium text-gray-muted tracking-[-0.4px] text-center mb-[16px]">
            자세한 내용은 마이페이지에서 확인 할 수 있어요
          </p>

          <button
            onClick={() => setStep("character")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-primary text-primary text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[32px]"
          >
            다음
          </button>
        </main>
      </div>
    );
  }

  // 캐릭터 소개 1 — 격려
  if (step === "character") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-primary">
        <Header onBack={() => setStep("improvement")} invert />

        <main className="flex-1 flex flex-col px-[37px] pt-[146px]">
          {/* 제목 */}
          <h2 className="text-[20px] font-extrabold text-white text-center leading-normal">
            {content.title}
          </h2>

          {/* 부제 */}
          <div className="text-[14px] font-medium text-primary-sub4 text-center leading-normal mt-[26px]">
            {content.summary.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          <div className="flex-1" />

          {/* 캐릭터 — Figma 실측: 그림자가 이미지 박스 기준 left-62px, top-214px에 겹쳐 위치.
              그림자를 먼저 그려서 뒤에 깔리고, 캐릭터 이미지가 그 위에 오도록 함 */}
          <div className="relative w-[192px] h-[288px] mx-auto mb-[20px]">
            <img
              src={characterShadow}
              alt=""
              className="absolute w-[183px] h-[47px] left-[62px] top-[214px]"
            />
            <img
              src={moroLv1}
              alt="모로 알"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </main>

        {/* 버튼 */}
        <div className="px-5 pb-[32px]">
          <button
            onClick={() => setStep("character2")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-primary text-primary text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  // 캐릭터 소개 2 — 미션 시작
  if (step === "character2") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-primary">
        <Header onBack={() => setStep("character")} invert />

        <main className="flex-1 flex flex-col items-center px-5 pt-[143px]">
          {/* 제목 */}
          <h2 className="text-[20px] font-extrabold text-white text-center leading-normal">
            {content.cta.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h2>

          <div className="flex-1" />

          {/* 캐릭터 — Figma 실측: 그림자가 이미지 박스 기준 left-62px, top-214px에 겹쳐 위치.
              그림자를 먼저 그려서 뒤에 깔리고, 캐릭터 이미지가 그 위에 오도록 함 */}
          <div className="relative w-[192px] h-[288px] mx-auto mb-[20px]">
            <img
              src={characterShadow}
              alt=""
              className="absolute w-[183px] h-[47px] left-[62px] top-[214px]"
            />
            <img
              src={moroLv1}
              alt="모로 알"
              className="absolute inset-0 w-full h-full object-cover animate-wobble-once"
            />
          </div>
        </main>

        {/* 버튼 */}
        <div className="px-5 pb-[32px]">
          <button
            onClick={() => navigate("/home")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-primary text-primary text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default DiagnosisResult;
