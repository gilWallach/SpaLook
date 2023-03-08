import { Skeleton } from "@mui/material";

export function LabelsSkeleton() {
  const skeletonLength = [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <div className="skeleton-container">
      <Skeleton
        sx={{ bgcolor: "white" }}
        animation="wave"
        variant="rounded"
        height="58px"
        width="100%"
      />
      <div className="total-content-container flex">
          {skeletonLength.map((idx) => {
        return (<div key={idx} className="content-container flex justify-center">
          <Skeleton
            animation="wave"
            variant="circular"
            height="48px"
            width="48px"
            // style="margin: 50px"
          />
        </div>)
          })}
      </div>
    </div>
  );
}
