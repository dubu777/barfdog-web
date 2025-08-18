"use client";
import * as styles from "./ProbiomeList.css";
import { useRouter } from "next/navigation";
import InfoIcon from "/public/images/icons/info.svg";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Chips from "@/components/common/chips/Chips";
import Button from "@/components/common/button/Button";
import CreateButton from "@/components/common/createButton/CreateButton";
import Card from "@/components/common/card/Card";
import useModal from "@/hooks/useModal";
import KitGuideModal from "@/components/pages/heathNote/probiome/modal/KitGuideModal";
import { PROBIOME_STATUS } from "@/constants/healthNote/probiome";
import { ProbiomeStatus } from "@/types/healthNote/probiome";
import { useGetProbiomeList } from "@/api/healthNote/probiome/queries/useGetProbiomeList";

interface ProbiomeListProps {
  petId: number;
}

const ProbiomeList = ({ petId }: ProbiomeListProps) => {
  const router = useRouter();
  const {
    isOpen: isOpenKitGuideModal,
    onClose: onCloseKitGuideModal,
    onToggle: onToggleKitGuideModal,
  } = useModal();

  // petId가 있는 경우에만 API 호출
  const { data: probiomeList = [], isLoading } = useGetProbiomeList(petId);

  if (isLoading) return null;

  const tempStatus = "SUBMITTED" as ProbiomeStatus;
  return (
    <>
      <section className={styles.probiomeListContainer}>
        <div className={styles.probiomeListTitle}>
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
          url={`/health-note/probiome/create?petId=${petId}`}
          text="사전 문진 작성하기"
        />
        <article className={styles.probiomeList}>
          {probiomeList.length > 0 ? (
            probiomeList.map(({ id, status, petName, submitDate }) => (
              <Card
                key={id}
                shadow="strong"
                gap={12}
                padding={12}
                align="start"
              >
                <div className={styles.probiomeCardItem}>
                  <Chips variant="outlined" color="red" borderRadius="lg">
                    {PROBIOME_STATUS[tempStatus]}
                  </Chips>
                  <DefaultText type="body3" color="gray600">
                    {submitDate}
                  </DefaultText>
                </div>
                <DefaultText type="title4">{petName}</DefaultText>
                <div className={styles.probiomeCardItem}>
                  <Button
                    variant="outline"
                    type="assistive"
                    fullWidth
                    onClick={() =>
                      router.push(`/health-note/probiome/detail/${id}`)
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
                          `/health-note/probiome/return-request/${id}`
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
            <Card shadow="strong" className={styles.probiomeEmpty} gap={4}>
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

export default ProbiomeList;
