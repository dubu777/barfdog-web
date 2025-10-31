import "@/styles/reset.css";
import "@/styles/global.css";
import { themeClass } from "@/styles/theme.css";
import { Metadata } from "next";
import { commonLayoutContainer } from "@/styles/common.css";
import localFont from "next/font/local";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import WebViewBridgeProvide from "@/providers/WebViewBridgeProvider";
import Toast from "@/components/common/toast/Toast";
import SnackBar from "@/components/common/snackBar/SnackBar";
import GlobalAlertModal from "@/components/common/modal/globalAlertModal/GlobalAlertModal";
// import ChannelTalkProvider from "@/providers/ChannelTalkProvider";

export const metadata: Metadata = {
  title: "바프독",
  description:
    "내 반려동물에게 꼭 맞는 1:1 맞춤 플랜, 나이, 품종, 체중, 활동량, 알러지 등을 고려한 완벽한 식단을 간편하게 정기배송 받을 수 있습니다. 바프독 시작하기.",
  icons: "/images/icons/favicon-develop.png",
};
const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={themeClass}>
      <body className={pretendard.className}>
        <ReactQueryProvider>
          <WebViewBridgeProvide>
            {/* <ChannelTalkProvider> */}
            <div className={`${commonLayoutContainer} ${pretendard.variable}`}>
              {children}
            </div>
            <GlobalAlertModal />
            <SnackBar />
            <Toast />
            <div id="modal-root" />
            {/* </ChannelTalkProvider> */}
          </WebViewBridgeProvide>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
