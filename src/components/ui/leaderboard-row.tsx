import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const leaderboardRowVariants = tv({
	base: "flex w-full items-center gap-6 border-b border-border-primary px-5 py-4",
});

type LeaderboardRowVariants = VariantProps<typeof leaderboardRowVariants>;

type LeaderboardRowProps = ComponentProps<"div"> & LeaderboardRowVariants;

const LeaderboardRow = forwardRef<HTMLDivElement, LeaderboardRowProps>(
	({ className, children, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={leaderboardRowVariants({ className })}
				{...props}
			>
				{children}
			</div>
		);
	},
);

LeaderboardRow.displayName = "LeaderboardRow";

const leaderboardRowRankVariants = tv({
	base: "w-10 shrink-0 font-mono text-[13px] text-text-tertiary",
});

type LeaderboardRowRankProps = ComponentProps<"span"> &
	VariantProps<typeof leaderboardRowRankVariants>;

const LeaderboardRowRank = forwardRef<HTMLSpanElement, LeaderboardRowRankProps>(
	({ className, children, ...props }, ref) => (
		<span
			ref={ref}
			className={leaderboardRowRankVariants({ className })}
			{...props}
		>
			{children}
		</span>
	),
);

LeaderboardRowRank.displayName = "LeaderboardRowRank";

const leaderboardRowScoreVariants = tv({
	base: "w-15 shrink-0 font-mono text-[13px] font-bold text-accent-red",
});

type LeaderboardRowScoreProps = ComponentProps<"span"> &
	VariantProps<typeof leaderboardRowScoreVariants>;

const LeaderboardRowScore = forwardRef<
	HTMLSpanElement,
	LeaderboardRowScoreProps
>(({ className, children, ...props }, ref) => (
	<span
		ref={ref}
		className={leaderboardRowScoreVariants({ className })}
		{...props}
	>
		{children}
	</span>
));

LeaderboardRowScore.displayName = "LeaderboardRowScore";

const leaderboardRowCodeVariants = tv({
	base: "min-w-0 flex-1 truncate font-mono text-xs text-text-secondary",
});

type LeaderboardRowCodeProps = ComponentProps<"span"> &
	VariantProps<typeof leaderboardRowCodeVariants>;

const LeaderboardRowCode = forwardRef<HTMLSpanElement, LeaderboardRowCodeProps>(
	({ className, children, ...props }, ref) => (
		<span
			ref={ref}
			className={leaderboardRowCodeVariants({ className })}
			{...props}
		>
			{children}
		</span>
	),
);

LeaderboardRowCode.displayName = "LeaderboardRowCode";

const leaderboardRowLanguageVariants = tv({
	base: "w-25 shrink-0 text-right font-mono text-xs text-text-tertiary",
});

type LeaderboardRowLanguageProps = ComponentProps<"span"> &
	VariantProps<typeof leaderboardRowLanguageVariants>;

const LeaderboardRowLanguage = forwardRef<
	HTMLSpanElement,
	LeaderboardRowLanguageProps
>(({ className, children, ...props }, ref) => (
	<span
		ref={ref}
		className={leaderboardRowLanguageVariants({ className })}
		{...props}
	>
		{children}
	</span>
));

LeaderboardRowLanguage.displayName = "LeaderboardRowLanguage";

export {
	LeaderboardRow,
	leaderboardRowVariants,
	type LeaderboardRowProps,
	type LeaderboardRowVariants,
	LeaderboardRowRank,
	leaderboardRowRankVariants,
	type LeaderboardRowRankProps,
	LeaderboardRowScore,
	leaderboardRowScoreVariants,
	type LeaderboardRowScoreProps,
	LeaderboardRowCode,
	leaderboardRowCodeVariants,
	type LeaderboardRowCodeProps,
	LeaderboardRowLanguage,
	leaderboardRowLanguageVariants,
	type LeaderboardRowLanguageProps,
};
