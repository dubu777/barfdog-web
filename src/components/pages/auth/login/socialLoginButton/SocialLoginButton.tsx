import { useRouter } from "next/navigation";
import { SnsProvider } from "@/types";
import { OAUTH_CLIENT_CONFIG, OAuthClientConfig } from "@/config/oauthClient";
import { useCallback } from "react";
import { setSnsCallbackUrl } from "@/utils/auth/snsCallbackUrl";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Text from "@/components/common/text/Text";
import { TextColor } from "@/types/typography";
import { snsButtonBox } from "./SocialLoginButton.css";
import { useSocialLogin } from "@/hooks/auth/useSocialLogin";

interface SocialLoginButtonProps {
  provider: SnsProvider;
  lastLoginActivity?: boolean;
  callbackUrl?: string;
  defer?: boolean;
  onDeferredLoginClick?: (fn: () => void) => void;
  showSymbolButton?: boolean;
  config: OAuthClientConfig;
  nextPath?: string;
}

export default function SocialLoginButton({
  provider,
  callbackUrl,
  defer = false,
  onDeferredLoginClick,
  config,
  showSymbolButton = false,
  nextPath = "/",
}: SocialLoginButtonProps) {
  const { handleClick } = useSocialLogin(provider, {
    callbackUrl,
    defer,
    onDeferredLoginClick,
  });

  return showSymbolButton ? (
    <div onClick={handleClick} className={snsButtonBox({ provider })}>
      <SvgIcon src={config.symbolIcon} width={16} height={16} />
      <Text type="headline1" color={config.fontColor as TextColor}>
        {config.loginText}
      </Text>
    </div>
  ) : (
    <SvgIcon src={config.icon} size={52} onClick={handleClick} />
  );
}
