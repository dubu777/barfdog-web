import { Suspense } from "react";
import Account from "@/components/pages/mypage/account/Account";
import Spinner from "@/components/common/spinner/Spinner";

export default async function AccountPage() {
	return (
		<Suspense fallback={<Spinner fullscreen />}>
			<Account />
		</Suspense>
	)
}
