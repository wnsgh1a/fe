export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-8">🚀 모각코 협업 플래너 (test)</h1>

      {/* 보드 영역 */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {/* 임시 컬럼 UI */}
        {["To Do", "In Progress", "Done"].map((title) => (
          <div
            key={title}
            className="bg-slate-800/50 p-4 rounded-xl min-w-[300px] border border-slate-700"
          >
            <h2 className="font-semibold mb-4 flex justify-between">
              {title}
              <span className="bg-slate-700 px-2 py-0.5 rounded text-xs text-slate-300">
                2
              </span>
            </h2>

            {/* 임시 카드 UI */}
            <div className="space-y-3">
              <div className="bg-slate-700 p-4 rounded-lg shadow-md border-l-4 border-blue-500 hover:bg-slate-600 transition-colors cursor-grab">
                화면 레이아웃 잡기
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
