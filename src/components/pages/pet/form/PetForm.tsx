"use client";
import { commonWrapper } from "@/styles/common.css";
import { dogProfileImageWrapper } from "./PetForm.css";
import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import { Controller, UseFormReturn, useWatch } from "react-hook-form";
import InputField from "@/components/ui/inputField/InputField";
import InputLabel from "@/components/ui/inputLabel/InputLabel";
import SurveyButton from "@/components/domain/survey/surveyButton/SurveyButton";
import Text from "@/components/ui/text/Text";
import CustomDatePicker from "@/components/ui/datePicker/CustomDatePicker";
import FileUpload from "@/components/ui/fileUpload/FileUpload";
import ButtonDocked from "@/components/ui/buttonDocked/ButtonDocked";
import PetTypeModal from "@/components/domain/pet/petTypeModal/PetTypeModal";
import useModal from "@/hooks/useModal";
import { PET_GENDER } from "@/constants/pet";
import { useCheckDuplicatePetName } from "@/api/pet/queries/useCheckDuplicatePetName";
import { PetFormValues } from "@/utils/validation/petValidation";
import { useGetPetBreedList } from "@/api/pet/queries/useGetPetBreedList";

interface PetFormProps {
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
}: PetFormProps) {
  const {
    control,
    setValue,
    setError,
    formState: { errors, isValid, isDirty },
  } = form;
  const { data: breedList } = useGetPetBreedList();

  const [nameVerified, petName] = useWatch({
    control,
    name: ["nameVerified", "name"],
  });

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
  }, [checkDuplicate, setError, setValue, errors?.name]);

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
      <article
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 20,
          padding: 20,
        })}
      >
        <Text type="title4">반려견 정보</Text>
        <div className={dogProfileImageWrapper}>
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
      <form
        className={commonWrapper({
          direction: "col",
          align: "start",
          gap: 20,
          padding: 20,
        })}
      >
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
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div
              className={commonWrapper({
                direction: "col",
                align: "start",
                gap: 8,
              })}
            >
              <InputLabel label="성별" labelColor="gray800" isRequired />
              <div className={commonWrapper({ justify: "start", gap: 8 })}>
                <SurveyButton
                  label={PET_GENDER["MALE"]}
                  value="MALE"
                  isChecked={field.value === "MALE"}
                  onToggle={field.onChange}
                />
                <SurveyButton
                  label={PET_GENDER["FEMALE"]}
                  value="FEMALE"
                  isChecked={field.value === "FEMALE"}
                  onToggle={field.onChange}
                />
              </div>
            </div>
          )}
        />
        <Controller
          name="birthDay"
          control={control}
          render={({ field }) => (
            <div
              className={commonWrapper({
                direction: "col",
                align: "start",
                gap: 8,
              })}
            >
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
            </div>
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
                  labelType="headline4"
                  labelColor="gray800"
                  isRequired
                  onClick={onToggleDogTypeModal}
                />
                <PetTypeModal
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
