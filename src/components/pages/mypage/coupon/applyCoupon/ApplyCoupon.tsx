import {KeyboardEvent, MouseEvent, useState} from "react";
import * as styles from "./ApplyCoupon.css";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { useGetCoupons } from "@/api/mypage/queries/useGetCoupons";
import { useApplyCoupon } from "@/api/mypage/mutations/useApplyCoupon";
import { useToastStore } from "@/store/useToastStore";
import { AxiosError, isAxiosError } from "axios";

const ApplyCoupon = () => {
  const [couponCode, setCouponCode] = useState<string>('');
  const [applyErrorMessage, setApplyErrorMessage] = useState<string>('');
  const { isLoading } = useGetCoupons();
  const { mutate } = useApplyCoupon();
  const { addToast } = useToastStore();

  const handleCouponCodeChange = (value: string | number) => {
    if (typeof value === 'string') {
      setCouponCode(value)
      setApplyErrorMessage('');
    }
  }
  const handleApplyCoupon = (e?: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (!couponCode) {
      addToast('쿠폰 코드를 입력해주세요.', 'error')
      return;
    }
    mutate(
      { code: couponCode },
      {
        onSuccess: () => {
          setCouponCode('');
          addToast('쿠폰이 성공적으로 발행되었습니다!', 'success')
        },
        onError: (error: Error | AxiosError) => {
          if (isAxiosError(error)) {
            const defaultMessage =
              error.response?.data?.errors?.[0]?.defaultMessage || '쿠폰 적용에 실패했습니다.';
            addToast(defaultMessage, 'error');
            setApplyErrorMessage('잘못된 쿠폰 코드입니다.');
          } else {
            addToast('알 수 없는 에러가 발생했습니다.', 'error');
          }
        }
      },
    )
  };
  return (
    <>
    <div className={styles.couponInputContainer}>
      <div className={styles.couponInput}>
        <DefaultTextField
          type='text'
          size='sm'
          placeholder='쿠폰 번호를 입력하세요'
          id='couponCode'
          name='couponCode'
          value={couponCode}
          isError={applyErrorMessage !== ''}
          onChange={(value) => handleCouponCodeChange(value)}
          onSubmit={handleApplyCoupon}
        />
      </div>
      <div className={styles.couponCreateButton}>
        <DefaultButton
          type='main'
          borderRadius='sm'
          onClick={handleApplyCoupon}
          isDisabled={isLoading}
        >
          등록
        </DefaultButton>
      </div>
    </div>
    <p className={styles.errorMessage}>
      {applyErrorMessage}
    </p>
    </>
  );
};

export default ApplyCoupon;