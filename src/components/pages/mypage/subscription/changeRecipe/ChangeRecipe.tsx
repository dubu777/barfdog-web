"use client";
import { Fragment, useState } from "react";
import * as styles from "./ChangeRecipe.css";
import { pointColor } from "@/styles/common.css";
import useModal from "@/hooks/useModal";
import Text from "@/components/common/text/Text";
import Card from "@/components/common/card/Card";
import Button from "@/components/common/button/Button";
import Divider from "@/components/common/divider/Divider";
import ButtonDocked from "@/components/common/buttonDocked/ButtonDocked";
import RecipeList from "@/components/pages/mypage/common/recipeList/RecipeList";
import ChangeBottomSheet from "@/components/pages/mypage/common/modal/changeRecipeModal/changeBottomSheet/ChangeBottomSheet";
import { useDynamicQueryPush } from "@/hooks/useDynamicQueryPush";
import { usePathname } from "next/navigation";
import { useGetSubscriptionDetail } from "@/api/subscription/queries/useGetSubscriptionDetail";
import { numberOfPacksPerDay, subscriptionPlanInfo } from "@/constants";

interface ChangeRecipeProps {
  subscriptionId: number;
}

const ChangeRecipe = ({ subscriptionId }: ChangeRecipeProps) => {
  const pathname = usePathname();
  const { pushWithQuery } = useDynamicQueryPush();
  const { data: detail } = useGetSubscriptionDetail(subscriptionId);

  const [selectedInfo, setSelectedInfo] = useState({
    plan: detail.plan,
    weeklyPaymentCycle: 2,
  });

  const nextCycle = detail.subscribeCount + 1;
  const planInfo = subscriptionPlanInfo[selectedInfo.plan];
  const {
    isOpen: changeSubscriptionInfoOpen,
    onClose: onCloseChangeSubscriptionInfo,
    onToggle: onToggleChangeSubscriptionInfo,
  } = useModal();

  const subscriptionInfo = [
    {
      label: "식사량",
      value: numberOfPacksPerDay[planInfo.numberOfPacksPerDay],
      onClick: onToggleChangeSubscriptionInfo,
    },
    {
      label: "배송 주기",
      value: `${selectedInfo.weeklyPaymentCycle}주`,
      onClick: onToggleChangeSubscriptionInfo,
    },
  ];
  return (
    <section>
      <article className={styles.changeRecipeContainer}>
        <div className={styles.changeRecipeTitle}>
          <Text type="title3">
            아래의 정보 확인 후<br /> 식단 변경을 진행해 주세요
          </Text>
          <Text type="body3" color="gray500">
            <span className={pointColor}>
              식단 변경은 {nextCycle}회차부터 변경돼요
            </span>{" "}
            (현재: {detail.subscribeCount}회차)
          </Text>
        </div>
        <Card shadow="none" padding={16} gap={16}>
          {subscriptionInfo.map((info, index) => (
            <Fragment key={info.value}>
              <div className={styles.topInfo}>
                <div>
                  <Text type="label2">{info.label}</Text>
                  <Text type="headline2" style={{ marginLeft: "8px" }}>
                    {info.value}
                  </Text>
                </div>
                <Button
                  onClick={info.onClick}
                  variant="outline"
                  intent="assistive"
                  size="sm"
                >
                  수정
                </Button>
              </div>
              {index === 0 && <Divider thickness={2} color="gray200" />}
            </Fragment>
          ))}
        </Card>
        <Card shadow="none" padding={12} gap={12}>
          <div className={styles.bottomInfoTitle}>
            <Text type="headline2">구독 상품</Text>
            <Button variant="outline" intent="assistive" size="sm">
              수정
            </Button>
          </div>
          <Divider thickness={2} color="gray900" />
          <RecipeList data={detail} />
        </Card>
      </article>
      <ButtonDocked
        type="full-button"
        primaryButtonLabel="식단 변경하기"
        onPrimaryClick={() => pushWithQuery(pathname, { step: 1 })}
      />
      {changeSubscriptionInfoOpen && (
        <ChangeBottomSheet
          isOpen={changeSubscriptionInfoOpen}
          onClose={onCloseChangeSubscriptionInfo}
          selectedInfo={selectedInfo}
          setSelectedInfo={setSelectedInfo}
        />
      )}
    </section>
  );
};

export default ChangeRecipe;
