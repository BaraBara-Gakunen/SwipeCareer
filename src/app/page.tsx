"use client";
import { mockMatchedCompany } from "./api/mockObject";

export default function Home() {

  const content = mockMatchedCompany;
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button
        onClick={async () => {
          const res = await fetch("/api", { method: "POST", body: JSON.stringify({ content }) });
          const data = await res.json();
          const message: string = data.text;
          console.log(message);
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      />{" "}
    </div>
  );
}
