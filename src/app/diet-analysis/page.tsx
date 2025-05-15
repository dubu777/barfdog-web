import BottomNavBar from "@/components/layout/bottomNavBar/BottomNavBar";
import Header from "@/components/layout/header/Header";
import DietAnalysisPageContainer from "@/components/pages/dietAnalysis/DietAnalysisPageContainer";

export default function DietAnalysisPage() {
  return (
    <>
      <Header leftTitle="AI 추천식단" showCartButton />
      <DietAnalysisPageContainer />
      <BottomNavBar />
    </>
  );
}
