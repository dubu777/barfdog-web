'use client';
import * as styles from './LoginRedirect.css';
import Loader from "@/components/common/loader/Loader";
import { useSnsLogin } from "@/api/auth/mutations/useSnsLogin";
import { useEffect } from "react";
import { SnSProvider } from '@/types';


interface LoginRedirectProps {
	searchParams: {
		provider: SnSProvider;
		code: string;
	}
}
const LoginRedirect = ({ searchParams }: LoginRedirectProps) => {
	const { provider, code } = searchParams;
  const { mutate: snsLogin, isPending } = useSnsLogin();

	useEffect(() => {
    if (code) {
      snsLogin({ provider, code });
    }
  }, [code, provider]);

  if (isPending) {
    return <Loader />;
  }

	return (
		<div className={styles.loginRedirectContainer}>
			<Loader />
		</div>
	);
}

export default LoginRedirect;
