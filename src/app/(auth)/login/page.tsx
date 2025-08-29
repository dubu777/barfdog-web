import { Suspense } from "react";
import LoginWrapper from "@/components/pages/auth/login/loginWrapper/LoginWrapper";
import Spinner from "@/components/common/spinner/Spinner";
import Header from "@/components/layout/header/Header";
import LogoIcon from "public/images/logo/logo.svg";

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <Header leftElement={<LogoIcon />} />
      <LoginWrapper />
    </Suspense>
  );
}
