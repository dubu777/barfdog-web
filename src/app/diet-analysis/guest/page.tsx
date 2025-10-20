import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import DietAnalysisGuest from "@/components/pages/dietAnalysis/guest/DietAnalysisGuest";

export default function DietAnalysisGuestPage() {
  return (
    <>
      <Header leftTitle="AI 추천식단" />
      <DietAnalysisGuest />
      <BottomNavBar />
    </>
  );
}
