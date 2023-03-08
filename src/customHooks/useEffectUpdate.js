import { useEffect, useRef } from "react"


export const useEffectUpdate = (cb, dependencies) => {

    const isFirstRender = useRef(true)

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
        } else {
            return cb()
        }

    }, dependencies)
}