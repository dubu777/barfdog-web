import MainInformation from "@/components/pages/mypage/main/mainInformation/MainInformation";
import MainBanner from "@/components/pages/mypage/main/mainBanner/MainBanner";
import MainMenus from "@/components/pages/mypage/main/mainMenus/MainMenus";
import MainCard from "@/components/pages/mypage/main/mainCard/MainCard";

const MyPageMain = () => {
  return (
    <section style={{ marginBottom: '60px' }}>
      <MainInformation />
      <MainCard />
      <MainBanner />
      <MainMenus />
    </section>
  );
};

export default MyPageMain;