import { useState } from "react";
import * as styles from "./ApplyCoupon.css";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import AlertModal from "@/components/common/alertModal/AlertModal";
import { useMutation } from "@tanstack/react-query";
import { applyCoupon } from "@/api/coupon";
import { useGetCoupons } from "@/api/queries/useGetCoupons";

const ApplyCoupon = () => {
  const [code, setCode] = useState<string>('');
  const [succeedModal, setSucceedModal] = useState<boolean>(false);

  const { refetch, isLoading } = useGetCoupons();
  const { mutate } = useMutation({
    mutationFn: applyCoupon,
    onSuccess: async () => {
      await setSucceedModal(true);
      await refetch();
      await setCode('');
    },
    // onError: (error) => {
    //   console.error(error);
    //   alert(error.response.data.errors[0].defaultMessage);
    // },
  });
  const handleUpdateCoupon = () => mutate({ code });
  return (
    <>
    <div className={styles.couponInputContainer}>
      <div className={styles.couponInput}>
        <DefaultTextField
          type='text'
          size='sm'
          placeholder='쿠폰 번호를 입력하세요'
          id='code'
          name='code'
          value={code}
          onChange={(value) => typeof value === 'string' && setCode(value)}
          onSubmit={handleUpdateCoupon}
        />
      </div>
      <div className={styles.couponCreateButton}>
        <DefaultButton
          type='main'
          borderRadius='sm'
          onClick={handleUpdateCoupon}
          isDisabled={isLoading}
        >
          등록
        </DefaultButton>
      </div>
    </div>
    <AlertModal
      isAutoClose
      isOpen={succeedModal}
      onClose={() => setSucceedModal(false)}
      message='쿠폰이 성공적으로 발행되었습니다!'
    />
    </>
  );
};

export default ApplyCoupon;