import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const diffLineVariants = tv({
	base: "flex w-full gap-2 px-4 py-2 font-mono text-[13px]",
	variants: {
		type: {
			removed: "bg-[#1A0A0A]",
			added: "bg-[#0A1A0F]",
			context: "",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

const prefixVariants = tv({
	base: "shrink-0 select-none",
	variants: {
		type: {
			removed: "text-accent-red",
			added: "text-accent-green",
			context: "text-text-tertiary",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

const codeVariants = tv({
	base: "",
	variants: {
		type: {
			removed: "text-text-secondary",
			added: "text-text-primary",
			context: "text-text-secondary",
		},
	},
	defaultVariants: {
		type: "context",
	},
});

type DiffLineVariants = VariantProps<typeof diffLineVariants>;

type DiffLineProps = ComponentProps<"div"> &
	DiffLineVariants & {
		code: string;
	};

const prefixMap = { removed: "-", added: "+", context: " " } as const;

const DiffLine = forwardRef<HTMLDivElement, DiffLineProps>(
	({ className, type, code, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={diffLineVariants({ type, className })}
				{...props}
			>
				<span className={prefixVariants({ type })}>{prefixMap[type ?? "context"]}</span>
				<span className={codeVariants({ type })}>{code}</span>
			</div>
		);
	},
);

DiffLine.displayName = "DiffLine";

export { DiffLine, diffLineVariants, type DiffLineProps, type DiffLineVariants };
