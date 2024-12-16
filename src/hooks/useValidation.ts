import { useState, useMemo } from "react";

type ValidationRule = {
  validate: (value: string) => boolean;
  errorMessage: string;
};

type ValidationState = {
  [key: string]: string;
};

type UseValidationResult<T> = {
  values: T;
  errors: ValidationState;
  isValid: boolean;
  handleChange: (fieldName: keyof T, value: string) => void;
  resetAll: () => void;
};

export function useValidation<T extends Record<string, any>>(
  initialState: T,
  validationRules: Record<keyof T, ValidationRule[]>
): UseValidationResult<T> {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<ValidationState>({});

  const validateField = (fieldName: keyof T, value: string) => {
    const rules = validationRules[fieldName];
    for (let rule of rules) {
      if (!rule.validate(value)) {
        setErrors((prev) => ({
          ...prev,
          [fieldName as string]: rule.errorMessage,
        }));
        return false;
      }
    }
    setErrors((prev) => ({ ...prev, [fieldName as string]: "" }));
    return true;
  };

  const handleChange = (fieldName: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [fieldName]: value }));
    validateField(fieldName, value);
  };

  const isValid = useMemo(() => {
    return (
      Object.values(errors).every((error) => error === "") &&
      (Object.keys(validationRules) as Array<keyof T>).every((key) =>
        validateField(key, values[key])
      )
    );
  }, [errors, values]);

  const resetAll = () => {
    setValues(initialState);
    setErrors({});
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetAll,
  };
}
