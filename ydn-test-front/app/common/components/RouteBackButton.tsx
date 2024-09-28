import React from "react";
import { useRouter } from "next/navigation";

const RouteBackButton = () => {
  const router = useRouter();
  return (
    <div className="buttons">
      <button onClick={() => router.back()} className="primary">
        Volver
      </button>
    </div>
  );
};

export default RouteBackButton;
