import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  addTodo: (content: string) => void;
  deleteTodo: (columnId: string, todoId: string) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
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
          const sourceList = [...newColumns[sourceCol]];
          const destList =
            sourceCol === destCol ? sourceList : [...newColumns[destCol]];

          const [movedItem] = sourceList.splice(sourceIdx, 1);
          destList.splice(destIdx, 0, movedItem);

          newColumns[sourceCol] = sourceList;
          newColumns[destCol] = destList;

          return { columns: newColumns };
        });
      },
      addTodo: (content) => {
        set((state) => ({
          columns: {
            ...state.columns,
            todo: [
              ...state.columns.todo,
              { id: Date.now().toString(), content },
            ],
          },
        }));
      },
      deleteTodo: (columnId, todoId) => {
        set((state) => ({
          columns: {
            ...state.columns,
            [columnId]: state.columns[columnId].filter(
              (todo) => todo.id !== todoId,
            ),
          },
        }));
      },
    }),
    {
      name: "test-board-storage", // 로컬 스토리지에 저장될 키 이름
    },
  ),
);
