import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 라우트가 바뀔 때마다 창 스크롤을 맨 위로 되돌림 —
// React Router는 SPA 특성상 페이지 전환 시 스크롤 위치를 리셋해주지 않음
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
