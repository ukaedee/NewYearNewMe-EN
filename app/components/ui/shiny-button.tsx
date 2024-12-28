"use client";

import React from "react";
import {
  motion,
  type AnimationProps,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/app/lib/utils";

const animationProps = {
  initial: { "--x": "-100%", scale: 0.8 },
  animate: { 
    "--x": ["200%", "-100%"],
    scale: 1
  },
  whileHover: { 
    scale: 1.1,
  },
  whileTap: { scale: 0.95 },
  transition: {
    stiffness: 200,
    damping: 20,
    mass: 1.5,
    "--x": {
      duration: 1.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
      times: [0, 1],
      repeatType: "loop"
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
          "relative rounded-full px-16 py-5 font-medium",
          "transition-all duration-300 ease-in-out",
          "hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]",
          "bg-black/40 backdrop-blur-2xl backdrop-saturate-150",
          "border-2 border-white/70",
          "font-['fot-tsukuaoldmin-pr6n']",
          className,
        )}
      >
        <span
          className="relative block size-full text-3xl uppercase tracking-wide text-white"
          style={{
            maskImage:
              "linear-gradient(-75deg,rgba(255,255,255,1) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),rgba(255,255,255,1) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
      </motion.button>
    );
  },
);

ShinyButton.displayName = "ShinyButton";

export default ShinyButton;
