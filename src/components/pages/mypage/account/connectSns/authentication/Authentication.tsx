"use client";
import { commonWrapper } from "@/styles/common.css";
import { Controller } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Text from "@/components/common/text/Text";
import Divider from "@/components/common/divider/Divider";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
  connectSnsSchema,
  defaultConnectSnsValue,
} from "@/utils/validation/auth/auth";
import { ConnectSnsPassword } from "@/types";

interface AuthenticationProps {
  onLogin: (() => void) | null;
  goBack: () => void;
}

export default function Authentication({
  onLogin,
  goBack,
}: AuthenticationProps) {
  const { handleSubmit, control, errors, isValid } =
    useFormHandler<ConnectSnsPassword>(
      connectSnsSchema,
      defaultConnectSnsValue
    );

  const handleConnectSns = (data: ConnectSnsPassword) => {
    console.log(data);
    // 비밀번호 확인 검증 필요
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <section
      className={commonWrapper({
        direction: "col",
        padding: 20,
        paddingTop: 60,
        align: "start",
      })}
    >
      <article
        className={commonWrapper({
          direction: "col",
          gap: 4,
          paddingBottom: 20,
          align: "start",
        })}
      >
        <Text type="title3">
          계정정보 확인을 위해
          <br />
          비밀번호를 입력해주세요
        </Text>
        <Text type="body1" color="gray600">
          개인정보 보호를 위해 인증절차가 필요합니다.
        </Text>
      </article>
      <Divider thickness={2} color="gray900" />
      <article className={commonWrapper({ paddingTop: 20 })}>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <InputField
              masking
              id="password"
              label="비밀번호 확인"
              isRequired
              placeholder="기존 비밀번호를 입력하세요"
              error={errors?.password?.message}
              onSubmit={isValid ? handleSubmit(handleConnectSns) : undefined}
              {...field}
            />
          )}
        />
      </article>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="완료"
        onPrimaryClick={handleSubmit(handleConnectSns)}
        isPrimaryDisabled={!isValid}
      />
    </section>
  );
}
