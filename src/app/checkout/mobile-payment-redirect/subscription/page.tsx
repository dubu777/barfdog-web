"use client";
import { Suspense } from "react";
import Spinner from "@/components/common/spinner/Spinner";
import MobileSubscriptionPayment from "@/components/pages/checkout/subscription/mobileRedirect/MobileSubscriptionPayment";

export default function Page() {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <MobileSubscriptionPayment />
    </Suspense>
  );
}
