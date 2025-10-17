import AlertModal from "@/components/common/modal/alertModal/AlertModal";
import Text from "@/components/common/text/Text";
import { OrderType } from "@/types/mypage/orders";

interface OrderCancelAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  orderType: OrderType;
}

export default function OrderCancelAlertModal({
  isOpen,
  onClose,
  onSubmit,
  orderType,
}: OrderCancelAlertModalProps) {
  return (
    orderType === 'SUBSCRIPTION' ? (
      <AlertModal
        isOpen={isOpen}
        onClose={onClose}
        title="주문을 취소하면 구독이 해지돼요"
        content={(
          <Text type='body2'>
            지금 주문을 취소하시면 예정된 
            <Text type='headline3' underLine> 모든 배송이 취소되며 정기구독도 해지</Text>
            됩니다. 이후에는 구독을 처음부터 다시 신청해 주셔야 해요.
            <br /><br />
            구독을 계속 원하신다면 취소 전에 한 번 더 확인해 주세요.
          </Text>
        )}
        confirmText="확인"
        cancelText='취소'
        onConfirm={onSubmit}
        onCancel={onClose}
        buttonPosition="center"
        closeOnBackgroundClick={false}
      />
    ) : (
      <AlertModal
        isOpen={isOpen}
        onClose={onClose}
        title="주문을 취소하시겠어요?"
        content="전체 상품이 즉시 주문취소돼요"
        confirmText="확인"
        cancelText="취소"
        onConfirm={onSubmit}
        onCancel={onClose}
        buttonPosition="center"
        closeOnBackgroundClick={false}
      />
    )
  );
}