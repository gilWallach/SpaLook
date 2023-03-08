import { Skeleton } from "@mui/material";

export function CardSkeleton() {
  return (
    <div className="skeleton-container">
      <Skeleton
        sx={{ bgcolor: "white" }}
        animation="wave"
        variant="rounded"
        height="11em"
        width="100%"
      />
      <div className="total-content-container flex">
            <div
              className="total-content-container flex justify-center align-center"
            >
              <Skeleton
                animation="wave"
                variant="rounded"
                height="9.6em"
                width="9.6em"
              />
              <div className="content-container flex column justify-center">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "16px" }}
                  width="60px"
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "14px" }}
                  width="110px"
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "14px" }}
                  width="110px"
                />
              </div>
            </div>
      </div>
    </div>
  );
}
