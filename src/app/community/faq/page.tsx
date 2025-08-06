import { Suspense } from "react";
import Faq from "@/components/pages/community/faq/temp/FAQ";
import Loader from "@/components/common/loader/Loader";

export default function FaqPage() {
  return (
    <Suspense fallback={<Loader fullscreen />}>
      <Faq />
    </Suspense>
  )
}
