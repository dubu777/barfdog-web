'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSuccessGeneralPayment } from '@/api/order/mutations/useSuccessGeneralPayment';
import { useFailGeneralPayment } from '@/api/order/mutations/useFailGeneralPayment';
import DefaultText from '@/components/common/defaultText/DefaultText';
import * as styles from '../MobilePaymentRedirect.css';

export default function MobileGeneralPaymentRedirect() {
  const processedRef = useRef(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync: successPayment } = useSuccessGeneralPayment();
  const { mutateAsync: failPayment } = useFailGeneralPayment();

  useEffect(() => {
    const processFinalPayment = async () => {
      if (processedRef.current) return;
      processedRef.current = true;
      try {
        const impUid = searchParams.get('imp_uid');
        const impSuccess = searchParams.get('imp_success');
        const merchantUid = searchParams.get('merchantUid');
        const orderIdStr = searchParams.get('order_id');
        const discountRewardStr = searchParams.get('discount_reward');

        if (!impUid || !impSuccess || !merchantUid || !orderIdStr || !discountRewardStr) {
          throw new Error("필수 결제 정보가 누락되었습니다.");
        }

        const orderId = Number(orderIdStr);
        const discountReward = Number(discountRewardStr);

        if (impSuccess === "true") {
          await successPayment({
            id: orderId,
            body: { impUid, merchantUid, discountReward },
          });
          router.push("/order/completed");
        } else {
          await failPayment(orderId);
          router.push("/order/failed");
        }
      } catch (error) {
        console.error("모바일 결제 처리 실패", error);
        setError(error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.");
        router.push("/order/failed");
      } finally {
        setIsProcessing(false);
      }
    };

    processFinalPayment();
  }, [searchParams, router, successPayment, failPayment]);

  if (isProcessing) {
    return (
      <div>
        <DefaultText type="body2" style={{ marginTop: '16px' }}>
          결제를 처리 중입니다...
        </DefaultText>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <DefaultText type="title4" color="red">
          결제 처리 중 오류가 발생했습니다.
        </DefaultText>
        <DefaultText type="body2" style={{ marginTop: '8px' }}>
          {error}
        </DefaultText>
      </div>
    );
  }

  return null;
}
