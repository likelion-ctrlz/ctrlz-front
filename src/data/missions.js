import lotto from "../assets/mission/lotto.png";
import icecream from "../assets/mission/icecream.png";
import conv from "../assets/mission/conv.png";
import shop from "../assets/mission/shop.png";

// 미션 카드 아이콘. 일반 미션은 이 중 하나로 랜덤(해시 기반) 배정되고,
// API에서 목록에 없는 미션이 내려오면 getMissionImage()가 이 중 하나로 매칭함
export const MISSION_IMAGES = [lotto, icecream, conv, shop];

// 와우포인트 미션은 실제 내용과 맞는 아이콘으로 고정 (seed_missions.py의 와우 미션 4개와 1:1 매칭)
const WOW_MISSION_ICONS = {
  "베라에서 이달의 맛 시도하기": shop,
  "즉석복권 사기": lotto,
  "무인아이스크림 털기": icecream,
  "편의점 신상 리뷰": conv,
};

// 문자열(UUID 포함)을 안정적인 정수로 해시 — 같은 id는 항상 같은 값이 나옴
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

// 미션 카드 아이콘 결정.
// - 와우포인트 미션(is_wow)은 실제 내용과 맞는 고정 아이콘을 씀
// - 그 외는 id를 해시해서 4개 아이콘 중 하나로 배정 (미션마다 다르게 보이되, 같은 미션은 새로고침해도 항상 같은 아이콘)
export function getMissionImage(mission) {
  if (mission?.image) return mission.image;
  if (mission?.is_wow) {
    const wowIcon = WOW_MISSION_ICONS[mission.title];
    if (wowIcon) return wowIcon;
  }
  const id = String(mission?.id ?? "");
  return MISSION_IMAGES[hashString(id) % MISSION_IMAGES.length];
}

const MISSIONS = [
  {
    id: 1,
    title: "근처에서 즉석 복권 구매해보기",
    desc: "혹시 알아요? 오늘 당신에게 행운이 찾아올지",
    guide:
      "집 앞이나 편의점에서 즉석복권 한 장을 사보세요.\n큰돈 들이지 않고도 오늘 하루에 작은 설렘을 더할 수 있어요.\n당첨이 안 돼도 괜찮아요, 문 밖을 나선 것 자체가 오늘의 미션이에요.",
    difficulty: "중",
    token: 20,
    xp: 30,
    conditions: [
      "야외에서 촬영한 사진이어야 해요",
      "발 또는 주변 환경이 보여야 해요",
      "오늘 날짜의 실시간 사진만 인정 돼요",
    ],
    image: lotto,
  },
  {
    id: 2,
    title: "베스킨라빈스 이달의 맛 도전",
    desc: "이번 달은 무슨 맛인지 저에게 알려주세요!",
    guide:
      "이번 달 새로 나온 맛을 직접 먹어보고, 모로에게 리뷰를 남겨주세요.\n달콤한 한 입으로 기분전환 해봐요.",
    difficulty: "하",
    token: 20,
    xp: 10,
    conditions: [
      "아이스크림이 담긴 사진이어야 해요",
      "매장 또는 포장 상태가 보여야 해요",
      "오늘 날짜의 실시간 사진만 인정 돼요",
    ],
    image: shop,
  },
  {
    id: 3,
    title: "오늘의 편의점 신상 리뷰어",
    desc: "집 앞 편의점에서 나온 이번 달 신상을 리뷰해봐요",
    guide:
      "집 앞 편의점에서 이번 달 신상을 하나 골라보세요.\n직접 먹어보고 별점을 매겨봐요.",
    difficulty: "하",
    token: 30,
    xp: 20,
    conditions: [
      "구매한 신상품이 사진에 보여야 해요",
      "편의점 내부 또는 앞에서 촬영해야 해요",
      "오늘 날짜의 실시간 사진만 인정 돼요",
    ],
    image: conv,
  },
  {
    id: 4,
    title: "무인 아이스크림 정복",
    desc: "근처 무인 아이스크림 가게를 정복해봐요",
    guide:
      "근처 무인 아이스크림 가게를 찾아가 보세요.\n사람 없는 곳에서 편하게 고르는 즐거움을 느껴봐요.",
    difficulty: "하",
    token: 20,
    xp: 10,
    conditions: [
      "무인 가게 내부 또는 외부가 보여야 해요",
      "구매한 아이스크림이 사진에 보여야 해요",
      "오늘 날짜의 실시간 사진만 인정 돼요",
    ],
    image: icecream,
  },
];

export default MISSIONS;
