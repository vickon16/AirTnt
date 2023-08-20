"use client";

import { CategoryType } from "@/data/categories";
import { cn, generateSearchURL } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback } from "react";

interface CategoryBoxProps {
  item: CategoryType;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({ item, selected }) => {
  const router = useRouter();
  const params = useSearchParams();
  const { icon: Icon, label } = item;

  const handleClick = useCallback(() => {
    if (!params) return;
    const url = generateSearchURL(params, { category: label.toLowerCase() });

    router.push(url);
  }, [params, label, router]);

  return (
    <div
      className={cn(
        "category flex flex-col items-center justify-center gap-1.5 w-fit py-3 mr-8 shrink-0 border-b-2 hover:text-neutral-800 hover:border-b-neutral-300 transition cursor-pointer",
        {
          "border-b-neutral-800 text-neutral-800": selected,
          "border-transparent text-neutral-500": !selected,
        }
      )}
      onClick={handleClick}
    >
      <Icon size={24} />
      <div className="font-semibold text-sm whitespace-nowrap">{label}</div>
    </div>
  );
};

export default CategoryBox;
