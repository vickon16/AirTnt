"use client";

import React, { FC } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-clampBase font-bold">{title}</div>
      {subtitle ? <div className="font-light text-neutral-500 mt-1">{subtitle}</div> : null}
    </div>
  );
};

export default Heading;
