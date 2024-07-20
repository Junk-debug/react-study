interface Props {
  className?: string;
}

const Skeleton: React.FC<Props> = ({ className }) => (
  <div
    className={`animate-pulse bg-gray-200 dark:bg-neutral-800 ${className}`}
  />
);

export default Skeleton;
