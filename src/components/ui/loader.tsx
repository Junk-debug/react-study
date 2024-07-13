interface Props {
  className?: string;
  color?: string;
}

const Loader: React.FC<Props> = ({ className, color }) => (
  <div className={`relative w-16 h-16 rounded-full ${className || ""}`}>
    <div
      className={`w-full h-full border-4 border-t-transparent border-zinc-800 border-opacity-75 rounded-full animate-spin ${color || `border-${color}`}`}
    />
    <div
      className={`absolute inset-0 w-full border-4 rounded-full border-zinc-800 border-opacity-25 ${color || `border-${color}`}`}
    />
  </div>
);

export default Loader;
