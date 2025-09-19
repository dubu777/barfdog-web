import { Suspense } from "react";
import Spinner from "@/components/common/spinner/Spinner";
import Header from "@/components/layout/header/Header";
import LogoIcon from "public/images/logo/logo.svg";
import LoginSection from "@/components/pages/auth/login/loginSection/LoginSection";

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <Header leftElement={<LogoIcon />} />
      <LoginSection />
    </Suspense>
  );
}
