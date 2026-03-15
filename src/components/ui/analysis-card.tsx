import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { Badge, type BadgeVariants } from "./badge";

const analysisCardVariants = tv({
	base: "flex w-[480px] flex-col gap-3 rounded border border-border-primary p-5",
});

type AnalysisCardVariants = VariantProps<typeof analysisCardVariants>;

type AnalysisCardProps = ComponentProps<"div"> &
	AnalysisCardVariants & {
		status: NonNullable<BadgeVariants["status"]>;
		title: string;
		description: string;
	};

const AnalysisCard = forwardRef<HTMLDivElement, AnalysisCardProps>(
	({ className, status, title, description, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={analysisCardVariants({ className })}
				{...props}
			>
				<Badge status={status}>{status}</Badge>
				<span className="font-mono text-[13px] text-text-primary">
					{title}
				</span>
				<p className="font-mono text-xs leading-6 text-text-secondary">
					{description}
				</p>
			</div>
		);
	},
);

AnalysisCard.displayName = "AnalysisCard";

export {
	AnalysisCard,
	analysisCardVariants,
	type AnalysisCardProps,
	type AnalysisCardVariants,
};
