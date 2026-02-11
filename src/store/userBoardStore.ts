import { create } from "zustand";

// 데이터 타입 정의
interface Todo {
  id: string;
  content: string;
}

interface BoardState {
  columns: {
    todo: Todo[];
    inProgress: Todo[];
    done: Todo[];
  };
  // 카드를 옮길 때 사용할 함수
  moveTodo: (
    todoId: string,
    source: string,
    destination: string,
    index: number,
  ) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  columns: {
    todo: [
      { id: "1", content: "Next.js 공부하기" },
      { id: "2", content: "테일윈드 마스터" },
    ],
    inProgress: [],
    done: [],
  },
  moveTodo: (todoId, source, destination, index) => {
    // 여기에 드래그 앤 드롭 로직이 들어갈 예정입니다.
  },
}));
