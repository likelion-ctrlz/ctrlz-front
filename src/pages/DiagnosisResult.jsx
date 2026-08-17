import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moroLv1 from "../assets/moro-lv1.png";
import characterShadow from "../assets/character-shadow.svg";
import chevronLeft from "../assets/icon/chevron-left.png";
import RESULT_CONTENT from "../data/diagnosisResultContent";
import IMPROVEMENT_CONTENT from "../data/improvementContent";

// Figma 원본 벡터 경로 (점수 게이지) — Vector 44/46(웨지), Vector 45(물결 캡), Polygon 1(포인터)
const GAUGE_WEDGE_PATH =
  "M42 0L0 41.7391C8.05 54.2609 10.3542 72.4638 10.5 80H70C68.95 39.6522 50.8958 9.85507 42 0Z";
const GAUGE_WAVE_PATH =
  "M209 49.6579L166.588 92C114.469 33.3322 60.9219 67.5551 40.6632 92L0 49.6579C84.8243 -42.0094 179.705 14.7365 209 49.6579Z";
const GAUGE_POINTER_PATH = "M9.95929 0L19.9186 17.25H0L9.95929 0Z";

// TODO: API 연동 후 GET /assessment/result 응답으로 교체
// (assessment_type, assessment_level, assessment_score)
const MOCK_ASSESSMENT = {
  type: "은둔형", // 은둔형 | 고립형 | 관찰군 | 복합형
  level: 2, // 1~4 (1=가장 심각). 관찰군은 항상 4
  score: 6, // 0~10, 높을수록 심각(위험 쪽)
};

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
const GAUGE_INNER_ARC_POINTS = [
  [0, 124],
  [20, 121],
  [40, 134],
  [60, 134],
  [80, 134],
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
  [246, 134],
  [266, 134],
  [286, 134],
  [306, 121],
  [326, 124],
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

// score(0~10) → 밴드 안쪽 경계선 위 좌표(선형보간) + 그 지점의 접선 방향 회전각.
// 접선은 x 좌우로 같은 거리(±5px) 떨어진 두 점(centered difference)으로 계산 —
// 한쪽 구간의 기울기만 쓰면 정중앙(5점)처럼 대칭인 지점에서도 살짝 기울어져 보이는 문제가 있었음.
function getPointerTransform(score) {
  const t = Math.min(Math.max(score / 10, 0), 1);
  const x = t * 326;
  const y = interpolateInnerArcY(x);

  const delta = 5;
  const xLo = Math.max(x - delta, 0);
  const xHi = Math.min(x + delta, 326);
  const dx = xHi - xLo;
  const dy = interpolateInnerArcY(xHi) - interpolateInnerArcY(xLo);
  const normalX = dy;
  const normalY = -dx;
  const rotationDeg = (Math.atan2(normalX, -normalY) * 180) / Math.PI;

  return { x, y, rotationDeg };
}

function DiagnosisResult() {
  const [step, setStep] = useState("result"); // result | improvement | character | character2
  const navigate = useNavigate();
  const content = getResultContent(MOCK_ASSESSMENT);
  const improvement = getImprovementContent(MOCK_ASSESSMENT.type);
  const {
    x: pointerX,
    y: pointerY,
    rotationDeg: pointerRotationDeg,
  } = getPointerTransform(MOCK_ASSESSMENT.score);

  // 진단 결과
  if (step === "result") {
    return (
      <div className="relative flex min-h-dvh flex-col bg-[#E6FFF8]">
        {/* Header */}
        <header className="relative flex items-center h-[53px] px-5">
          <button
            onClick={() => navigate(-1)}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold text-[#00CB93] tracking-[-0.45px] leading-[44px]">
            내 진단 확인
          </p>
        </header>

        {/* 카드 */}
        <main className="flex-1 flex flex-col px-5 pt-[49px]">
          <div className="w-full flex-1 bg-white border border-[#39D7AB] rounded-[12px] px-4 pt-[25px] pb-6">
            {/* 게이지 영역 — Figma 벡터 원본(웨지 2개 + 물결 캡) 그대로 재현, 326x145 기준 */}
            <div className="relative w-[326px] h-[145px] mx-auto mb-[54px]">
              <svg
                viewBox="0 0 326 145"
                className="absolute inset-0 w-full h-full"
              >
                {/* 왼쪽 웨지 (정상, 연초록) — 오른쪽 웨지를 좌우 반전 */}
                <g transform="translate(98,55) scale(-1,1)">
                  <path d={GAUGE_WEDGE_PATH} fill="#AAEEDB" />
                </g>
                {/* 오른쪽 웨지 (위험, 빨강) */}
                <g transform="translate(228,55)">
                  <path d={GAUGE_WEDGE_PATH} fill="#FF627E" />
                </g>
                {/* 중앙 물결 캡 (초록) */}
                <g transform="translate(59,0)">
                  <path d={GAUGE_WAVE_PATH} fill="#00CB93" />
                </g>
                {/* 포인터 — 점수(0~10)에 따라 작은 원을 따라 위치·각도·색이 바뀜 */}
                <g
                  transform={`translate(${pointerX},${pointerY}) rotate(${pointerRotationDeg})`}
                >
                  <path
                    d={GAUGE_POINTER_PATH}
                    transform="translate(-9.96,-8.625)"
                    fill={MOCK_ASSESSMENT.score < 5 ? "#00CB93" : "#FF627E"}
                  />
                </g>
              </svg>

              {/* 배지 — 점수 구간별 문구, 글자수와 무관하게 항상 가운데 정렬 */}
              <p className="absolute left-[163px] top-[21px] -translate-x-1/2 text-[16px] font-semibold text-white tracking-[-0.4px] whitespace-nowrap">
                {getBadgeByScore(MOCK_ASSESSMENT.score)}
              </p>

              {/* 점수 — 자릿수와 무관하게 항상 가운데 정렬 */}
              <p className="absolute left-[163px] top-[97px] -translate-x-1/2 whitespace-nowrap">
                <span className="text-[40px] font-semibold text-[#00CB93]">
                  {MOCK_ASSESSMENT.score}
                </span>
                <span className="text-[16px] text-[#606060]">점</span>
              </p>

              {/* 정상 / 위험 라벨 */}
              <span className="absolute left-0 top-[115px] text-[12px] font-semibold text-[#AAEEDB] tracking-[-0.3px]">
                정상
              </span>
              <span className="absolute right-0 top-[115px] text-[12px] font-semibold text-[#FF627E] tracking-[-0.3px]">
                위험
              </span>
            </div>

            {/* 설명 — 유형·레벨별 상세 설명, 마지막 문장만 강조. whitespace-pre-line으로 문장 내 \n을 줄바꿈으로 렌더링 */}
            <p className="text-[14px] font-medium text-[#74767A] tracking-[-0.35px] leading-[25px] whitespace-pre-line">
              {content.description.slice(0, -1).join("")}
              <span className="text-[#00CB93] font-semibold">
                {content.description[content.description.length - 1]}
              </span>
            </p>
          </div>

          {/* 다시 진단하기 */}
          <button
            onClick={() => navigate("/diagnosis")}
            className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] text-center mt-5 mb-[16px]"
          >
            다시 진단하기
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={() => setStep("improvement")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px]"
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
      <div className="relative flex min-h-dvh flex-col bg-[#E6FFF8]">
        <header className="relative flex items-center h-[53px] px-5">
          <button
            onClick={() => setStep("result")}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img src={chevronLeft} alt="" className="w-[34px] h-[34px]" />
          </button>
          <p className="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold text-[#00CB93] tracking-[-0.45px] leading-[44px]">
            나를 위한 개선 방안
          </p>
        </header>

        <main className="flex-1 flex flex-col px-5 pt-[49px]">
          <div className="relative w-full h-[544px] bg-white rounded-[12px] px-4 pt-[30px] pb-6 overflow-hidden">
            {/* 테두리를 네이티브 border 대신 내부 레이어로 그림 — overflow-hidden은 자신의 border까지
                padding box 기준으로 잘라내서, border 밖으로 오버레이를 빼는 방식은 클리핑돼 버림.
                border를 카드 안쪽 레이어로 옮기고 그 위에 그라데이션을 그려야 테두리도 함께 흐려짐 */}
            <div className="absolute inset-0 rounded-[12px] border border-[#39D7AB] pointer-events-none" />

            {/* 왜 개선해야 할까요? */}
            <h3 className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px] text-center">
              왜 개선해야 할까요?
            </h3>
            <p className="text-[14px] font-medium text-[#74767A] tracking-[-0.35px] leading-[25px] mt-[20px]">
              {improvement.why}
            </p>

            {/* 어떻게 개선해야 할까요? */}
            <h3 className="text-[20px] font-semibold text-[#00CB93] tracking-[-0.5px] leading-[25px] text-center mt-[30px]">
              어떻게 개선해야 할까요?
            </h3>

            <div className="mt-[20px] space-y-[12px]">
              {improvement.steps.map((improvementStep, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[36px] h-[36px] rounded-full bg-[#AAEEDB] border border-[#00CB93] flex items-center justify-center shrink-0">
                    <span className="text-[16px] font-medium text-[#00CB93]">{i + 1}</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#00CB93] tracking-[-0.35px] leading-[25px]">
                      {improvementStep.title}
                    </p>
                    <p className="text-[10px] font-medium text-[#74767A] tracking-[-0.25px] leading-[25px]">
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
          <p className="text-[16px] font-medium text-[#949494] tracking-[-0.4px] text-center mb-[16px]">
            자세한 내용은 마이페이지에서 확인 할 수 있어요
          </p>

          <button
            onClick={() => setStep("character")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center mb-[66px]"
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
      <div className="relative flex min-h-dvh flex-col bg-[#00CB93]">
        <header className="relative flex items-center h-[53px] px-5">
          <button
            onClick={() => setStep("improvement")}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img
              src={chevronLeft}
              alt=""
              className="w-[34px] h-[34px] brightness-0 invert"
            />
          </button>
        </header>

        <main className="flex-1 flex flex-col px-[37px] pt-[146px]">
          {/* 제목 */}
          <h2 className="text-[20px] font-extrabold text-white leading-normal">
            {content.title}
          </h2>

          {/* 부제 */}
          <div className="text-[14px] font-medium text-[#C6F3E7] text-center leading-normal mt-[26px]">
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
        <div className="px-5 pb-[66px]">
          <button
            onClick={() => setStep("character2")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center"
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
      <div className="relative flex min-h-dvh flex-col bg-[#00CB93]">
        <header className="relative flex items-center h-[53px] px-5">
          <button
            onClick={() => setStep("character")}
            className="w-[34px] h-[34px] flex items-center justify-center"
          >
            <img
              src={chevronLeft}
              alt=""
              className="w-[34px] h-[34px] brightness-0 invert"
            />
          </button>
        </header>

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
        <div className="px-5 pb-[66px]">
          <button
            onClick={() => navigate("/home")}
            className="w-full h-[68px] rounded-[16px] bg-white border border-[#00CB93] text-[#00CB93] text-[20px] font-semibold tracking-[-0.5px] flex items-center justify-center"
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
