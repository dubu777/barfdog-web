'use client'

import { useState } from "react";

export default function useForm<T>(initialValues: T) {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (key: keyof T, value: T[keyof T]) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return {
    formData,
    handleChange,
  };
}
