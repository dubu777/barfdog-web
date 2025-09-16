import { Suspense } from "react";
import Faq from "@/components/pages/community/faq/FAQ";
import Spinner from "@/components/common/spinner/Spinner";

export default function FaqPage() {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <Faq />
    </Suspense>
  )
}
