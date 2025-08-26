'use client';
import * as styles from "./BodyCheckList.css";
import { infiniteTrigger } from "@/styles/common.css";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import DefaultText from "@/components/common/defaultText/DefaultText";
import EmptyList from "@/components/pages/heathNote/common/emptyList/EmptyList";
import TabBar from "@/components/common/tabBar/TabBar";
import Card from "@/components/common/card/Card";
import Divider from "@/components/common/divider/Divider";
import SvgIcon from "@/components/common/svgIcon/SvgIcon";
import HorizontalProgressBar
  from "@/components/pages/heathNote/common/progressBar/horizontalProgressBar/HorizontalProgressBar";
import LatestBodyCheck from "@/components/pages/heathNote/bodyCheck/list/latestBodyCheck/LatestBodyCheck";
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

  const { data: bodyCheckData, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetInfiniteBodyCheckList(petId, part);
  const diagnosisList = bodyCheckData?.pages.flatMap(p => p.diagnosisList) ?? [];

  const { ref, inView } = useInView();
  const { pushWithQuery } = useDynamicQueryPush();

  useEffect(() => {
    if (inView && !hasNextPage) return;

    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }

  }, [inView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  const handleTabClick = async (tabPart: BodyPartType) => {
    pushWithQuery(pathname, { part: tabPart });
    await queryClient.invalidateQueries({
      queryKey: [queryKeys.BODY_CHECK.BASE, queryKeys.BODY_CHECK.GET_BODY_CHECK_LIST, petId, tabPart]
    });
  }

  if (!bodyCheckData) return null;
  return (
    <section className={styles.bodyCheckListContainer}>
      <LatestBodyCheck
        petId={petId}
      />
      <article className={styles.bodyCheckListBox}>
        <div className={styles.bodyCheckListTab}>
          <DefaultText type="title3" className={styles.bodyCheckListTitle}>
            결과 조회 내역
          </DefaultText>
          <TabBar
            tabs={[
              { label: BODY_PART.gastro.name, onInit: () => handleTabClick('gastro') },
              { label: BODY_PART.skin.name, onInit: () => handleTabClick('skin') },
              { label: BODY_PART.obesity.name, onInit: () => handleTabClick('obesity') },
            ]}
            hasTabContent={false}
            variant='text'
            defaultIndex={activeIndex}
          />
        </div>
        {diagnosisList.length > 0
          ? (
            <>
              <div className={styles.bodyCheckList}>
                {diagnosisList.map((result, index) => (
                  <Fragment key={index}>
                    <Link
                      className={styles.bodyCheckListItem}
                      href={`/health-note/${petId}/body-check/result/${part}/${result.diagnosisId}`}
                    >
                      <Card
                        shadow="none"
                        padding={16}
                        gap={12}
                        direction='col'
                        width='full'
                        align='start'
                        className={styles.bodyCheckListItemCard}
                      >
                        <div className={styles.bodyCheckListItemTop}>
                          <DefaultText type="label4" color="gray600">
                            {result.diagnosisDate}
                          </DefaultText>
                          <DefaultText type="headline2" className={styles.bodyCheckListItemTitle}>
                            <SvgIcon src={BODY_PART[part].smIcon} size={28} />
                            {BODY_PART[part].name} 진단 결과
                          </DefaultText>
                        </div>
                        <HorizontalProgressBar score={result.simpleTotalScore} showLabel showIcon />
                      </Card>
                    </Link>
                    {diagnosisList.length > index + 1 &&
                      <Divider thickness={4} color='gray50' />
                    }
                  </Fragment>
                ))}
              </div>
              <div ref={ref} className={infiniteTrigger} />
            </>
          ) : (
            <div className={styles.bodyCheckEmptyList}>
              <EmptyList />
            </div>
          )
        }
      </article>
    </section>
  );
}
