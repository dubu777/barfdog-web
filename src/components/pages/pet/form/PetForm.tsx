"use client";

import * as styles from "./PetForm.css";
import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import InputField from "@/components/common/inputField/InputField";
import InputLabel from "@/components/common/inputLabel/InputLabel";
import SurveyButton from "@/components/common/surveyButton/SurveyButton";
import DefaultText from "@/components/common/defaultText/DefaultText";
import CustomDatePicker from "@/components/common/datePicker/CustomDatePicker";
import FileUpload from "@/components/common/fileUpload/FileUpload";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import DogTypeModal from "@/components/common/modal/dogTypeModal/DogTypeModal";
import useModal from "@/hooks/useModal";
import { DOG_GENDER } from "@/constants/dog";
import { useCheckDuplicatePetName } from "@/api/pet/queries/useCheckDuplicatePetName";
import { PetFormValues } from "@/utils/validation/petValidation";
import { useGetPetBreedList } from "@/api/pet/queries/useGetPetBreedList";

interface DogFormProps {
  isEdit: boolean;
  form: UseFormReturn<PetFormValues>;
  dogPictureUrl: string | null;
  handleFileChange: (file: File | null) => void;
  handleSubmit: () => void;
}

export default function PetForm({
  isEdit,
  form,
  dogPictureUrl,
  handleFileChange,
  handleSubmit,
}: DogFormProps) {
  const {
    control,
    setValue,
    setError,
    formState: { errors, isValid, isDirty },
  } = form;
  const { data: breedList } = useGetPetBreedList();

  const nameVerified = useWatch({ control, name: "nameVerified" });
  const petName = useWatch({ control, name: "name" });

  const [fileChanged, setFileChanged] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );

  const {
    isOpen: isOpenDogTypeModal,
    onClose: onCloseDogTypeModal,
    onToggle: onToggleDogTypeModal,
  } = useModal();

  const { refetch: checkDuplicate } = useCheckDuplicatePetName(petName, {
    enabled: false,
  });

  const handleDuplicateCheck = useCallback(async () => {
    if (errors?.name) {
      return;
    }

    const { data } = await checkDuplicate();
    const isSuccess = data?.success;

    if (isSuccess) {
      setValue("nameVerified", true, { shouldValidate: true });
      setSuccessMessage("사용 가능한 반려견 이름입니다.");
    } else {
      setError("name", {
        type: "manual",
        message: "이미 사용 중인 이름입니다.",
      });
      setValue("nameVerified", false, { shouldValidate: true });
      setSuccessMessage(undefined);
    }
  }, [petName, checkDuplicate, setError, setValue, errors?.name]);

  const handleChangeName = () => {
    setValue("nameVerified", false, { shouldValidate: true });
    setSuccessMessage(undefined);
  };

  // 파일 변경 핸들러 플래그
  const onFileChange = useCallback(
    (file: File | null) => {
      handleFileChange(file);
      setFileChanged(!!file);
    },
    [handleFileChange]
  );

  // 수정 여부 확인
  const isChanged = useMemo(
    () => isDirty || fileChanged,
    [isDirty, fileChanged]
  );

  return (
    <>
      <article className={styles.dogProfileImageBox}>
        <DefaultText type="title4">반려견 정보</DefaultText>
        <div className={styles.dogProfileImageWrapper}>
          <FileUpload
            onFileChange={onFileChange}
            defaultImageUrl={dogPictureUrl}
            defaultImageName={petName || ""}
            imageName="반려견 이미지"
            imageWidth={89}
            imageHeight={89}
            borderRadius
            objectFit="cover"
          />
        </div>
      </article>
      <form className={styles.dogInfoForm}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputField
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleChangeName();
              }}
              variants="box"
              placeholder="반려견 이름을 입력해주세요."
              label="반려견 이름"
              error={errors?.name?.message}
              isRequired
              maxLength={12}
              confirmButtonText="중복확인"
              confirmButton
              confirmButtonVariant="solid"
              confirmButtonDisabled={nameVerified}
              onSubmit={handleDuplicateCheck}
              success={successMessage}
            />
          )}
        />
        <div>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <InputLabel label="성별" labelColor="gray800" isRequired />
                <div className={styles.buttonBox}>
                  <SurveyButton
                    label={DOG_GENDER["MALE"]}
                    value="MALE"
                    isChecked={field.value === "MALE"}
                    onToggle={field.onChange}
                  />
                  <SurveyButton
                    label={DOG_GENDER["FEMALE"]}
                    value="FEMALE"
                    isChecked={field.value === "FEMALE"}
                    onToggle={field.onChange}
                  />
                </div>
              </>
            )}
          />
        </div>
        <Controller
          name="birthDay"
          control={control}
          render={({ field }) => (
            <>
              <InputLabel label="생년월일" labelColor="gray800" isRequired />
              <CustomDatePicker
                name={field.name}
                value={field.value}
                onChange={(date) => {
                  field.onChange(format(date as Date, "yyyy-MM-dd"));
                }}
                dateFormat="yyyy-MM-dd"
                marginBottom={false}
                isDisabled={isEdit}
              />
            </>
          )}
        />

        <Controller
          name="breedId"
          control={control}
          render={({ field }) => {
            const label =
              breedList?.find((b) => b.breedId === field.value)?.breedName ??
              "견종을 검색해 보세요";

            return (
              <>
                <InputField
                  type="button"
                  searchButton
                  value={label}
                  label="견종"
                  onClick={onToggleDogTypeModal}
                />
                <DogTypeModal
                  dogName={petName}
                  breedList={breedList ?? []}
                  value={field.value}
                  isOpen={isOpenDogTypeModal}
                  onChange={(v) => {
                    field.onChange(v);
                    onCloseDogTypeModal();
                  }}
                  onClose={onCloseDogTypeModal}
                />
              </>
            );
          }}
        />
      </form>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel={isEdit ? "수정하기" : "저장하기"}
        isPrimaryDisabled={!(isValid && isChanged)}
        onPrimaryClick={handleSubmit}
        position="fixed"
      />
    </>
  );
}
