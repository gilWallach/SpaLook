import { Autocomplete, FormControl, InputAdornment, InputLabel, MenuItem, Popper, Select, styled, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";
import { useForm } from "../customHooks/useForm"
import { useNavigateSearch } from "../customHooks/useNavigateSearch";
import { spaService } from "../services/spa.service";
import { DatePicker } from "./DatePicker";
import { Icon } from "./Icon";
import { LocationList } from "./LocationList";
import { PreviewCarousel } from "./PreviewCarousel";


export function SpaFilter(props) {
    const locations = useSelector((state) => state.categoryModule.locations)
    const [filterBy, handleChange, setFilterBy] = useForm({ ...props.filterBy })
    const [searches, setSearches] = useState([
        {
            title: 'Haifa',
            category: 'Popular Searches'
        },
        {
            title: 'Tel Aviv',
            category: 'Popular Searches'
        },
    ])
    const [carouselSpas, setCarouselSpas] = useState(null)
    // Style for autocomplete popper

    const areaSearches = [
        {
            title: 'Haifa',
            category: 'Areas',
            filterBy: {...spaService.getemptyFilterBy(), txt:'Haifa'}
        },
        {
            title: 'Tel Aviv',
            category: 'Areas',
            filterBy: {...spaService.getemptyFilterBy(), txt:'Tel Aviv'}
        },
    ]
    const [spaSearches, setSpaSearches] = useState(null)

    const navigate = useNavigate()
    const navigateSearch = useNavigateSearch()

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    useEffect(() => {
        loadSpasForList()
        loadSpasForCarousel()
    }, [])


    useEffectUpdate(() => {
        setFilterBy({ ...props.filterBy })
    }, [props.filterBy])

    async function loadSpasForList() {
        const spas = await spaService.query({})
        const spaForSearch = spas.map(spa => ({ title: spa.name, category: 'Spa', id: spa._id }))
        setSpaSearches(spaForSearch)
    }

    async function loadSpasForCarousel() {
        const spas = await spaService.query({})
        setCarouselSpas(spas)
    }

    async function handleAutoComplete(ev, txt) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, txt }))

        if (txt) setSearches([...areaSearches, ...spaSearches])
        else setSearches([{
            title: 'Haifa',
            category: 'Popular Searches'
        },
        {
            title: 'Tel Aviv',
            category: 'Popular Searches'
        },])
        // getSpasForSearch(txt)
    }

    // Getting new spas from service for displaying in autocomplete list after each types
    // Debounce for minimizing calls to service, callback to make debounce work
    // const getSpasForSearch = useCallback(utilService.debounce(async (txt) => {
    //     const spas = await spaService.query({ txt })
    //     const spaForSearch = spas.map(spa => ({ title: spa.name, category: 'Spa', id:spa._id }))
    //     setSearches([...areaSearches, ...spaForSearch])
    // }
    //     , 500), [])

    function checkIfSpa(option) {
        if (!option) return
        option.category === 'Spa'
        ? navigate(`/spa/${option.id}`)
        : navigateSearch('/search', option.filterBy)
        props.closeModal()
    }

    const handleMapClick = useCallback(() => {
        props.closeModal()
    }

    )
    // for when dates are added
    // const setDate = useCallback((date) => {
    //     setFilterBy((prevFilterBy) => ({ ...prevFilterBy, date }))
    // })

    return (
        <section className="filter flex column">
            <form className="full-grow flex column space-between" onSubmit={(ev) => props.onChangeFilter(ev, { ...filterBy })}>
                <div className="where flex column">
                    <h2>Where to?</h2>

                    <Autocomplete
                        options={searches.sort((searchA, searchB) => searchA.category.localeCompare(searchB.category))}
                        sx={{ width: 300}}

                        renderInput={(params) => {
                            params.InputProps.startAdornment = (
                                <>
                                    <InputAdornment children position="start">{<Icon name="Search" />}</InputAdornment>
                                    {params.InputProps.startAdornment}
                                </>
                            )
                            return <TextField name="txt" onChange={handleChange} {...params} placeholder="Search Spa, Region or Town" />
                        }}
                        renderOption={(props, option, state) => {
                            return (
                                <li {...props} style={{ backgroundColor: 'transparent'}}>{
                                    <div className="autocomplete-item flex align-center">
                                        <div className="svg-container flex auto-center">
                                            {option.category === 'Spa' ? <Icon name="Spa" /> : <Icon name="Marker" />}
                                        </div>
                                        {option.title}
                                    </div>
                                }</li>
                            ); //display value
                        }}
                        classes={{ 'paper': 'paper' }}
                        popupIcon={<div></div>}
                        label="Search a spa"
                        value={filterBy.txt}
                        inputValue={filterBy.txt}
                        onInputChange={handleAutoComplete}
                        id="txt"
                        name="txt"
                        // onClose={(option, options)=>checkIfSpa(option,options)}
                        onChange={(ev, option) => checkIfSpa(option)}
                        isOptionEqualToValue={() => true}
                        groupBy={(option) => option.category}
                        getOptionLabel={(option) => {
                            if (option['title'])
                                return option['title']
                            if (typeof option === 'string')
                                return option
                            return ''
                        }}
                    />
                    {locations && <LocationList handleClick={handleMapClick} labels={locations} selectedCity={filterBy.txt} />}
                    {carouselSpas && carouselSpas.length && <PreviewCarousel spas={carouselSpas} isModal={true} />}
                </div>                
            </form>
        </section>

    )
}