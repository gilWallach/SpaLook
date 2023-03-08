import { memo } from "react"

export const LocationPreviewImage = memo(function LocationPreviewImage ({loc}) {
    return (
        <img
            className="loc-icon"
            src={`https://img.freepik.com/premium-vector/usa-map-blank-map-united-states-america-vector-illustration_266660-155.jpg?size=338&ext=jpg&ga=GA1.1.1891985293.1673439331`}
            alt={`${loc}-icon`}
        />
    )
})