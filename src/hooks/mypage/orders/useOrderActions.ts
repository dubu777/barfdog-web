import { useQueryClient } from "@tanstack/react-query";
import { useCancelRequestOrder } from "@/api/mypage/orders/mutations/useCancelRequestOrder";
import { useConfirmGeneralOrder } from "@/api/mypage/orders/mutations/useConfirmGeneralOrder";
import { useToastStore } from "@/store/useToastStore";
import usePopupWindow from "@/hooks/usePopupWindow";
import { queryKeys } from "@/constants";
import { DEFAULT_CANCEL_REASONS } from "@/constants/mypage/orders";
import { OrderType, OrderItem, RequestCancelOrderProps } from "@/types/mypage/orders";
import { useCallback } from "react";

interface UseOrderActionsProps {
  orderId: number;
  orderType?: OrderType;
  orderInfo?: {
    deliveryCode?: string;
    deliveryNumber?: string;
  };
}
/**
 * 주문 관련 액션 훅
 *
 * @param {number} orderId - 주문 ID
 * @param {OrderType} orderType - 주문 타입
 * @param {Object} orderInfo - 주문 정보
 * @param {string} orderInfo.deliveryCode - 배송 코드
 * @param {string} orderInfo.deliveryNumber - 배송 번호
 * 
 * @returns {Object} 주문 관련 액션 함수들
 * @returns {Function} invalidateOrder - 주문 상세 조회 및 목록 조회 무효화
 * @returns {Function} onRequestCancelOrder - 주문 취소 신청
 * @returns {Function} onCancelOrder - 주문 취소
 * @returns {Function} onConfirmOrder - 주문 구매확정
 * @returns {Function} onDeliveryTracking - 배송 조회
 */
export function useOrderActions({ orderId, orderType, orderInfo }: UseOrderActionsProps) {
  const queryClient = useQueryClient();

  const { addToast } = useToastStore();
  const openPopup = usePopupWindow();

  const { mutate: cancelRequestOrder } = useCancelRequestOrder();
  const { mutate: confirmGeneralOrder } = useConfirmGeneralOrder();

  // 주문 상세 조회 및 목록 조회 무효화
  const invalidateOrder = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.MYPAGE.BASE, 
          queryKeys.MYPAGE.ORDERS.BASE,
          queryKeys.MYPAGE.ORDERS.GET_ORDER_DETAIL,
          orderId,
          orderType,
        ],
      }),
      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.MYPAGE.BASE, 
          queryKeys.MYPAGE.ORDERS.BASE, 
          queryKeys.MYPAGE.ORDERS.GET_ORDER_LIST, 
          orderType
        ],
      }),
    ]);
  }, [orderId, orderType, queryClient]);

  // 주문 취소 신청
  const onRequestCancelOrder = ({
    reason,
    detailReason,
    openCancelRequestSuccessModal,
    onClose,
  }: RequestCancelOrderProps) => {
    if(!orderType || !reason) {
      return;
    }

    const body = {
      reason,
      detailReason,
    };

    cancelRequestOrder({ 
      orderId, 
      orderType,
      body 
    }, {
      onSuccess: async () => {
        openCancelRequestSuccessModal();
        onClose();
        await invalidateOrder();
      },
      onError: () => {
        addToast('취소 신청에 실패했어요. 잠시 후 다시 시도해 주세요.', 'above-button');
      }
    });
  };

  // 주문 취소
  const onCancelOrder = () => {
    if (!orderType) {
      return;
    }

    const body = {
      reason: DEFAULT_CANCEL_REASONS[orderType].reason,
      detailReason: DEFAULT_CANCEL_REASONS[orderType].detailReason,
    };

    cancelRequestOrder({ 
      orderId, 
      orderType,
      body 
    }, {
      onSuccess: async () => {
        await invalidateOrder();
        addToast('취소되었습니다.');
      },
      onError: () => {
        addToast('취소 신청에 실패했어요. 잠시 후 다시 시도해 주세요.', 'above-button');
      }
    });
  };

  // 주문 구매확정
  const onConfirmOrder = (selectedItems: OrderItem[]) => {
    const body = {
      orderId: orderId,
      orderItemIdList: selectedItems.map((item) => item.orderItemId),
    };

    confirmGeneralOrder({ 
      body 
    }, {
      onSuccess: async () => {
        await invalidateOrder();
        addToast('구매확정 처리되었습니다.');
      },
      onError: () => {
        addToast('구매확정에 실패했어요. 잠시 후 다시 시도해 주세요.');
      }
    });
  };

  // 배송 조회
  const onDeliveryTracking = () => {
    if (!orderInfo) {
      return;
    }
    
    openPopup(
      `https://trace.goodsflow.com/VIEW/V1/whereis/${process.env.NEXT_PUBLIC_GOODSFLOW_SITECODE}/${orderInfo.deliveryCode}/${orderInfo.deliveryNumber}`
    );
  };

  return {
    onRequestCancelOrder,
    onCancelOrder,
    onConfirmOrder,
    onDeliveryTracking,
    invalidateOrder,
  };
}
