'use client';
import {useEffect, useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import * as styles from './Popup.css';
import { useGetMainInfo } from "@/api/main/queries/useGetMainInfo";
import { MainPopupBannerDto, PopupPosition } from "@/types";
import { useMainStore } from "@/store/useMainStore";

const positionStyle = (popup: MainPopupBannerDto) => {
  const defaultOffset = 20;
  const positionGap = 30;
  const top = `calc(45% + ${(popup.leakedOrder - 1) * positionGap}px)`;

  const positionMap: Record<PopupPosition, {left?: string, right?: string; transform?: string}> = {
    LEFT: { left: `${defaultOffset + popup.leakedOrder * positionGap}px` },
    RIGHT: { right: `${defaultOffset + popup.leakedOrder * positionGap}px` },
    CENTER: { left: '50%', transform: 'translateX(-50%)' },
  };

  return { top, ...positionMap[popup.position] };
};

const Popup = () => {
  const { data: mainInfoData, isLoading, isError } = useGetMainInfo();
  const {
    hiddenPopupIds,
    closedPopups,
    initializeHiddenPopups,
    hidePopupForDay,
    closePopup,
  } = useMainStore();

  // 숨겨진 팝업 초기화 (최초 한 번만 실행되도록 설정)
  useEffect(() => {
    initializeHiddenPopups();
  }, [initializeHiddenPopups]);

  // 숨겨진 팝업 및 닫은 팝업 ID
    const allClosedIds = useMemo(() => {
    return new Set([...hiddenPopupIds, ...closedPopups]);
  }, [hiddenPopupIds, closedPopups]);

  // visiblePopupList 를 leakedOrder 기준으로 정렬
  const visiblePopupList = useMemo(() => {
    const popupBannerList: MainPopupBannerDto[] = mainInfoData?.popupBannerDtoList || [];
    return popupBannerList
      .filter((popup) => !allClosedIds.has(popup.id))
      .sort((a, b) => a.leakedOrder - b.leakedOrder);
  }, [mainInfoData?.popupBannerDtoList, allClosedIds]);
  
  if (isLoading || isError) return null;

  return (
    visiblePopupList.map((popup) => (
      <div
        key={popup.id}
        className={styles.popup({ position: popup.position })}
        style={{
          zIndex: 1000 - popup.leakedOrder,
          ...positionStyle(popup),
        }}
      >
        <Link href={popup.pcLinkUrl} className={styles.popupImage}>
          <Image src={popup.pcImageUrl} alt={popup.name} width={400} height={400} />
        </Link>
        <div>
          <button onClick={() => hidePopupForDay(popup.id)} className={styles.popupButton}>
            하루 동안 보지 않기
          </button>
          <button onClick={() => closePopup(popup.id)} className={styles.popupButton}>
            닫기
          </button>
        </div>
      </div>
    ))
  );
};

export default Popup;