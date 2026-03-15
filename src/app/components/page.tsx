import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { CodeBlock } from "@/components/ui/code-block";
import { Navbar } from "@/components/ui/navbar";
import { DiffLine } from "@/components/ui/diff-line";
import { AnalysisCard } from "@/components/ui/analysis-card";
import { ScoreRing } from "@/components/ui/score-ring";
import { LeaderboardRow } from "@/components/ui/leaderboard-row";

const variants = ["primary", "secondary", "ghost", "destructive", "link"] as const;
const sizes = ["sm", "md", "lg"] as const;
const badgeStatuses = ["critical", "warning", "good"] as const;

function SectionTitle({ children }: { children: string }) {
	return (
		<div className="flex items-center gap-2">
			<span className="font-mono text-sm font-bold text-accent-green">
				//
			</span>
			<span className="font-mono text-sm font-bold text-text-primary">
				{children}
			</span>
		</div>
	);
}

const sampleCode = `function roast(repo: string): string {
  const score = analyze(repo);
  if (score < 3) return "This code needs therapy.";
  return "Not bad, but I've seen better.";
}`;

export default async function ComponentsPage() {
	return (
		<div className="flex flex-col gap-16 px-20 py-16">
				<div className="flex items-center gap-2">
					<span className="font-mono text-2xl font-bold text-accent-green">
						//
					</span>
					<h1 className="font-mono text-2xl font-bold text-text-primary">
						component_library
					</h1>
				</div>

				<section className="flex flex-col gap-6">
					<SectionTitle>buttons</SectionTitle>

					<div className="flex flex-col gap-8">
						<div className="flex flex-col gap-3">
							<span className="text-xs text-text-tertiary">variants</span>
							<div className="flex flex-wrap items-center gap-4">
								{variants.map((variant) => (
									<Button key={variant} variant={variant}>
										$ {variant}
									</Button>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<span className="text-xs text-text-tertiary">sizes</span>
							<div className="flex flex-wrap items-center gap-4">
								{sizes.map((size) => (
									<Button key={size} size={size}>
										$ {size}
									</Button>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<span className="text-xs text-text-tertiary">
								all_combinations
							</span>
							<div className="flex flex-col gap-4">
								{variants.map((variant) => (
									<div
										key={variant}
										className="flex flex-wrap items-center gap-4"
									>
										<span className="w-28 text-xs text-text-tertiary">
											{variant}
										</span>
										{sizes.map((size) => (
											<Button
												key={`${variant}-${size}`}
												variant={variant}
												size={size}
											>
												$ {variant}_{size}
											</Button>
										))}
									</div>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-3">
							<span className="text-xs text-text-tertiary">disabled</span>
							<div className="flex flex-wrap items-center gap-4">
								{variants.map((variant) => (
									<Button key={variant} variant={variant} disabled>
										$ {variant}
									</Button>
								))}
							</div>
						</div>
					</div>
				</section>

				<section className="flex flex-col gap-6">
					<SectionTitle>badges</SectionTitle>

					<div className="flex flex-col gap-3">
						<span className="text-xs text-text-tertiary">statuses</span>
						<div className="flex flex-wrap items-center gap-4">
							{badgeStatuses.map((status) => (
								<Badge key={status} status={status}>
									{status}
								</Badge>
							))}
						</div>
					</div>
				</section>

				<section className="flex flex-col gap-6">
					<SectionTitle>toggle</SectionTitle>

					<div className="flex flex-col gap-3">
						<span className="text-xs text-text-tertiary">states</span>
						<div className="flex flex-wrap items-center gap-6">
							<div className="flex items-center gap-2">
								<Toggle defaultChecked />
								<span className="text-xs text-text-secondary">on</span>
							</div>
							<div className="flex items-center gap-2">
								<Toggle />
								<span className="text-xs text-text-secondary">off</span>
							</div>
							<div className="flex items-center gap-2">
								<Toggle disabled />
								<span className="text-xs text-text-secondary">disabled</span>
							</div>
						</div>
					</div>
				</section>

				<section className="flex flex-col gap-6">
					<SectionTitle>code_block</SectionTitle>

					<div className="flex flex-col gap-3">
						<span className="text-xs text-text-tertiary">typescript</span>
						<CodeBlock lang="ts" fileName="calculate.ts">
							{sampleCode}
						</CodeBlock>
					</div>
				</section>

				<section className="flex flex-col gap-6">
					<SectionTitle>diff_line</SectionTitle>

					<div className="flex flex-col gap-3">
						<span className="text-xs text-text-tertiary">types</span>
						<div className="w-[560px] overflow-hidden rounded border border-border-primary">
							<DiffLine type="removed" code="var total = 0;" />
							<DiffLine type="added" code="const total = 0;" />
							<DiffLine
								type="context"
								code="for (let i = 0; i < items.length; i++) {"
							/>
						</div>
					</div>
				</section>

				<section className="flex flex-col gap-6">
					<SectionTitle>analysis_card</SectionTitle>

					<div className="flex flex-col gap-3">
						<span className="text-xs text-text-tertiary">critical</span>
						<AnalysisCard
							status="critical"
							title="using var instead of const/let"
							description="the var keyword is function-scoped rather than block-scoped, which can lead to unexpected behavior and bugs. modern javascript uses const for immutable bindings and let for mutable ones."
						/>
					</div>
				</section>

				<section className="flex flex-col gap-6">
					<SectionTitle>score_ring</SectionTitle>

					<div className="flex flex-col gap-3">
						<span className="text-xs text-text-tertiary">example</span>
						<ScoreRing score={3.5} />
					</div>
				</section>

				<section className="flex flex-col gap-6">
					<SectionTitle>leaderboard_row</SectionTitle>

					<div className="flex flex-col gap-3">
						<span className="text-xs text-text-tertiary">example</span>
						<div className="overflow-hidden rounded border border-border-primary">
							<LeaderboardRow
								rank={1}
								score={2.1}
								codePreview="function calculateTotal(items) { var total = 0; ..."
								language="javascript"
							/>
							<LeaderboardRow
								rank={2}
								score={4.7}
								codePreview="async function fetchData() { const res = await fetch(url); ..."
								language="typescript"
							/>
							<LeaderboardRow
								rank={3}
								score={6.3}
								codePreview="def process_data(items): return [x for x in items if x > 0]"
								language="python"
							/>
						</div>
					</div>
				</section>

				<section className="flex flex-col gap-6">
					<SectionTitle>navbar</SectionTitle>

					<div className="flex flex-col gap-3">
						<span className="text-xs text-text-tertiary">with children</span>
						<div className="overflow-hidden rounded border border-border-primary">
							<Navbar>
								<div className="flex items-center gap-4">
									<span className="cursor-pointer text-sm text-text-secondary hover:text-text-primary">
										home
									</span>
									<span className="cursor-pointer text-sm text-text-secondary hover:text-text-primary">
										roast
									</span>
								</div>
							</Navbar>
						</div>
					</div>
				</section>
		</div>
	);
}
