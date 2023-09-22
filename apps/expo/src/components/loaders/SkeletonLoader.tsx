import { Skeleton } from "@rneui/themed";
import { FC } from "react";

interface LoadProps {
  isCircular: boolean;
  width: number | string
  height: number | string
}

export const SkeletonLoader: FC<LoadProps> = ({
  isCircular,
  width,
  height,
}) => {
  return (
    <Skeleton
      animation="wave"
      width={width}
      height={height}
      circle={isCircular}
    />
  );
};
