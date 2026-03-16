import { faker } from "@faker-js/faker";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { roastIssues, roasts } from "./schema";

const LANGUAGES = [
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
	"html",
	"css",
	"json",
	"yaml",
	"jsx",
	"tsx",
	"markdown",
] as const;

const VERDICTS = [
	"career_change_recommended",
	"needs_serious_help",
	"rough_around_edges",
	"not_bad",
	"actually_decent",
	"mass_respect",
] as const;

const ISSUE_STATUSES = ["critical", "warning", "good"] as const;

function verdictFromScore(score: number) {
	if (score <= 0.5) return "career_change_recommended";
	if (score <= 2) return "needs_serious_help";
	if (score <= 4) return "rough_around_edges";
	if (score <= 6) return "not_bad";
	if (score <= 8) return "actually_decent";
	return "mass_respect";
}

// Snippets de código ruim para tornar os roasts mais realistas
const CODE_SNIPPETS: Record<string, string[]> = {
	javascript: [
		`function add(a, b) {
  var result = a + b;
  return result;
}
var x = add(1, 2);
console.log(x);`,
		`eval(prompt("enter code"))
// "security is optional" - this dev`,
		`if (x == true) {
  return true;
} else if (x == false) {
  return false;
} else {
  return null;
}`,
		`var arr = new Array();
for (var i = 0; i < 10; i++) {
  arr.push(i);
}
var filtered = arr.filter(function(item) {
  if (item > 5) {
    return true;
  } else {
    return false;
  }
});`,
		`function sleep(ms) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + ms);
}
sleep(5000);
console.log("done waiting");`,
	],
	typescript: [
		`const getUser = (id: any): any => {
  const user: any = db.query("SELECT * FROM users WHERE id = " + id);
  return user as any;
}`,
		`interface User {
  name: string;
  age: number;
}
// @ts-ignore
const user: User = { name: 123, age: "old" };`,
		`function processData(data: unknown) {
  return (data as any as string as unknown as number).toFixed(2);
}`,
	],
	python: [
		`def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

# no base case for negative numbers lol
print(factorial(-1))`,
		`import os
password = "admin123"
os.system("echo " + password + " | sudo -S rm -rf /")`,
		`class God:
    _instance = None
    data = {}

    def __getattr__(self, name):
        return self.data.get(name, None)

    def __setattr__(self, name, value):
        self.data[name] = value`,
		`try:
    result = do_something()
except:
    pass  # it's fine`,
	],
	java: [
		`public class Utils {
    public static String reverse(String s) {
        String result = "";
        for (int i = s.length() - 1; i >= 0; i--) {
            result = result + s.charAt(i);
        }
        return result;
    }
}`,
		`public boolean isEven(int n) {
    String s = String.valueOf(n);
    char last = s.charAt(s.length() - 1);
    return last == '0' || last == '2' || last == '4' || last == '6' || last == '8';
}`,
	],
	go: [
		`func main() {
	result, _ := doSomething()
	fmt.Println(result)
}`,
		`func getUsers() []User {
	var users []User
	rows, err := db.Query("SELECT * FROM users WHERE 1=1")
	if err != nil {
		panic(err)
	}
	return users
}`,
	],
	sql: [
		`SELECT * FROM users WHERE 1=1
-- just in case we need all of them`,
		`DELETE FROM production_data WHERE id > 0;
-- oops wrong database`,
		`SELECT u.*, o.*, p.*, c.*
FROM users u, orders o, products p, categories c
WHERE u.id = o.user_id
AND o.product_id = p.id;`,
	],
	rust: [
		`fn main() {
    let mut v: Vec<i32> = Vec::new();
    for i in 0..1000000 {
        v.push(i);
    }
    unsafe {
        let ptr = v.as_ptr();
        std::mem::forget(v);
        println!("{}", *ptr);
    }
}`,
	],
	php: [
		`<?php
$query = "SELECT * FROM users WHERE name = '" . $_GET['name'] . "'";
$result = mysql_query($query);
?>`,
		`<?php
function isAdmin($user) {
    if ($user == "admin") {
        return TRUE;
    }
    return FALSE;
}
?>`,
	],
	bash: [
		`#!/bin/bash
rm -rf /tmp/*
# hope nothing important was there`,
		`#!/bin/bash
PASSWORD="super_secret_123"
curl -u admin:$PASSWORD https://api.example.com/data`,
	],
	html: [
		`<div>
  <div>
    <div>
      <div>
        <div>
          <p>div soup</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
	],
	css: [
		`* {
  margin: 0 !important;
  padding: 0 !important;
  float: left !important;
  position: absolute !important;
}`,
		`.button {
  width: 100px;
  height: 50px;
  margin-top: -3px;
  margin-left: 7px;
  padding-top: 13px;
  position: relative;
  top: -2px;
  left: 3px;
}`,
	],
};

const ROAST_MESSAGES = [
	"This code makes me want to mass uninstall my IDE.",
	"I've seen better code written by a cat walking across a keyboard.",
	"Did you write this during an earthquake?",
	"This is what happens when you copy from Stack Overflow with your eyes closed.",
	"I'm not mad, I'm just disappointed. Actually, I'm both.",
	"This code has more red flags than a communist parade.",
	"If spaghetti code had a mascot, this would be it.",
	"Your code is like a horror movie - I can't look away but I'm terrified.",
	"I've seen cleaner code in a ransomware payload.",
	"This code violates not just best practices, but the Geneva Convention.",
	"Your variable naming convention is: 'whatever comes to mind first'.",
	"The only design pattern here is 'chaos'.",
	"This code would make a bootcamp instructor cry.",
	"Even GitHub Copilot would refuse to autocomplete this.",
	"Your error handling strategy is 'hope for the best'.",
	"This code is so bad it made my linter file a restraining order.",
	"I've seen more structure in a toddler's crayon drawing.",
	"This code commits war crimes against readability.",
	"If code review was a sport, reviewing this would be an extreme one.",
	"Your indentation is more inconsistent than the weather.",
	"This is the coding equivalent of putting ketchup on sushi.",
	"I'd rather debug assembly blindfolded than maintain this.",
	"Your code has more issues than a magazine subscription.",
	"This function does so many things it needs its own LinkedIn profile.",
	"Security? This code has the security posture of an open window.",
	"Not terrible. The bar was underground and you cleared it.",
	"Actually decent - like finding a clean bathroom at a gas station.",
	"Surprisingly readable. Are you sure you wrote this?",
	"Clean code. Did someone else write this for you?",
	"This is... actually good. I'm suspicious.",
];

const ISSUE_TITLES = {
	critical: [
		"SQL injection vulnerability",
		"Hardcoded credentials in source",
		"eval() usage with user input",
		"Missing input sanitization",
		"Unsafe deserialization",
		"No authentication check",
		"Memory leak detected",
		"Race condition in shared state",
		"Infinite recursion possible",
		"Unhandled promise rejection",
	],
	warning: [
		"Using var instead of const/let",
		"Deeply nested callbacks",
		"Magic numbers without constants",
		"Function exceeds 50 lines",
		"Missing error handling",
		"No type annotations",
		"Redundant boolean comparison",
		"String concatenation for SQL",
		"Console.log left in code",
		"Commented-out code blocks",
		"Inconsistent naming convention",
		"Missing null check",
		"Unnecessary else after return",
		"Mutable global state",
	],
	good: [
		"Consistent formatting",
		"Descriptive function name",
		"Proper use of const",
		"Good separation of concerns",
		"Clean import structure",
		"Appropriate error handling",
	],
};

const ISSUE_DESCRIPTIONS = {
	critical: [
		"This is a textbook example of how NOT to handle user input. An attacker could exploit this in seconds.",
		"Hardcoded secrets in source code? That's not a bug, that's a gift to hackers.",
		"Using eval() with external input is like leaving your front door wide open with a 'free stuff' sign.",
		"Zero input validation. You're trusting users more than you trust your own family.",
		"This could lead to remote code execution. Sleep tight knowing this is in production.",
	],
	warning: [
		"Not a showstopper, but definitely makes experienced developers twitch involuntarily.",
		"This pattern will bite you eventually. It's just a matter of when, not if.",
		"Code smell detected. It works, but so does duct-taping a car bumper.",
		"This makes the code harder to maintain. Future you will curse present you.",
		"While technically correct, this is the coding equivalent of eating soup with a fork.",
	],
	good: [
		"Credit where it's due - this part actually follows best practices.",
		"At least you got this right. Small victories.",
		"The one bright spot in an otherwise questionable codebase.",
	],
};

function generateCode(language: string): string {
	const snippets = CODE_SNIPPETS[language];
	if (snippets) {
		return faker.helpers.arrayElement(snippets);
	}
	// Código genérico para linguagens sem snippets
	const lines = faker.number.int({ min: 5, max: 30 });
	return Array.from({ length: lines }, () =>
		faker.hacker.phrase(),
	).join("\n");
}

function generateIssues(score: number) {
	const issueCount = score <= 3
		? faker.number.int({ min: 3, max: 6 })
		: score <= 6
			? faker.number.int({ min: 2, max: 4 })
			: faker.number.int({ min: 1, max: 2 });

	return Array.from({ length: issueCount }, (_, i) => {
		// Código ruim → mais criticals, código bom → mais goods
		const statusWeights =
			score <= 3
				? { critical: 0.5, warning: 0.4, good: 0.1 }
				: score <= 6
					? { critical: 0.15, warning: 0.55, good: 0.3 }
					: { critical: 0, warning: 0.3, good: 0.7 };

		const roll = Math.random();
		const status: (typeof ISSUE_STATUSES)[number] =
			roll < statusWeights.critical
				? "critical"
				: roll < statusWeights.critical + statusWeights.warning
					? "warning"
					: "good";

		return {
			status,
			title: faker.helpers.arrayElement(ISSUE_TITLES[status]),
			description: faker.helpers.arrayElement(ISSUE_DESCRIPTIONS[status]),
			order: i,
		};
	});
}

async function seed() {
	const url = process.env.DATABASE_URL;
	if (!url) {
		console.error("DATABASE_URL not set");
		process.exit(1);
	}

	const client = postgres(url);
	const db = drizzle(client, { casing: "snake_case" });

	console.log("Cleaning existing data...");
	await db.delete(roastIssues);
	await db.delete(roasts);

	console.log("Seeding 100 roasts...");

	for (let i = 0; i < 100; i++) {
		const language = faker.helpers.arrayElement(LANGUAGES);
		const code = generateCode(language);
		const score = Math.round(faker.number.float({ min: 0.5, max: 9.5, fractionDigits: 1 }) * 10) / 10;
		const verdict = verdictFromScore(score);
		const issues = generateIssues(score);

		const [roast] = await db
			.insert(roasts)
			.values({
				code,
				language,
				lineCount: code.split("\n").length,
				roastMode: faker.datatype.boolean({ probability: 0.85 }),
				score,
				verdict,
				roastMessage: faker.helpers.arrayElement(ROAST_MESSAGES),
				suggestedFix: faker.datatype.boolean({ probability: 0.6 })
					? `// improved version\n${faker.lorem.lines({ min: 3, max: 8 })}`
					: null,
				createdAt: faker.date.recent({ days: 90 }),
			})
			.returning({ id: roasts.id });

		if (issues.length > 0) {
			await db.insert(roastIssues).values(
				issues.map((issue) => ({
					roastId: roast.id,
					...issue,
				})),
			);
		}
	}

	console.log("Done! Seeded 100 roasts with issues.");
	await client.end();
}

seed();
