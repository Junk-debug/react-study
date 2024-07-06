import { PureComponent } from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "standard" | "outlined";
}

const getVariantStyles = (variant: "standard" | "outlined" | undefined) => {
  switch (variant) {
    case "outlined":
      return "text-zinc-900 border bg-white shadow-sm hover:bg-white/90 hover:text-zinc-900/90";
    case "standard":
    default:
      return "bg-zinc-900 text-white hover:bg-zinc-900/90 shadow";
  }
};

class Button extends PureComponent<Props> {
  render() {
    const { children, onClick, className, variant } = this.props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} ${getVariantStyles(variant)} h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50`}
      >
        {children}
      </button>
    );
  }
}

export default Button;
