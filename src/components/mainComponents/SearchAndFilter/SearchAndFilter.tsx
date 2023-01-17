import { Checkbox, FormControlLabel, FormGroup, Switch } from '@mui/material'
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
import { setIsMinor } from 'redux/isMinorReducer'
import { cleanSearchInput, getSearchInput } from 'redux/searchContentReducer'
import {
    clearAllSexCheckboxes,
    setCouplesCheckbox,
    setFemaleCheckbox,
    setMaleCheckbox,
} from 'redux/sexCheckboxReducer'
import './SearchAndFilter.scss'

type Props = {}

const SearchAndFilter = (props: Props) => {
    const dispatch = useAppDispatch()
    const countryCheckboxState = useAppSelector(
        (state) => state.countryCheckboxState
    )
    const sexCheckboxState = useAppSelector((state) => state.sexCheckboxState)
    const isMinorState = useAppSelector((state) => state.isMinorState)
    const ageSearchState = useAppSelector((state) => state.ageSearchState)
    const searchState = useAppSelector((state) => state.searchState)
    const filterState = useAppSelector((state) => state.filterState)

    const changeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getSearchInput(e.target.value))
    }

    // --------------------- Countries Filter ---------------------

    const polandCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(polandChecked('Польша'))
            : dispatch(polandChecked(''))
    }
    const czechCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(czechChecked('Чехия'))
            : dispatch(czechChecked(''))
    }
    const romaniaCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(romaniaChecked('Румыния'))
            : dispatch(romaniaChecked(''))
    }
    const slovakiaCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(slovakiaChecked('Словакия'))
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
            ? dispatch(hollandChecked('Голландия'))
            : dispatch(hollandChecked(''))
    }
    const germanyCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(germanyChecked('Германия'))
            : dispatch(germanyChecked(''))
    }
    const greeceCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(greeceChecked('Греция'))
            : dispatch(greeceChecked(''))
    }
    const spainCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(spainChecked('Испания'))
            : dispatch(spainChecked(''))
    }
    const cyprusCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(cyprusChecked('Кипр'))
            : dispatch(cyprusChecked(''))
    }

    // --------------------- Sex Filter ---------------------

    const maleCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(setMaleCheckbox('Мужчины'))
            : dispatch(setMaleCheckbox(''))
    }
    const femaleCheckboxChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(setFemaleCheckbox('Женщины'))
            : dispatch(setFemaleCheckbox(''))
    }
    const couplesCheckboxChecking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(setCouplesCheckbox('Пары'))
            : dispatch(setCouplesCheckbox(''))
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

    // --------------------- Reser Filter ---------------------

    const resetFilter = () => {
        dispatch(clearAllCountrysCheckboxes())
        dispatch(clearAllSexCheckboxes())
        dispatch(setIsMinor(false))
        dispatch(clearAgeState())
        dispatch(clearFilters())
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
                        placeholder="Поиск"
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
                <p className="filter-header">Фильтр</p>
                <div className="filter-country">
                    <div className="filter-section-header">Страна</div>
                    <div className="filter-wrapper">
                        <div className="filter-item">
                            <FormControlLabel
                                label="Польша"
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
                                label="Чехия"
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
                                label="Румыния"
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
                                label="Словакия"
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
                                label="Голландия"
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
                                label="Германия"
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
                                label="Греция"
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
                                label="Испания"
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
                                label="Кипр"
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
                    <div className="filter-section-header">Пол</div>
                    <div className="filter-wrapper">
                        <div className="filter-item">
                            <FormControlLabel
                                label="Мужчины"
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
                                label="Женщины"
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
                                label="Пары"
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
                                id="age18"
                                name="age18"
                                maxLength={2}
                                onChange={ageToValue}
                                value={ageSearchState ? ageSearchState : ''}
                            />
                            <label htmlFor="age18">Возраст кандидата</label>
                        </div>
                    </div>
                </div>
                <div className="filter-buttons">
                    <button
                        onClick={() => dispatch(addFilters())}
                        style={filterState ? isFilterAdded : {}}
                    >
                        применить фильтр
                    </button>
                    <button onClick={() => resetFilter()}>
                        сбросить фильтр
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SearchAndFilter
