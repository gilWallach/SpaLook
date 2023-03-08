import { Skeleton } from "@mui/material";

export function SpaListSkeleton() {
    return (
        <div className="skeleton-container">
            <Skeleton sx={{ bgcolor: 'white' }} animation="wave" variant="rounded" height="108px" width="100%" />
            <div className="total-content-container flex">
                <Skeleton animation="wave" variant="rounded" height="8.1666666667em" width="9.6666666667em" />
                <div className="content-container flex column justify-center">
                    <Skeleton variant="text" sx={{ fontSize: '16px' }} width="60px" />
                    <Skeleton variant="text" sx={{ fontSize: '14px' }} width="110px" />
                    <Skeleton variant="text" sx={{ fontSize: '14px' }} width="110px" />
                </div>
            </div>
        </div>
    )
}