// import * as styles from "./SignupTerms.css";
// import { Fragment, useEffect, useState } from "react";
// import TestText from "@/components/common/testText/TestText";
// import DefaultCheckbox from "@/components/common/defaultCheckbox/DefaultCheckbox";
// import { DefaultObjectType, SignupStepValues, SignUpTermsModal } from "@/types";
// import {
//   Controller,
//   Control,
//   UseFormSetValue,
//   UseFormWatch,
// } from "react-hook-form";
// import useModal from "@/hooks/useModal";
// import ServicePolicy from "@/components/pages/auth/signup/signupTerms/termsModal/ServicePolicy";
// import PrivacyPolicy from "@/components/pages/auth/signup/signupTerms/termsModal/PrivacyPolicy";
// import AlliancePolicy from "@/components/pages/auth/signup/signupTerms/termsModal/AlliancePolicy";
// import ReceiveTerms from "@/components/common/receiveTerms/ReceiveTerms";
// import Cookies from "js-cookie";

// interface AgreementFormFields extends DefaultObjectType {
//   detailInfoModal?: boolean;
// }

// const agreementFormFields: AgreementFormFields[] = [
//   {
//     id: "servicePolicy",
//     value: "servicePolicy",
//     name: "이용약관 동의 (필수)",
//     detailInfoModal: true,
//   },
//   {
//     id: "privacyPolicy",
//     value: "privacyPolicy",
//     name: "개인정보 수집 이용 동의 (필수)",
//     detailInfoModal: true,
//   },
//   // 콕뱅크
//   {
//     id: "alliancePolicy",
//     value: "alliancePolicy",
//     name: "개인정보 제3자 제공 동의 (필수)",
//     detailInfoModal: true,
//   },
//   {
//     id: "receiveAll",
//     value: "receiveAll",
//     name: "",
//   },
//   {
//     id: "over14YearsOld",
//     value: "over14YearsOld",
//     name: "본인은 만 14세 이상입니다. (필수)",
//   },
// ];

// interface SignUpTermsProps {
//   control: Control<SignupStepValues>;
//   watch: UseFormWatch<SignupStepValues>;
//   setValue: UseFormSetValue<SignupStepValues>;
// }

// const SignUpTerms = ({ control, watch, setValue }: SignUpTermsProps) => {
//   const agreementValues = watch("agreement");
//   const allChecked = Object.values(agreementValues).every(
//     (value) => value === true
//   );

//   const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
//   const [isReceiveAllChecked, setIsReceiveAllChecked] =
//     useState<boolean>(false);

//   const [openTermsModal, setOpenTermsModal] = useState<SignUpTermsModal | null>(
//     null
//   );
//   const { onToggle, onClose, isOpen } = useModal();
//   const [alliance, setAlliance] = useState<"cb" | null>(null);

//   useEffect(() => {
//     if (Cookies.get("alliance")) {
//       setAlliance(Cookies.get("alliance") as "cb" | null);
//     }
//   }, []);

//   useEffect(() => {
//     setIsAllChecked(allChecked);
//   }, [agreementValues, allChecked]);

//   const handleAllAgreeChange = (checked: boolean) => {
//     setIsAllChecked(checked);
//     setValue("agreement", {
//       servicePolicy: checked,
//       privacyPolicy: checked,
//       receiveSms: checked,
//       receiveEmail: checked,
//       over14YearsOld: checked,
//     });
//     setValue("allianceInfo", {
//       alliancePolicy: checked,
//     });
//   };

//   const handleTermsModalOpen = (termsType: SignUpTermsModal) => {
//     setOpenTermsModal(termsType);
//     onToggle();
//   };
//   return (
//     <article className={styles.signUpTermsContainer}>
//       <TestText type="title" size="titleLg">
//         이용약관 동의
//       </TestText>
//       <div className={styles.signUpTermsList}>
//         <div className={styles.allAgreement}>
//           <DefaultCheckbox
//             id="all"
//             name="all"
//             label={
//               <TestText type="description" size="md" weight="bold" color="black">
//                 전체 동의합니다.
//               </TestText>
//             }
//             labelPosition="right"
//             value={isAllChecked}
//             onChange={(checked) => handleAllAgreeChange(checked as boolean)}
//           />
//           <div className={styles.subAgreement}>
//             <TestText type="description" size="sm" color="grey" align="left">
//               선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
//               이용할 수 있습니다.
//             </TestText>
//           </div>
//         </div>
//         <ul className={styles.agreementList}>
//           {agreementFormFields.map((checkbox) => (
//             <Fragment key={checkbox.id}>
//               {checkbox.id === "alliancePolicy" ? (
//                 alliance !== null && (
//                   <li className={styles.agreementCheckbox}>
//                     <Controller
//                       name={`allianceInfo.${checkbox.id}`}
//                       control={control}
//                       defaultValue={false}
//                       render={({ field }) => (
//                         <DefaultCheckbox
//                           id={`allianceInfo.${checkbox.id}`}
//                           label={checkbox.name}
//                           {...field}
//                         />
//                       )}
//                     />
//                     <button
//                       onClick={() => handleTermsModalOpen("alliancePolicy")}
//                       className={styles.termsModal}
//                     >
//                       <TestText type="description" size="sm" color="red">
//                         약관 보기
//                       </TestText>
//                     </button>
//                   </li>
//                 )
//               ) : (
//                 <li className={styles.agreementCheckbox}>
//                   {checkbox.id !== "receiveAll" ? (
//                     <>
//                       <Controller
//                         name={`agreement.${
//                           checkbox.id as keyof SignupStepValues["agreement"]
//                         }`}
//                         control={control}
//                         render={({ field }) => (
//                           <DefaultCheckbox
//                             id={`agreement.${checkbox.id}`}
//                             label={checkbox.name}
//                             {...field}
//                           />
//                         )}
//                       />
//                       {checkbox.detailInfoModal && (
//                         <button
//                           onClick={() =>
//                             handleTermsModalOpen(
//                               checkbox.id as SignUpTermsModal
//                             )
//                           }
//                           className={styles.termsModal}
//                         >
//                           <TestText type="description" size="sm" color="red">
//                             약관 보기
//                           </TestText>
//                         </button>
//                       )}
//                     </>
//                   ) : (
//                     <ReceiveTerms
//                       isSignUp
//                       control={control}
//                       watch={watch}
//                       setValue={setValue}
//                       isReceiveAllChecked={isReceiveAllChecked}
//                       setIsReceiveAllChecked={setIsReceiveAllChecked}
//                     />
//                   )}
//                 </li>
//               )}
//             </Fragment>
//           ))}
//         </ul>
//       </div>
//       {isOpen && (
//         <div className={styles.termsModalContainer}>
//           {openTermsModal === "servicePolicy" ? (
//             <ServicePolicy isOpen={isOpen} onClose={onClose} />
//           ) : openTermsModal === "privacyPolicy" ? (
//             <PrivacyPolicy isOpen={isOpen} onClose={onClose} />
//           ) : (
//             <AlliancePolicy isOpen={isOpen} onClose={onClose} />
//           )}
//         </div>
//       )}
//     </article>
//   );
// };

// export default SignUpTerms;
