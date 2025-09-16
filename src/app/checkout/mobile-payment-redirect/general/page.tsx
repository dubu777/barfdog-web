import { Suspense } from "react";

import Spinner from "@/components/common/spinner/Spinner";
import MobileGeneralPayment from "@/components/pages/checkout/general/mobileRedirect/MobileGeneralPayment";

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <MobileGeneralPayment />
    </Suspense>
  );
}
