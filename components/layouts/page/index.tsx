import React, { ReactNode } from "react";

import PageHeader from "./page-header";

const Page = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col bg-zinc-700 shadow-lg shadow-zinc-700/5">
      {children}
    </div>
  );
};

export { Page, PageHeader };
