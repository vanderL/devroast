"use client";

import { type ComponentProps, forwardRef } from "react";
import { Switch } from "@base-ui/react/switch";
import { tv, type VariantProps } from "tailwind-variants";

const toggleVariants = tv({
	base: "inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full p-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page disabled:pointer-events-none disabled:opacity-50 data-[checked]:bg-accent-green data-[unchecked]:bg-[#2A2A2A]",
});

const thumbVariants = tv({
	base: "pointer-events-none block size-4 rounded-full transition-transform data-[checked]:translate-x-[18px] data-[checked]:bg-[#0A0A0A] data-[unchecked]:translate-x-0 data-[unchecked]:bg-[#6B7280]",
});

type ToggleVariants = VariantProps<typeof toggleVariants>;

type ToggleProps = Omit<
	ComponentProps<typeof Switch.Root>,
	"render" | "className"
> &
	ToggleVariants & {
		className?: string;
	};

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
	({ className, ...props }, ref) => {
		return (
			<Switch.Root
				ref={ref}
				className={toggleVariants({ className })}
				{...props}
			>
				<Switch.Thumb className={thumbVariants()} />
			</Switch.Root>
		);
	},
);

Toggle.displayName = "Toggle";

export { Toggle, toggleVariants, type ToggleProps, type ToggleVariants };
