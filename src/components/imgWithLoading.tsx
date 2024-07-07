import { Component } from "react";
import Skeleton from "./ui/skeleton";

interface ImgWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
}

interface ImgWithLoadingState {
  isLoading: boolean;
}

class ImgWithLoading extends Component<
  ImgWithLoadingProps,
  ImgWithLoadingState
> {
  constructor(props: ImgWithLoadingProps) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  handleImageLoaded = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { src, alt, className } = this.props;
    const { isLoading } = this.state;

    return (
      <div className={`${className} relative`}>
        {isLoading && <Skeleton className="absolute inset-0" />}
        <img
          src={src}
          alt={alt}
          onLoad={this.handleImageLoaded}
          className={`w-full rounded-md ${isLoading ? "opacity-0" : "opacity-100"}`}
        />
      </div>
    );
  }
}

export default ImgWithLoading;
