export type LanguageKey =
	| "html"
	| "css"
	| "javascript"
	| "typescript"
	| "jsx"
	| "tsx"
	| "python"
	| "java"
	| "go"
	| "rust"
	| "ruby"
	| "php"
	| "c"
	| "cpp"
	| "csharp"
	| "sql"
	| "bash"
	| "json"
	| "yaml"
	| "markdown";

export type LanguageEntry = {
	label: string;
	shikiLang: string;
	hljsLang: string;
};

export const LANGUAGES: Record<LanguageKey, LanguageEntry> = {
	html: { label: "HTML", shikiLang: "html", hljsLang: "xml" },
	css: { label: "CSS", shikiLang: "css", hljsLang: "css" },
	javascript: {
		label: "JavaScript",
		shikiLang: "javascript",
		hljsLang: "javascript",
	},
	typescript: {
		label: "TypeScript",
		shikiLang: "typescript",
		hljsLang: "typescript",
	},
	jsx: { label: "JSX", shikiLang: "jsx", hljsLang: "javascript" },
	tsx: { label: "TSX", shikiLang: "tsx", hljsLang: "typescript" },
	python: { label: "Python", shikiLang: "python", hljsLang: "python" },
	java: { label: "Java", shikiLang: "java", hljsLang: "java" },
	go: { label: "Go", shikiLang: "go", hljsLang: "go" },
	rust: { label: "Rust", shikiLang: "rust", hljsLang: "rust" },
	ruby: { label: "Ruby", shikiLang: "ruby", hljsLang: "ruby" },
	php: { label: "PHP", shikiLang: "php", hljsLang: "php" },
	c: { label: "C", shikiLang: "c", hljsLang: "c" },
	cpp: { label: "C++", shikiLang: "cpp", hljsLang: "cpp" },
	csharp: { label: "C#", shikiLang: "csharp", hljsLang: "csharp" },
	sql: { label: "SQL", shikiLang: "sql", hljsLang: "sql" },
	bash: { label: "Bash", shikiLang: "bash", hljsLang: "bash" },
	json: { label: "JSON", shikiLang: "json", hljsLang: "json" },
	yaml: { label: "YAML", shikiLang: "yaml", hljsLang: "yaml" },
	markdown: { label: "Markdown", shikiLang: "markdown", hljsLang: "markdown" },
};

export const HLJS_SUBSET: string[] = Object.values(LANGUAGES).map(
	(l) => l.hljsLang,
);

const hljsToKeyMap: Record<string, LanguageKey> = {};
for (const [key, entry] of Object.entries(LANGUAGES)) {
	hljsToKeyMap[entry.hljsLang] = key as LanguageKey;
}
// hljs chama HTML de "xml"
hljsToKeyMap.xml = "html";

export function languageKeyFromHljs(name: string): LanguageKey | null {
	return hljsToKeyMap[name] ?? null;
}

export function escapeHtml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}
