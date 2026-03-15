import { tv, type VariantProps } from "tailwind-variants";
import { codeToHtml } from "shiki";

const codeBlockVariants = tv({
	base: "overflow-hidden rounded border border-border-primary bg-bg-input font-mono text-sm",
});

type CodeBlockProps = {
	children: string;
	lang?: string;
	fileName?: string;
	className?: string;
} & VariantProps<typeof codeBlockVariants>;

// Server Component — RSCs do not support forwardRef
async function CodeBlock({
	children,
	lang = "typescript",
	fileName,
	className,
}: CodeBlockProps) {
	const html = await codeToHtml(children, {
		lang,
		theme: "vesper",
	});

	return (
		<div className={codeBlockVariants({ className })}>
			<div className="flex h-10 items-center gap-3 border-b border-border-primary px-4">
				<span className="size-2.5 rounded-full bg-accent-red" />
				<span className="size-2.5 rounded-full bg-accent-amber" />
				<span className="size-2.5 rounded-full bg-accent-green" />
				<div className="flex-1" />
				{fileName && (
					<span className="text-xs text-text-tertiary">{fileName}</span>
				)}
			</div>
			<div
				className="overflow-x-auto p-4 [&_code]:!bg-transparent [&_pre]:!bg-transparent"
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
}

CodeBlock.displayName = "CodeBlock";

export { CodeBlock, codeBlockVariants, type CodeBlockProps };
