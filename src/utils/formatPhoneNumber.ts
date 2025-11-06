export const checkPhoneNumberLength = (phoneNumber: number) => {
  return String(phoneNumber).slice(0, 11);
};

export const formatPhoneNumber = (phoneNumber: string | null | undefined) => {
  if (!phoneNumber) return "";
  return phoneNumber?.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};
