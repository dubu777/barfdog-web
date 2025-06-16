"use client";
import * as styles from "./HealthNoteUser.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import ComparisonProgressBar
  from "@/components/pages/heathNote/common/progressBar/comparisonProgressBar/ComparisonProgressBar";
import { HEALTH_NOTE_MENU_CATEGORY } from "@/constants";
import { useGetDogList } from "@/api/dog/queries/useGetDogList";
import { useScoreStatus } from "@/hooks/healthNote/useScoreStatus";

const HealthNoteUser = () => {
  const router = useRouter();
  const { data: dogList = [] } = useGetDogList();

  const isFirstFullCheck = false;
  const fullCheckTopRank = 2.4;
  const fullCheckScore = 50;
  const fullCheckPrevScore = 80;
  const { label: fullCheckStatusLabel, color: fullCheckStatusColor } = useScoreStatus({ current: fullCheckScore, previous: fullCheckPrevScore });

  const handleGotoMenu = (url) => {
    if (url === "/health-note/full-check") {
      window.location.href = `${url}${isFirstFullCheck ? "/survey" : ""}`;
    } else {
      window.location.href = url;
    }
  };

  return (
    <section className={styles.heathNoteMainContainer}>
      {dogList?.length > 0 ? (
        <article>
          <div className={styles.menuCategoryBox}>
            {HEALTH_NOTE_MENU_CATEGORY.map((menu) => {
              const isFullCheck = menu.url.includes('/full-check');
              const isFullCheckAndFirst = isFullCheck && isFirstFullCheck;
              return (
                <button
                  key={menu.url}
                  onClick={() => handleGotoMenu(menu.url)}
                  className={styles.menuCategory({ fullWidth: !!menu.fullWidth })}
                >
                  <Card
                    shadow="normal"
                    direction={menu.fullWidth ? 'row' : 'col'}
                    padding={16}
                    align='between'
                    justify='between'
                    className={styles.menuCategoryCard({
                      fullWidth: !!menu.fullWidth,
                    })}
                  >
                    <div>
                      <DefaultText type="headline1" block>
                        {menu.label}
                      </DefaultText>
                      {menu.description && (
                        <DefaultText
                          type="body3"
                          color="gray700"
                          block
                          preLine
                          className={styles.menuDescription}
                        >
                          {isFullCheckAndFirst
                            ? menu.description
                            : (
                              <>
                                상위&nbsp;
                                <DefaultText type='body3' color={fullCheckStatusColor}>
                                  {fullCheckTopRank}%
                                </DefaultText>로<br/>
                                {fullCheckStatusLabel}
                              </>
                            )
                          }
                        </DefaultText>
                      )}
                    </div>
                    {!isFullCheck || isFullCheckAndFirst
                      ? (
                        <Image
                          src={menu.imageUrl}
                          alt={menu.label}
                          width={menu.width}
                          height={menu.height}
                          className={!menu.fullWidth ? styles.menuImage : ""}
                        />
                      ) : (
                        <ComparisonProgressBar
                          prevScore={fullCheckPrevScore}
                          currentScore={fullCheckScore}
                          isCurrentScoreChips
                          barSize='sm'
                          prevBottomChildren={(
                            <DefaultText type='caption' color='gray600'>전체 평균</DefaultText>
                          )}
                          currentBottomChildren={(
                            <DefaultText type='caption' color='gray700'>우리 아이</DefaultText>
                          )}
                        />
                      )
                    }
                  </Card>
                </button>
              )
            })}
          </div>
        </article>
      ) : (
        <Button
          buttonColor="gray900"
          fullWidth
          onClick={() => router.push("/health-note/dogs/create")}
        >
          반려견 추가하기
        </Button>
      )}
    </section>
  );
};

export default HealthNoteUser;
