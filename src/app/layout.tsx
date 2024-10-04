import "@/styles/reset.css";
import "@/styles/global.css";
import { themeClass } from "@/styles/theme.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="ko" className={themeClass}>
      <body>
        {children}
      </body>
    </html>
  );
}
