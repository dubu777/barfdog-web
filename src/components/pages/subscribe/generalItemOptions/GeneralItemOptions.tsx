// import Text from "@/components/common/text/Text";
// import React, { useRef } from "react";
// import * as styles from "../recipeOptions/RecipeOptions.css";
// import TabBar from "@/components/common/tabBar/TabBar";
// import { generalItemTab, generalTempItems } from "@/constants";
// import { scrollToElement } from "@/utils/scrollToElement";
// import Divider from "@/components/common/divider/Divider";
// import GeneralItemCard from "./generalItemCard/GeneralItemCard";
// interface GeneralItemOptionsProps {
//   selectedIds: number[];
// }

// export default function GeneralItemOptions({
//   selectedIds,
// }: GeneralItemOptionsProps) {
//   const sections = [
//     {
//       key: "topping",
//       title: "토핑",
//       description: "식사에 함께 올려주면 기호성이 올라가는 토핑 상품",
//       items: generalTempItems.filter((item) => item.type === "topping"),
//     },
//     {
//       key: "snack",
//       title: "간식",
//       description: "건강과 맛을 모두 챙긴, 우리 아이를 위한 영양 간식",
//       items: generalTempItems.filter((item) => item.type === "snack"),
//     },
//   ];

//   // 섹션별 ref
//   const refs = useRef(
//     sections.reduce((acc, { key }) => {
//       acc[key] = React.createRef<HTMLDivElement>();
//       return acc;
//     }, {} as Record<string, React.RefObject<HTMLDivElement>>)
//   ).current;

//   // 탭 배열에 onInit 붙이기
//   const tabs = generalItemTab.map((tab) => ({
//     ...tab,
//     onInit: () => scrollToElement(refs[tab.value!].current),
//   }));

//   return (
//     <section className={styles.subscribeOptionContainer}>
//       <div className={styles.recipeSelectTitleWrapper}>
//         <div>
//           <DefaultText type="title2">
//             식사와 함께 급여하면 좋을
//             <br />
//             토핑과 간식도 준비했어요
//           </DefaultText>
//           <DefaultText type="body2" color="gray600">
//             담은 상품은 레시피와 함께 정기 배송돼요.
//           </DefaultText>
//         </div>
//       </div>
//       <div className={styles.recipeTabBarWrapper}>
//         <TabBar variant="chips" tabs={tabs} />
//       </div>
//       <div className={styles.recipeSelectWrapper}>
//         {sections.map(({ key, title, description, items }, idx) => (
//           <React.Fragment key={key}>
//             <div ref={refs[key]} className={styles.recipeSelectBox}>
//               <div className={styles.recipeTitleWrapper}>
//                 <DefaultText type="title4">{title}</DefaultText>
//                 <DefaultText type="body3" color="gray600">
//                   {description}
//                 </DefaultText>
//               </div>
//               <div className={styles.recipeCardWrapper}>
//                 {items.map((item) => (
//                   <GeneralItemCard
//                     key={item.id}
//                     generalItemTempData={item}
//                     selectedIds={selectedIds}
//                     isSelected={selectedIds.includes(item.id)}
//                   />
//                 ))}
//               </div>
//             </div>
//             {idx < sections.length - 1 && <Divider color="gray100" />}
//           </React.Fragment>
//         ))}
//       </div>
//     </section>
//   );
// }
