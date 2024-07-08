interface Props {
  className?: string;
}

const Skeleton: React.FC<Props> = ({ className }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

export default Skeleton;
