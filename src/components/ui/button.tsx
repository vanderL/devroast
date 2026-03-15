import { type ComponentProps, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "inline-flex items-center justify-center font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page disabled:pointer-events-none disabled:opacity-50",
	variants: {
		variant: {
			primary: "bg-accent-green text-[#0A0A0A] font-medium hover:bg-accent-green/80",
			secondary:
				"border border-border-primary bg-transparent text-text-primary hover:bg-bg-elevated",
			ghost:
				"border border-border-primary bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
			destructive:
				"bg-destructive text-text-primary font-medium hover:bg-destructive/80",
			link: "text-text-secondary underline-offset-4 hover:text-text-primary hover:underline",
		},
		size: {
			sm: "px-3 py-1.5 text-xs",
			md: "px-4 py-2 text-xs",
			lg: "px-6 py-2.5 text-sm",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentProps<"button"> &
	ButtonVariants & {
		asChild?: boolean;
	};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				ref={ref}
				className={buttonVariants({ variant, size, className })}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";

export { Button, buttonVariants, type ButtonProps, type ButtonVariants };
