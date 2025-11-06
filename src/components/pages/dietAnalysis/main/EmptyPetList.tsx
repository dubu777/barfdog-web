import Text from "@/components/ui/text/Text";
import EmptyIcon from "public/images/dietAnalysis/empty-pet.svg";
import Button from "@/components/ui/button/Button";
import * as styles from "./DietAnalysisMain.css";
import Link from "next/link";

interface EmptyPetListProps {
  url: string;
}

export default function EmptyPetList({ url }: EmptyPetListProps) {
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
      <Link href={url}>
        <Button variant="solid" intent="secondary" size="md">
          반려견 등록하기
        </Button>
      </Link>
    </div>
  );
}
