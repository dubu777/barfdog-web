import * as styles from "./UserInfoForm.css";
import { pointColor } from "@/styles/common.css";
import { useCallback, useMemo, useState } from "react";
import Text from "@/components/common/text/Text";
import DefaultButton from "@/components/common/defaultButton/DefaultButton";
import DefaultRadio from "@/components/common/defaultRadio/DefaultRadio";
import SearchAddress from "@/components/common/searchAddress/SearchAddress";
import DatePicker from "@/components/common/datePicker/CustomDatePicker";
import {
  Control,
  Controller,
  DeepRequired,
  FieldErrors,
  Path,
  PathValue,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  UpdateUserInfo,
  UserInfoFormFields,
  SignupStepValues,
  AddressDto,
} from "@/types";

import { useGetAuthNumber } from "@/api/auth/mutations/useGetAuthNumber";
import { useToastStore } from "@/store/useToastStore";
import axios from "axios";
import InputField from "@/components/common/inputField/InputField";

const userInfoFormFields: UserInfoFormFields[] = [
  {
    id: "name",
    label: "이름(견주님)",
    inputType: "text",
    isRequired: true,
  },
  {
    id: "email",
    label: "이메일주소(아이디)",
    inputType: "text",
    validationButtonText: "중복확인",
    isRequired: true,
  },
  {
    id: "password",
    label: "비밀번호",
    inputType: "password",
    isRequired: true,
  },
  {
    id: "confirmPassword",
    label: "비밀번호 확인",
    inputType: "password",
    isRequired: true,
    isSignUp: true,
  },
  {
    id: "phoneNumber",
    label: "휴대폰 번호",
    inputType: "text",
    validationButtonText: "인증번호 받기",
    isRequired: true,
  },
  {
    id: "authNumber",
    label: "인증 번호",
    inputType: "text",
    validationButtonText: "확인",
    isRequired: true,
  },
  {
    id: "address",
    label: "주소 검색",
    inputType: "address",
    isRequired: true,
  },
  {
    id: "birthday",
    label: "생년월일(견주님)",
    inputType: "birthday",
    isRequired: true,
  },
  {
    id: "gender",
    label: "성별(견주님)",
    inputType: "radio",
    isRequired: true,
  },
  {
    id: "recommendCode",
    label: "추천코드",
    inputType: "text",
    isRequired: false,
    placeholder: "추천코드는 계정 당 한번만 입력 가능합니다.",
    isSignUp: true,
  },
];

type FormValues<T extends boolean> = T extends true
  ? SignupStepValues
  : UpdateUserInfo;

interface UserInfoFormProps<T extends boolean> {
  isSignUp?: T;
  control: Control<FormValues<T>>;
  watch: UseFormWatch<FormValues<T>>;
  errors: FieldErrors<FormValues<T>>;
  setValue: UseFormSetValue<FormValues<T>>;
  setError: UseFormSetError<FormValues<T>>;
  clearErrors?: UseFormClearErrors<FormValues<T>>;
  openAddressModal: boolean;
  setOpenAddressModal: (openAddressModal: boolean) => void;
}

