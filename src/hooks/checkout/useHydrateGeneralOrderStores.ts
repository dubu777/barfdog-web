// "use client";

// import { useEffect } from "react";
// import { GeneralOrderSheetResponse } from "@/types";
// import { useDeliveryStore } from "@/store/checkout/useDeliveryStore";
// import { useRewardStore } from "@/store/checkout/useRewardStore";
// import { usePaymentStore } from "@/store/checkout/usePaymentStore";

// /**
//  * 일반 주문 시트 → 여러 Store를 일관되게 동기화(하이드레이션)하는 훅
//  * - 컨테이너에서는 sheet만 넘겨주면, 내부 useEffect가 변경 시점에 알아서 반영
//  */
// export function useHydrateGeneralOrderStores(
//   sheet: GeneralOrderSheetResponse | undefined
// ) {
//   const {
//     setDeliveryDto,
//     setBackupDeliveryDto,
//     setDeliveryId,
//     setBundleDeliveryDto,
//   } = useDeliveryStore();
//   const setUserTotalReward = useRewardStore((s) => s.setUserTotalReward);
//   const setOriginalPrice = usePaymentStore((s) => s.setOriginalPrice);

//   useEffect(() => {
//     if (!sheet) return;

//     // 결제 금액(기준가) 동기화
//     setOriginalPrice(sheet.orderPrice);

//     // 기본 배송지 동기화
//     const deliveryInfo = {
//       isDefault: sheet.defaultAddress.default,
//       id: sheet.defaultAddress.id,
//       deliveryName:
//         sheet.defaultAddress.deliveryName ?? sheet.defaultAddress.recipientName,
//       recipientName: sheet.defaultAddress.recipientName,
//       phoneNumber: sheet.defaultAddress.phoneNumber,
//       zipcode: sheet.defaultAddress.zipcode,
//       street: sheet.defaultAddress.street,
//       detailAddress: sheet.defaultAddress.detailAddress,
//       request: sheet.defaultAddress.request,
//     };
//     setDeliveryDto(deliveryInfo);
//     setBackupDeliveryDto(deliveryInfo);

//     // 적립금 동기화
//     setUserTotalReward(sheet.reward);

//     // 번들 배송 가능 시 동기화
//     if (sheet.deliveryAddress && sheet.deliveryAddress.length > 0) {
//       const first = sheet.deliveryAddress[0];
//       setBundleDeliveryDto({
//         id: first.id,
//         deliveryName: first.deliveryName ?? first.recipientName,
//         isDefault: false,
//         recipientName: first.recipientName,
//         phoneNumber: first.phoneNumber,
//         zipcode: first.zipcode,
//         street: first.street,
//         detailAddress: first.detailAddress,
//         request: "",
//       });
//       setDeliveryId(first.id);
//     }
//   }, [
//     sheet,
//     setOriginalPrice,
//     setDeliveryDto,
//     setBackupDeliveryDto,
//     setUserTotalReward,
//     setBundleDeliveryDto,
//     setDeliveryId,
//   ]);
// }
