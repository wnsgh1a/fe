"use client"; // 클라이언트 컴포넌트 선언

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useBoardStore } from "../store/userBoardStore";
import { useEffect, useState } from "react";

export default function Home() {
  const { columns, moveTodo } = useBoardStore();
  const [enabled, setEnabled] = useState(false);

  // Next.js SSR 환경에서 dnd 라이브러리 충돌 방지
  useEffect(() => {
    setEnabled(true);
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // 영역 밖으로 떨어진 경우

    moveTodo(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
    );
  };

  if (!enabled) return null;

  return (
    <main className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">
        test 칸반 보드
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 justify-center overflow-x-auto pb-4">
          {Object.entries(columns).map(([columnId, todos]: [string, any[]]) => (
            <div
              key={columnId}
              className="bg-slate-800/50 p-4 rounded-xl min-w-[300px] border border-slate-700"
            >
              <h2 className="font-bold mb-4 uppercase text-slate-400">
                {columnId}
              </h2>

              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="min-h-[200px]"
                  >
                    {todos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={todo.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-slate-700 p-4 rounded-lg shadow-lg mb-3 border-l-4 border-blue-500 hover:bg-slate-600 transition-all select-none"
                          >
                            {todo.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </main>
  );
}
