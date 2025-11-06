import { RecipeFormItem, SubscriptionValues } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

export type CommitSelectionResult =
  | { success: true }
  | { success: false; reason: "LIMIT" | "NO_CHANGE" };

export type StagedSelection = { packGrams: number; packPrice: number };

// 선택 가능한 최대 레시피 수
const MAX_SELECTABLE_ITEMS = 2;

export function useRecipeSelections() {
  const { control, getValues } = useFormContext<SubscriptionValues>();
  const { append, update, remove } = useFieldArray({
    control,
    name: "recipeList",
  });
  const savedRecipes = useWatch({
    control,
    name: "recipeList",
    defaultValue: [] as RecipeFormItem[],
  });

  console.log("save", savedRecipes);

  // - 현재 RHF에 저장된 선택 결과(recipeList)를 recipeId -> RecipeFormItem 형태의 Map으로 가공.
  // - 카드에서 isSelected, savedSelection 조회를 O(1)에 가깝게 하기 위한 최적화.
  const savedByIdMap = useMemo(() => {
    const map = new Map<number, RecipeFormItem>();
    savedRecipes.forEach((recipe) => map.set(recipe.recipeId, recipe));
    return map;
  }, [savedRecipes]);

  // - 현재 선택된 레시피의 ID 목록
  const selectedIds = useMemo(
    () => savedRecipes.map((recipe) => recipe.recipeId),
    [savedRecipes]
  );

  // - 모달에서 '적용'을 눌러 임시로 반영한 값(아직 RHF에는 미반영)을 레시피별로 보관하는 로컬 상태
  // - key: recipeId, value: { packGrams, packPrice } 또는 null
  const [stagedById, setStagedById] = useState<
    Record<number, StagedSelection | null>
  >({});

  // - 특정 레시피에 대해 packGrams/packPrice 임시값을 기록한다(모달 '적용' 시 호출).
  // - RHF에는 아직 쓰지 않는다 → 확정은 commitSelection에서 수행.
  const stageSelection = useCallback(
    (recipeId: number, packGrams: number, packPrice: number) => {
      setStagedById((prev) => ({
        ...prev,
        [recipeId]: { packGrams, packPrice },
      }));
    },
    []
  );

  // - 특정 레시피의 스테이징 값을 제거한다(커밋/삭제 후 호출).
  const clearStage = useCallback((recipeId: number) => {
    setStagedById((prev) => {
      if (!prev[recipeId]) return prev; // 해당 레시피에 스테이징이 없으면 그대로 반환(불필요한 리렌더 방지)
      const next = { ...prev };
      delete next[recipeId];
      return next;
    });
  }, []);

  // - 해당 상세 모달을 열수 있는지 판단한다.
  // - 이미 담긴 레시피는 true, 신규 추가는 현재 개수가 제한 미만일 때만 true.
  const canOpenDetailModal = useCallback(
    (recipeId: number) => {
      const already = savedByIdMap.get(recipeId); // 현재 저장된 선택 맵에서 조회
      if (already) return true; // 이미 담겨있다면 허용
      return (savedRecipes?.length ?? 0) < MAX_SELECTABLE_ITEMS; // 미담김이면 개수 제한(2개 미만) 검사
    },
    [savedRecipes?.length, savedByIdMap]
  );

  // - 해당 레시피가 현재 선택되어(RHF에 저장되어) 있는지 여부 반환.
  const isSelected = useCallback(
    (recipeId: number) => savedByIdMap.has(recipeId),
    [savedByIdMap]
  );

  // - 모달에서 '레시피 담기'(확정)을 눌렀을 때 호출되는 커밋 함수.
  // - resolvePack 콜백을 통해 최종 반영할 packGrams/packPrice를 상위(카드)로부터 가져온다.
  //   (스테이징 우선, 없으면 기본 계산값 등 컨텍스트별 로직을 상위에서 해석)
  // - 신규면 append, 기존이면 update 수행. 변경 없음/개수 제한은 실패 사유로 반환.
  const commitSelection = useCallback(
    (
      recipeId: number,
      resolvePack: () => { packGrams: number; packPrice: number }
    ): CommitSelectionResult => {
      const { packGrams, packPrice } = resolvePack(); // 최종 반영할 g/가격을 상위에서 계산해 가져옴

      const current = getValues("recipeList");
      const idx = current.findIndex((f) => f.recipeId === recipeId); // 동일 recipeId가 이미 있는지 확인
      const exists = idx > -1; // 존재 여부 플래그

      // 변경 없음 검사(이미 저장되어 있고 값이 동일한 경우)
      if (exists) {
        const saved = current[idx];
        if (saved.packGrams === packGrams && saved.packPrice === packPrice) {
          return { success: false, reason: "NO_CHANGE" }; // 값 변화가 없으면 커밋하지 않음
        }
      } else {
        // 신규 추가인 경우 개수 제한 검사(2개 이상이면 실패)
        if ((current.length ?? 0) >= MAX_SELECTABLE_ITEMS) {
          return { success: false, reason: "LIMIT" }; // 제한 초과
        }
      }

      // 여기까지 왔으면 저장/갱신 가능
      const selection = { recipeId, packGrams, packPrice }; // 저장할 객체 구성
      if (exists) update(idx, selection); // 기존 항목이면 해당 인덱스 update
      else append(selection); // 신규 항목이면 append

      clearStage(recipeId); // 커밋 후 해당 레시피의 스테이징 제거(표시값 혼동 방지)
      return { success: true }; // 성공 반환
    },
    [append, update, getValues, clearStage]
  );

  // - 해당 레시피를 RHF 배열(recipeList)에서 제거.
  // - 삭제 후 스테이징도 정리하여 UI 표시값 일관성 유지.
  const removeSelection = useCallback(
    (recipeId: number) => {
      const current = getValues("recipeList");
      const idx = current.findIndex((f) => f.recipeId === recipeId);
      if (idx > -1) remove(idx); // 있으면 remove 실행
      clearStage(recipeId); // 스테이징도 제거
    },
    [getValues, remove, clearStage]
  );

  // - 카드/모달에서 recipeId만 넘기면, 현재 저장값/스테이징/선택 여부/추가 가능 여부를 한 번에 가져오는 헬퍼.
  // - 프리젠테이션 레이어가 비즈니스 로직을 몰라도 쉽게 상태를 소비하게 돕는다.
  const getSelection = useCallback(
    (recipeId: number) => {
      const saved = savedByIdMap.get(recipeId);
      const staged = stagedById[recipeId] ?? null;
      return {
        savedSelection: saved ?? null,
        stagedSelection: staged, // 임시 값
        isSelected: !!saved, // 저장 여부 → 선택 여부
        canOpenDetailModal: canOpenDetailModal(recipeId), // 신규 추가 가능 여부(이미 선택이면 true)
      };
    },
    [savedByIdMap, stagedById, canOpenDetailModal] // 관련 상태가 변할 때만 재생성
  );

  // 훅이 외부에 제공하는 API
  return {
    // (읽기) 파생 상태
    selectedIds, // 현재 선택된 recipeId 목록
    getSelection, // 개별 recipeId에 대한 전체 상태 조회

    // (쓰기) 액션 - 레시피 단위에서 호출
    stageSelection, // 모달에서 '적용' 시 임시 반영
    commitSelection, // 모달에서 '레시피 담기' 시 최종 저장
    removeSelection, // 카드에서 '빼기' 시 삭제

    // (쿼리) 유틸
    clearStage,
    isSelected, // 선택 여부 빠른 조회
    canOpenDetailModal, // 모달 Open 가능 여부 조회
  };
}
