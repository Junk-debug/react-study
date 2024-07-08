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
    className={`${className} transition-colors flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus:border focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50`}
  />
);

export default Input;
