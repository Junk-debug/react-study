import { PureComponent } from "react";

interface Props {
  className?: string;
}

class Skeleton extends PureComponent<Props> {
  render() {
    const { className } = this.props;
    return (
      <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
    );
  }
}

export default Skeleton;
