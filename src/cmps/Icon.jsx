import { Box, CircularProgress, Skeleton } from "@mui/material";
import { useDynamicSVGImport } from "../customHooks/svgDynamic";

export function Icon({name, onCompleted, onError, ...rest}) {
    const { error, loading, SvgIcon } = useDynamicSVGImport(name, { onCompleted, onError })
    if (error) {
        return error.message
    }

    if (loading) {
        // return <Skeleton variant="circular" height="100%" width="100%"/>
        return <Box sx={{ display: 'flex', alignItems:'center', justifyContent:'center'}}>
        <CircularProgress size={20} />
      </Box>
    }
    if (SvgIcon) {
        return <SvgIcon {...rest} />
    }
    return null
}