import { useState, useEffect, useRef } from "react";

export function LocationPreview({ label }) {
  return (
    <div className="img-container location">
      <img
        className="label-icon"
        src={`${label.imgUrl}`}
        alt={`${label.title}-icon`}
      />
    </div>
  )
}
