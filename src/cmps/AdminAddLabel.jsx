import { useEffect } from "react";

export function AdminAddLabel({ label }) {    
  return (
    <div className="add-label-modal">
      {label && <h2>{label.name}</h2>}
    </div>
  );
}