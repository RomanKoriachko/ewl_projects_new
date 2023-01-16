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
                            <input
                                type="checkbox"
                                id="poland"
                                name="poland"
                                className="poland-checkbox"
                                onChange={polandCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxPoland
                                        ? true
                                        : false
                                }
                            />
                            <span className="checkmark"></span>
                            <label htmlFor="poland">Польша</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="czech"
                                name="czech"
                                className="czech-checkbox"
                                onChange={czechCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxCzech
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="czech">Чехия</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="romania"
                                name="romania"
                                className="romania-checkbox"
                                onChange={romaniaCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxRomania
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="romania">Румыния</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="slovakia"
                                name="slovakia"
                                className="slovakia-checkbox"
                                onChange={slovakiaCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxSlovakia
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="slovakia">Словакия</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="lithuania"
                                name="lithuania"
                                className="lithuania-checkbox"
                                onChange={lithuaniaCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxLithuania
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="lithuania">Литва</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="holland"
                                name="holland"
                                className="holland-checkbox"
                                onChange={hollandCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxHolland
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="holland">Голландия</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="germany"
                                name="germany"
                                className="germany-checkbox"
                                onChange={germanyCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxGermany
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="germany">Германия</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="greece"
                                name="greece"
                                className="greece-checkbox"
                                onChange={greeceCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxGreece
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="greece">Греция</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="spain"
                                name="spain"
                                className="spain-checkbox"
                                onChange={spainCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxSpain
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="spain">Испания</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="cyprus"
                                name="cyprus"
                                className="cyprus-checkbox"
                                onChange={cyprusCheckboxChecking}
                                checked={
                                    countryCheckboxState.checkboxCyprus
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="cyprus">Кипр</label>
                        </div>
                    </div>
                </div>
                <div className="filter-sex">
                    <div className="filter-section-header">Пол</div>
                    <div className="filter-wrapper">
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="male"
                                name="male"
                                onChange={maleCheckboxChecking}
                                checked={sexCheckboxState.male ? true : false}
                            />
                            <label htmlFor="male">Мужчины</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="feemale"
                                name="feemale"
                                onChange={femaleCheckboxChecking}
                                checked={sexCheckboxState.female ? true : false}
                            />
                            <label htmlFor="feemale">Женщины</label>
                        </div>
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="couples"
                                name="couples"
                                onChange={couplesCheckboxChecking}
                                checked={
                                    sexCheckboxState.couples ? true : false
                                }
                            />
                            <label htmlFor="couples">Пары</label>
                        </div>
                    </div>
                </div>
                <div className="filter-adult">
                    <div className="filter-wrapper">
                        <div className="filter-item">
                            <input
                                type="checkbox"
                                id="is-minor"
                                name="is-minor"
                                onChange={isMinorChecking}
                                checked={isMinorState ? true : false}
                            />
                            <label htmlFor="is-minor">
                                Берут несовершеннолетних
                            </label>
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
