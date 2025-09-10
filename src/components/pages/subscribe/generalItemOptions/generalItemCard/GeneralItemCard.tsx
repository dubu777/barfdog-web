// import Image from "next/image";
// import * as styles from "./GeneralItemCard.css";
// import Text from "@/components/common/text/Text";
// import Button from "@/components/common/button/Button";
// import { commonWrapper } from "@/styles/common.css";
// import { SubscribeGeneralItem } from "@/types";
// import { useFormContext, useWatch } from "react-hook-form";
// import useModal from "@/hooks/useModal";
// import { SubscriptionValues } from "@/utils/validation/subscriptionValidation";
// import { useToastStore } from "@/store/useToastStore";
// import SvgIcon from "@/components/common/svgIcon/SvgIcon";
// import PenIcon from "public/images/subscription/pen.svg";
// import { useGeneralItemManager } from "@/hooks/subscription/useGeneralItemManager";
// import GeneralItemDetailModal from "../../modal/generalItemDetailModal/GeneralItemDetailModal";

// interface GeneralItemCardProps {
//   generalItemTempData: SubscribeGeneralItem;
//   isSelected: boolean;
//   selectedIds: number[];
// }

// export default function GeneralItemCard({
//   generalItemTempData,
//   isSelected,
//   selectedIds,
// }: GeneralItemCardProps) {
//   const toast = useToastStore((s) => s.addToast);
//   const {
//     isOpen: isDetailOpen,
//     onClose: onDetailClose,
//     onToggle: onDetailToggle,
//   } = useModal();

//   console.log("selectedIds", selectedIds); // 빌드 에러 방지용 데이터 바인딩 후 제거

//   const { control } = useFormContext<SubscriptionValues>();
//   const watchedList = useWatch({ control, name: "generalItemList" }) ?? [];
//   const currentEntry = watchedList.find(
//     (f) => f.itemId === generalItemTempData.id
//   );
//   const currentAmount = currentEntry?.amount ?? 1;

//   const { stageSelection, commitSelection, removeSelection, pending, existing } =
//     useGeneralItemManager(
//       generalItemTempData.id,
//       1,
//       generalItemTempData.originalPrice
//     );

//   const handleButtonClick = () => {
//     if (isSelected) {
//       removeSelection();
//       toast("상품 빼기를 완료했어요", "above-button");
//     } else {
//       onDetailToggle();
//     }
//   };

//   return (
//     <div
//       className={styles.subscribeItemCardContainer({
//         isSelected,
//       })}
//     >
//       <Text type="headline2">{generalItemTempData.name}</Text>
//       <div className={commonWrapper({ direction: "row", gap: 12 })}>
//         <Image
//           src={generalItemTempData.imageUrl}
//           alt="레시피 이미지"
//           width={80}
//           height={80}
//           priority
//         />
//         <div
//           className={commonWrapper({
//             direction: "col",
//             justify: "start",
//             align: "start",
//             gap: 2,
//           })}
//         >
//           <div
//             className={commonWrapper({
//               direction: "col",
//               justify: "start",
//               align: "start",
//               gap: 2,
//             })}
//           >
//             <div
//               className={commonWrapper({
//                 direction: "row",
//                 gap: 4,
//                 justify: "start",
//               })}
//             >
//               <Text type="headline1" color="gray900">
//                 {generalItemTempData.originalPrice.toLocaleString()}원
//               </Text>
//               <Text type="caption" color="gray700">
//                 / 1개 당
//               </Text>
//             </div>
//             <div className={commonWrapper({ gap: 4, justify: "start" })}>
//               {generalItemTempData.benefit.map((text, idx) => (
//                 <Text key={idx} type="caption" color="gray500">
//                   #{text}
//                 </Text>
//               ))}
//             </div>
//           </div>
//           <div className={commonWrapper({ gap: 8, justify: "end" })}>
//             {isSelected && (
//               <div
//                 className={styles.subscribeUpdateInputBox}
//                 onClick={() => onDetailToggle()}
//               >
//                 <Text type="headline4" color="gray700">
//                   {currentAmount}개
//                 </Text>
//                 <SvgIcon src={PenIcon} size={20} />
//               </div>
//             )}
//             <Button
//               type="primary"
//               variant="outline"
//               size="sm"
//               textColor={isSelected ? "gray900" : "red"}
//               borderColor={isSelected ? "gray300" : "red"}
//               onClick={handleButtonClick}
//             >
//               {isSelected ? "빼기" : "담기"}
//             </Button>
//           </div>
//         </div>
//       </div>

//       <GeneralItemDetailModal
//         isOpen={isDetailOpen}
//         onClose={onDetailClose}
//         generalItemTempData={generalItemTempData}
//         onStageSelection={stageSelection}
//         onCommitSelection={commitSelection}
//         pending={pending}
//         existing={existing}
//       />
//     </div>
//   );
// }
