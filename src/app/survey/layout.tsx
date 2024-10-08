import {ReactNode} from "react";

interface SurveyLayoutProps { 
  children: ReactNode
}
export default function SurveyLayout({children}: SurveyLayoutProps) {
  return (
    <div>
      {children}
    </div>
  )
}