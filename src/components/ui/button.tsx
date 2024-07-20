import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "standard" | "outlined" | "destructive";
}

const getVariantStyles = (
  variant: "standard" | "outlined" | "destructive" | undefined,
) => {
  switch (variant) {
    case "outlined":
      return clsx(
        "border bg-white border-zinc-200 text-zinc-900 shadow-sm hover:bg-white/10 hover:text-zinc-900/90",
        "dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50/90",
      );
    case "destructive":
      return clsx(
        "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90",
        "dark:bg-red-900 dark:hover:bg-red-900/90",
      );
    case "standard":
    default:
      return clsx(
        "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 dark:bg-zinc-50",
        "dark:text-zinc-900 dark:hover:bg-zinc-50/90",
      );
  }
};

const Button: React.FC<Props> = ({
  children,
  className,
  variant,
  ...props
}) => (
  <button
    type="button"
    className={clsx(
      className,
      getVariantStyles(variant),
      "h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50",
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
