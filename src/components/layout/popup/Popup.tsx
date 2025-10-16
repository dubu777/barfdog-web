'use client';
import {useEffect, useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import * as styles from './Popup.css';
import { useGetMainBannerInfo } from "@/api/main/queries/useGetMainBannerInfo";
import { PopupBanner, PopupPosition } from "@/types";
import { useMainStore } from "@/store/useMainStore";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import Text from "@/components/common/text/Text";
import useDeviceState from "@/hooks/useDeviceState";

const positionStyle = (
  popup: PopupBanner,
  samePositionIndex: number,
  isMobileWidth: boolean
) => {
  const containerWidth = 600;
  const containerGap = 36;
  const verticalGap = 30;
  const scaleStep = 0.075;
  const baseScale = 1;
  
  // 공통 계산값
  const verticalOffset = samePositionIndex * verticalGap;
  const scale = baseScale - samePositionIndex * scaleStep;
  const containerOffset = containerWidth / 2;

  // 모바일 스타일
  if (isMobileWidth) {
    return {
      top: `calc(50% - ${verticalOffset}px)`,
      left: '50%',
      transform: `translate(-50%, -50%) scale(${scale})`,
    };
  }

  // 데스크탑 스타일
  const baseStyles = {
    top: `calc(67% - ${verticalOffset}px)`,
    transform: `translateY(-50%) scale(${scale})`,
  };

  const positionStyles = {
    LEFT: {
      ...baseStyles,
      left: `calc(50% - ${containerOffset}px + ${containerGap}px)`,
    },
    RIGHT: {
      ...baseStyles,
      right: `calc(50% - ${containerOffset}px + ${containerGap}px)`,
    },
    MID: {
      top: `calc(45% - ${verticalOffset}px)`,
      left: '50%',
      transform: `translate(-50%, -50%) scale(${scale})`,
    },
  };

  return positionStyles[popup.position];
};

export default function Popup() {
  const { isMobileWidth } = useDeviceState();


  const { data: mainInfoData, isLoading, isError } = useGetMainBannerInfo();
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

  // visiblePopupList 를 position별로 그룹화하고 같은 position 내에서 leakedOrder 기준으로 정렬
  const visiblePopupList = useMemo(() => {
    const popupBannerList: PopupBanner[] = mainInfoData?.popupBannerList || [];
    const filteredPopups = popupBannerList
      .filter((popup) => !allClosedIds.has(popup.id))
      .sort((a, b) => a.leakedOrder - b.leakedOrder);
    
    // position별로 그룹화
    const groupedByPosition = filteredPopups.reduce((acc, popup) => {
      if (!acc[popup.position]) {
        acc[popup.position] = [];
      }
      acc[popup.position].push(popup);
      return acc;
    }, {} as Record<PopupPosition, PopupBanner[]>);
    
    // 각 position 내에서 순서대로 인덱스 추가
    return Object.values(groupedByPosition).flat().map((popup, index) => ({
      ...popup,
      samePositionIndex: groupedByPosition[popup.position].indexOf(popup)
    }));
  }, [mainInfoData?.popupBannerList, allClosedIds]);
  
  if (isLoading || isError || !mainInfoData) return null;

    return (
      visiblePopupList.map((popup) => (
      <div
        key={popup.id}
        className={styles.popup({ position: popup.position })}
        style={{
          zIndex: 1000 - popup.leakedOrder,
          ...positionStyle(popup, popup.samePositionIndex, isMobileWidth),
        }}
      >
        <Link href={popup.pcRedirectUrl} className={styles.popupImage}>
          <Image src={popup.pcDisplayBannerUrl.url} alt={popup.name} width={320} height={320} />
        </Link>
        <div className={styles.popupAction}>
          <LabeledCheckbox 
            value={popup.id} 
            isChecked={allClosedIds.has(popup.id)} 
            onToggle={() => hidePopupForDay(popup.id)}
            className={styles.popupCheckbox}
          >
            <Text type="headline3" color="gray500">오늘 하루 보지 않기</Text>
          </LabeledCheckbox>
          <button onClick={() => closePopup(popup.id)} className={styles.popupButton}>
            <Text type="headline3">닫기</Text>
          </button>
        </div>
      </div>
    ))
  );
};