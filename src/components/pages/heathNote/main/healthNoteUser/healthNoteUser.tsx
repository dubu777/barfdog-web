"use client";
import * as styles from "./HealthNoteUser.css";
import Image from "next/image";
import Card from "@/components/common/card/Card";
import Text from "@/components/common/text/Text";
import ComparisonProgressBar from "@/components/pages/heathNote/common/progressBar/comparisonProgressBar/ComparisonProgressBar";
import CreateDogCard from "@/components/pages/heathNote/common/createDogCard/CreateDogCard";
import { useScoreStatus } from "@/hooks/healthNote/useScoreStatus";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";
import { useGetFullCheckSummary } from "@/api/healthNote/fullCheck/queries/useGetFullCheckSummary";
import { HEALTH_NOTE_MENU_CATEGORY } from "@/constants/healthNote/common";

const HealthNoteUser = () => {
  const { data: petList = [] } = useGetPetList();
  const petInfo = petList?.find((pet) => pet.isRepresentative);

  const { data: fullCheckSummary } = useGetFullCheckSummary(petInfo?.id, {
    enabled: !!petInfo?.id, // petInfo.id가 있을 때만 호출
  });

  const isFirstFullCheck = !fullCheckSummary?.isExistDiagnosis;
  const checkupScoreUpperPercentile =
    fullCheckSummary?.checkupScoreUpperPercentile;
  const checkupScore = fullCheckSummary?.checkupScore ?? 0;
  const avgCheckupScore = fullCheckSummary?.avgCheckupScore ?? 0;

  const { label: fullCheckStatusLabel, color: fullCheckStatusColor } =
    useScoreStatus({
      current: checkupScore,
      scoreDifference: checkupScore - avgCheckupScore,
    });

  const handleGotoMenu = (url) => {
    switch (url) {
      case "/full-check":
        if (!petInfo?.id) return;
        window.location.href = `/health-note/${petInfo.id}${url}${
          isFirstFullCheck ? "/survey" : ""
        }`;
        break;
      case "/medical-history":
      case "/body-check":
      case "/dogpedia":
      case "/probiome":
        if (!petInfo?.id) return;
        window.location.href = `/health-note/${petInfo.id}${url}`;
        break;
      default:
        window.location.href = `/health-note${url}`;
    }
  };

  return (
    <section className={styles.heathNoteMainContainer}>
      {petList?.length > 0 ? (
        <article>
          <div className={styles.menuCategoryBox}>
            {HEALTH_NOTE_MENU_CATEGORY.map((menu) => {
              const isFullCheck = menu.url.includes("/full-check");
              const isFullCheckAndFirst = isFullCheck && isFirstFullCheck;
              return (
                <button
                  key={menu.url}
                  onClick={() => handleGotoMenu(menu.url)}
                  className={styles.menuCategory({
                    fullWidth: !!menu.fullWidth,
                  })}
                >
                  <Card
                    shadow="normal"
                    direction={menu.fullWidth ? "row" : "col"}
                    padding={16}
                    align="between"
                    justify="between"
                    className={styles.menuCategoryCard({
                      fullWidth: !!menu.fullWidth,
                    })}
                  >
                    <div>
                      <Text type="headline1" block>
                        {menu.label}
                      </Text>
                      {menu.description && (
                        <Text
                          type="body3"
                          color="gray700"
                          block
                          preLine
                          className={styles.menuDescription}
                        >
                          {isFullCheckAndFirst ? (
                            menu.description
                          ) : (
                            <>
                              상위&nbsp;
                              <Text
                                type="body3"
                                color={fullCheckStatusColor}
                              >
                                {checkupScoreUpperPercentile}%
                              </Text>
                              로<br />
                              {fullCheckStatusLabel}
                            </>
                          )}
                        </Text>
                      )}
                    </div>
                    {!isFullCheck || isFullCheckAndFirst ? (
                      <Image
                        src={menu.imageUrl}
                        alt={menu.label}
                        width={menu.width}
                        height={menu.height}
                        className={!menu.fullWidth ? styles.menuImage : ""}
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
                    )}
                  </Card>
                </button>
              );
            })}
          </div>
        </article>
      ) : (
        <CreateDogCard buttonLabel="반려견 추가하기" />
      )}
    </section>
  );
};

export default HealthNoteUser;
