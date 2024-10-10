import { themeClass } from "@/styles/theme.css";
import {ReactNode} from "react";

interface SurveyLayoutProps { 
  children: ReactNode
}
export default function SurveyLayout({children}: SurveyLayoutProps) {
  return (
    <div className={themeClass}>
      {children}
    </div>
  )
}