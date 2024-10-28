import { themeClass } from "@/styles/theme.css";
import {ReactNode} from "react";
import * as style from './Survey.css';

interface SurveyLayoutProps { 
  children: ReactNode
}
export default function SurveyLayout({children}: SurveyLayoutProps) {
  return (
    <div className={`${themeClass} ${style.surveyLayoutContainer}`}>
      {children}
    </div>
  )
}