"use client";

import * as styles from "./PetForm.css";
import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Controller,
  FieldNamesMarkedBoolean,
  UseFormReturn,
  useWatch,
} from "react-hook-form";
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
  type: "update" | "create";
  form: UseFormReturn<PetFormValues>;
  dogPictureUrl?: string;
  handleFileChange: (file: File | null) => void;
  handleSubmit: () => void;
  // dirtyFields: FieldNamesMarkedBoolean<PetFormValues>;
}

export default function PetForm({
  type,
  form,
  dogPictureUrl,
  handleFileChange,
  handleSubmit,
}: // dirtyFields,
DogFormProps) {
  const {
    control,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors, isValid },
  } = form;
  const { data: breedList } = useGetPetBreedList();
  console.log("watch", watch());
  console.log("errors", errors);
  console.log("견종", breedList);

  const breedMap = useMemo(() => {
    const m = new Map<number, string>();
    breedList.forEach(({ breedId, breedName }) => {
      m.set(breedId, breedName);
    });
    return m;
  }, [breedList]);

  const petName = useWatch({ control, name: "name" });

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
    if (!petName) {
      setError("name", {
        type: "manual",
        message: "이름을 입력해주세요.",
      });
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
  }, [petName, checkDuplicate, setError, setValue]);

  const handleChangeName = () => {
    setValue("nameVerified", false, { shouldValidate: true });
    setSuccessMessage(undefined);
  };

  return (
    <>
      <article className={styles.dogProfileImageBox}>
        <DefaultText type="title4">반려견 정보</DefaultText>
        <div className={styles.dogProfileImageWrapper}>
          <FileUpload
            onFileChange={handleFileChange}
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
              confirmButtonText="중복확인"
              confirmButton
              confirmButtonVariant="solid"
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
                    isDisabled={type === "update"}
                  />
                  <SurveyButton
                    label={DOG_GENDER["FEMALE"]}
                    value="FEMALE"
                    isChecked={field.value === "FEMALE"}
                    onToggle={field.onChange}
                    isDisabled={type === "update"}
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
                isDisabled={type === "update"}
              />
            </>
          )}
        />

        <Controller
          name="breedId"
          control={control}
          render={({ field }) => {
            const selectedBreedName = breedMap.get(field.value) ?? "";
            return (
              <InputField
                searchButton
                value={selectedBreedName}
                label="견종"
                onClick={onToggleDogTypeModal}
                type="button"
              />
            );
          }}
        />
      </form>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="저장하기"
        isPrimaryDisabled={!isValid}
        onPrimaryClick={handleSubmit}
        position="sticky"
      />
      <DogTypeModal
        dogName={petName}
        value={watch("breedId")}
        onChange={(value) => setValue("breedId", value)}
        isOpen={isOpenDogTypeModal}
        onClose={onCloseDogTypeModal}
        breedList={breedList}
      />
    </>
  );
}
