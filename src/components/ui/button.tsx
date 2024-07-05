import { PureComponent } from "react";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

class Button extends PureComponent<Props> {
  render() {
    const { children, onClick, className } = this.props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} h-9 px-4 py-2 bg-zinc-900 text-white shadow hover:bg-zinc-900/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50`}
      >
        {children}
      </button>
    );
  }
}

export default Button;
