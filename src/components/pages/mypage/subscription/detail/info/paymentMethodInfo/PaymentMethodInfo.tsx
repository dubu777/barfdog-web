import Button from "@/components/ui/button/Button";
import PaymentCard from "@/components/pages/mypage/subscription/common/paymentCard/PaymentCard";
import CardWrapper from "@/components/pages/mypage/common/wrapper/CardWrapper";
import InfoWrapper from "@/components/pages/mypage/common/wrapper/InfoWrapper";
import { PaymentMethod } from "@/types";

interface PaymentMethodInfoProps {
  paymentMethod: PaymentMethod;
  openChangePaymentMethodModal?: () => void;
}

export default function PaymentMethodInfo({ 
  paymentMethod, 
  openChangePaymentMethodModal,
}: PaymentMethodInfoProps) {
  
  return (
    <InfoWrapper title='정기결제 수단'>
      <CardWrapper gap={12} padding={12}>
        <PaymentCard
          cardSize="sm"
          paymentMethod={paymentMethod}
        />
        {openChangePaymentMethodModal && (
          <Button 
            variant="outline"
            intent="assistive"
            size="sm"
            fullWidth
            onClick={openChangePaymentMethodModal}
          >
            결제 수단 변경
          </Button>
        )}
      </CardWrapper>
    </InfoWrapper>
  );
}