import { commonWrapper } from "@/styles/common.css";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "@/components/common/inputField/InputField";
import { queryKeys } from "@/constants";
import { useApiResponseHandler } from "@/hooks/useApiResponseHandler";
import { CouponCategory } from "@/types/mypage/coupon";
import { useCreateCoupon } from "@/api/mypage/coupon/mutations/useCreateCoupon";

interface CreateCouponProps {
  couponCategory: CouponCategory;
  couponCode: string;
  setCouponCode: (code: string) => void;
}

export default function CreateCoupon({ couponCategory, couponCode, setCouponCode }: CreateCouponProps) {
  const queryClient = useQueryClient();

  
  const { handleSuccess, handleError } = useApiResponseHandler();
  const { mutate } = useCreateCoupon();

  const handleSubmit = () => {
    mutate(
      { code: couponCode },
      {
        onSuccess: async () => {
          setCouponCode('');
          handleSuccess('쿠폰이 등록됐습니다');
          await queryClient.invalidateQueries({
            queryKey: [queryKeys.COUPON.BASE, queryKeys.COUPON.GET_COUPON_LIST, couponCategory],
          })
        },
        onError: (error) => {
          handleError(error, '유효하지 않은 코드입니다');
        }
      },
    )
  };
  return (
    <article
      className={commonWrapper({
        padding: 20,
        backgroundColors: 'gray0',
      })}
    >
      <InputField
        value={couponCode}
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
        onSubmit={handleSubmit}
      />
    </article>
  );
}