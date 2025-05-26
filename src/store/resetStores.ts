import { usePersistHealthNoteStore } from "@/store/usePersistHealthNoteStore";
import { usePersistMypageStore } from "@/store/usePersistMypageStore";
import { usePersistReviewStore } from "@/store/usePersistReviewStore";

export function resetStores() {
	usePersistHealthNoteStore.getState().reset();
	usePersistMypageStore.getState().reset();
	usePersistReviewStore.getState().reset();
}