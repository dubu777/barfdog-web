import { Suspense } from "react";
import Account from "@/components/pages/mypage/account/Account";
import Loader from "@/components/common/loader/Loader";

export default async function AccountPage() {
	return (
		<Suspense fallback={<Loader fullscreen />}>
			<Account />
		</Suspense>
	)
}
