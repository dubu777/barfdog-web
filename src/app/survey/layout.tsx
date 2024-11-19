import { themeClass } from "@/styles/theme.css";
import {ReactNode} from "react";
import SideNavBar from "@/components/layout/sideNavBar/SideNavBar";

interface SurveyLayoutProps { 
  children: ReactNode
}
export default function SurveyLayout({children}: SurveyLayoutProps) {
  return (
    <div className={`${themeClass}`}>
      <SideNavBar />
      {children}
    </div>
  )
}