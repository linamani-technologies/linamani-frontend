"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("result_json");
    if (stored) {
      setResult(stored);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  return (
    <div className="p-6">
      <h2>Form Submission Result</h2>
      <pre className="mt-6 whitespace-pre-wrap rounded bg-gray-100 p-4 text-sm">
        {result}
      </pre>
    </div>
  );
}
