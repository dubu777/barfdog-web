export {};
declare global {
  interface Navigator {
    userAgentData?: { mobile: boolean; platform: string };
  }
  interface Window {
    opera?: string;
    MSStream?: unknown;
  }
}
