import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "DevRoast",
	description: "DevRoast",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${jetbrainsMono.variable} min-h-screen bg-bg-page font-mono`}
			>
				<Navbar>
					<Link
						href="/leaderboard"
						className="text-sm text-text-secondary hover:text-text-primary"
					>
						leaderboard
					</Link>
				</Navbar>
				{children}
			</body>
		</html>
	);
}
