import { commonWrapper } from "@/styles/common.css";
import { notification } from "./Notification.css";
import { useMemo, useCallback } from "react";
import { Controller, Control, UseFormSetValue } from "react-hook-form";
import Card from "@/components/ui/card/Card";
import Text from "@/components/ui/text/Text";
import LabeledRadioButton from "@/components/ui/labeledRadioButton/LabeledRadioButton";
import Divider from "@/components/ui/divider/Divider";
import { UpdateUserInfo } from "@/types/mypage/account";

interface NotificationProps {
  receiveEmail: boolean;
  receiveSms: boolean;
  control: Control<UpdateUserInfo>;
  setValue: UseFormSetValue<UpdateUserInfo>;
  isMobileDevice: boolean;
}

export default function Notification({
  receiveEmail,
  receiveSms,
  control,
  setValue,
  isMobileDevice = false,
}: NotificationProps) {
  const receiveAll = useMemo(
    () => receiveEmail && receiveSms,
    [receiveEmail, receiveSms]
  );

  const handleReceiveAllChange = useCallback(
    (value: boolean) => {
      setValue("receiveEmail", !value);
      setValue("receiveSms", !value);
    },
    [setValue]
  );

  return (
    <Card
      direction="col"
      align="start"
      backgroundColor="gray50"
      shadow="light"
      borderRadius={16}
      border="gray300"
      className={notification({ isMobileDevice })}
    >
      <div
        className={commonWrapper({
          direction: "col",
          align: "start",
          padding: 20,
        })}
      >
        <Text type="title4">이벤트 및 혜택 알림</Text>
        <Text type="caption2" color="gray700">
          특가 및 쿠폰 등 이벤트 정보를 빠르게 알려드려요.
          <br />
          서비스 알림은 수신설정에 상관없이 발송돼요.
        </Text>
      </div>
      <div
        className={commonWrapper({
          paddingY: 16,
          paddingX: 20,
          justify: "start",
        })}
      >
        <LabeledRadioButton
          value={receiveAll}
          onToggle={handleReceiveAllChange}
          isChecked={receiveAll}
          optionType="selection"
        >
          마케팅 개인정보 수집 및 이용 동의(선택)
        </LabeledRadioButton>
      </div>
      <Divider height={1} color="gray300" />
      <div
        className={commonWrapper({
          paddingX: 32,
          paddingY: 16,
          direction: "col",
          align: "start",
          gap: 16,
        })}
      >
        <Controller
          name="receiveEmail"
          control={control}
          render={({ field }) => (
            <LabeledRadioButton
              value={field.value}
              onToggle={(value) => setValue("receiveEmail", !value)}
              isChecked={field.value}
              optionType="selection"
            >
              이메일
            </LabeledRadioButton>
          )}
        />
        <Divider height={1} color="gray200" />
        <Controller
          name="receiveSms"
          control={control}
          render={({ field }) => (
            <LabeledRadioButton
              value={field.value}
              onToggle={(value) => setValue("receiveSms", !value)}
              isChecked={field.value}
              optionType="selection"
            >
              문자 메세지
            </LabeledRadioButton>
          )}
        />
      </div>
    </Card>
  );
}
