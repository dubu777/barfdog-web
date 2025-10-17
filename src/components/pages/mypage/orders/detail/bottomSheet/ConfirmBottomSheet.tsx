import { Fragment } from "react";
import { commonWrapper } from "@/styles/common.css";
import { bottomSheetContainer, bottomSheetStickyHeader } from "./BottomSheet.css";
import BottomSheet from "@/components/common/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import LabeledCheckbox from "@/components/common/labeledCheckBox/LabeledCheckBox";
import ListDivider from "@/components/common/listDivider/ListDivider";
import Text from "@/components/common/text/Text";
import OrderItem from "../../detail/general/orderItem/OrderItem";
import { useMultiSelect } from "@/hooks/useMultiSelect";
import { OrderItem as OrderItemType } from "@/types/mypage/orders";

interface ConfirmBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  orderItemInfoList: OrderItemType[];
  onConfirm?: (selectedItems: OrderItemType[]) => void;
}

export default function ConfirmBottomSheet({ 
  isOpen, 
  onClose,
  orderItemInfoList,
  onConfirm,
}: ConfirmBottomSheetProps) {

  const {
    isAllSelected,
    selectedItems,
    toggleItem,
    toggleAll,
    isSelected,
  } = useMultiSelect({
    items: orderItemInfoList,
    getItemId: (item) => item.itemId,
    initialSelectedIds: orderItemInfoList.map((item) => item.itemId),
  });

  const handleConfirm = () => {
    if (onConfirm && selectedItems.length > 0) {
      onConfirm(selectedItems);
    }
    onClose();
  };
  
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      closeOnBackgroundClick={false}
      className={bottomSheetContainer}
    >
      <div className={`${bottomSheetStickyHeader} ${commonWrapper({ 
        direction: 'col', 
        gap: 16,
        padding: 20,
        justify: 'start', 
        align: 'start',
      })}`}>
        <div className={commonWrapper({ direction: 'col', gap: 4, align: 'start' })}>
          <Text type="title3">구매 확정할 상품을 선택해 주세요</Text>
          <Text type="body2" color="gray600">구매 확정을 하면 해당 상품에 리뷰를 남길 수 있어요</Text>
        </div>
        <LabeledCheckbox
          value="select-all"
          isChecked={isAllSelected}
          onToggle={toggleAll}
        >
          <Text type="label2">전체 선택</Text>
        </LabeledCheckbox>
      </div>
      <div className={commonWrapper({ 
        direction: 'col', 
        gap: 12, 
        justify: 'start', 
        align: 'start',
        padding: 20,
        backgroundColors: 'gray50',
      })}>
        {orderItemInfoList.map((orderItem, index) => (
          <Fragment key={orderItem.itemId}>
            <LabeledCheckbox
              value={orderItem.itemId}
              isChecked={isSelected(orderItem.itemId)}
              onToggle={() => toggleItem(orderItem.itemId)}
            >
              <OrderItem
                orderItem={orderItem}
                showPrice={false}
              />
            </LabeledCheckbox>
            <ListDivider listLength={orderItemInfoList.length} index={index} color="gray100" />
          </Fragment>
        ))}
      </div>
      <ButtonDocked
        type="dual-button"
        primaryButtonLabel="구매확정"
        onPrimaryClick={handleConfirm}
        onSecondaryClick={onClose}
        secondaryButtonLabel="취소"
        primaryButtonSize="lg"
        position="sticky"
      />
    </BottomSheet>
  );
}