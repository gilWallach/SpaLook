
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from "@mui/material";

export function DatePicker({ handleChange, id }) {
    // Date range
    // const [selectionRange, setSelectionRange] = useState({
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     key: 'selection',
    //   });

    //   function handleSelect({selection:ranges}){
    //     console.log(ranges);
    //     setSelectionRange(ranges)
    //   }

    // return(
    //     <DateRangePicker
    //     ranges={[selectionRange]}
    //     onChange={handleSelect}
    //   />
    // )

    //Single Date Picker
    const [value, setValue] = useState(null);

    function dateChange(value) {
        setValue(value)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
                onAccept={() => { handleChange(value) }}
                label="Add Dates"
                value={value}
                onChange={(value) => dateChange(value)}
                renderInput={(params) => <TextField {...params}
                mindate={Date.now()}
                className="date-picker"
                />}
            />
        </LocalizationProvider>
    )
}