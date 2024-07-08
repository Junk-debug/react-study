import { useState } from "react";
import Skeleton from "./ui/skeleton";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

const ImgWithLoading: React.FC<Props> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div className={`${className} relative`}>
      {isLoading && <Skeleton className="absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        className={`w-full rounded-md ${isLoading ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
};

export default ImgWithLoading;
