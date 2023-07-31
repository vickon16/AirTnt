import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { CgSpinner } from "react-icons/cg";
import { ButtonHTMLAttributes, FC } from "react";
import { IconType } from "react-icons";

export const buttonVariants = cva(
  "relative active:scale-95 w-full inline-flex items-center justify-center rounded-md font-semibold transition cursor-pointer focus:outline-none hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-rose-500 !text-white",
        outline : "bg-transparent text-black border border-black",
        ghost: "bg-slate-200/60 hover:bg-slate-100",
      },
      size: {
        default: "h-10 px-3 text-base",
        small: "h-9 px-2 text-sm",
        large: "h-11 px-5 text-lg",
      },
      buttonWidth : {
        default : "w-full",
        fit : "w-fit",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      buttonWidth: "default",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: IconType;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  icon : Icon,
  size,
  buttonWidth,
  ...props
}) => {
  return (
    <button
      className={cn("flex items-center gap-x-1", buttonVariants({ variant, size, buttonWidth, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <CgSpinner className="mr-2 h-4 w-4 animate-spin" /> : null}
      {Icon && <Icon size={20}/>}
      {children}
    </button>
  );
};

export default Button;
