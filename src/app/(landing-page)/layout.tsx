import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import React, { ReactNode } from "react";

const LandingPageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full overflow-x-hidden bg-[#404eed] w-full">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LandingPageLayout;
