"use client";

import React from "react";
import {
  motion,
  type AnimationProps,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/app/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.95 },
  transition: {
    stiffness: 200,
    damping: 20,
    mass: 1.5,
    "--x": {
      duration: 4,
      ease: "easeInOut",
      type: "tween",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.5,
    },
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        {...animationProps}
        {...props}
        className={cn(
          "relative rounded-lg px-16 py-5 font-medium",
          "transition-all duration-300 ease-in-out",
          "hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]",
          "bg-black/40 backdrop-blur-2xl backdrop-saturate-150",
          "dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)]",
          className,
        )}
      >
        <span
          className="relative block size-full text-3xl uppercase tracking-wide text-[rgba(255,255,255,0.65)] dark:font-light dark:text-[rgba(255,255,255,0.9)]"
          style={{
            maskImage:
              "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.5)_calc(var(--x)+20%),rgba(255,255,255,0.8)_calc(var(--x)+25%),rgba(255,255,255,0.5)_calc(var(--x)+100%))] p-[2px]"
        ></span>
      </motion.button>
    );
  },
);

ShinyButton.displayName = "ShinyButton";

export default ShinyButton;
