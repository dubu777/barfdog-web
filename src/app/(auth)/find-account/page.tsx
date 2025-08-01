import { Suspense } from "react";
import FindAccount from "@/components/pages/auth/account/findAccount/FindAccount";
import Loader from "@/components/common/loader/Loader";

export default function FindAccountPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <FindAccount />
    </Suspense>
  )
}
