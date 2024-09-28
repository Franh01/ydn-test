"use client";

import React from "react";
import RouteBackButton from "./RouteBackButton";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page">
      <main>
        <RouteBackButton />
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
