import LoginRedirect from "@/components/pages/auth/login/loginRedirect/LoginRedirect";
import { SnSProvider } from "@/types";

interface RedirectLoginPageProps {
	searchParams: {
		provider: SnSProvider;
		code: string;
	}
}

export default function RedirectLoginPage({ searchParams }: RedirectLoginPageProps) {
	return (
		<>
			<LoginRedirect searchParams={searchParams} />
		</>
	)
}
