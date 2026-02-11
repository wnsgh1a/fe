"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios"; // axios 임포트
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 스프링 부트 백엔드 API 호출 (포트 8080 확인)
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          name,
          email,
          password,
        },
      );

      if (response.status === 200) {
        alert("회원가입에 성공했습니다! 로그인 페이지로 이동합니다.");
        router.push("/login"); // 성공 시 로그인 페이지로 이동
      }
    } catch (error: any) {
      console.error("회원가입 에러:", error);
      alert(error.response?.data || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
        <h1 className="text-3xl font-bold text-center text-purple-400 mb-8">
          회원가입
        </h1>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              이메일 주소
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="example@test.com"
              required
            />
          </div>
          {/* ... 이하 name, password 필드 및 버튼 디자인은 이전과 동일하게 유지 ... */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              이름
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="홍길동"
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
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-900/20 transition-all active:scale-95"
          >
            가입하기
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="text-purple-400 hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </main>
  );
}
