import LoginRedirect from "@/components/pages/auth/login/loginRedirect/LoginRedirect";
import { SnsProvider } from "@/types";

interface RedirectLoginPageProps {
  searchParams: {
    provider: SnsProvider;
    code: string;
  };
}

export default function RedirectLoginPage({
  searchParams,
}: RedirectLoginPageProps) {
  return <LoginRedirect searchParams={searchParams} />;
}
