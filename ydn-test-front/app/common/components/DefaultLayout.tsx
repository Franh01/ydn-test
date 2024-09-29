"use client";

import GoHomeButton from "./GoHomeButton";
import React from "react";
import RouteBackButton from "./RouteBackButton";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page">
      <main>
        <div className="navigation-buttons">
          <RouteBackButton />
          <GoHomeButton />
        </div>
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
