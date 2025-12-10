import { commonWrapper } from "@/styles/common.css";
import { useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import BottomSheet from "@/components/ui/bottomSheet/BottomSheet";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import Text from "@/components/ui/text/Text";
import Counter from "@/components/ui/counter/Counter";
import ProductOptionSelector from "@/components/pages/store/detail/itemPurchaseBottomSheet/productOptionSelector/ProductOptionSelector";
import ProductOptions from "@/components/pages/store/detail/itemPurchaseBottomSheet/productOptions/ProductOptions";
import { useSnackBarStore } from "@/store/useSnackBar";
import { useStoreItemStore } from "@/store/useStoreItemStore";
import { getCookie } from "@/utils/auth/cookie";
import { isAuthenticated } from "@/utils/auth/isAuthenticated";
import { AUTH_CONFIG } from "@/constants/auth";
import { CartOption, ItemOption, UpdateCartInfo } from "@/types";
import { useUpdateCartInfo } from "@/api/cart/mutations/useUpdateCartInfo";

interface ItemPurchaseBottomSheetProps {
  id: number;
  name: string;
  salePrice: number;
  originalPrice: number;
  itemOptionList: ItemOption[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemPurchaseBottomSheet({
  id,
  name,
  salePrice,
  originalPrice,
  itemOptionList,
  isOpen,
  onClose,
}: ItemPurchaseBottomSheetProps) {
  const router = useRouter();
  const { addSnackBar } = useSnackBarStore();

  const { mutate } = useUpdateCartInfo();

  const bottomSheetRef = useRef<HTMLDivElement>(null);

  const {
    selectedOptions,
    addOption,
    totalPrice,
    itemAmount,
    updateItemAmount,
    resetStore,
  } = useStoreItemStore();
  const formattedOptions = useMemo(() => {
    return itemOptionList.map((option) => ({
      value: option.id,
      label: (
        <div className={commonWrapper({ justify: "between" })}>
          <Text type="body3" color="gray600">
            {option.name}
          </Text>
          <Text type="headline4" color="red">
            {option.optionPrice.toLocaleString()}원
          </Text>
        </div>
      ),
      name: option.name,
      price: option.optionPrice,
      remaining: option.remaining,
      count: 0,
    }));
  }, [itemOptionList]);

  const handleSelect = (option) => {
    addOption(option);
  };

  const handleAddToCart = () => {
    // 로그인 여부 확인
    const token = getCookie(AUTH_CONFIG.ACCESS_TOKEN_COOKIE);
    const isLoggedIn = isAuthenticated(token);

    const itemOptionList: CartOption[] = selectedOptions.map((option) => ({
      optionId: option.value,
      optionAmount: option.count,
    }));
    const cartItem: UpdateCartInfo = {
      itemId: id,
      itemAmount,
      itemOptionList,
    };

    if (!isLoggedIn) {
      // 비로그인 상태면 로그인 페이지로 이동
      router.push(`/login`);
      return;
    }

    // 로그인 상태면 장바구니에 아이템 추가 API 호출
    mutate(cartItem, {
      onSuccess: () => {
        resetStore();
        addSnackBar({
          title: "상품을 장바구니에 담았어요.",
          actionLabel: "바로가기",
          onActionClick: () => router.push("/cart"),
          position: "above-button",
        });
      },
    });
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      isOpen={isOpen}
      onClose={() => {
        resetStore();
        onClose();
      }}
    >
      <div className={commonWrapper({ direction: "col", align: "start" })}>
        <div
          className={commonWrapper({
            direction: "col",
            align: "start",
            gap: 12,
            padding: 20,
          })}
        >
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
              gap: 6,
            })}
          >
            <Text type="label1">{name}</Text>
            <div className={commonWrapper({ justify: "between" })}>
              <div className={commonWrapper({ gap: 6, justify: "start" })}>
                <Text type="title2">{salePrice.toLocaleString()}원</Text>
                {salePrice !== originalPrice && (
                  <Text type="body3" color="gray600" lineThrough>
                    {originalPrice.toLocaleString()}원
                  </Text>
                )}
              </div>
              <Counter
                initialCount={itemAmount}
                min={1}
                onChange={(value) => {
                  updateItemAmount(value);
                }}
              />
            </div>
          </div>
          {formattedOptions.length > 0 && (
            <ProductOptionSelector
              id="additional-products"
              options={formattedOptions}
              placeholder="추가상품(선택)"
              onSelect={handleSelect}
              selectedValues={selectedOptions.map((o) => o.value)}
              fullWidth
            />
          )}
        </div>
        {selectedOptions.length > 0 && <ProductOptions />}
        <div className={commonWrapper({ justify: "between", padding: 20 })}>
          <Text type="headline2">총 주문 금액</Text>
          <Text type="title2" color="red">
            {totalPrice.toLocaleString()}원
          </Text>
        </div>
        <ButtonDocked
          type="dual-button"
          position="sticky"
          primaryButtonLabel="구매하기"
          secondaryButtonLabel="장바구니"
          onSecondaryClick={handleAddToCart}
          onPrimaryClick={() => console.log("")}
        />
      </div>
    </BottomSheet>
  );
}
