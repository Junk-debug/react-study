import clsx from "clsx";

interface Props {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const Input: React.FC<Props> = ({
  value,
  onChange,
  className,
  placeholder,
  disabled,
}) => (
  <input
    disabled={disabled}
    placeholder={placeholder}
    type="text"
    value={value}
    onChange={onChange}
    className={clsx(
      className,
      "h-9 w-full px-3 py-2 flex rounded-md border text-sm transition-colors",
      "focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      "border-zinc-200 focus-visible:ring-neutral-800 bg-white",
      "dark:border-zinc-800 dark:focus-visible:ring-zinc-300 dark:bg-zinc-950",
    )}
  />
);

export default Input;
