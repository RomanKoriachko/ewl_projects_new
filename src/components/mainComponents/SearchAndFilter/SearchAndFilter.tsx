import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Radio,
    RadioGroup,
    Switch,
} from '@mui/material'
import React, { useState } from 'react'
import { clearAgeState, getAgeFromInput } from 'redux/ageSearchReducer'
import {
    clearAllCountrysCheckboxes,
    cyprusChecked,
    czechChecked,
    germanyChecked,
    greeceChecked,
    hollandChecked,
    lithuaniaChecked,
    polandChecked,
    romaniaChecked,
    slovakiaChecked,
    spainChecked,
} from 'redux/countryCheckboxReducer'
import { addFilters, clearFilters } from 'redux/filterReducer'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { resetActualState, setIsActualState } from 'redux/isActualReducer'
import { changeFilterState } from 'redux/isFilterOpenReducer'
import { setIsMinor } from 'redux/isMinorReducer'
import {
    resetNationality,
    setNationalityCheckbox,
} from 'redux/nationalityCheckboxReducer'
import { cleanSearchInput, getSearchInput } from 'redux/searchContentReducer'
import {
    clearAllSexCheckboxes,
    setCouplesCheckbox,
    setFemaleCheckbox,
    setMaleCheckbox,
} from 'redux/sexCheckboxReducer'
import './SearchAndFilter.scss'

type Props = {}
type FilterClassStateType = {
    countryClass: string
    sexClass: string
    nationalityClass: string
}

