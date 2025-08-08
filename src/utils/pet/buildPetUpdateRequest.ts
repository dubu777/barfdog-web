import { Pet, UpdatePetRequest } from "@/types/pet";
import { PetFormValues } from "../validation/petValidation";
import { Gender } from "@/types";

export const buildPetUpdateRequest = (
  original: PetFormValues,
  values: PetFormValues
): UpdatePetRequest => ({
  petName: values.name !== original.name ? values.name : null,
  breedId: values.breedId !== original.breedId ? values.breedId : null,
  gender: values.gender !== original.gender ? (values.gender as Gender) : null,
  birthDay: values.birthDay !== original.birthDay ? values.birthDay : null,
});
