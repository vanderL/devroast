"use client";

import { useState, useRef } from "react";

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

export function CodeInput() {
	const [code, setCode] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const lines = (code || placeholder).split("\n");
	const lineCount = Math.max(lines.length, 11);

	return (
		<div className="w-[780px] overflow-hidden rounded border border-border-primary">
			{/* Window header */}
			<div className="flex h-10 items-center gap-2 border-b border-border-primary bg-bg-surface px-4">
				<div className="size-3 rounded-full bg-[#EF4444]" />
				<div className="size-3 rounded-full bg-[#F59E0B]" />
				<div className="size-3 rounded-full bg-[#22C55E]" />
			</div>
			{/* Body */}
			<div className="flex min-h-[280px]">
				{/* Line numbers */}
				<div
					className="flex w-12 flex-col items-end border-r border-border-primary bg-bg-surface px-3 py-4 text-xs leading-relaxed text-text-tertiary"
					aria-hidden="true"
				>
					{Array.from({ length: lineCount }, (_, i) => (
						<span key={i} className="leading-relaxed">
							{i + 1}
						</span>
					))}
				</div>
				{/* Textarea */}
				<textarea
					ref={textareaRef}
					value={code}
					onChange={(e) => setCode(e.target.value)}
					placeholder={placeholder}
					spellCheck={false}
					className="flex-1 resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-text-primary placeholder:text-text-tertiary focus:outline-none"
				/>
			</div>
		</div>
	);
}
