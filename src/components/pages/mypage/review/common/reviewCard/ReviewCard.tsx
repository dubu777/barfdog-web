import { commonWrapper, ellipsis, imageWrapper } from "@/styles/common.css";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import PictureIcon from "/public/images/icons/picture.svg";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import Chips from "@/components/common/chips/Chips";
import Text from "@/components/common/text/Text";
import SubtitleText from "@/components/pages/mypage/common/card/typography/SubtitleText";
import MetaText from "@/components/pages/mypage/common/card/typography/MetaText";
import RateStar from "@/components/common/rateStar/RateStar";
import Button from "@/components/common/button/Button";
import Divider from "@/components/common/divider/Divider";
import {
  REVIEW_STATUS,
  REVIEW_STATUS_COLOR_MAP,
  REVIEW_TYPE,
} from "@/constants";
import { ReviewItemType, ReviewStatus } from "@/types";

interface ReviewCardProps {
  isWriteableReview?: boolean;
  id: number;
  title: string;
  reviewType: ReviewItemType;
  displayItemThumbnailUrl?: string;
  displayImageUrl?: string;
  status?: ReviewStatus;
  writtenDate?: string;
  orderedDate?: string;
  star?: number;
  reviewImageCount?: number;
  subscribeCount?: number;
  contents?: string;
  returnReason?: string | null;
  showDetail?: boolean;
  handleUpdate?: () => void;
  handleCreate?: () => void;
  handleStarChange?: (newRating: number) => void;
}

export default function ReviewCard({
  isWriteableReview = false,
  id,
  title,
  reviewType,
  displayItemThumbnailUrl,
  displayImageUrl,
  status,
  writtenDate,
  orderedDate,
  star,
  reviewImageCount = 0,
  subscribeCount,
  contents,
  returnReason,
  showDetail = false,
  handleUpdate,
  handleCreate,
  handleStarChange,
}: ReviewCardProps) {
  const router = useRouter();
  return (
    <div
      key={id}
      className={commonWrapper({
        backgroundColors: "gray0",
        padding: 20,
        direction: "col",
        align: "start",
        gap: 12,
      })}
    >
      <div
        className={commonWrapper({ direction: "col", gap: 10, align: "start" })}
      >
        <div className={commonWrapper({ align: "center", justify: "between" })}>
          <div
            className={commonWrapper({
              gap: 4,
              align: "center",
              justify: "start",
              width: "auto",
            })}
          >
            {!isWriteableReview && status && (
              <Chips
                color={REVIEW_STATUS_COLOR_MAP[status]}
                variant="solid"
                borderRadius="lg"
              >
                {REVIEW_STATUS[status]}
              </Chips>
            )}
            <Text type="label4">
              {REVIEW_TYPE[reviewType]}{" "}
              {reviewType === "SUBSCRIBE" &&
                subscribeCount &&
                `${subscribeCount}회차`}
            </Text>
          </div>
          {handleUpdate && (
            <button onClick={handleUpdate}>
              <Text type="headline4" color="blue500">
                수정
              </Text>
            </button>
          )}
        </div>
        {status === "RETURN" && returnReason && (
          <Text type="label4" color="pastelRed">
            반려사유: {returnReason}
          </Text>
        )}
        <div
          className={commonWrapper({
            gap: 12,
            align: "start",
            justify: "start",
          })}
        >
          {(displayItemThumbnailUrl || displayImageUrl) && (
            <Image
              src={displayItemThumbnailUrl ?? displayImageUrl ?? ""}
              alt={title}
              width={76}
              height={76}
              className={imageWrapper({
                width: 76,
                objectFit: "cover",
                borderRadius: 8,
              })}
            />
          )}
          <div
            className={commonWrapper({
              gap: 8,
              direction: "col",
              align: "start",
              width: "auto",
            })}
          >
            <div
              className={commonWrapper({
                gap: 4,
                direction: "col",
                align: "start",
              })}
            >
              <SubtitleText text={title} type="headline2" />
              <MetaText
                textList={[
                  orderedDate
                    ? `주문일: ${format(new Date(orderedDate), "yyyy-MM-dd")}`
                    : "",
                  writtenDate
                    ? `작성일: ${format(new Date(writtenDate), "yyyy-MM-dd")}`
                    : "",
                ].filter(Boolean)}
                color="gray600"
              />
            </div>
            {!isWriteableReview && (
              <RateStar
                onChange={(newRating) => handleStarChange?.(newRating)}
                rateLength={5}
                value={star}
                size={24}
                color="red"
              />
            )}
          </div>
        </div>
      </div>
      {!handleUpdate && !handleStarChange && !isWriteableReview && (
        <Divider thickness={1} color="gray300" />
      )}
      {!isWriteableReview && contents && (
        <div
          className={commonWrapper({
            gap: 4,
            align: "center",
            justify: "start",
          })}
        >
          {reviewImageCount > 0 && <SvgIcon src={PictureIcon} size={24} />}
          <Text type="body2" className={ellipsis({ lineSize: "line1" })}>
            {contents}
          </Text>
        </div>
      )}
      {showDetail && (
        <Button
          variant="outline"
          intent={isWriteableReview ? "primary" : "assistive"}
          size="sm"
          fullWidth
          onClick={() => {
            if (isWriteableReview) {
              handleCreate?.();
            }
            router.push(
              isWriteableReview
                ? "/mypage/review/create"
                : `/mypage/review/${id}?reviewType=${reviewType}`
            );
          }}
        >
          {isWriteableReview ? "리뷰 작성" : "리뷰 상세"}
        </Button>
      )}
    </div>
  );
}
