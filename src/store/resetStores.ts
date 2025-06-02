import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { usePersistReviewStore } from "@/store/usePersistReviewStore";

export function resetStores() {
  usePersistMypageStore.getState().reset();
  usePersistReviewStore.getState().reset();
}
