import Authentication from "@/components/pages/mypage/account/connectSns/authentication/Authentication";

interface AuthenticationPageProps {
  searchParams: {
    provider: 'kakao' | 'naver';
  }
}

export default async function AuthenticationPage({ searchParams }: AuthenticationPageProps) {
  return (
    <Authentication provider={searchParams.provider} />
  )
}
