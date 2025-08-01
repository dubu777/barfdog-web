"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { pointColor } from "@/styles/common.css";
import Text from "@/components/common/text/Text";
import AddressForm from "@/components/common/addressForm/AddressForm";
import { DefaultObjectType } from "@/types/common";
import { AddressDto } from "@/types/subscription";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
  addressSchema,
  defaultAddressValues,
} from "@/utils/validation/addressValidation";
import { useUpdateSubscriptionAddress } from "@/api/subscription/mutations/useUpdateSubscriptionAddress";
import { useToastStore } from "@/store/useToastStore";
import AlertModal from "@/components/common/modal/alertModal/AlertModal";

interface AddressFormProps {
  subscribeId: number;
  changeTypeList: DefaultObjectType[];
  nextDeliveryDate: string;
}

const SubscriptionAddressForm = ({
  subscribeId,
  changeTypeList,
  nextDeliveryDate,
}: AddressFormProps) => {
  const searchParams = useSearchParams();
  const shippingChangeType = changeTypeList.find(
    (type) => type?.value === searchParams.get("changeType")
  );
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const { control, watch, setValue, isValid, handleSubmit } = useFormHandler<AddressDto>(
    addressSchema,
    defaultAddressValues()
  );
  const { mutate } = useUpdateSubscriptionAddress(
    subscribeId,
    shippingChangeType?.value as string
  );
  const { addToast } = useToastStore();
  const router = useRouter();

  const handleUpdateSubscriptionAddress = (data: AddressDto) => {
    mutate(
      { body: data },
      {
        onSuccess: () => {
          setOpenConfirmModal(false);
          addToast(`${shippingChangeType?.name}이 완료되었습니다!`);
          router.replace(window.location.pathname);
        },
      }
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        key="slide"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        // className={styles.addressForm}
      >
        <Text
          type="title"
          size="md"
          weight="normal"
          // className={styles.addressFormTitle}
        >
          <b>{shippingChangeType?.name}</b>을 선택하셨습니다.
          <br />
          <span className={pointColor}>
            {shippingChangeType?.name} 후 다시 기존 주소로 배송됩니다.
          </span>
        </Text>
        <AddressForm
          control={control}
          watch={watch}
          setValue={setValue}
          isValid={isValid}
          onSubmit={() => setOpenConfirmModal(true)}
          confirmText="변경하기"
        />
        <AlertModal
          isOpen={openConfirmModal}
          onClose={() => setOpenConfirmModal(false)}
          onConfirm={handleSubmit(handleUpdateSubscriptionAddress)}
          content={(
            // <div className={styles.confirmModal}>
            <div>
              <p>
                <b>{shippingChangeType?.name}</b>을 선택하셨습니다.
              </p>
              <p>
                변경된 주소로
                <br />
                <b>{shippingChangeType?.name}</b> 예정입니다.
                <br />({nextDeliveryDate} 건에 해당)
                <br />
              </p>
              <p>이대로 변경하시겠습니까?</p>
            </div>
          )}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionAddressForm;
