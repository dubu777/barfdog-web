"use client";
import * as styles from "./HealthNoteUser.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Card from "@/components/common/card/Card";
import DefaultText from "@/components/common/defaultText/DefaultText";
import Button from "@/components/common/button/Button";
import { HEALTH_NOTE_MENU_CATEGORY } from "@/constants";
import { useGetDogList } from "@/api/dog/queries/useGetDogList";

const HealthNoteUser = () => {
  const router = useRouter();
  const { data: dogList = [] } = useGetDogList();

  const isFirstFullCheck = false;

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
            {HEALTH_NOTE_MENU_CATEGORY.map((menu) => (
              <button
                key={menu.url}
                onClick={() => handleGotoMenu(menu.url)}
                className={styles.menuCategory({ fullWidth: !!menu.fullWidth })}
              >
                <Card
                  shadow="normal"
                  padding={16}
                  {...(menu.fullWidth
                    ? { direction: "row", justify: "between", align: "start" }
                    : { align: "between", gap: 32 })}
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
                        {menu.description}
                      </DefaultText>
                    )}
                  </div>
                  <Image
                    src={menu.imageUrl}
                    alt={menu.label}
                    width={menu.width}
                    height={menu.height}
                    className={!menu.fullWidth ? styles.menuImage : ""}
                  />
                </Card>
              </button>
            ))}
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
