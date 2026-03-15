import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const leaderboardRowVariants = tv({
	base: "flex w-full items-center gap-6 border-b border-border-primary px-5 py-4",
});

type LeaderboardRowVariants = VariantProps<typeof leaderboardRowVariants>;

type LeaderboardRowProps = ComponentProps<"div"> &
	LeaderboardRowVariants & {
		rank: number;
		score: number;
		codePreview: string;
		language: string;
	};

const LeaderboardRow = forwardRef<HTMLDivElement, LeaderboardRowProps>(
	({ className, rank, score, codePreview, language, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={leaderboardRowVariants({ className })}
				{...props}
			>
				<span className="w-10 shrink-0 font-mono text-[13px] text-text-tertiary">
					#{rank}
				</span>
				<span className="w-15 shrink-0 font-mono text-[13px] font-bold text-accent-red">
					{score.toFixed(1)}
				</span>
				<span className="min-w-0 flex-1 truncate font-mono text-xs text-text-secondary">
					{codePreview}
				</span>
				<span className="w-25 shrink-0 text-right font-mono text-xs text-text-tertiary">
					{language}
				</span>
			</div>
		);
	},
);

LeaderboardRow.displayName = "LeaderboardRow";

export {
	LeaderboardRow,
	leaderboardRowVariants,
	type LeaderboardRowProps,
	type LeaderboardRowVariants,
};
