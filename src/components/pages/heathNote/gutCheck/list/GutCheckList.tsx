"use client";
import * as styles from "./GutCheckList.css";
import { useRouter } from "next/navigation";
import InfoIcon from "/public/images/icons/info.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import CreateButton from "@/components/common/createButton/CreateButton";
import Card from "@/components/common/card/Card";
import useModal from "@/hooks/useModal";
import KitGuideModal from "@/components/pages/heathNote/gutCheck/modal/KitGuideModal";
import { useGetGutCheckList } from "@/api/healthNote/gutCheck/queries/useGetGutCheckList";
import { GUT_CHECK_STATUS } from "@/constants/healthNote/gutCheck";
import { GutCheckStatus } from "@/types/healthNote/gutCheck";

interface GutCheckListProps {
  dogId: number;
}

const GutCheckList = ({ dogId }: GutCheckListProps) => {
  const router = useRouter();
  const {
    isOpen: isOpenKitGuideModal,
    onClose: onCloseKitGuideModal,
    onToggle: onToggleKitGuideModal,
  } = useModal();

  // dogId가 있는 경우에만 API 호출
  const { data: gutCheckList = [] } = useGetGutCheckList(dogId);

  const tempStatus = "SUBMITTED" as GutCheckStatus;
  return (
    <>
      <section className={styles.gutCheckListContainer}>
        <div className={styles.gutCheckListTitle}>
          <DefaultText type="title3">
            진단 키트를 수령한 후<br />
            사전 문진을 작성해 주세요
          </DefaultText>
          <Button
            iconSrc={InfoIcon}
            size="sm"
            iconColor="gray700"
            iconPosition="left"
            variant="outline"
            type="assistive"
            className={styles.kitGuideButton}
            onClick={onToggleKitGuideModal}
          >
            키트 안내
          </Button>
        </div>
        <CreateButton
          url="/health-note/gut-check/create"
          text="사전 문진 작성하기"
        />
        <article className={styles.gutCheckList}>
          {gutCheckList.length > 0 ? (
            gutCheckList.map(({ id, status, petName, submitDate }) => (
              <Card
                key={id}
                shadow="strong"
                gap={12}
                padding={12}
                align="start"
              >
                <div className={styles.gutCheckCardItem}>
                  <Chips variant="outlined" color="red" borderRadius="lg">
                    {GUT_CHECK_STATUS[tempStatus]}
                  </Chips>
                  <DefaultText type="body3" color="gray600">
                    {submitDate}
                  </DefaultText>
                </div>
                <DefaultText type="title4">{petName}</DefaultText>
                <div className={styles.gutCheckCardItem}>
                  <Button
                    variant="outline"
                    type="assistive"
                    fullWidth
                    onClick={() =>
                      router.push(`/health-note/gut-check/detail/${id}`)
                    }
                  >
                    신청 상세
                  </Button>
                  {tempStatus === "SUBMITTED" && (
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() =>
                        router.push(
                          `/health-note/gut-check/return-request/${id}`
                        )
                      }
                    >
                      회수 신청
                    </Button>
                  )}
                  {tempStatus === "COMPLETED" && (
                    <Button variant="outline" fullWidth>
                      결과 다운로드
                    </Button>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <Card shadow="strong" className={styles.gutCheckEmpty} gap={4}>
              <DefaultText type="label1" color="gray700">
                문진을 작성한 기록이 없어요
              </DefaultText>
              <DefaultText type="body3" color="gray600">
                사전 문진을 작성해야 회수 신청을 할 수 있어요
              </DefaultText>
            </Card>
          )}
        </article>
      </section>
      {isOpenKitGuideModal && (
        <KitGuideModal
          isOpen={isOpenKitGuideModal}
          onClose={onCloseKitGuideModal}
        />
      )}
    </>
  );
};

export default GutCheckList;
