import Image from "next/image";
import * as styles from "./GeneralItemCard.css";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { commonWrapper } from "@/styles/common.css";
import { SubscribeGeneralItem } from "@/types";
import { useFormContext, useWatch } from "react-hook-form";
import useModal from "@/hooks/useModal";
import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
import { useToastStore } from "@/store/useToastStore";

import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import PenIcon from "public/images/subscription/pen.svg";
import { useGeneralItemManager } from "@/hooks/subscription/useGeneralItemManager";
import GeneralItemDetailModal from "../../modal/generalItemDetailModal/GeneralItemDetailModal";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";

interface GeneralItemCardProps {
  generalItemTempData: SubscribeGeneralItem;
  isSelected: boolean;
  selectedIds: number[];
}

export default function GeneralItemCard({
  generalItemTempData,
  isSelected,
  selectedIds,
}: GeneralItemCardProps) {
  const toast = useToastStore((s) => s.addToast);
  const {
    isOpen: isDetailOpen,
    onClose: onDetailClose,
    onToggle: onDetailToggle,
  } = useModal();
  const {
    isOpen: isAlertOpen,
    onClose: onAlertClose,
    onToggle: onAlertToggle,
  } = useModal();

  const { control } = useFormContext<SubscriptionValues>();
  const watchedList = useWatch({ control, name: "generalItemList" }) ?? [];
  const currentEntry = watchedList.find(
    (f) => f.itemId === generalItemTempData.id
  );
  const currentAmount = currentEntry?.amount ?? 1;

  const { applyLocal, commitEntry, removeEntry, pending, existing } = useGeneralItemManager(
    generalItemTempData.id,
    1,
    generalItemTempData.originalPrice
  );

  const handleButtonClick = () => {
    if (isSelected) {
      removeEntry();
      toast("상품 빼기를 완료했어요", "above-button");
    } else {
      if (selectedIds.length > 1) {
        onAlertToggle();
        return;
      }
      onDetailToggle();
    }
  };

  const handleDetailModal = () => {
    onDetailToggle();
  };

  return (
    <div
      className={styles.subscribeItemCardContainer({
        isSelected,
      })}
    >
      <DefaultText type="headline2">{generalItemTempData.name}</DefaultText>
      <div className={commonWrapper({ direction: "row", gap: 12 })}>
        <Image
          src={generalItemTempData.imageUrl}
          alt="레시피 이미지"
          width={80}
          height={80}
          priority
        />
        <div
          className={commonWrapper({
            direction: "col",
            justify: "start",
            align: "start",
            gap: 2,
          })}
        >
          <div
            className={commonWrapper({
              direction: "col",
              justify: "start",
              align: "start",
              gap: 2,
            })}
          >
            <div className={commonWrapper({ direction: "row", gap: 4, justify: "start" })}>
              <DefaultText type="headline1" color="gray900">
                {generalItemTempData.originalPrice.toLocaleString()}원
              </DefaultText>
              <DefaultText type="caption" color="gray700">
                / 1개 당
              </DefaultText>
            </div>
            <div className={commonWrapper({ gap: 4, justify: "start" })}>
              {generalItemTempData.benefit.map((text, idx) => (
                <DefaultText key={idx} type="caption" color="gray500">
                  #{text}
                </DefaultText>
              ))}
            </div>
          </div>
          <div className={commonWrapper({ gap: 8, justify: "end" })}>
            {isSelected && (
              <div
                className={styles.subscribeUpdateInputBox}
                onClick={handleDetailModal}
              >
                <DefaultText type="headline4" color="gray700">
                  {currentAmount}개
                </DefaultText>
                <SvgIcon src={PenIcon} size={20} />
              </div>
            )}
            <Button
              type="primary"
              variant="outline"
              size="sm"
              textColor={isSelected ? "gray900" : "red"}
              borderColor={isSelected ? "gray300" : "red"}
              onClick={handleButtonClick}
            >
              {isSelected ? "빼기" : "담기"}
            </Button>
          </div>
        </div>
      </div>

      <GeneralItemDetailModal
        isOpen={isDetailOpen}
        onClose={onDetailClose}
        generalItemTempData={generalItemTempData}
        onApplyLocal={applyLocal}
        onCommit={commitEntry}
        pending={pending}
        existing={existing}
      />
      <AlertModal
        title="레시피 선택은 최대 2개까지 가능해요"
        content="다른 레시피를 담으시려면 기존에 선택한 레시피를 먼저 빼주세요"
        confirmText="확인"
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        onConfirm={onAlertClose}
      />
    </div>
  );
}
