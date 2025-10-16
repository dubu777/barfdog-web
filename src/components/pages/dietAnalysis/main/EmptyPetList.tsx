import Text from "@/components/common/text/Text";
import { commonWrapper } from "@/styles/common.css";
import EmptyIcon from "public/images/dietAnalysis/empty-pet.svg";
import Button from "@/components/common/button/Button";
import * as styles from "./DietAnalysisMain.css";

interface EmptyPetListProps {
  onCreate: () => void;
}

export default function EmptyPetList({ onCreate }: EmptyPetListProps) {
  return (
    <div className={styles.emptyPetContainer}>
      <EmptyIcon />
      <Text className={styles.emptyTitle} type="title2">
        멍...
      </Text>
      <Text
        className={styles.emptyText}
        type="body2"
        color="gray600"
        align="center"
      >
        등록된 반려견 리스트가 없어요
        <br />
        반려견을 등록해보세요
      </Text>
      <Button variant="solid" intent="secondary" size="md" onClick={onCreate}>
        반려견 등록하기
      </Button>
    </div>
  );
}
