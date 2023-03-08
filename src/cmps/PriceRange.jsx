import { FormControl, InputAdornment, InputLabel, OutlinedInput, Slider, SliderThumb, styled } from "@mui/material";
import { useState } from "react";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { BarChartCmp } from "./BarChartCmp";
import { AirBnbSlider } from "./muiStyles/AirBnbSlider";

export function PriceRange({ spaPrices, handleFilterBy, ranges }) {
    const [maxPrice, setMaxPrice] = useState(0)
    const [avgPrice, setAvgPrice] = useState(0)

    function AirbnbThumbComponent(props) {
        const { children, ...other } = props;
        return (
            <SliderThumb {...other}>
                {children}
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
                <span className="airbnb-bar" />
            </SliderThumb>
        );
    }

    useEffectUpdate(() => {
        calcMaxPrice()
        calcAvgPrice()
    }, [spaPrices])

    function calcMaxPrice() {
        const maxSpaPrice = spaPrices?.reduce((acc, spa) => {
            if (+spa.price > acc) acc = +spa.price
            return acc
        }, 0)
        setMaxPrice(maxSpaPrice)
        handleFilterBy([ranges[0], maxSpaPrice])
    }

    function calcAvgPrice() {
        const avgPrice = spaPrices?.reduce((acc, spa) => {
            acc.price += +spa.price
            acc.count += spa.count
            return acc
        }, { price: 0, count: 0 })
        return setAvgPrice(avgPrice.price / avgPrice.count)
    }

    const valuetext = () => {
        return ranges + 'C'
    }
    const handleChange = (ev, values) => {
        handleFilterBy(values)
    }

    function handleInputChange({ target }) {
        let value = +target.value
        if (isNaN(target.value)) return
        if (!value) value = 0
        const values = target.name === 'min'
            ? [value, ranges[1]]
            : [ranges[0], value]
        handleFilterBy(values)

    }

    return (
        <>
            <span className="avg-price-container">The average spa price is &nbsp;
                <span className="avg-price">
                    {avgPrice.toLocaleString('en-us', { style: 'currency', currency: 'USD' })}
                </span>
            </span>
            <div className="chart-slider-container">
                <BarChartCmp data={spaPrices} values={ranges} />
                <div className="slider-container">
                    <AirBnbSlider
                        slots={{ thumb: AirbnbThumbComponent }}
                        min={0}
                        max={maxPrice}
                        getAriaLabel={() => 'Temperature range'}
                        value={ranges}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext} />
                </div>
            </div>
            <div className="price-range-boxes flex align-center justify-center">
                {/* <FormControl sx={{ m: 1}}>
                    <InputLabel sx={{color:"#8F9BB3"}} htmlFor="outlined-adornment-amount">Min Price</InputLabel>
                    <OutlinedInput
                        sx={{ backgroundColor:"#fff", color:"#8F9BB3", borderColor:'#fff'}}
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Min Price" value={ranges[0]}
                        onChange={handleInputChange} name="min"
                    />
                </FormControl> */}
                <div className="min-price-container flex column">
                    <div className="input-container flex">
                        <span>$</span>
                        <input name="min" id="min-price" type="text" value={ranges[0]} onChange={handleInputChange} />
                    </div>
                    <label htmlFor="min-price">Min Price</label>
                </div>
                <span className="separator"></span>
                <div className="max-price-container flex column">
                    <div className="input-container flex">
                        <span>$</span>
                        <input name="max" id="max-price" type="text" value={ranges[1]} onChange={handleInputChange} />
                    </div>
                    <label htmlFor="max-price">Max Price</label>
                </div>
                {/* <FormControl sx={{ m: 1, border:0 }}>
                    <InputLabel sx={{color:"#8F9BB3"}} htmlFor="outlined-adornment-amount">Max Price</InputLabel>
                    <OutlinedInput
                    sx={{ backgroundColor:"#fff", color:"#8F9BB3", borderColor:'#fff'}}
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Max Price" value={ranges[1]} onChange={handleInputChange} name="max"
                    />
                </FormControl> */}
            </div>

        </>
    )
}