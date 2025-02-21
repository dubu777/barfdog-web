import {ReactNode} from "react";
import SideNavBar from "@/components/layout/sideNavBar/SideNavBar";
import Header from "@/components/layout/header/Header";

interface SurveyLayoutProps { 
  children: ReactNode
}
export default function SurveyLayout({children}: SurveyLayoutProps) {
  return (
    <>
      <Header type="redBackground" />
      <SideNavBar />
      {children}
    </>
  )
}