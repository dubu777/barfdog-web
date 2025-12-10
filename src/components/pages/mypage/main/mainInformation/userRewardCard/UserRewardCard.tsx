import { commonWrapper } from "@/styles/common.css";
import { rewardItem, userRewardLine } from "../MainInformation.css";
import { Fragment } from "react";
import { useRouter } from "next/navigation";
import ArrowIcon from "/public/images/mypage/chevron-s.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Text from "@/components/ui/text/Text";
import Divider from "@/components/ui/divider/Divider";

const MENU_LIST = [
  { key: "coupon", label: "쿠폰", url: "/mypage/coupon" },
  { key: "reward", label: "적립금", url: "/mypage/reward" },
];

interface UserRewardCardProps {
  couponCount: number;
  rewardCount: number;
  isDisabled?: boolean;
  className?: string;
}

export default function UserRewardCard({
  isDisabled = false,
  className,
  couponCount,
  rewardCount,
}: UserRewardCardProps) {
  const router = useRouter();

  const valueMap: Record<"coupon" | "reward", string | number> = {
    coupon: couponCount.toLocaleString() ?? 0,
    reward: rewardCount.toLocaleString() ?? 0,
  };

  return (
    <div className={`${commonWrapper({})} ${className || ""}`}>
      {MENU_LIST.map(({ key, label, url }, index) => (
        <Fragment key={key}>
          <button
            type="button"
            onClick={() =>
              !isDisabled ? router.push(url ?? "/mypage") : undefined
            }
            className={rewardItem({ isDisabled })}
          >
            <div className={commonWrapper({ justify: "start" })}>
              <Text type="body3" color="gray600">
                {label}
              </Text>
              <SvgIcon src={ArrowIcon} size={20} color="gray600" />
            </div>
            <Text type="label2">{valueMap[key]}</Text>
          </button>
          {MENU_LIST.length !== index + 1 && (
            <span className={userRewardLine}>
              <Divider height={1} color="gray200" direction="vertical" />
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
