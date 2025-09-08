import { Suspense } from "react";
import FindAccount from "@/components/pages/auth/account/findAccount/FindAccount";
import Spinner from "@/components/common/spinner/Spinner";

export default function FindAccountPage() {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <FindAccount />
    </Suspense>
  );
}
