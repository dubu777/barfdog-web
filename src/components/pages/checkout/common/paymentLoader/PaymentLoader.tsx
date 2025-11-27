import { paymentLoaderContainer } from "./PaymentLoader.css";
import Text from "@/components/ui/text/Text";
import Spinner from "@/components/ui/spinner/Spinner";

export default function PaymentLoader() {
  return (
    <div className={paymentLoaderContainer}>
      <Spinner />
      <Text type="body2" color="gray100">
        결제를 진행중입니다
      </Text>
    </div>
  );
}
