import { useState } from "react";
import * as styles from "./CouponInput.css";
import DefaultTextField from "@/components/common/defaultTextField/DefaultTextField";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";

const CouponInput = () => {
  const [couponValue, setCouponValue] = useState<string>('');
  return (
    <div className={styles.couponInputContainer}>
      <div className={styles.couponInput}>
        <DefaultTextField
          type='text'
          size='sm'
          placeholder='쿠폰 번호를 입력하세요'
          id='create'
          name='create'
          value={couponValue}
          onChange={(value) => setCouponValue(value)}
        />
      </div>
      <div className={styles.couponCreateButton}>
        <DefaultButton
          type='main'
          borderRadius='sm'
        >
          등록
        </DefaultButton>
      </div>
    </div>
  );
};

export default CouponInput;