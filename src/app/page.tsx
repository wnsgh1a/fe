"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useBoardStore } from "../store/userBoardStore";
import { useEffect, useState } from "react";

export default function Home() {
  const { columns, moveTodo, addTodo, deleteTodo } = useBoardStore();
  const [enabled, setEnabled] = useState(false);
  const [newItem, setNewItem] = useState("");

  // Hydration 오류 방지 (Client-side rendering 확인)
  useEffect(() => {
    setEnabled(true);
  }, []);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    addTodo(newItem);
    setNewItem("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    moveTodo(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
    );
  };

  if (!enabled) return null;

  return (
    <main className="min-h-screen bg-slate-900 p-8 text-white font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-10 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          TEST KANBAN BOARD
        </h1>

        {/* 할 일 추가 입력창 */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="새로운 할 일을 입력하세요..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-200 transition-all"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
            >
              추가
            </button>
          </form>
        </div>

        {/* 칸반 보드 영역 */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(columns).map(
              ([columnId, todos]: [string, any[]]) => (
                <div key={columnId} className="flex flex-col">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                      {columnId === "todo"
                        ? "📝 To Do"
                        : columnId === "inProgress"
                          ? "🔥 In Progress"
                          : "✅ Done"}
                    </h2>
                    <span className="bg-slate-800 text-slate-400 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-700">
                      {todos.length}
                    </span>
                  </div>

                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`flex-1 min-h-[500px] rounded-2xl p-4 transition-colors ${
                          snapshot.isDraggingOver
                            ? "bg-slate-800/80"
                            : "bg-slate-800/30"
                        } border-2 border-dashed border-slate-700/50`}
                      >
                        {todos.map((todo: any, index: number) => (
                          <Draggable
                            key={todo.id}
                            draggableId={todo.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{ ...provided.draggableProps.style }}
                                className={`group bg-slate-700 p-4 rounded-xl shadow-xl mb-4 border border-slate-600 hover:border-blue-500/50 transition-all select-none ${
                                  snapshot.isDragging
                                    ? "ring-2 ring-blue-500 scale-105 shadow-2xl"
                                    : ""
                                }`}
                              >
                                <div className="flex justify-between items-start">
                                  <p className="text-slate-100 leading-relaxed">
                                    {todo.content}
                                  </p>
                                  <button
                                    onClick={() =>
                                      deleteTodo(columnId, todo.id)
                                    }
                                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 transition-opacity p-1"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ),
            )}
          </div>
        </DragDropContext>
      </div>
    </main>
  );
}
