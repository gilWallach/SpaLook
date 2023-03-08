import { Chip } from "@mui/material";
import { Icon } from "./Icon";

export function FacilityChip({ facilities, handleDeleteFacility }) {
  return (
    <div className="flex facilities">
      {facilities &&
        facilities.map((facility) => (
          <Chip
            label={facility}
            key={`chip_${facility}`}
            deleteIcon={<Icon name="Delete" />}
            onDelete={() => handleDeleteFacility(facility)}
          />
        ))}
    </div>
  );
}