const UserInfoForm = <T extends boolean>({
  isSignUp,
  control,
  watch,
  errors,
  setValue,
  setError,
  clearErrors,
  openAddressModal,
  setOpenAddressModal,
}: UserInfoFormProps<T>) => {
  const formValues = watch();
  const filteredUserInfoFormFields = useMemo(
    () =>
      isSignUp
        ? // sns 간편로그인 정책으로 인하여, 회원가입단계에서 비밀번호 설정불가함으로 인한 field 제외
          "providerId" in formValues && !!formValues.providerId
          ? userInfoFormFields.filter(
              (field) =>
                field.id !== "password" && field.id !== "confirmPassword"
            )
          : userInfoFormFields
        : userInfoFormFields.filter((field) => !field.isSignUp),
    [isSignUp]
  );

  const [authNumber, setAuthNumber] = useState<string | null>(null);
  const { mutate: mutateAuthNumber } = useGetAuthNumber();
  const { addToast } = useToastStore();

  const phoneNumber = formValues.phoneNumber;
  const defaultPhoneNumber = formValues.defaultPhoneNumber;
  const hasCheckedAuthNumber = formValues.hasCheckedAuthNumber;
  const watcherAuthNumber = formValues.authNumber;

  // defaultPhoneNumber, hasCheckedAuthNumber, authNumber: formValues 에서 검증 역할이며 실제 formData 는 아니므로 제외 필요
  // 이벤트 발생시 플로우 및 상태값 변화
  // 1. 휴대폰 번호 변경시 phoneNumber error
  // 2. 인증번호 받기 클릭시 authNumber error (phoneNumber clear)
  // 3. 인증번호 확인 클릭시 모든 error clear, hasCheckedAuthNumber true
  // 휴대폰 번호 변경시: defaultPhoneNumber !== phoneNumber => authNumber !== null && hasCheckedAuthNumber 검증 필요

  const handleEmailDuplication = useCallback(() => {
    // 이메일 중복 확인
  }, []);

  // 인증번호 받기
  // const handleGetAuthNumber = useCallback(() => {
  // 	console.log('phoneNumber', phoneNumber)
  // 	if (!phoneNumber) return;
  //
  // 	mutateAuthNumber(
  // 		{ phoneNumber: phoneNumber as string },
  // 		{
  // 			onSuccess: (data) => {
  // 				console.log('data', data)
  // 				// 다이렉트센드 에서 받아오는 데이터 형태로 msg null 값이어야 성공
  // 				if(data.authNumber && data.responseCode === 200 && data.msg === null) {
  // 					setAuthNumber(data.authNumber);
  // 					addToast('인증번호가 발송되었습니다!', 'success');
  // 					setError('authNumber' as Path<FormValues<T>>, { message: '인증번호를 입력해주세요.' });
  // 					clearErrors?.('phoneNumber' as Path<FormValues<T>>);
  // 				}
  // 			},
  // 			onError: (errorResponse) => {
  // 				if (axios.isAxiosError(errorResponse)) {
  // 					const error = errorResponse.response?.data
  // 					const errorMessage = error?.errors[0].defaultMessage || '인증번호 발송에 실패했습니다.';
  // 					setError('phoneNumber' as Path<FormValues<T>>, { message: errorMessage });
  // 				}
  // 			}
  // 		}
  // 	)
  // },[watch, mutateAuthNumber, setValue, setError, addToast]);
  const handleGetAuthNumber = () => {
    console.log("phoneNumber", phoneNumber);
    if (!phoneNumber) return;

    mutateAuthNumber(
      { phoneNumber: phoneNumber as string },
      {
        onSuccess: (data) => {
          console.log("data", data);
          // 다이렉트센드 에서 받아오는 데이터 형태로 msg null 값이어야 성공
          if (
            data.authNumber &&
            data.responseCode === 200 &&
            data.msg === null
          ) {
            setAuthNumber(data.authNumber);
            addToast("인증번호가 발송되었습니다!");
            setError("authNumber" as Path<FormValues<T>>, {
              message: "인증번호를 입력해주세요.",
            });
            clearErrors?.("phoneNumber" as Path<FormValues<T>>);
          }
        },
        onError: (errorResponse) => {
          if (axios.isAxiosError(errorResponse)) {
            const error = errorResponse.response?.data;
            const errorMessage =
              error?.errors[0].defaultMessage ||
              "인증번호 발송에 실패했습니다.";
            setError("phoneNumber" as Path<FormValues<T>>, {
              message: errorMessage,
            });
          }
        },
      }
    );
  };

  // 인증번호 확인
  // const handleCheckAuthNumber = useCallback(() => {
  // 	if (!authNumber || !watcherAuthNumber) return;
  //
  // 	// 인증번호 확인 검증은 발급받은 인증번호를 상태값에 저장 후 비교
  // 	if (watcherAuthNumber === authNumber) {
  // 		addToast('인증 되었습니다!', 'success');
  // 		clearErrors?.('authNumber' as Path<FormValues<T>>);
  // 		setValue('hasCheckedAuthNumber' as Path<FormValues<T>>, true as PathValue<FormValues<T>, Path<FormValues<T>>>);
  // 	} else {
  // 		setError('authNumber' as Path<FormValues<T>>, { message: '인증번호를 확인해주세요.' });
  // 	}
  // },[watch, authNumber, setError, addToast]);
  const handleCheckAuthNumber = () => {
    if (!authNumber || !watcherAuthNumber) return;

    // 인증번호 확인 검증은 발급받은 인증번호를 상태값에 저장 후 비교
    if (watcherAuthNumber === authNumber) {
      addToast("인증 되었습니다!");
      clearErrors?.("authNumber" as Path<FormValues<T>>);
      setValue(
        "hasCheckedAuthNumber" as Path<FormValues<T>>,
        true as PathValue<FormValues<T>, Path<FormValues<T>>>
      );
    } else {
      setError("authNumber" as Path<FormValues<T>>, {
        message: "인증번호를 확인해주세요.",
      });
    }
  };

  const ErrorMessage = ({ name }: { name: keyof FieldErrors<FormValues<T>> }) =>
    errors[name] && (
      <div className={styles.inputError}>
        <span className={pointColor}>
          {(errors[name]?.message as string) || ""}
        </span>
      </div>
    );

  return (
    <div className={styles.userInfoFormContainer}>
      {filteredUserInfoFormFields.map(
        (input) =>
          (input.id === "authNumber" ? authNumber !== null : true) && (
            <div key={input.id} className={styles.userInfoInputBox}>
              <label className={styles.userInfoLabel}>
                <Text
                  type="description"
                  size="md"
                  color="black"
                  align="left"
                  weight="light"
                >
                  {input.label}
                  {input.isRequired && <span className={pointColor}>*</span>}
                </Text>
              </label>
              {input.inputType === "text" || input.inputType === "password" ? (
                <div className={styles.userInfoInput}>
                  <div className={styles.inputField}>
                    <Controller
                      name={input.id as Path<FormValues<T>>}
                      control={control}
                      render={({ field }) => (
                        <InputField
                          type={input.inputType as "text" | "password"}
                          id={input.id}
                          name={input.id}
                          value={field.value ? String(field.value) : ""}
                          onChange={(e) =>
                            field.onChange((e.target as HTMLInputElement).value)
                          }
                          placeholder={
                            input.inputType === "password" && !isSignUp
                              ? "현재 비밀번호를 입력해주세요."
                              : input.placeholder || ""
                          }
                          disabled={
                            !!(
                              (input.id === "email" && !isSignUp) ||
                              (input.id === "authNumber" &&
                                authNumber &&
                                hasCheckedAuthNumber)
                            )
                          }
                        />
                      )}
                    />
                    {[
                      isSignUp && "email",
                      "phoneNumber",
                      "authNumber",
                    ].includes(input.id) &&
                      input.validationButtonText && (
                        <DefaultButton
                          type="mainBorder"
                          borderRadius="sm"
                          className={styles.validationButton}
                          isDisabled={
                            !!(input.id === "authNumber"
                              ? !authNumber
                                ? !watcherAuthNumber
                                : hasCheckedAuthNumber
                              : input.id === "phoneNumber"
                              ? defaultPhoneNumber === phoneNumber || false
                              : false)
                          }
                          onClick={
                            input.id === "email"
                              ? isSignUp && handleEmailDuplication
                              : input.id === "phoneNumber"
                              ? handleGetAuthNumber
                              : handleCheckAuthNumber
                          }
                        >
                          {input.validationButtonText}
                        </DefaultButton>
                      )}
                  </div>
                  <ErrorMessage
                    name={input.id as keyof DeepRequired<FormValues<T>>}
                  />
                </div>
              ) : input.inputType === "radio" ? (
                <div className={styles.userInfoInput}>
                  <Controller
                    name={"gender" as Path<FormValues<T>>}
                    control={control}
                    defaultValue={
                      "NONE" as unknown as PathValue<
                        FormValues<T>,
                        Path<FormValues<T>>
                      >
                    }
                    render={({ field }) => (
                      <DefaultRadio
                        id={input.id}
                        onChange={field.onChange}
                        value={field.value as string}
                        justifyContent="spaceBetween"
                        options={[
                          { name: "남자", value: "MALE" },
                          { name: "여자", value: "FEMALE" },
                          { name: "선택안함", value: "NONE" },
                        ]}
                      />
                    )}
                  />
                  <ErrorMessage
                    name={input.id as keyof DeepRequired<FormValues<T>>}
                  />
                </div>
              ) : input.inputType === "address" ? (
                <div className={styles.userInfoInput}>
                  <Controller
                    name={"address" as Path<FormValues<T>>}
                    control={control}
                    render={({ field }) => (
                      <SearchAddress
                        isInAddressObject
                        control={control}
                        addressValues={(field.value as AddressDto) || {}}
                        openAddressModal={openAddressModal}
                        setOpenAddressModal={setOpenAddressModal}
                        handleSelectAddressData={(data) => {
                          const { zonecode, address, sido } = data;
                          setValue(
                            "address.zipcode" as Path<FormValues<T>>,
                            zonecode as PathValue<
                              FormValues<T>,
                              Path<FormValues<T>>
                            >
                          );
                          setValue(
                            "address.street" as Path<FormValues<T>>,
                            address as PathValue<
                              FormValues<T>,
                              Path<FormValues<T>>
                            >
                          );
                          setValue(
                            "address.city" as Path<FormValues<T>>,
                            sido as PathValue<
                              FormValues<T>,
                              Path<FormValues<T>>
                            >
                          );
                        }}
                      />
                    )}
                  />
                  <ErrorMessage
                    name={input.id as keyof DeepRequired<FormValues<T>>}
                  />
                </div>
              ) : (
                input.inputType === "birthday" && (
                  <div className={styles.userInfoInput}>
                    <Controller
                      name={"birthday" as Path<FormValues<T>>}
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          name={input.id}
                          value={(field.value as string) ?? null}
                          onChange={field.onChange}
                        />
                      )}
                    />
                    <ErrorMessage
                      name={input.id as keyof DeepRequired<FormValues<T>>}
                    />
                  </div>
                )
              )}
            </div>
          )
      )}
    </div>
  );
};

export default UserInfoForm;
