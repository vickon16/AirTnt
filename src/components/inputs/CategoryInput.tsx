"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected?: boolean;
  label: string;
  icon: IconType;
}

const CategoryInput: FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  icon: Icon,
}) => {
  return (
    <div
      onClick={() => onClick(label.toLowerCase())}
      className={cn(
        "rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer",
        {
          "border-black": selected,
          "border-neutral-200": !selected,
        }
      )}
    >
      <Icon size={24} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
