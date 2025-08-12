"use client";
import * as styles from "./HealthNoteUser.css";
import Image from "next/image";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import ComparisonProgressBar from "@/components/pages/heathNote/common/progressBar/comparisonProgressBar/ComparisonProgressBar";
import { HEALTH_NOTE_MENU_CATEGORY } from "@/constants";
import { useScoreStatus } from "@/hooks/healthNote/useScoreStatus";
import CreateDogCard from "@/components/pages/heathNote/common/createDogCard/CreateDogCard";
import { useHealthNoteStore } from "@/store/useHealthNoteStore";
import { useGetPetList } from "@/api/pet/queries/useGetPetList";

const HealthNoteUser = () => {
  const { data: petList } = useGetPetList();
  const { dogInfo } = useHealthNoteStore();
  const isFirstFullCheck = false;
  const fullCheckTopRank = 2.4;
  const fullCheckScore = 50;
  const fullCheckPrevScore = 80;
  const { label: fullCheckStatusLabel, color: fullCheckStatusColor } =
    useScoreStatus({ current: fullCheckScore, previous: fullCheckPrevScore });

  const handleGotoMenu = (url) => {
    if (url === "/health-note/full-check") {
      window.location.href = `${url}${isFirstFullCheck ? "/survey" : ""}`;
    } else if (url === "/health-note/gut-check" && dogInfo?.dogId) {
      window.location.href = `${url}?dogId=${dogInfo.dogId}`;
    } else if (url === "/health-note/medical-history" && dogInfo?.dogId) {
      window.location.href = `${url}?petId=${dogInfo.dogId}`;
    } else {
      window.location.href = url;
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
                          {isFullCheckAndFirst ? (
                            menu.description
                          ) : (
                            <>
                              상위&nbsp;
                              <DefaultText
                                type="body3"
                                color={fullCheckStatusColor}
                              >
                                {fullCheckTopRank}%
                              </DefaultText>
                              로<br />
                              {fullCheckStatusLabel}
                            </>
                          )}
                        </DefaultText>
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
                        prevScore={fullCheckPrevScore}
                        currentScore={fullCheckScore}
                        isCurrentScoreChips
                        barSize="sm"
                        prevBottomChildren={
                          <DefaultText type="caption" color="gray600">
                            전체 평균
                          </DefaultText>
                        }
                        currentBottomChildren={
                          <DefaultText type="caption" color="gray700">
                            우리 아이
                          </DefaultText>
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
