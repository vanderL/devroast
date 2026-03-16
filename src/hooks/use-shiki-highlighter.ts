"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HighlighterCore } from "shiki";
import { LANGUAGES, type LanguageKey } from "@/lib/languages";

let highlighterPromise: Promise<HighlighterCore> | null = null;
let highlighterInstance: HighlighterCore | null = null;
const loadedLangs = new Set<string>();

async function getHighlighter(): Promise<HighlighterCore> {
	if (highlighterInstance) return highlighterInstance;
	if (highlighterPromise) return highlighterPromise;

	highlighterPromise = (async () => {
		const { createHighlighter } = await import("shiki");
		const instance = await createHighlighter({
			themes: ["vesper"],
			langs: ["javascript"],
		});
		loadedLangs.add("javascript");
		highlighterInstance = instance;
		return instance;
	})();

	return highlighterPromise;
}

export function useShikiHighlighter() {
	const [isReady, setIsReady] = useState(false);
	const highlighterRef = useRef<HighlighterCore | null>(null);

	useEffect(() => {
		getHighlighter().then((h) => {
			highlighterRef.current = h;
			setIsReady(true);
		});
	}, []);

	const highlight = useCallback(
		async (code: string, lang: LanguageKey): Promise<string> => {
			const h = highlighterRef.current ?? (await getHighlighter());
			highlighterRef.current = h;

			const shikiLang = LANGUAGES[lang].shikiLang;

			if (!loadedLangs.has(shikiLang)) {
				await h.loadLanguage(shikiLang as Parameters<typeof h.loadLanguage>[0]);
				loadedLangs.add(shikiLang);
			}

			return h.codeToHtml(code, { lang: shikiLang, theme: "vesper" });
		},
		[],
	);

	return { highlight, isReady };
}
