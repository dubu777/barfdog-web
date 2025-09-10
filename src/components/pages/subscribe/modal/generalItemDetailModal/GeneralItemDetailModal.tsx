// import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
// import Text from "@/components/common/text/Text";
// import FullModalWrapper from "@/components/common/fullModalWrapper/FullModalWrapper";
// import { SubscribeGeneralItem } from "@/types";
// import Image from "next/image";
// import * as styles from "./GeneralItemDetailModal.css"
// import MinusIcon from "public/images/subscription/minus.svg";
// import PlusIcon from "public/images/icons/plus.svg";
// import SvgIcon from "@/components/common/svgIcon/SvgIcon";
// import { useEffect } from "react";
// import { useToastStore } from "@/store/useToastStore";

// interface GeneralItemDetailModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   generalItemTempData: SubscribeGeneralItem;
//   existing?: { itemId: number; amount: number; originPrice: number };
//   pending: { amount: number; originPrice: number } | null;
//   onStageSelection: (packGrams: number, originPrice: number) => void;
//   onCommitSelection: () => void;
// }

// export default function GeneralItemDetailModal({
//   generalItemTempData,
//   onStageSelection,
//   onCommitSelection,
//   existing,
//   pending,
//   isOpen,
//   onClose,
// }: GeneralItemDetailModalProps) {
//   const toast = useToastStore(s => s.addToast);

//   useEffect(() => {
//     if (isOpen) {
//       const initAmount = existing?.amount ?? 1;
//       onStageSelection(initAmount, initAmount * generalItemTempData.originalPrice);
//     }
//   }, [isOpen, existing, onStageSelection, generalItemTempData.originalPrice]);

//   const currentAmount = pending?.amount ?? 1;

//   const handleDecrease = () => {
//     if (currentAmount <= 1) return;
//     const newAmount = currentAmount - 1;
//     onStageSelection(newAmount, newAmount * generalItemTempData.originalPrice);
//   };
//   const handleIncrease = () => {
//     const newAmount = currentAmount + 1;
//     onStageSelection(newAmount, newAmount * generalItemTempData.originalPrice);
//   };

//   const handleCommit = () => {
//     toast("상품을 담았어요", "above-button");
//     onCommitSelection();
//     onClose();
//   };

//   return (
//     <FullModalWrapper
//       isVisible={isOpen}
//       handleClose={onClose}
//       headerBackgroundColor="gray50"
//     >
//       <div className={styles.generalItemTopWrapper}>
//         <Image
//           src={generalItemTempData.imageUrl}
//           width={140}
//           height={140}
//           alt={generalItemTempData.name}
//           priority
//         />
//           <Text type="title4">{generalItemTempData.name}</Text>
//       </div>
//       <div className={styles.quantitySelectorWrapper}>
//         <Text type="title4">개수 선택</Text>
//         <div className={styles.quantitySelectorBox}>
//           <SvgIcon src={MinusIcon} onClick={handleDecrease}/>
//           <Text type="label1">{currentAmount}개</Text>
//           <SvgIcon src={PlusIcon} onClick={handleIncrease}/>
//         </div>
//       </div>
//       <ButtonDocked
//         type="dual-button"
//         primaryButtonLabel={`${currentAmount}개 담기`}
//         secondaryButtonLabel="이전"
//         onPrimaryClick={handleCommit}
//         onSecondaryClick={onClose}
//         primaryButtonSize="lg"
//       />
//     </FullModalWrapper>
//   );
// }
