import { create } from "zustand";

interface Todo {
  id: string;
  content: string;
}

interface BoardState {
  columns: { [key: string]: Todo[] };
  moveTodo: (
    sourceCol: string,
    destCol: string,
    sourceIdx: number,
    destIdx: number,
  ) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: {
    todo: [
      { id: "1", content: "Next.js 공부하기" },
      { id: "2", content: "테일윈드 마스터" },
    ],
    inProgress: [{ id: "3", content: "드래그 앤 드롭 구현" }],
    done: [],
  },
  moveTodo: (sourceCol, destCol, sourceIdx, destIdx) => {
    set((state) => {
      const newColumns = { ...state.columns };
      // 1. 출발지 컬럼에서 아이템 제거
      const [movedItem] = newColumns[sourceCol].splice(sourceIdx, 1);
      // 2. 목적지 컬럼의 정해진 위치에 아이템 삽입
      newColumns[destCol].splice(destIdx, 0, movedItem);

      return { columns: newColumns };
    });
  },
}));
