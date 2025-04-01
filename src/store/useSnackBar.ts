'use client';

import { create } from 'zustand';

interface SnackBarItem {
  id: string;
  title: string;
  caption?: string;
  duration?: number;
  position?: 'bottom' | 'above-button';
  /** 우측 버튼에 표시될 텍스트 (예: "이동", "실행취소") */
  actionLabel?: string;
  /** 사용자가 우측 버튼을 눌렀을 때 실행될 콜백 */
  onActionClick?: () => void;
  /**
   * SnackBar가 자동으로 사라진 후 실행할 콜백.
   * 예: 실행취소 패턴일 경우, 여기서 실제 서버 호출 등을 처리
   */
  onAutoHide?: () => void;
}

interface SnackBarStore {
  queue: SnackBarItem[];
  currentSnackBar: SnackBarItem | null;
  addSnackBar: (item: Omit<SnackBarItem, 'id'>) => void;
  removeSnackBar: () => void;
  processNextSnackBar: () => void;
}


export const useSnackBarStore = create<SnackBarStore>()((set, get) => ({
  queue: [],
  currentSnackBar: null,

  addSnackBar: (item) => {
    const id = Date.now().toString();
    const newItem = { id, ...item };

    set((state) => ({
      queue: [...state.queue, newItem],
    }));

    // 현재 스낵바가 없다면 다음 스낵바 표시
    if (!get().currentSnackBar) {
      get().processNextSnackBar();
    }
  },


  removeSnackBar: () => {
    set(() => ({
      currentSnackBar: null,
    }));
    setTimeout(() => {
      get().processNextSnackBar();
    }, 400);
  },

  /**
   * 큐에서 다음 스낵바를 꺼내 현재 스낵바로 설정
   * - duration이 지나면 onAutoHide 실행 후 스낵바 제거
   */
  processNextSnackBar: () => {
    const { queue, currentSnackBar, removeSnackBar } = get();
    if (queue.length === 0 || currentSnackBar) return;

    const nextSnackBar = queue[0];
    set(() => ({
      currentSnackBar: nextSnackBar,
      queue: queue.slice(1),
    }));

    const duration = nextSnackBar.duration ?? 4000;
    // duration이 지나면 onAutoHide() 호출 후 스낵바 제거
    setTimeout(() => {
      // 아직 currentSnackBar가 동일하다면 => 사용자 취소 없이 그대로 유지된 상황
      if (get().currentSnackBar?.id === nextSnackBar.id) {
        nextSnackBar.onAutoHide?.();
        removeSnackBar();
      }
    }, duration);
  },
}));
