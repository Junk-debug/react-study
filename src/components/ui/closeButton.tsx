interface Props
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, "children"> {}

const CloseButton: React.FC<Props> = (props) => (
  <button aria-label="Close" type="button" {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export default CloseButton;
