import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { addFilters, clearFilters } from 'redux/filterApplyReducer'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { changeFilterState } from 'redux/isFilterOpenReducer'
import { cleanSearchInput, getSearchInput } from 'redux/searchContentReducer'
import './SearchAndFilter.scss'
import { closeAllTabs } from 'redux/showMoreReducer'
import {
    clearAgeState,
    clearAllFilterFields,
    getAgeFromInput,
    resetActualState,
    resetTypeOfSortingState,
    setInitialCountries,
    setInitialNationalities,
    setIsActualState,
    setTypeOfSortingState,
    toggleCountryCheckbox,
    toggleGenderCheckbox,
    toggleNationalityCheckbox,
} from 'redux/filterStateReducer'

type Props = {}
type FilterClassStateType = {
    countryClass: string
    sexClass: string
    nationalityClass: string
    actualityClass: string
    sortingClass: string
}

const SearchAndFilter = (props: Props) => {
    const searchState = useAppSelector((state) => state.searchState)
    const filterApplyState = useAppSelector((state) => state.filterApplyState)
    const filterState = useAppSelector((state) => state.filterState)

    const dispatch = useAppDispatch()

    // --------------------- Search ---------------------

    const changeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getSearchInput(e.target.value))
        dispatch(closeAllTabs())
    }

    // --------------------- Show filter categories ---------------------

    const [filterClassState, setFilterClassState] =
        useState<FilterClassStateType>({
            countryClass: 'filter-hide',
            sexClass: 'filter-hide',
            nationalityClass: 'filter-hide',
            actualityClass: 'filter-hide',
            sortingClass: 'filter-hide',
        })

    const onShowCountysFilterClick = () => {
        filterClassState.countryClass === 'filter-show'
            ? setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  countryClass: 'filter-hide',
              }))
            : setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  countryClass: 'filter-show',
              }))
    }
    const onShowSexFilterClick = () => {
        filterClassState.sexClass === 'filter-show'
            ? setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  sexClass: 'filter-hide',
              }))
            : setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  sexClass: 'filter-show',
              }))
    }
    const onShowNationalityFilterClick = () => {
        filterClassState.nationalityClass === 'filter-show'
            ? setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  nationalityClass: 'filter-hide',
              }))
            : setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  nationalityClass: 'filter-show',
              }))
    }
    const onShowActualityFilterClick = () => {
        filterClassState.actualityClass === 'filter-show'
            ? setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  actualityClass: 'filter-hide',
              }))
            : setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  actualityClass: 'filter-show',
              }))
    }
    const onShowSortingFilterClick = () => {
        filterClassState.sortingClass === 'filter-show'
            ? setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  sortingClass: 'filter-hide',
              }))
            : setFilterClassState((prevState: FilterClassStateType) => ({
                  ...prevState,
                  sortingClass: 'filter-show',
              }))
    }

    // --------------------- Countries Filter ---------------------

    const dataArrState = useAppSelector((state) => state.dataArrState)
    const countriesState: { [key: string]: boolean } = {}

    dataArrState
        .filter((item: any) => item.recruitmentProjects)
        .flatMap((item: any) =>
            item.recruitmentProjects.map((project: any) => project.countryName)
        )
        .filter((country: string | null) => country !== null)
        .forEach((country: string) => {
            countriesState[country] = false
        })

    const countriesStateArray = Object.keys(countriesState).map((key) => ({
        name: key,
        checked: countriesState[key],
    }))

    useEffect(() => {
        if (filterState.country.length <= 0) {
            dispatch(setInitialCountries(countriesStateArray))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterClassState.countryClass])

    const handleCountryCheckboxChange = (countryName: string) => {
        dispatch(toggleCountryCheckbox(countryName))
    }

    // --------------------- Gender Filter ---------------------

    const handleGenderCheckboxChange = (genderName: string) => {
        dispatch(toggleGenderCheckbox(genderName))
    }

    // --------------------- Nationality filter ---------------------

    const nationalitiesState: { [key: string]: boolean } = {}

    dataArrState
        .filter((item: any) => item.countryRestrictions)
        .flatMap((item: any) =>
            item.countryRestrictions.map((project: any) => project.countryName)
        )
        .filter(
            (country: string | null) => country !== null && country !== 'Rosja'
        )
        .forEach((country: string) => {
            nationalitiesState[country] = false
        })

    const nationalitiesStateArr = Object.keys(nationalitiesState).map(
        (key) => ({
            name: key,
            checked: nationalitiesState[key],
        })
    )

    useEffect(() => {
        if (filterState.nationality.length <= 0) {
            dispatch(setInitialNationalities(nationalitiesStateArr))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterClassState.nationalityClass])

    const handleNationalityCheckboxChange = (nationalityName: string) => {
        dispatch(toggleNationalityCheckbox(nationalityName))
    }

    // --------------------- is actual filter ---------------------

    const onIsActualClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        return dispatch(setIsActualState(e.target.value))
    }

    // --------------------- sorting filter ---------------------

    const onTypeOfSortingClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        return dispatch(setTypeOfSortingState(e.target.value))
    }

    // --------------------- Age to filter ---------------------

    const ageToValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getAgeFromInput(e.target.value))
    }

    // --------------------- Add filters ---------------------

    const onAddFilterClick = () => {
        dispatch(addFilters())
        dispatch(changeFilterState('close'))
        dispatch(closeAllTabs())
        document.body.style.overflow = 'auto'
    }

    // --------------------- Reser Filter ---------------------

    const resetFilter = () => {
        dispatch(clearAgeState())
        dispatch(clearFilters())
        dispatch(resetActualState())
        dispatch(resetTypeOfSortingState())
        dispatch(clearAllFilterFields())
    }

    let isFilterAdded = {
        color: 'white',
        borderColor: '#f18a01',
        backgroundColor: '#f18a01',
    }

    return (
        <div className="search-and-filter">
            <div className="search">
                <div className="row search-and-btn">
                    <input
                        type="text"
                        placeholder="Пошук"
                        className="search-input"
                        onChange={changeSeacrchContent}
                        value={searchState}
                    />
                    <button
                        onClick={() => dispatch(cleanSearchInput())}
                    ></button>
                </div>
            </div>
            <div className="filter">
                <p className="filter-header">Фільтр</p>
                <div className="filter-country">
                    <div
                        className="row filter-category-header"
                        onClick={() => onShowCountysFilterClick()}
                    >
                        <div className="filter-section-header">Країна</div>
                        <div
                            className={`filter-arrow-btn ${filterClassState.countryClass}`}
                        ></div>
                    </div>
                    <div
                        className={`filter-content-wrapper ${filterClassState.countryClass}`}
                    >
                        {filterState.country.map((element) => (
                            <div key={element.name} className="filter-item">
                                <FormControlLabel
                                    label={element.name}
                                    className="filter-checkbox"
                                    control={
                                        <Checkbox
                                            className={`${element.name}-checkbox`}
                                            id={element.name}
                                            name={element.name}
                                            onChange={() =>
                                                handleCountryCheckboxChange(
                                                    element.name
                                                )
                                            }
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#EB6A09',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 20,
                                                },
                                            }}
                                            checked={
                                                element.checked ? true : false
                                            }
                                        />
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="filter-sex">
                    <div
                        className="row filter-category-header"
                        onClick={() => onShowSexFilterClick()}
                    >
                        <div className="filter-section-header">Стать</div>
                        <div
                            className={`filter-arrow-btn ${filterClassState.sexClass}`}
                        ></div>
                    </div>
                    <div
                        className={`filter-content-wrapper ${filterClassState.sexClass}`}
                    >
                        {filterState.gender.map((element) => (
                            <div
                                key={element.genderName}
                                className="filter-item"
                            >
                                <FormControlLabel
                                    label={
                                        element.genderName === 'Male'
                                            ? 'Чоловіки'
                                            : element.genderName === 'Female'
                                            ? 'Жінки'
                                            : 'Пари'
                                    }
                                    className="filter-checkbox"
                                    control={
                                        <Checkbox
                                            id={element.genderName}
                                            name={element.genderName}
                                            onChange={() =>
                                                handleGenderCheckboxChange(
                                                    element.genderName
                                                )
                                            }
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#EB6A09',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 20,
                                                },
                                            }}
                                            checked={
                                                element.genderChecked
                                                    ? true
                                                    : false
                                            }
                                        />
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="filter-nationality">
                    <div
                        className="row filter-category-header"
                        onClick={() => onShowNationalityFilterClick()}
                    >
                        <div className="filter-section-header">
                            Національність
                        </div>
                        <div
                            className={`filter-arrow-btn ${filterClassState.nationalityClass}`}
                        ></div>
                    </div>
                    <div
                        className={`filter-content-wrapper ${filterClassState.nationalityClass}`}
                    >
                        {filterState.nationality.map((element) => (
                            <div key={element.name} className="filter-item">
                                <FormControlLabel
                                    label={element.name}
                                    className="filter-checkbox"
                                    control={
                                        <Checkbox
                                            id={`${element.name}-nationality`}
                                            name={element.name}
                                            onChange={() =>
                                                handleNationalityCheckboxChange(
                                                    element.name
                                                )
                                            }
                                            sx={{
                                                '&.Mui-checked': {
                                                    color: '#EB6A09',
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 20,
                                                },
                                            }}
                                            checked={element.checked}
                                        />
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="filter-is-actual">
                    <FormControl className="filter-radio-wrapper">
                        <div
                            className="row filter-category-header"
                            onClick={() => onShowActualityFilterClick()}
                        >
                            <div className="filter-section-header">
                                Актуальність
                            </div>
                            <div
                                className={`filter-arrow-btn ${filterClassState.actualityClass}`}
                            ></div>
                        </div>
                        <RadioGroup
                            className={`filter-content-wrapper ${filterClassState.actualityClass}`}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="actual"
                            name="radio-buttons-group"
                            value={filterState.actuality.isActual}
                            onChange={onIsActualClick}
                        >
                            <FormControlLabel
                                value="actual"
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                        }}
                                    />
                                }
                                label="Актуальні"
                            />
                            <FormControlLabel
                                value="notActual"
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                        }}
                                    />
                                }
                                label="Не актуальні"
                            />
                            <FormControlLabel
                                value="both"
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                        }}
                                    />
                                }
                                label="Всі"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="filter-sorting">
                    <FormControl className="filter-radio-wrapper">
                        <div
                            className="row filter-category-header"
                            onClick={() => onShowSortingFilterClick()}
                        >
                            <div className="filter-section-header">
                                Сортування
                            </div>
                            <div
                                className={`filter-arrow-btn ${filterClassState.sortingClass}`}
                            ></div>
                        </div>
                        <RadioGroup
                            className={`filter-content-wrapper ${filterClassState.sortingClass}`}
                            aria-labelledby="filter-by-group-label"
                            defaultValue="name"
                            name="radio-buttons-group"
                            value={filterState.sorting.typeOfSorting}
                            onChange={onTypeOfSortingClick}
                        >
                            <FormControlLabel
                                value="name"
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                        }}
                                    />
                                }
                                label="Сортувати по назві"
                            />
                            <FormControlLabel
                                value="date"
                                control={
                                    <Radio
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                        }}
                                    />
                                }
                                label="Сортувати по даті"
                            />
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="filter-age">
                    <div className="filter-wrapper">
                        <div>
                            <input
                                type="text"
                                name="age18"
                                maxLength={2}
                                onChange={ageToValue}
                                value={
                                    filterState.age.age
                                        ? filterState.age.age
                                        : ''
                                }
                            />
                            <label htmlFor="age18">Вік кандидата</label>
                        </div>
                    </div>
                </div>
                <div className="filter-buttons">
                    <button
                        onClick={() => onAddFilterClick()}
                        style={filterApplyState ? isFilterAdded : {}}
                    >
                        Застосувати фільтр
                    </button>
                    <button onClick={() => resetFilter()}>
                        Скинути фільтр
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchAndFilter
