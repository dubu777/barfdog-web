import { commonWrapper } from "@/styles/common.css";
import InputField from "@/components/common/inputField/InputField";
import { validateCouponCode } from "@/utils";
import { CouponCategory } from "@/types";

interface CreateCouponProps {
  couponCategory: CouponCategory;
  couponCode: string;
  setCouponCode: (code: string) => void;
  buttonColor?: "red" | "gray800";
  couponCodeError?: string | null;
  setCouponCodeError?: (error: string | null) => void;
  onSubmit: () => void;
}

export default function CreateCoupon({ 
  couponCategory, 
  couponCode, 
  setCouponCode,
  buttonColor = "red",
  couponCodeError,
  setCouponCodeError,
  onSubmit
}: CreateCouponProps) {
  return (
    <article
      className={commonWrapper({
        padding: 20,
        backgroundColors: 'gray0',
      })}
    >
      <InputField
        value={couponCode}
        onBlur={() => setCouponCodeError?.(validateCouponCode(couponCode) ?? null)}
        onChange={(e) => setCouponCode(e.target.value)}
        onReset={() => setCouponCode('')}
        label={`${couponCategory === 'NON_ALLIANCE' ? '일반' : '제휴'} 쿠폰 등록`}
        labelColor='gray900'
        placeholder='쿠폰 번호를 입력하세요'
        clearButton={!!couponCode}
        confirmButton
        confirmButtonVariant='solid'
        confirmButtonText='등록'
        confirmButtonDisabled={!couponCode}
        confirmButtonIntent={buttonColor === "red" ? "primary" : "secondary"}
        onSubmit={onSubmit}
        error={couponCodeError ?? undefined}
        maxLength={20}
      />
    </article>
  );
}