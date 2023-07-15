import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <>
      <div
        className="
        max-w-[2520px]
        mx-auto
        xl:px-10
        md:px-50
        sm:px-2
        px-4"
      >
        {children}
      </div>
    </>
  );
};

export default Container;
