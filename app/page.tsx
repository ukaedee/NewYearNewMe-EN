import React, { JSX } from "react";

export default function Home(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold">Welcome to My Omikuji App!</h1>
    </div>
  );
}