"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 스프링 부트 로그인 API 연동 예정 (axios.post('/api/auth/login', ...))
    console.log("로그인 시도:", { email, password });
    alert("백엔드 연결 후 실제 로그인이 가능합니다.");
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-8">
          로그인
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              이메일 주소
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="example@test.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-95"
          >
            로그인하기
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:underline font-semibold"
          >
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
