"use client";

import React from "react";

import {cn} from "./cn";

export type SupportCardProps = React.HTMLAttributes<HTMLDivElement>;

const SupportCard = React.forwardRef<HTMLDivElement, SupportCardProps>(
  ({className, ...props}, ref) => (
    <div
      {...props}
      ref={ref}
      className={cn(
        "align-center my-2 flex shrink-0 items-center justify-center gap-3 self-stretch rounded-large bg-content1 px-3 py-3 shadow-small",
        className,
      )}
    >

      <div className="line-clamp-2 text-left text-tiny font-medium text-default-700">
        Developed by Brandon Haynes
      </div>

    </div>
  ),
);

SupportCard.displayName = "SupportCard";

export default SupportCard;