const SearchAndFilter = (props: Props) => {
    const dispatch = useAppDispatch()
    const countryCheckboxState = useAppSelector(
        (state) => state.countryCheckboxState
    )
    const sexCheckboxState = useAppSelector((state) => state.sexCheckboxState)
    const isMinorState = useAppSelector((state) => state.isMinorState)
    const isActualState = useAppSelector((state) => state.isActualState)
    const ageSearchState = useAppSelector((state) => state.ageSearchState)
    const searchState = useAppSelector((state) => state.searchState)
    const filterState = useAppSelector((state) => state.filterState)
    const nationalityCheckboxState = useAppSelector(
        (state) => state.nationalityCheckboxState
    )

    const changeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getSearchInput(e.target.value))
    }

    // --------------------- Countries Filter ---------------------

    const polandCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(polandChecked('Польща'))
            : dispatch(polandChecked(''))
    }
    const czechCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(czechChecked('Чехія'))
            : dispatch(czechChecked(''))
    }
    const romaniaCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(romaniaChecked('Румунія'))
            : dispatch(romaniaChecked(''))
    }
    const slovakiaCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(slovakiaChecked('Словаччина'))
            : dispatch(slovakiaChecked(''))
    }
    const lithuaniaCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(lithuaniaChecked('Литва'))
            : dispatch(lithuaniaChecked(''))
    }
    const hollandCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(hollandChecked('Нідерланди'))
            : dispatch(hollandChecked(''))
    }
    const germanyCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(germanyChecked('Німеччина'))
            : dispatch(germanyChecked(''))
    }
    const greeceCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(greeceChecked('Греція'))
            : dispatch(greeceChecked(''))
    }
    const spainCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(spainChecked('Іспанія'))
            : dispatch(spainChecked(''))
    }
    const cyprusCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(cyprusChecked('Кіпр'))
            : dispatch(cyprusChecked(''))
    }

    // --------------------- Sex Filter ---------------------

    const maleCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(setMaleCheckbox('Чоловіки'))
            : dispatch(setMaleCheckbox(''))
    }
    const femaleCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(setFemaleCheckbox('Жінки'))
            : dispatch(setFemaleCheckbox(''))
    }
    const couplesCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(setCouplesCheckbox('Пари'))
            : dispatch(setCouplesCheckbox(''))
    }

    // --------------------- nationality filter ---------------------

    const nationalityFilterClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            setNationalityCheckbox({
                name: e.target.name,
                state: e.target.checked,
            })
        )
    }

    // --------------------- is actual filter ---------------------

    const onIsActualClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        return dispatch(setIsActualState(e.target.value))
    }

    // --------------------- is minor filter ---------------------

    const isMinorChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(setIsMinor(true))
            : dispatch(setIsMinor(false))
    }

    // --------------------- Age to filter ---------------------

    const ageToValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getAgeFromInput(e.target.value))
    }

    // --------------------- Add filters ---------------------

    const onAddFilterClick = () => {
        dispatch(addFilters())
        dispatch(changeFilterState('close'))
    }

    // --------------------- Reser Filter ---------------------

    const resetFilter = () => {
        dispatch(clearAllCountrysCheckboxes())
        dispatch(clearAllSexCheckboxes())
        dispatch(setIsMinor(false))
        dispatch(clearAgeState())
        dispatch(clearFilters())
        dispatch(resetActualState())
        dispatch(resetNationality())
    }

    let isFilterAdded = {
        color: 'white',
        borderColor: '#f18a01',
        backgroundColor: '#f18a01',
    }

    // --------------------- Show filter categories ---------------------

    const [filterClassState, setFilterClassState] =
        useState<FilterClassStateType>({
            countryClass: 'filter-hide',
            sexClass: 'filter-hide',
            nationalityClass: 'filter-hide',
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
                        className={`filter-wrapper ${filterClassState.countryClass}`}
                    >
                        <div className="filter-item">
                            <FormControlLabel
                                label="Польща"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="poland-checkbox"
                                        id="poland"
                                        name="poland"
                                        onChange={polandCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxPoland
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Чехія"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="czech-checkbox"
                                        id="czech"
                                        name="czech"
                                        onChange={czechCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxCzech
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Румунія"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="romania-checkbox"
                                        id="romania"
                                        name="romania"
                                        onChange={romaniaCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxRomania
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Словаччина"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="slovakia-checkbox"
                                        id="slovakia"
                                        name="slovakia"
                                        onChange={slovakiaCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxSlovakia
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Литва"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="lithuania-checkbox"
                                        id="lithuania"
                                        name="lithuania"
                                        onChange={lithuaniaCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxLithuania
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Нідерланди"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="holland-checkbox"
                                        id="holland"
                                        name="holland"
                                        onChange={hollandCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxHolland
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Німеччина"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="germany-checkbox"
                                        id="germany"
                                        name="germany"
                                        onChange={germanyCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxGermany
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Греція"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="greece-checkbox"
                                        id="greece"
                                        name="greece"
                                        onChange={greeceCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxGreece
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Іспанія"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="spain-checkbox"
                                        id="spain"
                                        name="spain"
                                        onChange={spainCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxSpain
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Кіпр"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        className="cyprus-checkbox"
                                        id="cyprus"
                                        name="cyprus"
                                        onChange={cyprusCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            countryCheckboxState.checkboxCyprus
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
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
                        className={`filter-wrapper ${filterClassState.sexClass}`}
                    >
                        <div className="filter-item">
                            <FormControlLabel
                                label="Чоловіки"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        id="male"
                                        name="male"
                                        onChange={maleCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            sexCheckboxState.male ? true : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Жінки"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        id="feemale"
                                        name="feemale"
                                        onChange={femaleCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            sexCheckboxState.female
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Пари"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        id="couples"
                                        name="couples"
                                        onChange={couplesCheckboxChecking}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            sexCheckboxState.couples
                                                ? true
                                                : false
                                        }
                                    />
                                }
                            />
                        </div>
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
                        className={`filter-wrapper ${filterClassState.nationalityClass}`}
                    >
                        <div className="filter-item">
                            <FormControlLabel
                                label="Україна"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        id="ukraine-nationality"
                                        name="ukraine"
                                        onChange={nationalityFilterClick}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            nationalityCheckboxState.ukraine
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Молдова"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        id="moldova-nationality"
                                        name="moldova"
                                        onChange={nationalityFilterClick}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            nationalityCheckboxState.moldova
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Грузія"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        id="georgia-nationality"
                                        name="georgia"
                                        onChange={nationalityFilterClick}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            nationalityCheckboxState.georgia
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Вірменія"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        id="virmenia-nationality"
                                        name="virmenia"
                                        onChange={nationalityFilterClick}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            nationalityCheckboxState.virmenia
                                        }
                                    />
                                }
                            />
                        </div>
                        <div className="filter-item">
                            <FormControlLabel
                                label="Білорусь"
                                className="filter-checkbox"
                                control={
                                    <Checkbox
                                        id="bilorus-nationality"
                                        name="bilorus"
                                        onChange={nationalityFilterClick}
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                            '& .MuiSvgIcon-root': {
                                                fontSize: 20,
                                            },
                                        }}
                                        checked={
                                            nationalityCheckboxState.bilorus
                                        }
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="filter-is-actual">
                    <FormControl>
                        <FormLabel
                            className="is-actual-label"
                            id="demo-radio-buttons-group-label"
                        >
                            Актуальність
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="actual"
                            name="radio-buttons-group"
                            value={isActualState}
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
                <div className="filter-adult">
                    <div className="filter-wrapper">
                        <div className="filter-item">
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color="warning"
                                            onChange={isMinorChecking}
                                            checked={
                                                isMinorState ? true : false
                                            }
                                        />
                                    }
                                    label="Для неповнолітніх"
                                />
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="filter-age">
                    <div className="filter-wrapper">
                        <div>
                            <input
                                type="text"
                                name="age18"
                                maxLength={2}
                                onChange={ageToValue}
                                value={ageSearchState ? ageSearchState : ''}
                            />
                            <label htmlFor="age18">Вік кандидата</label>
                        </div>
                    </div>
                </div>
                <div className="filter-buttons">
                    <button
                        onClick={() => onAddFilterClick()}
                        style={filterState ? isFilterAdded : {}}
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
