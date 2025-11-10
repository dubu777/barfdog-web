import { commonWrapper } from "@/styles/common.css";
import { menuCategory, menuCategoryBox } from "../HealthNoteUser.css";
import Image from "next/image";
import Text from "@/components/ui/text/Text";
import ArrowIcon from "/public/images/header/chevron-right.svg";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import Card from "@/components/ui/card/Card";
import ComparisonProgressBar from "@/components/pages/heathNote/common/progressBar/comparisonProgressBar/ComparisonProgressBar";
import { HEALTH_NOTE_SURVEY_MENU } from "@/constants";
import { useScoreStatus } from "@/hooks/healthNote/useScoreStatus";
import { useFullCheckSummaryData } from "@/hooks/healthNote/useFullCheckSummaryData";
import { useGetFullCheckSummary } from "@/api/healthNote/fullCheck/queries/useGetFullCheckSummary";

export default function TopSurveyMenu({ petId }: { petId?: number }) {
  const { data: fullCheckSummary } = useGetFullCheckSummary(petId, {
    enabled: !!petId,
    refetchOnMount: false, // 마운트 시 자동 refetch 방지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 refetch 방지
  });

  const {
    isFirstFullCheck,
    checkupScoreUpperPercentile,
    checkupScore,
    avgCheckupScore,
  } = useFullCheckSummaryData({ fullCheckSummary });

  const { label: fullCheckStatusLabel, color: fullCheckStatusColor } =
    useScoreStatus({
      current: checkupScore,
      scoreDifference: checkupScore - avgCheckupScore,
    });

  const handleGotoMenu = (url: string, isFullCheck: boolean) => {
    if (!petId) return;
    window.location.href = `/health-note/${petId}${url}${
      isFullCheck && isFirstFullCheck ? "/survey" : ""
    }`;
  };
  
  return (
    <article className={commonWrapper({
      direction: 'col',
      align: 'start',
      gap: 12,
    })}>
      <Text type="title3">
        최고 예쁜 우리 아이 💕<br />
        과연 건강 점수는 몇 점일까?
      </Text>
      <div className={menuCategoryBox}>
        {HEALTH_NOTE_SURVEY_MENU.map((menu) => {
          const isFullCheck = menu.url.includes("/full-check");
          const shouldFullCheckFirst = isFullCheck && isFirstFullCheck;
          return (
            <button
              key={menu.url}
              onClick={() => handleGotoMenu(menu.url, isFullCheck)}
              className={menuCategory({ isFullCheck: isFullCheck })}
            >
              <Card
                shadow="light"
                direction={isFullCheck ? "row" : "col"}
                gap={!isFullCheck ? 12 : undefined}
                padding={16}
                borderRadius={12}
                align="between"
                justify="between"
              >
                <div className={commonWrapper({
                  direction: 'col',
                  gap: 4,
                  align: 'start',
                  justify: 'start',
                })}>
                  <Text 
                    type="headline1"
                    color="gray800"
                    className={commonWrapper({ justify: 'start', gap: 6 })}
                  >
                    {menu.label}
                    <SvgIcon src={ArrowIcon} size={20} color="gray600" />
                  </Text>
                  {menu.description && (
                    <Text
                      type="body3"
                      color="gray700"
                      preLine
                    >
                      {shouldFullCheckFirst ? menu.description : (
                        <>
                          상위{' '}
                          <Text type="body3" color={fullCheckStatusColor}>
                            {checkupScoreUpperPercentile}%
                          </Text>로<br />
                          {fullCheckStatusLabel}
                        </>
                      )}
                    </Text>
                  )}
                </div>
                {isFullCheck && (
                  shouldFullCheckFirst ? (
                    <Image
                      src={menu.imageUrl}
                      alt={menu.label}
                      width={menu.width}
                      height={menu.height}
                    />
                  ) : (
                    <ComparisonProgressBar
                      prevScore={avgCheckupScore}
                      currentScore={checkupScore}
                      isCurrentScoreChips
                      barSize="sm"
                      prevBottomChildren={
                        <Text type="caption" color="gray600">
                          전체 평균
                        </Text>
                      }
                      currentBottomChildren={
                        <Text type="caption" color="gray700">
                          우리 아이
                        </Text>
                      }
                    />
                  )
                )
                }
                {!isFullCheck && 
                  <div className={commonWrapper({ justify: 'end' })}>
                    <SvgIcon 
                      src={menu.imageUrl} 
                      size={menu.width} 
                      height={menu.height}
                    />
                  </div>
                }
              </Card>
            </button>
          );
        })}
      </div>
    </article>
  );
}