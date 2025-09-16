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

declare global {
  interface Window {
    IMP?: {
      init: (userCode: string) => void;
      request_pay: <T = unknown>(
        data: unknown,
        callback?: (response: T) => void
      ) => void;
    };
  }
}
