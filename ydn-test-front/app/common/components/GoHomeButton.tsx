import React from "react";
import { useRouter } from "next/navigation";

const GoHomeButton = () => {
  const router = useRouter();
  return (
    <div className="buttons">
      <button onClick={() => router.push("/")} className="secondary">
        Inicio
      </button>
    </div>
  );
};

export default GoHomeButton;
