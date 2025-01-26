import React from "react";
import * as TooltipPrimitives from "@radix-ui/react-tooltip";
import { cx } from "../../lib/utils/cx";

const Tooltip = React.forwardRef(
  ({ children, content, side = "top", sideOffset = 4, ...props }, forwardedRef) => {
    return (
      <TooltipPrimitives.Provider>
        <TooltipPrimitives.Root>
          <TooltipPrimitives.Trigger asChild>
            {children}
          </TooltipPrimitives.Trigger>
          <TooltipPrimitives.Portal>
            <TooltipPrimitives.Content
              ref={forwardedRef}
              side={side}
              sideOffset={sideOffset}
              align="center"
              className="max-w-60 select-none rounded-md px-2.5 py-1.5 text-sm leading-5 shadow-md text-gray-50 bg-gray-900 will-change-[transform,opacity]"
              {...props}
            >
              {content}
              <TooltipPrimitives.Arrow className="fill-gray-900" width={8} height={4} />
            </TooltipPrimitives.Content>
          </TooltipPrimitives.Portal>
        </TooltipPrimitives.Root>
      </TooltipPrimitives.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
