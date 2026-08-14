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
    <div className={`flex min-h-dvh flex-col ${bg}`}>
      {showHeader && <Header title={title} showBack={showBack} />}

      <main className={`flex-1 flex flex-col px-5 pt-8 ${showTabBar ? "pb-[104px]" : "pb-8"}`}>
        {children}
      </main>

      {showTabBar && <BottomTabBar />}
    </div>
  );
}

export default Layout;
