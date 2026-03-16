"use client";

import type hljs from "highlight.js/lib/core";
import { useCallback, useRef } from "react";

type HLJSApi = typeof hljs;

import {
	HLJS_SUBSET,
	type LanguageKey,
	languageKeyFromHljs,
} from "@/lib/languages";

let hljsInstance: HLJSApi | null = null;
let hljsPromise: Promise<HLJSApi> | null = null;

async function getHljs(): Promise<HLJSApi> {
	if (hljsInstance) return hljsInstance;
	if (hljsPromise) return hljsPromise;

	hljsPromise = (async () => {
		const hljs = (await import("highlight.js/lib/core")).default;

		const langs = await Promise.all([
			import("highlight.js/lib/languages/xml"),
			import("highlight.js/lib/languages/css"),
			import("highlight.js/lib/languages/javascript"),
			import("highlight.js/lib/languages/typescript"),
			import("highlight.js/lib/languages/python"),
			import("highlight.js/lib/languages/java"),
			import("highlight.js/lib/languages/go"),
			import("highlight.js/lib/languages/rust"),
			import("highlight.js/lib/languages/ruby"),
			import("highlight.js/lib/languages/php"),
			import("highlight.js/lib/languages/c"),
			import("highlight.js/lib/languages/cpp"),
			import("highlight.js/lib/languages/csharp"),
			import("highlight.js/lib/languages/sql"),
			import("highlight.js/lib/languages/bash"),
			import("highlight.js/lib/languages/json"),
			import("highlight.js/lib/languages/yaml"),
			import("highlight.js/lib/languages/markdown"),
		]);

		const names = [
			"xml",
			"css",
			"javascript",
			"typescript",
			"python",
			"java",
			"go",
			"rust",
			"ruby",
			"php",
			"c",
			"cpp",
			"csharp",
			"sql",
			"bash",
			"json",
			"yaml",
			"markdown",
		];

		for (let i = 0; i < names.length; i++) {
			hljs.registerLanguage(names[i], langs[i].default);
		}

		hljsInstance = hljs;
		return hljs;
	})();

	return hljsPromise;
}

export function useLanguageDetection() {
	const hljsRef = useRef<HLJSApi | null>(null);

	const detectLanguage = useCallback(
		async (code: string): Promise<LanguageKey | null> => {
			const hljs = hljsRef.current ?? (await getHljs());
			hljsRef.current = hljs;

			const result = hljs.highlightAuto(code, HLJS_SUBSET);
			if (result.language) {
				return languageKeyFromHljs(result.language);
			}
			return null;
		},
		[],
	);

	return { detectLanguage };
}
