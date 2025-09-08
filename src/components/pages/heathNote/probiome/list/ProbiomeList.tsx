"use client";
import * as styles from "./ProbiomeList.css";
import { useRouter } from "next/navigation";
import InfoIcon from "/public/images/icons/info.svg";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import CreateButton from "@/components/common/createButton/CreateButton";
import Card from "@/components/common/card/Card";
import useModal from "@/hooks/useModal";
import KitGuideModal from "@/components/pages/heathNote/probiome/modal/KitGuideModal";
import { ProbiomeStatus } from "@/types/healthNote/probiome";
import { useGetProbiomeList } from "@/api/healthNote/probiome/queries/useGetProbiomeList";
import ProbiomeCard from "./ProbiomeCard";
import Spinner from "@/components/common/spinner/Spinner";

interface ProbiomeListProps {
  petId: number;
}

export default function ProbiomeList({ petId }: ProbiomeListProps) {
  const router = useRouter();
  const {
    isOpen: isOpenKitGuideModal,
    onClose: onCloseKitGuideModal,
    onToggle: onToggleKitGuideModal,
  } = useModal();

  // petId가 있는 경우에만 API 호출
  const { data: probiomeList } = useGetProbiomeList(petId);

  const handleDetail = (diagnosisId: number) => {
    router.push(`/health-note/${petId}/probiome/detail/${diagnosisId}`);
  };
  const handleReturn = (diagnosisId: number) => {
    router.push(`/health-note/${petId}/probiome/pickup/${diagnosisId}`);
  };

  // const tempStatus = "SUBMITTED" as ProbiomeStatus;
  return (
    <>
      <section className={styles.probiomeListContainer}>
        <div className={styles.probiomeListTitle}>
          <Text type="title3">
            진단 키트를 수령한 후<br />
            사전 문진을 작성해 주세요
          </Text>
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
          url={`/health-note/${petId}/probiome/create`}
          text="사전 문진 작성하기"
        />
        <article className={styles.probiomeList}>
          {probiomeList.length > 0 ? (
            probiomeList.map(
              ({ diagnosisId, diagnosisStatus, petName, submitDate }) => (
                <ProbiomeCard
                  key={diagnosisId}
                  status={diagnosisStatus}
                  submitDate={submitDate}
                  petName={petName}
                  onDetail={() => handleDetail(diagnosisId)}
                  onReturn={() => handleReturn(diagnosisId)}
                />
              )
            )
          ) : (
            <Card shadow="strong" className={styles.probiomeEmpty} gap={4}>
              <Text type="label1" color="gray700">
                문진을 작성한 기록이 없어요
              </Text>
              <Text type="body3" color="gray600">
                사전 문진을 작성해야 회수 신청을 할 수 있어요
              </Text>
            </Card>
          )}
        </article>
      </section>
      <KitGuideModal
        petId={petId}
        isOpen={isOpenKitGuideModal}
        onClose={onCloseKitGuideModal}
      />
    </>
  );
}
