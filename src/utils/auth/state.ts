export const generateState = () =>
  window.crypto.randomUUID().replaceAll("-", "");
