import React from "react";


export const Container = ({ children, className }: any) => {
  return (
    <div className={`mx-auto max-w-screen-xl xs:max-w-[350px] sm:px-3 sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1280px] xl:max-w-[1280px] ${className}`}>
      {children}
    </div>
  );
};
