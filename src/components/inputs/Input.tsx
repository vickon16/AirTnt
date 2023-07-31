"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegisterReturn } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type: string;
  register: UseFormRegisterReturn<any>; 
  disabled?: boolean;
  formatPrice?: boolean;
  errors: FieldErrors<FieldValues>;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type,
  register,
  disabled,
  formatPrice,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={20}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}

      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register}
        placeholder=" "
        className={cn(
          `peer w-full p-2 pt-5 font-light bg-white border-[0.12rem] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed`,
          {
            "pl-9": formatPrice,
            "pl-4": !formatPrice,
            "border-rose-500 focus:border-rose-500": errors[id],
            "border-neutral-300 focus:border-black": !errors[id],
          }
        )}
      />

      <label
        className={cn(
          `absolute top-4 text-md duration-150 transform origin-[0] -translate-y-4 scale-75 peer-focus:scale-75 peer-focus:-translate-y-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 z-10`,
          {
            "left-9": formatPrice,
            "left-4": !formatPrice,
            "text-rose-500 ": errors[id],
            "text-zinc-400": !errors[id],
          }
        )}
      >
        {label}
      </label>
      {errors[id] ? <div className="text-rose-500 text-sm mt-1">{errors[id]?.message as string}</div> : null}
    </div>
  );
};

export default Input;
