import Header from "./Header";
import BottomTabBar from "./BottomTabBar";

function Layout({
  title,
  showBack = true,
  showHeader = true,
  showTabBar = true,
  bg = "bg-white",
  children,
}) {
  return (
    <div className={`flex min-h-screen flex-col ${bg}`}>
      {showHeader && <Header title={title} showBack={showBack} />}

      <main
        className={`flex-1 flex flex-col px-6 ${
          showHeader ? "pt-8" : "pt-[calc(max(env(safe-area-inset-top),44px)+2rem)]"
        } ${
          showTabBar ? "pb-[104px]" : "pb-[calc(max(env(safe-area-inset-bottom),34px)+2rem)]"
        }`}
      >
        {children}
      </main>

      {showTabBar && <BottomTabBar />}
    </div>
  );
}

export default Layout;
