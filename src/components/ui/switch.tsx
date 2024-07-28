import clsx from "clsx";

interface Props {
  checked?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  id?: string;
}

const Switch: React.FC<Props> = ({
  checked = false,
  onClick,
  className,
  id,
}) => {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-label="Switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      onClick={onClick}
      className={clsx(
        className,
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 ?focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-zinc-900 data-[state=unchecked]:bg-zinc-200",
        "dark:data-[state=checked]:bg-zinc-50 dark:data-[state=unchecked]:bg-zinc-800",
      )}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className={clsx(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-all",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
          "dark:bg-zinc-950",
        )}
      />
    </button>
  );
};

export default Switch;
