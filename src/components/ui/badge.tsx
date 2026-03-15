import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const badgeVariants = tv({
	base: "inline-flex items-center gap-2 font-mono text-xs",
	variants: {
		status: {
			critical: "text-accent-red",
			warning: "text-accent-amber",
			good: "text-accent-green",
		},
	},
	defaultVariants: {
		status: "good",
	},
});

const dotVariants = tv({
	base: "size-2 shrink-0 rounded-full",
	variants: {
		status: {
			critical: "bg-accent-red",
			warning: "bg-accent-amber",
			good: "bg-accent-green",
		},
	},
	defaultVariants: {
		status: "good",
	},
});

type BadgeVariants = VariantProps<typeof badgeVariants>;

type BadgeProps = ComponentProps<"span"> & BadgeVariants;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	({ className, status, children, ...props }, ref) => {
		return (
			<span
				ref={ref}
				className={badgeVariants({ status, className })}
				{...props}
			>
				<span className={dotVariants({ status })} />
				{children}
			</span>
		);
	},
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeProps, type BadgeVariants };
