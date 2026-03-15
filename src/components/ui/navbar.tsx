import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const navbarVariants = tv({
	base: "flex h-14 w-full items-center justify-between border-b border-border-primary bg-bg-page px-10",
});

type NavbarVariants = VariantProps<typeof navbarVariants>;

type NavbarProps = ComponentProps<"nav"> & NavbarVariants;

const Navbar = forwardRef<HTMLElement, NavbarProps>(
	({ className, children, ...props }, ref) => {
		return (
			<nav ref={ref} className={navbarVariants({ className })} {...props}>
				<div className="flex items-center gap-0">
					<span className="text-xl font-bold text-accent-green">&gt;</span>
					<span className="font-mono text-lg font-medium text-text-primary">
						devroast
					</span>
				</div>
				{children && (
					<div className="flex items-center gap-4">{children}</div>
				)}
			</nav>
		);
	},
);

Navbar.displayName = "Navbar";

export { Navbar, navbarVariants, type NavbarProps, type NavbarVariants };
