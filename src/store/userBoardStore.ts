import { create } from "zustand";

// 개별 할 일 아이템의 타입 정의
interface Todo {
  id: string;
  content: string;
}

// 스토어 상태 및 함수들의 타입 정의
interface BoardState {
  columns: { [key: string]: Todo[] };
  // 백엔드 연결을 위한 데이터 초기화 함수
  setColumns: (columns: { [key: string]: Todo[] }) => void;
  // 카드 이동 (백엔드 PUT API와 연동 예정)
  moveTodo: (
    sourceCol: string,
    destCol: string,
    sourceIdx: number,
    destIdx: number,
  ) => void;
  // 카드 추가 (백엔드 POST API와 연동 예정)
  addTodo: (content: string) => void;
  // 카드 삭제 (백엔드 DELETE API와 연동 예정)
  deleteTodo: (columnId: string, todoId: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  // 초기 상태: 실제 구현 시에는 백엔드에서 비어있는 데이터를 가져오거나 로딩 상태를 가집니다.
  columns: {
    todo: [
      { id: "1", content: "스프링 부트 백엔드 구축하기" },
      { id: "2", content: "JWT 로그인 로직 설계" },
    ],
    inProgress: [{ id: "3", content: "Next.js API 연동 준비" }],
    done: [],
  },

  // 서버에서 받은 데이터를 스토어에 저장할 때 사용
  setColumns: (columns) => set({ columns }),

  // 1. 카드 이동 로직
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

      // TODO: 여기서 백엔드에 카드 위치 변경 API 호출 (예: axios.put('/api/todos/move', ...))
      return { columns: newColumns };
    });
  },

  // 2. 카드 추가 로직
  addTodo: (content) => {
    // 임시 ID 생성 (DB 연결 시에는 서버에서 생성된 ID를 사용하게 됩니다)
    const newTodo = { id: Date.now().toString(), content };

    set((state) => ({
      columns: {
        ...state.columns,
        todo: [...state.columns.todo, newTodo],
      },
    }));
    // TODO: 여기서 백엔드에 카드 생성 API 호출 (예: axios.post('/api/todos', newTodo))
  },

  // 3. 카드 삭제 로직
  deleteTodo: (columnId, todoId) => {
    set((state) => ({
      columns: {
        ...state.columns,
        [columnId]: state.columns[columnId].filter(
          (todo) => todo.id !== todoId,
        ),
      },
    }));
    // TODO: 여기서 백엔드에 카드 삭제 API 호출 (예: axios.delete(`/api/todos/${todoId}`))
  },
}));
