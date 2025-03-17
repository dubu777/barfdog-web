import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import * as styles from "./ApplyCoupon.css";
import { AxiosError, isAxiosError } from "axios";
import { useGetCouponList } from "@/api/mypage/queries/useGetCouponList";
import { useApplyCoupon } from "@/api/mypage/mutations/useApplyCoupon";
import { useToastStore } from "@/store/useToastStore";
import InputField from "@/components/common/inputField/InputField";

const ApplyCoupon = () => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [applyErrorMessage, setApplyErrorMessage] = useState<string>('');
  const { isLoading } = useGetCouponList();
  const { mutate } = useApplyCoupon();
  const { addToast } = useToastStore();

  const handleCouponCodeChange = (e: ChangeEvent<Element>) => {
    const value = (e.target as HTMLInputElement).value;
    setCouponCode(value)
    setApplyErrorMessage('');
  }

  const handleApplyCoupon = (e?: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (!couponCode) {
      addToast('쿠폰 코드를 입력해주세요.');
      return;
    }
    mutate(
      { code: couponCode },
      {
        onSuccess: () => {
          setCouponCode('');
          addToast('쿠폰이 성공적으로 발행되었습니다!');
        },
        onError: (error: Error | AxiosError| unknown) => {
          if (isAxiosError(error)) {
            const defaultMessage =
              error.response?.data?.errors?.[0]?.defaultMessage || '쿠폰 적용에 실패했습니다.';
            addToast(defaultMessage);
            setApplyErrorMessage('잘못된 쿠폰 코드입니다.');
          } else {
            addToast('알 수 없는 에러가 발생했습니다.');
          }
        }
      },
    )
  };
  return (
    <>
    <div className={styles.applyCoupon}>
      <div className={styles.couponInput}>
        <InputField
          placeholder='쿠폰 번호를 입력하세요'
          id='couponCode'
          name='couponCode'
          value={couponCode}
          error={applyErrorMessage}
          touched={applyErrorMessage !== ''}
          onChange={(e: ChangeEvent) => handleCouponCodeChange(e)}
          onSubmit={handleApplyCoupon}
          confirmButton
          confirmButtonText='등록'
          disabled={isLoading}
        />
      </div>
    </div>
    {applyErrorMessage &&
      <p className={styles.errorMessage}>
        {applyErrorMessage}
      </p>
    }
    </>
  );
};

export default ApplyCoupon;