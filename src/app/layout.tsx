import "@/styles/reset.css";
import "@/styles/global.css";
import { themeClass } from "@/styles/theme.css";
import { Metadata } from "next";
import { commonLayoutContainer } from "@/styles/common.css";
import localFont from 'next/font/local';
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import Toast from "@/components/common/toast/Toast";
import Script from "next/script";
import SnackBar from "@/components/common/snackBar/SnackBar";
import ChannelTalkProvider from "@/providers/ChannelTalkProvider";

export const metadata: Metadata = {
  title: "바프독",
  description:
    "내 반려동물에게 꼭 맞는 1:1 맞춤 플랜, 나이, 품종, 체중, 활동량, 알러지 등을 고려한 완벽한 식단을 간편하게 정기배송 받을 수 있습니다. 바프독 시작하기.",
  icons: "/images/icons/favicon-develop.png",
};
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard"
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={themeClass}>
      <head>
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}
      </Script>
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}
      </Script>
      </head>
      <body className={pretendard.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ReactQueryProvider>
          <ChannelTalkProvider>
            <div className={`${commonLayoutContainer} ${pretendard.variable}`}>
              {children}
            </div>
            <SnackBar />
            <Toast />
            <div id="modal-root" />
          </ChannelTalkProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
