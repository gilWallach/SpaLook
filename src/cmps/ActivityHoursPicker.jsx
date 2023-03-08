import React, { useState } from "react";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function ActivityHoursPicker({ day, activityHours, handleActivityHoursChange }) {
  const { from, to } = activityHours;
  const [value, setValue] = useState([from, to]);

  useEffectUpdate(() => {
    value 
    ? handleActivityHoursChange(day, value)
    : handleActivityHoursChange(day,['',''])
    }, [value]);

  return (
    <div className="flex space-between">
      <span>{day.charAt(0).toUpperCase() + day.slice(1)}:</span>
      <TimeRangePicker onChange={setValue} value={value} />
    </div>
  );
}
