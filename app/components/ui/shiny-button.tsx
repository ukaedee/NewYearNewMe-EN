"use client";

import React from "react";
import {
  motion,
  type AnimationProps,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "../../lib/utils";

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
      <div className="relative isolate">
        <div 
          className="absolute inset-0 bg-[#B302FF]/30 blur-xl rounded-full -z-10"
          aria-hidden="true"
        />
        <motion.button
          ref={ref}
          {...animationProps}
          {...props}
          className={cn(
            "relative rounded-full px-24 py-5 font-medium",
            "transition-all duration-300 ease-in-out",
            "hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]",
            "bg-[#B302FF]/60 backdrop-blur-2xl",
            "border border-gray-200/30",
            "shadow-lg",
            "font-noto-sans-jp font-bold",
            className,
          )}
        >
          <span
            className={cn(
              "relative block size-full text-xl uppercase tracking-wide text-white whitespace-nowrap"
            )}
            style={{
              maskImage:
                "linear-gradient(-75deg,rgba(255,255,255,1) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),rgba(255,255,255,1) calc(var(--x) + 100%))",
            }}
          >
            {children}
          </span>
        </motion.button>
      </div>
    );
  },
);

ShinyButton.displayName = "ShinyButton";

export default ShinyButton;
