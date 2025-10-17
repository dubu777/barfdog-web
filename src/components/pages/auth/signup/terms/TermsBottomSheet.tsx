"use client";

import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import * as styles from "./TermsBottomSheet.css";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import Text from "@/components/common/text/Text";
import { commonWrapper, pointColor } from "@/styles/common.css";
import { SignupStepValues } from "@/utils/validation/auth/auth";
import { useController, useFormContext, useWatch } from "react-hook-form";
import { useToggleOption } from "@/hooks/useToggleOption";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import PrivacyPolicy from "./PrivacyPolicy";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import ServicePolicy from "./ServicePolicy";
import { useMemo, useState } from "react";

type Panel = "list" | "service" | "privacy";

interface TermsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export default function TermsBottomSheet({
  isOpen,
  onClose,
  onSubmit,
}: TermsBottomSheetProps) {
  const { control, setValue } = useFormContext<SignupStepValues>();
  const [openPanel, setOpenPanel] = useState<Panel>("list");
  const openService = () => setOpenPanel("service");
  const openPrivacy = () => setOpenPanel("privacy");
  const openList = () => setOpenPanel("list");

  // RHF controller
  const { field: serviceField } = useController({
    name: "step4.servicePolicy",
    control,
  });
  const { field: privacyField } = useController({
    name: "step4.privacyPolicy",
    control,
  });
  const { field: emailField } = useController({
    name: "step4.receiveEmail",
    control,
  });
  const { field: smsField } = useController({
    name: "step4.receiveSms",
    control,
  });
  const { field: over14Field } = useController({
    name: "step4.over14YearsOld",
    control,
  });

  // 토글 유틸
  const { onToggle: onServiceToggle, isSelected: isServiceSelected } =
    useToggleOption(serviceField.value, "checkbox", serviceField.onChange);
  const { onToggle: onPrivacyToggle, isSelected: isPrivacySelected } =
    useToggleOption(privacyField.value, "checkbox", privacyField.onChange);
  const { onToggle: onEmailToggle, isSelected: isEmailSelected } =
    useToggleOption(emailField.value, "checkbox", emailField.onChange);
  const { onToggle: onSmsToggle, isSelected: isSmsSelected } = useToggleOption(
    smsField.value,
    "checkbox",
    smsField.onChange
  );
  const { onToggle: onOver14Toggle, isSelected: isOver14Selected } =
    useToggleOption(over14Field.value, "checkbox", over14Field.onChange);

  const [service, privacy, email, sms, over14] = useWatch({
    control,
    name: [
      "step4.servicePolicy",
      "step4.privacyPolicy",
      "step4.receiveEmail",
      "step4.receiveSms",
      "step4.over14YearsOld",
    ],
  });

  // 전체 체크 여부
  const allChecked = useMemo(() => {
    return service && privacy && email && sms && over14;
  }, [service, privacy, email, sms, over14]);

  const marketingChecked = useMemo(() => {
    return email && sms;
  }, [service, privacy, email, sms, over14]);

  // 전체 선택
  const handleAgreeAll = (isChecked: boolean) => {
    setValue("step4.servicePolicy", isChecked, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("step4.privacyPolicy", isChecked, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("step4.receiveEmail", isChecked, { shouldDirty: true });
    setValue("step4.receiveSms", isChecked, { shouldDirty: true });
    setValue("step4.over14YearsOld", isChecked, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleMarketingAll = (isChecked: boolean) => {
    setValue("step4.receiveEmail", isChecked, { shouldDirty: true });
    setValue("step4.receiveSms", isChecked, { shouldDirty: true });
  };

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className={styles.termsBottomSheetContainer}>
        {openPanel === "list" && (
          <>
            <Text type="title4">이용약관 동의</Text>
            <div
              className={commonWrapper({
                direction: "col",
              })}
            >
              <>
                <div
                  className={commonWrapper({
                    borderRadius: 8,
                    backgroundColors: "gray50",
                    padding: 12,
                  })}
                >
                  <LabeledCheckbox
                    value={true}
                    isChecked={allChecked}
                    onToggle={() => handleAgreeAll(!allChecked)}
                    align="center"
                  >
                    <Text type="label2" color="gray800" applyLineHeight={false}>
                      약관 전체동의
                    </Text>
                  </LabeledCheckbox>
                </div>
                <div
                  className={commonWrapper({
                    direction: "col",
                    padding: 12,
                    gap: 12,
                  })}
                >
                  <div className={commonWrapper({ justify: "between" })}>
                    <LabeledCheckbox
                      value={true}
                      isChecked={isServiceSelected(true)}
                      onToggle={onServiceToggle}
                      align="center"
                    >
                      <Text
                        type="body3"
                        color="gray600"
                        applyLineHeight={false}
                      >
                        <span className={pointColor}>(필수)</span> 이용약관 동의
                      </Text>
                    </LabeledCheckbox>
                    <SvgIcon
                      src={ArrowIcon}
                      color="gray500"
                      size={20}
                      onClick={openService}
                    />
                  </div>
                  <div className={commonWrapper({ justify: "between" })}>
                    <LabeledCheckbox
                      value={true}
                      isChecked={isPrivacySelected(true)}
                      onToggle={onPrivacyToggle}
                      align="center"
                    >
                      <Text type="body3" color="gray600">
                        <span className={pointColor}>(필수)</span> 개인정보 수집
                        이용 동의
                      </Text>
                    </LabeledCheckbox>
                    <SvgIcon
                      src={ArrowIcon}
                      color="gray500"
                      size={20}
                      onClick={openPrivacy}
                    />
                  </div>
                  <LabeledCheckbox
                    value={true}
                    isChecked={marketingChecked}
                    onToggle={() => handleMarketingAll(!marketingChecked)}
                    iconClick
                  >
                    <div
                      className={commonWrapper({
                        direction: "col",
                        gap: 12,
                        align: "start",
                      })}
                    >
                      <Text type="body3" color="gray600">
                        <span className={pointColor}>(선택)</span> 마케팅
                        혜택/정보 수신동의
                      </Text>
                      <div
                        className={commonWrapper({ direction: "col", gap: 4 })}
                      >
                        <LabeledCheckbox
                          value={true}
                          isChecked={isEmailSelected(true)}
                          onToggle={onEmailToggle}
                          align="center"
                        >
                          <Text type="body3" color="gray600">
                            E-Mail 수신 동의
                          </Text>
                        </LabeledCheckbox>
                        <LabeledCheckbox
                          value={true}
                          isChecked={isSmsSelected(true)}
                          onToggle={onSmsToggle}
                          align="center"
                        >
                          <Text type="body3" color="gray600">
                            SMS 수신 동의
                          </Text>
                        </LabeledCheckbox>
                      </div>
                    </div>
                  </LabeledCheckbox>
                  <LabeledCheckbox
                    value={true}
                    isChecked={isOver14Selected(true)}
                    onToggle={onOver14Toggle}
                    align="center"
                  >
                    <Text type="body3" color="gray600">
                      <span className={pointColor}>(필수)</span> 본인은 만 14세
                      이상입니다
                    </Text>
                  </LabeledCheckbox>
                </div>
              </>
            </div>
          </>
        )}
        {openPanel === "privacy" && <PrivacyPolicy openList={openList} />}
        {openPanel === "service" && <ServicePolicy openList={openList} />}
      </div>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="회원가입 완료"
        onPrimaryClick={handleSubmit}
        primaryButtonSize="lg"
      />
    </BottomSheet>
  );
}
