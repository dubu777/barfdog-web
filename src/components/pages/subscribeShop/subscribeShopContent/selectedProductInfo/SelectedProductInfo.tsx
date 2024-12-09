"use client";


import * as styles from "./SelectedProductInfo.css";
import {
  calculateOneMealGramsOutput,
  CalculateSubscribePriceOutput,
  ResultData,
  PlanName,
} from "@/types";
import { toppingOption } from "@/constants";
import { formatNumberWithCommas } from "@/utils/formatNumberWithCommas";
import {
  getPackCount,
  isToppingPlan,
} from "@/utils/subscription/subscriptionUtils";

import DeliveryScheduleModal from "./deliveryScheduleModal/DeliveryScheduleModal";
import { subscribeText } from "../recipeSelection/RecipeSelection.css";
import SelectBox from "@/components/pages/survey/selectBox/SelectBox";

interface SelectedProductInfoProps {
  subscribePriceData: CalculateSubscribePriceOutput;
  selectedRecipeMeals: calculateOneMealGramsOutput[];
  oneMealGramWithVolume: calculateOneMealGramsOutput[];
  selectedPlan: PlanName | null;
  selectedVolume: string | null;
  handleSelectedVolume: (value: string) => void;
}

export default function SelectedProductInfo({
  subscribePriceData,
  selectedRecipeMeals = [],
  oneMealGramWithVolume = [],
  selectedPlan,
  selectedVolume,
  handleSelectedVolume,
}: SelectedProductInfoProps) {

  // 토핑 플랜 여부 확인 함수
  const toppingPlan = isToppingPlan(selectedPlan);

  return (
    <section className={styles.selectedProductContainer}>
      <p
        className={subscribeText({ type: "subtext", align: "right" })}
        style={{ whiteSpace: "pre-line" }}
      >
        {toppingPlan
          ? "하루 2팩 기준\n1팩당 권장량"
          : "선택 레시피:\n(1팩 기준)"}
      </p>

      <div className={styles.productContentWrapper}>
        {selectedRecipeMeals.length > 0 ? (
          selectedRecipeMeals.map(({ oneMealGram, recipeName }, index) => (
            <div className={styles.productContentBox} key={index}>
              {formatNumberWithCommas(oneMealGram)} g
              <br />
              {recipeName}
            </div>
          ))
        ) : (
          <div className={styles.productContentBox}>-</div>
        )}
      </div>

      {/* 토핑 플랜 섹션 */}
      {toppingPlan && (
        <>
          <p className={subscribeText({ type: "subtext", align: "right" })}>
            토핑 용량 조절:
          </p>
          <SelectBox
            options={toppingOption.options}
            placeholder={"토핑 용량을 선택해주세요"}
            onSelect={handleSelectedVolume}
            selectedValue={selectedVolume}
            size="md"
          />
          {/* 토핑용 1팩당 그램수 */}
          <p className={subscribeText({ type: "subtext", align: "right" })}>
            토핑용 1팩:
          </p>
          <div className={styles.productContentWrapper}>
            {oneMealGramWithVolume.length > 0 ? (
              oneMealGramWithVolume.map(({ oneMealGram }, index) => (
                <div className={styles.productContentBox} key={index}>
                  {oneMealGram} g
                </div>
              ))
            ) : (
              <div className={styles.productContentBox}>-</div>
            )}
          </div>
        </>
      )}

      <p className={subscribeText({ type: "subtext", align: "right" })}>
        한 팩당:
      </p>
      <div className={styles.productContentWrapper}>
        {selectedPlan && subscribePriceData.recipePriceDetails.length > 0 ? (
          subscribePriceData.recipePriceDetails.map(
            ({ discountedPackPrice }, index) => (
              <div className={styles.productContentBox} key={index}>
                {formatNumberWithCommas(discountedPackPrice)} 원
              </div>
            )
          )
        ) : (
          <div className={styles.productContentBox}>-</div>
        )}
      </div>

      <p className={subscribeText({ type: "subtext", align: "right" })}>
        팩수:
      </p>
      <div className={styles.productContentWrapper}>
        {selectedRecipeMeals.length > 0 ? (
          selectedRecipeMeals.map((_, index) => (
            <div className={styles.productContentBox} key={index}>
              {getPackCount(selectedRecipeMeals.length)}
            </div>
          ))
        ) : (
          <p className={styles.productContentBox}>-</p>
        )}
      </div>
      <p className={subscribeText({ type: "subtext", align: "right" })}>
        총 상품 금액:
      </p>
      <div className={styles.productContentWrapper}>
        <div className={styles.productContentBox}>
          <p className={subscribeText({ type: "body" })}>
            {formatNumberWithCommas(
              subscribePriceData.totalDiscountedPriceAllRecipes
            )}{" "}
            원
          </p>
        </div>
      </div>
      <DeliveryScheduleModal isVisible={false} onClose={() => {}}/>
    </section>
  );
}
