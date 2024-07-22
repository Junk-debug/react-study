import clsx from "clsx";

interface Props {
  className?: string;
  checked?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
}

const Checkbox: React.FC<Props> = ({
  className,
  checked = false,
  onClick,
  disabled,
  id,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-label="Checkbox"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      onClick={onClick}
      disabled={disabled}
      id={id}
      className={clsx(
        className,
        "flex items-center justify-center h-4 w-4 shrink-0 rounded-[4px] shadow border border-zinc-900",
        "data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50",
        "dark:border-zinc-50 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900",
        "focus-visible:outline-none focus-visible:ring-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
      )}
    >
      {checked && (
        <span
          data-state={checked ? "checked" : "unchecked"}
          className="flex items-center justify-center text-current"
          style={{ pointerEvents: "none" }}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </span>
      )}
    </button>
  );
};

export default Checkbox;
