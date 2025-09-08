import { usePersistMypageStore } from "@/store/usePersistMypageStore";

export function resetStores() {
  usePersistMypageStore.getState().reset();
}
