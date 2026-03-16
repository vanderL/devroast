"use client";

import { Select } from "@base-ui/react/select";
import {
	type ComponentProps,
	forwardRef,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { useLanguageDetection } from "@/hooks/use-language-detection";
import { useShikiHighlighter } from "@/hooks/use-shiki-highlighter";
import { escapeHtml, LANGUAGES, type LanguageKey } from "@/lib/languages";

const placeholder = `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    if (items[i].price != undefined) {
      total = total + items[i].price;
    }
  }
  if (total == 0) {
    return "no items";
  }
  return total;
}`;

const codeInputVariants = tv({
	base: "w-[780px] overflow-hidden rounded border border-border-primary",
});

type CodeInputVariants = VariantProps<typeof codeInputVariants>;

type CodeInputProps = Omit<ComponentProps<"div">, "children"> &
	CodeInputVariants & {
		onCodeChange?: (code: string) => void;
		onLanguageChange?: (lang: LanguageKey) => void;
	};

const FONT_CLASSES =
	"font-mono text-sm leading-relaxed whitespace-pre-wrap break-words";

const CodeInput = forwardRef<HTMLDivElement, CodeInputProps>(
	({ className, onCodeChange, onLanguageChange, ...props }, ref) => {
		const [code, setCode] = useState("");
		const [language, setLanguage] = useState<LanguageKey>("javascript");
		const [highlightedHtml, setHighlightedHtml] = useState("");

		const textareaRef = useRef<HTMLTextAreaElement>(null);
		const preRef = useRef<HTMLPreElement>(null);
		const lineNumbersRef = useRef<HTMLDivElement>(null);
		// Tracks which code string produced the current highlightedHtml
		const highlightedCodeRef = useRef<string>("");

		const { highlight, isReady } = useShikiHighlighter();
		const { detectLanguage } = useLanguageDetection();

		const doHighlight = useCallback(
			async (text: string, lang: LanguageKey) => {
				if (!text) {
					setHighlightedHtml("");
					highlightedCodeRef.current = "";
					return;
				}
				const html = await highlight(text, lang);
				highlightedCodeRef.current = text;
				setHighlightedHtml(html);
			},
			[highlight],
		);

		// Highlight placeholder on mount when Shiki is ready
		useEffect(() => {
			if (isReady && !code) {
				highlight(placeholder, "javascript").then((html) => {
					if (!highlightedCodeRef.current) {
						highlightedCodeRef.current = placeholder;
						setHighlightedHtml(html);
					}
				});
			}
		}, [isReady, code, highlight]);

		const handleChange = useCallback(
			(e: React.ChangeEvent<HTMLTextAreaElement>) => {
				const val = e.target.value;
				setCode(val);
				onCodeChange?.(val);
			},
			[onCodeChange],
		);

		const handlePaste = useCallback(
			(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
				const pasted = e.clipboardData.getData("text/plain");
				if (!pasted) return;

				requestAnimationFrame(async () => {
					const currentValue = textareaRef.current?.value ?? "";
					const detected = await detectLanguage(currentValue);
					if (detected) {
						setLanguage(detected);
						onLanguageChange?.(detected);
						await doHighlight(currentValue, detected);
					} else {
						await doHighlight(currentValue, language);
					}
				});
			},
			[detectLanguage, doHighlight, language, onLanguageChange],
		);

		const handleBlur = useCallback(() => {
			if (code) {
				doHighlight(code, language);
			}
		}, [code, language, doHighlight]);

		const handleScroll = useCallback(() => {
			const textarea = textareaRef.current;
			if (!textarea) return;
			if (preRef.current) {
				preRef.current.scrollTop = textarea.scrollTop;
				preRef.current.scrollLeft = textarea.scrollLeft;
			}
			if (lineNumbersRef.current) {
				lineNumbersRef.current.scrollTop = textarea.scrollTop;
			}
		}, []);

		const handleLanguageChange = useCallback(
			async (val: string | null) => {
				if (!val) return;
				const lang = val as LanguageKey;
				setLanguage(lang);
				onLanguageChange?.(lang);
				if (code) {
					await doHighlight(code, lang);
				}
			},
			[code, doHighlight, onLanguageChange],
		);

		const displayText = code || placeholder;
		const lines = displayText.split("\n");
		const lineCount = Math.max(lines.length, 11);

		// Only use highlightedHtml if it matches the current displayText,
		// otherwise fall back to escaped plain text so typing is always visible
		const fallbackHtml = `<pre style="margin:0;background:transparent"><code style="background:transparent;white-space:pre-wrap">${escapeHtml(displayText)}</code></pre>`;
		const displayHtml =
			highlightedCodeRef.current === displayText
				? highlightedHtml
				: fallbackHtml;

		return (
			<div ref={ref} className={codeInputVariants({ className })} {...props}>
				{/* Window header */}
				<div className="flex h-10 items-center gap-2 border-b border-border-primary bg-bg-surface px-4">
					<div className="size-3 rounded-full bg-[#EF4444]" />
					<div className="size-3 rounded-full bg-[#F59E0B]" />
					<div className="size-3 rounded-full bg-[#22C55E]" />
					<div className="flex-1" />
					{/* Language dropdown */}
					<Select.Root value={language} onValueChange={handleLanguageChange}>
						<Select.Trigger className="flex items-center gap-1 text-xs text-text-tertiary transition-colors hover:text-text-secondary cursor-pointer">
							<span>{LANGUAGES[language].label}</span>
							<Select.Icon>
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									aria-hidden="true"
								>
									<path
										d="M3 5l3 3 3-3"
										stroke="currentColor"
										strokeWidth="1.5"
										fill="none"
									/>
								</svg>
							</Select.Icon>
						</Select.Trigger>
						<Select.Portal>
							<Select.Positioner
								side="bottom"
								align="end"
								sideOffset={4}
								className="z-50"
							>
								<Select.Popup className="max-h-[min(300px,var(--available-height))] overflow-hidden rounded border border-border-primary bg-bg-elevated p-1 shadow-lg">
									<Select.List className="overflow-auto outline-none">
										{Object.entries(LANGUAGES).map(([key, entry]) => (
											<Select.Item
												key={key}
												value={key}
												className="cursor-pointer rounded px-3 py-1.5 text-xs text-text-secondary outline-none hover:bg-bg-surface hover:text-text-primary data-[highlighted]:bg-bg-surface data-[highlighted]:text-text-primary"
											>
												<Select.ItemText>{entry.label}</Select.ItemText>
											</Select.Item>
										))}
									</Select.List>
								</Select.Popup>
							</Select.Positioner>
						</Select.Portal>
					</Select.Root>
				</div>
				{/* Body */}
				<div className="flex min-h-[280px]">
					{/* Line numbers */}
					<div
						ref={lineNumbersRef}
						className="flex w-12 flex-col items-end overflow-hidden border-r border-border-primary bg-bg-surface px-3 py-4 text-xs leading-relaxed text-text-tertiary"
						aria-hidden="true"
					>
						{Array.from({ length: lineCount }, (_, i) => (
							<span key={i} className="leading-relaxed">
								{i + 1}
							</span>
						))}
					</div>
					{/* Editor area — grid overlay: pre and textarea share the same cell */}
					<div className="grid min-h-[280px] flex-1 [&>*]:[grid-area:1/1]">
						<pre
							ref={preRef}
							aria-hidden="true"
							className={`pointer-events-none p-4 ${FONT_CLASSES} ${
								code ? "text-text-primary" : "text-text-tertiary"
							} [&_pre]:!bg-transparent [&_code]:!bg-transparent [&_code]:!whitespace-pre-wrap`}
							dangerouslySetInnerHTML={{ __html: displayHtml }}
						/>
						<textarea
							ref={textareaRef}
							value={code}
							onChange={handleChange}
							onPaste={handlePaste}
							onBlur={handleBlur}
							onScroll={handleScroll}
							placeholder={placeholder}
							spellCheck={false}
							className={`resize-none bg-transparent p-4 ${FONT_CLASSES} text-transparent caret-[#e5e5e5] placeholder:text-transparent focus:outline-none overflow-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
						/>
					</div>
				</div>
			</div>
		);
	},
);

CodeInput.displayName = "CodeInput";

export {
	CodeInput,
	type CodeInputProps,
	type CodeInputVariants,
	codeInputVariants,
};
