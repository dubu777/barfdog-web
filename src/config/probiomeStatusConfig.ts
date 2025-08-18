import { ProbiomeStatus } from "@/types/healthNote/probiome";

export interface ProbiomeStatusConfig {
  label: string;
  chipColor: "gray100" | "lightPink" | "blue50";
  iconColor: "gray700" | "pastelRed" | "blue400";
  showIcon: boolean;
}

export const PROBIOME_STATUS_CONFIG: Record<
  ProbiomeStatus,
  ProbiomeStatusConfig
> = {
  SUBMITTED: {
    label: "문진 작성완료",
    chipColor: "gray100",
    iconColor: "gray700",
    showIcon: true,
  },
  KIT_PICKUP_REQUESTED: {
    label: "회수 신청",
    chipColor: "lightPink",
    iconColor: "pastelRed",
    showIcon: false,
  },
  KIT_PICKUP_DONE: {
    label: "회수 완료",
    chipColor: "lightPink",
    iconColor: "pastelRed",
    showIcon: true,
  },
  ANALYZING: {
    label: "분석 중",
    chipColor: "blue50",
    iconColor: "blue400",
    showIcon: false,
  },
  COMPLETED: {
    label: "분석 완료",
    chipColor: "blue50",
    iconColor: "blue400",
    showIcon: true,
  },
};

export const getProbiomeStatusConfig = (
  status: ProbiomeStatus
): ProbiomeStatusConfig => {
  return PROBIOME_STATUS_CONFIG[status];
};
