import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const analysisCardVariants = tv({
	base: "flex w-[480px] flex-col gap-3 rounded border border-border-primary p-5",
});

type AnalysisCardVariants = VariantProps<typeof analysisCardVariants>;

type AnalysisCardProps = ComponentProps<"div"> & AnalysisCardVariants;

const AnalysisCard = forwardRef<HTMLDivElement, AnalysisCardProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={analysisCardVariants({ className })}
				{...props}
			>
				{children}
			</div>
		);
	},
);

AnalysisCard.displayName = "AnalysisCard";

const analysisCardTitleVariants = tv({
	base: "font-mono text-[13px] text-text-primary",
});

type AnalysisCardTitleProps = ComponentProps<"span"> &
	VariantProps<typeof analysisCardTitleVariants>;

const AnalysisCardTitle = forwardRef<HTMLSpanElement, AnalysisCardTitleProps>(
	({ className, children, ...props }, ref) => (
		<span
			ref={ref}
			className={analysisCardTitleVariants({ className })}
			{...props}
		>
			{children}
		</span>
	),
);

AnalysisCardTitle.displayName = "AnalysisCardTitle";

const analysisCardDescriptionVariants = tv({
	base: "font-mono text-xs leading-6 text-text-secondary",
});

type AnalysisCardDescriptionProps = ComponentProps<"p"> &
	VariantProps<typeof analysisCardDescriptionVariants>;

const AnalysisCardDescription = forwardRef<
	HTMLParagraphElement,
	AnalysisCardDescriptionProps
>(({ className, children, ...props }, ref) => (
	<p
		ref={ref}
		className={analysisCardDescriptionVariants({ className })}
		{...props}
	>
		{children}
	</p>
));

AnalysisCardDescription.displayName = "AnalysisCardDescription";

export {
	AnalysisCard,
	analysisCardVariants,
	type AnalysisCardProps,
	type AnalysisCardVariants,
	AnalysisCardTitle,
	analysisCardTitleVariants,
	type AnalysisCardTitleProps,
	AnalysisCardDescription,
	analysisCardDescriptionVariants,
	type AnalysisCardDescriptionProps,
};
