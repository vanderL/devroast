import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { CodeInput } from "@/components/ui/code-input";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex flex-col items-center gap-8 px-10 pt-20 pb-15">
			{/* Hero */}
			<div className="flex flex-col items-center gap-2">
				<h1 className="text-4xl font-bold">
					<span className="text-accent-green">$ </span>
					<span className="text-text-primary">
						paste your code. get roasted.
					</span>
				</h1>
				<p className="text-sm text-text-secondary">
					// drop your code below and we&apos;ll rate it on a scale of
					&quot;needs improvement&quot; to &quot;career change recommended&quot;
				</p>
			</div>

			{/* Code Editor */}
			<CodeInput />

			{/* Actions Bar */}
			<div className="flex w-[780px] items-center justify-between">
				<div className="flex items-center gap-3">
					<Toggle defaultChecked />
					<span className="text-[13px] text-accent-green">roast mode</span>
					<span className="text-xs text-text-tertiary">
						// maximum sarcasm enabled
					</span>
				</div>
				<Button variant="primary" size="lg">
					$ roast_my_code
				</Button>
			</div>

			{/* Footer Stats */}
			<p className="text-xs text-text-tertiary">
				2,847 codes roasted · avg score: 4.2/10
			</p>

			{/* Spacer */}
			<div className="h-[60px]" />

			{/* Leaderboard Preview */}
			<div className="flex w-[960px] flex-col gap-4">
				{/* Title row */}
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<span className="text-sm font-bold text-accent-green">//</span>
						<span className="text-sm font-bold text-text-primary">
							shame_leaderboard
						</span>
					</div>
					<Link href="/leaderboard">
						<Button variant="ghost" size="sm">
							$ view_all &gt;&gt;
						</Button>
					</Link>
				</div>
				{/* Subtitle */}
				<p className="text-[13px] text-text-tertiary">
					// the worst code on the internet, ranked by shame
				</p>
				{/* Table */}
				<div className="overflow-hidden rounded border border-border-primary">
					{/* Header */}
					<div className="flex h-10 items-center border-b border-border-primary bg-bg-surface text-xs font-medium text-text-tertiary">
						<span className="w-[50px] px-3 text-center">#</span>
						<span className="w-[70px] px-3">score</span>
						<span className="flex-1 px-3">code</span>
						<span className="w-[100px] px-3">lang</span>
					</div>
					{/* Row 1 */}
					<div className="flex items-start border-b border-border-primary py-3 text-xs">
						<span className="w-[50px] px-3 text-center font-bold text-accent-amber">
							1
						</span>
						<span className="w-[70px] px-3 text-text-secondary">1.2</span>
						<span className="flex-1 whitespace-pre-wrap px-3 text-text-primary">
							{`eval(prompt("enter code"))\n// "security is optional" - this dev`}
						</span>
						<span className="w-[100px] px-3 text-text-tertiary">
							javascript
						</span>
					</div>
					{/* Row 2 */}
					<div className="flex items-start border-b border-border-primary py-3 text-xs">
						<span className="w-[50px] px-3 text-center font-bold text-text-secondary">
							2
						</span>
						<span className="w-[70px] px-3 text-text-secondary">1.8</span>
						<span className="flex-1 whitespace-pre-wrap px-3 text-text-primary">
							{`if (x == true) { return true; }\nelse { return false; }`}
						</span>
						<span className="w-[100px] px-3 text-text-tertiary">
							typescript
						</span>
					</div>
					{/* Row 3 */}
					<div className="flex items-start py-3 text-xs">
						<span className="w-[50px] px-3 text-center font-bold text-text-secondary">
							3
						</span>
						<span className="w-[70px] px-3 text-text-secondary">2.1</span>
						<span className="flex-1 whitespace-pre-wrap px-3 text-text-primary">
							{`SELECT * FROM users WHERE 1=1\n-- just in case we need all of them`}
						</span>
						<span className="w-[100px] px-3 text-text-tertiary">sql</span>
					</div>
				</div>
				{/* Fade hint */}
				<p className="text-center text-xs text-text-tertiary">
					showing top 3 of 2,847 ·{" "}
					<Link
						href="/leaderboard"
						className="hover:text-text-secondary"
					>
						view full leaderboard &gt;&gt;
					</Link>
				</p>
			</div>

			{/* Bottom padding */}
			<div className="h-[60px]" />
		</main>
	);
}
