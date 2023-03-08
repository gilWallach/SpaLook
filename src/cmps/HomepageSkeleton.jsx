import { Skeleton } from "@mui/material";

export function HomepageSkeleton() {
  const skeletonLength = [1, 2, 3, 4, 5, 6]
  return (
    <div className="skeleton-container">
      <Skeleton
        sx={{ bgcolor: "white" }}
        animation="wave"
        variant="rounded"
        height="20em"
        width="100%"
      />
      <div className="total-content-container flex">
        {skeletonLength.map((idx) => {
        return (<div key={idx} className="content-container flex column justify-center">
          <Skeleton
            animation="wave"
            variant="rounded"
            height="12.75em"
            width="12.75em"
          />
          <Skeleton variant="text" sx={{ fontSize: "16px" }} width="60px" />
          <Skeleton variant="text" sx={{ fontSize: "14px" }} width="110px" />
          <Skeleton variant="text" sx={{ fontSize: "14px" }} width="110px" />
        </div>)
        })}
      </div>
    </div>
  );
}
