"use client";
import { commonWrapper } from "@/styles/common.css";
import {
  bodyCheckEmptyList,
  bodyCheckList,
  bodyCheckListBox,
} from "./BodyCheckList.css";
import { Fragment } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Text from "@/components/ui/text/Text";
import EmptyList from "@/components/ui/emptyList/EmptyList";
import TabBar from "@/components/ui/tabBar/TabBar";
import Card from "@/components/ui/card/Card";
import Divider from "@/components/ui/divider/Divider";
import SvgIcon from "@/components/ui/svgIcon/SvgIcon";
import HorizontalProgressBar from "@/components/pages/heathNote/common/progressBar/horizontalProgressBar/HorizontalProgressBar";
import LatestBodyCheck from "@/components/pages/heathNote/bodyCheck/list/latestBodyCheck/LatestBodyCheck";
import InfiniteScrollTrigger from "@/components/ui/infiniteScrollTrigger/InfiniteScrollTrigger";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useFlattenedInfiniteData } from "@/hooks/useFlattenedInfiniteData";
import { queryKeys } from "@/constants";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { BodyPartType } from "@/types/healthNote/bodyCheck";
import { BODY_PART } from "@/constants/healthNote/bodyCheck/common";
import { useGetInfiniteBodyCheckList } from "@/api/healthNote/bodyCheck/queries/useGetInfiniteBodyCheckList";

interface BodyCheckMainProps {
  petId: number;
}

export default function BodyCheckList({ petId }: BodyCheckMainProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const part = (searchParams.get("part") as BodyPartType) ?? "gastro";
  const tabKeys = Object.keys(BODY_PART) as BodyPartType[];
  const activeIndex = tabKeys.indexOf(part);

  const {
    data: bodyCheckData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetInfiniteBodyCheckList(petId, part);

  const diagnosisList = useFlattenedInfiniteData(
    bodyCheckData,
    "diagnosisList"
  );

  const ref = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  const { pushWithQuery } = useDynamicQueryPush();

  const handleTabClick = async (tabPart: BodyPartType) => {
    pushWithQuery(pathname, { part: tabPart });
    await queryClient.invalidateQueries({
      queryKey: [
        queryKeys.BODY_CHECK.BASE,
        queryKeys.BODY_CHECK.GET_BODY_CHECK_LIST,
        petId,
        tabPart,
      ],
    });
  };

  if (!bodyCheckData) return null;
  return (
    <section
      className={commonWrapper({
        backgroundColors: "gray0",
        direction: "col",
        align: "start",
        justify: "start",
        minHeight: "fullWithHeader",
      })}
    >
      <LatestBodyCheck petId={petId} />
      <article
        className={commonWrapper({
          backgroundColors: "gray50",
          direction: "col",
          align: "start",
        })}
      >
        <div className={bodyCheckListBox}>
          <div
            className={commonWrapper({
              direction: "col",
              align: "start",
              shadow: "light",
            })}
          >
            <Text
              type="title3"
              className={commonWrapper({
                paddingX: 20,
                paddingTop: 20,
                justify: "start",
              })}
            >
              결과 조회 내역
            </Text>
            <TabBar
              tabs={[
                {
                  label: BODY_PART.gastro.name,
                  onTabChange: () => handleTabClick("gastro"),
                },
                {
                  label: BODY_PART.skin.name,
                  onTabChange: () => handleTabClick("skin"),
                },
                {
                  label: BODY_PART.obesity.name,
                  onTabChange: () => handleTabClick("obesity"),
                },
              ]}
              hasTabContent={false}
              variant="text"
              defaultIndex={activeIndex}
              fullWidth
            />
          </div>
          {diagnosisList.length > 0 ? (
            <>
              <div
                className={`${commonWrapper({
                  direction: "col",
                  align: "start",
                  paddingBottom: 40,
                })} ${bodyCheckList}`}
              >
                {diagnosisList.map((result, index) => (
                  <Fragment key={index}>
                    <Link
                      className={commonWrapper({
                        direction: "col",
                        align: "start",
                        gap: 12,
                      })}
                      href={`/health-note/${petId}/body-check/result/${part}/${result.diagnosisId}`}
                    >
                      <Card
                        shadow="none"
                        padding={16}
                        gap={12}
                        direction="col"
                        width="full"
                        align="start"
                        borderRadius={0}
                      >
                        <div
                          className={commonWrapper({
                            direction: "col",
                            align: "start",
                            gap: 8,
                          })}
                        >
                          <Text type="label4" color="gray600">
                            {result.diagnosisDate}
                          </Text>
                          <Text
                            type="headline2"
                            className={commonWrapper({
                              gap: 8,
                              justify: "start",
                            })}
                          >
                            <SvgIcon src={BODY_PART[part].smIcon} size={28} />
                            {BODY_PART[part].name} 진단 결과
                          </Text>
                        </div>
                        <HorizontalProgressBar
                          score={result.simpleTotalScore}
                          showLabel
                          showIcon
                        />
                      </Card>
                    </Link>
                    <Divider height={4} color="gray50" />
                  </Fragment>
                ))}
              </div>
              <InfiniteScrollTrigger
                ref={ref}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
              />
            </>
          ) : (
            <div className={bodyCheckEmptyList}>
              <EmptyList
                title={`등록된 검사 결과가 없어요\n진단 후 결과를 기록해보세요`}
              />
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
