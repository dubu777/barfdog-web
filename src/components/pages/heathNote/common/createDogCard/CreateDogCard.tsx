import * as styles from "./CreateDogCard.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Text from "@/components/common/text/Text";
import Button from "@/components/common/button/Button";
import Card from "@/components/common/card/Card";
import PhoneImage from "/public/images/healthNote/main/phone1.png";

interface CreateDogCardProps {
  buttonLabel: string;
}

const CreateDogCard = ({ buttonLabel }: CreateDogCardProps) => {
  const router = useRouter();
  return (
    <Card shadow="none" padding={16} gap={40}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeIn" }}
      >
        <Text type="title1">
          우리 아이 추가하고
          <br />
          건강상태 체크하기
        </Text>
      </motion.div>
      <motion.div
        className={styles.imageBox}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.8,
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <Image
          src={PhoneImage}
          height={230}
          width={112}
          priority
          alt="반려견 추가 이미지"
          className={styles.phoneImage}
        />
      </motion.div>
      <Button
        buttonColor="red"
        fullWidth
        onClick={() => router.push("/pet/create?source=health-note")}
      >
        {buttonLabel}
      </Button>
    </Card>
  );
};

export default CreateDogCard;
