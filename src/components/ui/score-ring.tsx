import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const scoreRingVariants = tv({
	base: "relative size-[180px]",
});

type ScoreRingVariants = VariantProps<typeof scoreRingVariants>;

type ScoreRingProps = Omit<ComponentProps<"div">, "children"> &
	ScoreRingVariants & {
		score: number;
		max?: number;
	};

const RADIUS = 86;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScoreRing = forwardRef<HTMLDivElement, ScoreRingProps>(
	({ className, score, max = 10, ...props }, ref) => {
		const fraction = Math.min(score / max, 1);
		const dashLength = CIRCUMFERENCE * fraction;

		return (
			<div
				ref={ref}
				className={scoreRingVariants({ className })}
				{...props}
			>
				<svg
					viewBox="0 0 180 180"
					className="absolute inset-0 size-full -rotate-90"
				>
					<defs>
						<linearGradient id="score-gradient" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stopColor="var(--color-accent-green)" />
							<stop offset="100%" stopColor="var(--color-accent-amber)" />
						</linearGradient>
					</defs>
					<circle
						cx="90"
						cy="90"
						r={RADIUS}
						fill="none"
						stroke="var(--color-border-primary)"
						strokeWidth="4"
					/>
					<circle
						cx="90"
						cy="90"
						r={RADIUS}
						fill="none"
						stroke="url(#score-gradient)"
						strokeWidth="4"
						strokeDasharray={`${dashLength} ${CIRCUMFERENCE}`}
						strokeLinecap="round"
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="font-mono text-5xl font-bold leading-none text-text-primary">
						{score}
					</span>
					<span className="font-mono text-base text-text-tertiary">
						/{max}
					</span>
				</div>
			</div>
		);
	},
);

ScoreRing.displayName = "ScoreRing";

export {
	ScoreRing,
	scoreRingVariants,
	type ScoreRingProps,
	type ScoreRingVariants,
};
