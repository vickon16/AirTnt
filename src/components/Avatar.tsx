"use client";

import React, { FC } from "react";
import Image from "next/image";
import AvatarImg from "@/images/placeholder.jpg";

interface AvatarProps {
  sessionImg : string | null | undefined;
}

const Avatar : FC<AvatarProps> = ({sessionImg}) => {
  return (
    <div className="relative h-[30px] w-[30px]">
      <Image
        src={sessionImg || AvatarImg}
        alt="Avatar"
        fill
        referrerPolicy="no-referrer"
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;
