// Use client-side rendering indication for Next.js if that's the case
"use client";

import React from "react";
import { Avatar, Link } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import { cn } from "./cn"; // Ensure 'cn' utility function is correctly defined and exported

export type EbayCardType = {
  title?: string;
  price?: number;
  condition?: string;
  url?: string;
  image?: string;
  location?: string;
};

export type EbayCardProps = React.HTMLAttributes<HTMLDivElement> & EbayCardType;

const EbayCard = React.forwardRef<HTMLDivElement, EbayCardProps>(
  ({ title, price, condition, url, image, location, className, ...props }, ref) => (
    <div ref={ref} onClick={() => {window.open(url, "_blank");}} className={cn("flex flex-col items-center bg-opacity-80 cursor-pointer hover:bg-opacity-100 transition-all rounded-large bg-default-400/15 px-4 py-6 text-center shadow-small", className)} {...props}>
      <Avatar className="h-[100px] w-[100px]" src={image} radius="sm" />
      <h3 className="mt-2 font-medium">
        {price?.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
      </h3>
      <span className="text-small text-default-500">
        {condition} - {location?.split(',')[0]}
      </span>
      <p className="mb-4 mt-2 text-default-600">{title}</p>
      <div className="flex gap-4">
        <Link isExternal href={url}>
          <Icon className="text-default-400" icon="jam:ebay" width={40} />
        </Link>
      </div>
    </div>
  )
);

EbayCard.displayName = "EbayCard";

export default EbayCard;
