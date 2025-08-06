import { Suspense } from "react";
import LoginWrapper from "@/components/pages/auth/login/loginWrapper/LoginWrapper";
import Loader from "@/components/common/loader/Loader";

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <LoginWrapper />
    </Suspense>
  )
}
