import * as styles from "../DeliveryAddressModal.css";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import { subscribeText } from "@/components/pages/selectRecipe/selectRecipeContainer/recipeSelection/RecipeSelection.css";
import { AddressResponse, DeliveryDto, OrderType } from "@/types";

interface AddressListProps {
  addressData: AddressResponse[];
  orderType: OrderType,
  // isDefaultAddress: (deliveryId: number) => boolean;
  onAddAddress: () => void;
  onEditAddress: (address: AddressResponse) => void;
  onSelectAddress: (deliveryDto: DeliveryDto) => void;
  onDeleteAddress: (addressId: number) => void;
}

export default function AddressList({
  addressData,
  orderType,
  // isDefaultAddress,
  onAddAddress,
  onEditAddress,
  onSelectAddress,
  onDeleteAddress,
}: AddressListProps) {
  return (
    <div className={styles.deliveryModalContainer}>
      <div>배송지 목록</div>
      <DefaultButton
        type="grayBorder"
        size="sm"
        borderRadius="sm"
        onClick={onAddAddress}
      >
        + 배송지 신규입력
      </DefaultButton>
      {addressData.map((data) => (
        <div
          className={styles.deliveryInfoBox({
            // isSelected: isDefaultAddress(data.id),
            isSelected: false,
          })}
          key={data.id}
        >
          <div className={styles.deliveryAddressWrapper}>
            <div className={styles.deliveryAddressWrapper}>
              <p className={subscribeText({ type: "recipeTitle" })}>
                {data.recipientName} ({data.deliveryName ?? "-"})
              </p>
              <p className={subscribeText({ type: "subtitle" })}>
                {data.phoneNumber}
              </p>
              <button
                className={styles.selectButton}
                onClick={() =>
                  onSelectAddress(
                    {
                      name: data.recipientName,
                      phone: data.phoneNumber,
                      zipcode: data.zipcode,
                      street: data.street,
                      detailAddress: data.detailAddress,
                      request: data.request,
                    }
                  )
                }
              >
                선택
              </button>
            </div>

            <div className={styles.deliveryAddressWrapper}>
              <p className={subscribeText({ type: "subtitle" })}>
                <span className={subscribeText({ type: "subtitle" })}>
                  ({data.zipcode}){" "}
                </span>
                {data.street},
              </p>
              <p className={subscribeText({ type: "subtitle" })}>
                {data.detailAddress}
              </p>
            </div>
            <div className={styles.updateButtonWrapper}>
              <button
                className={styles.updateButton}
                onClick={() => onEditAddress(data)}
              >
                수정
              </button>
              <button
                className={styles.updateButton}
                onClick={() => onDeleteAddress(data.id)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
