"use client";
import * as styles from "./Signup.css";
import { useFormHandler } from "@/hooks/useFormHandler";
import {
  defaultSignupValues,
  SignupFormValues,
  signupSchema,
} from "@/utils/validation/authValidation";
import { useAuthStore } from "@/store/useAuthStore";

const SignUp = () => {
  const { handleSubmit, control, watch, errors, setValue, setError } =
    useFormHandler<SignupFormValues>(signupSchema, defaultSignupValues);

  const onSubmit = (data: SignupFormValues) => {
    console.log("formData", data);
  };
  return (
    <section>
      <></>
    </section>
  );
};

export default SignUp;
