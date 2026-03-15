# UI Components — Padrões de Criação

## Estrutura de um componente

Todos os componentes em `src/components/ui` devem seguir estes padrões:

### 1. Named exports apenas

Nunca use `export default`. Sempre use named exports para o componente, as variants e os tipos.

```tsx
export { Button, buttonVariants, type ButtonProps, type ButtonVariants };
```

### 2. Extensão de props nativas

Sempre estenda as propriedades nativas do elemento HTML usando `ComponentProps<"elemento">`:

```tsx
import { type ComponentProps, forwardRef } from "react";

type ButtonProps = ComponentProps<"button"> &
	ButtonVariants & {
		// props customizadas aqui
	};
```

### 3. forwardRef

Sempre use `forwardRef` para permitir que o consumidor acesse a ref do elemento nativo:

```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, ...props }, ref) => {
		return <button ref={ref} className={...} {...props} />;
	},
);

Button.displayName = "Button";
```

### 4. tailwind-variants para variantes

Use `tv()` do `tailwind-variants` para definir variantes. **Não use `twMerge` junto com `tailwind-variants`** — passe `className` diretamente como propriedade na chamada da variant, pois o `tv()` já faz o merge internamente:

```tsx
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "...",
	variants: {
		variant: { primary: "...", secondary: "..." },
		size: { sm: "...", md: "...", lg: "..." },
	},
	defaultVariants: {
		variant: "primary",
		size: "md",
	},
});

// Na renderização, passe className junto com as variants:
className={buttonVariants({ variant, size, className })}

// NÃO faça isso:
// className={twMerge(buttonVariants({ variant, size }), className)}
```

### 5. Variáveis do design system

Todas as cores e tokens estão definidos diretamente na diretiva `@theme inline` do `globals.css` como variáveis Tailwind (sem camada intermediária de CSS custom properties em `:root`). Use as classes Tailwind diretamente:

- **Cores de fundo:** `bg-bg-page`, `bg-bg-surface`, `bg-bg-elevated`, `bg-bg-input`
- **Cores de borda:** `border-border-primary`, `border-border-secondary`, `border-border-focus`
- **Cores de texto:** `text-text-primary`, `text-text-secondary`, `text-text-tertiary`, `text-text-muted`
- **Cores de acento:** `bg-accent-green`, `text-accent-red`, `border-accent-amber`, etc.
- **Espaçamento:** `gap-sm`, `px-spacing-md`, `py-spacing-lg`, etc.
- **Border radius:** `rounded-m`, `rounded-pill`, `rounded-none`
- **Fontes:** `font-mono` (JetBrains Mono) para texto monospaced, `font-sans` (fonte do sistema) para texto tradicional.

### 6. Exportações obrigatórias

Cada componente deve exportar:

1. O componente em si (`Button`)
2. A função de variants (`buttonVariants`)
3. O tipo das props (`ButtonProps`)
4. O tipo das variants (`ButtonVariants`)
