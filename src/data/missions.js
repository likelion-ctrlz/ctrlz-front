import lotto from "../assets/mission/lotto.png";
import icecream from "../assets/mission/icecream.png";
import conv from "../assets/mission/conv.png";
import shop from "../assets/mission/shop.png";

// 미션 카드 아이콘. 정적 미션은 아래에서 직접 매칭하고,
// API에서 목록에 없는 미션이 내려오면 getMissionImage()가 이 중 하나로 매칭함
export const MISSION_IMAGES = [lotto, icecream, conv, shop];

// API에서 아직 이미지가 지정되지 않은 미션이 들어왔을 때 쓸 이미지를 고름.
// id 기반으로 고정 매칭해서 같은 미션이면 매번 같은 이미지가 나오게 함.
export function getMissionImage(mission) {
  if (mission?.image) return mission.image;
  const id = Number(mission?.id) || 0;
  return MISSION_IMAGES[Math.abs(id) % MISSION_IMAGES.length];
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
