import { Suspense } from "react";
import LoginWrapper from "@/components/pages/auth/login/loginWrapper/LoginWrapper";
import Loader from "@/components/common/loader/Loader";
import Header from "@/components/layout/header/Header";
import LogoIcon from "public/images/logo/logo.svg";

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Header leftElement={<LogoIcon />} />
      <LoginWrapper />
    </Suspense>
  );
}
