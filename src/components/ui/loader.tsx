interface Props {
  className?: string;
  color?: string;
}
function Loader({ className, color }: Props) {
  return (
    <div className={`relative w-16 h-16 rounded-full ${className}`}>
      <div
        className={`w-full h-full border-4 border-t-transparent border-zinc-800 border-opacity-75 rounded-full animate-spin border-${color}`}
      />
      <div
        className={`absolute inset-0 w-full border-4 rounded-full border-zinc-800 border-opacity-25 border-${color}`}
      />
    </div>
  );
}

export default Loader;
