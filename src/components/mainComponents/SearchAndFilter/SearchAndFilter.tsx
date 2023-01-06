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
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getSearchInput } from 'redux/searchContentReducer'
import {
    clearAllSexCheckboxes,
    setCouplesCheckbox,
    setFemaleCheckbox,
    setMaleCheckbox,
} from 'redux/sexCheckboxReducer'
import './SearchAndFilter.scss'

type Props = {
    setIsMinorState: (prevState: boolean) => void
    setAgeToState: (prevState: number) => void
    isMinorState: boolean
    ageToState: number
}

const SearchAndFilter = ({
    setIsMinorState,
    setAgeToState,
    isMinorState,
    ageToState,
}: Props) => {
    const dispatch = useAppDispatch()
    const countryCheckboxState = useAppSelector(
        (state) => state.countryCheckboxState
    )
    const sexCheckboxState = useAppSelector((state) => state.sexCheckboxState)

    const changeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(getSearchInput(e.target.value))
    }

    // --------------------- Countries Filter ---------------------

    const polandCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(polandChecked('Польша'))
            : dispatch(polandChecked(''))
    }
    const czechCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(czechChecked('Чехия'))
            : dispatch(czechChecked(''))
    }
    const romaniaCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(romaniaChecked('Румыния'))
            : dispatch(romaniaChecked(''))
    }
    const slovakiaCheckboxCheking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(slovakiaChecked('Словакия'))
            : dispatch(slovakiaChecked(''))
    }
    const lithuaniaCheckboxCheking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? dispatch(lithuaniaChecked('Литва'))
            : dispatch(lithuaniaChecked(''))
    }
    const hollandCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(hollandChecked('Голландия'))
            : dispatch(hollandChecked(''))
    }
    const germanyCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(germanyChecked('Германия'))
            : dispatch(germanyChecked(''))
    }
    const greeceCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(greeceChecked('Греция'))
            : dispatch(greeceChecked(''))
    }
    const spainCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(spainChecked('Испания'))
            : dispatch(spainChecked(''))
    }
    const cyprusCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(cyprusChecked('Кипр'))
            : dispatch(cyprusChecked(''))
    }

    // --------------------- Sex Filter ---------------------

    const maleCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(setMaleCheckbox('Мужчины'))
            : dispatch(setMaleCheckbox(''))
    }
    const femaleCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(setFemaleCheckbox('Женщины'))
            : dispatch(setFemaleCheckbox(''))
    }
    const couplesCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? dispatch(setCouplesCheckbox('Пары'))
            : dispatch(setCouplesCheckbox(''))
    }

    // --------------------- is minor filter ---------------------

    const isMinorChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? setIsMinorState(true) : setIsMinorState(false)
    }

    // --------------------- Age to filter ---------------------

    const ageToValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgeToState(parseInt(e.target.value))
    }

    // --------------------- Reser Filter ---------------------

    const resetFilter = () => {
        dispatch(clearAllCountrysCheckboxes())
        dispatch(clearAllSexCheckboxes())
        setIsMinorState(false)
        setAgeToState(NaN)
    }

    return (
        <div className="search-and-filter">
            <div className="search">
                <input
                    type="text"
                    placeholder="Поиск"
                    className="search-input"
                    onChange={changeSeacrchContent}
                />
            </div>
            <div className="filter">
                <p>Фильтр</p>
                <div className="filter-country">
                    <div>Страна</div>
                    <div className="filter-wrapper">
                        <div>
                            <input
                                type="checkbox"
                                id="poland"
                                name="poland"
                                className="poland-checkbox"
                                onChange={polandCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxPoland
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="poland">Польша</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="czech"
                                name="czech"
                                className="czech-checkbox"
                                onChange={czechCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxCzech
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="czech">Чехия</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="romania"
                                name="romania"
                                className="romania-checkbox"
                                onChange={romaniaCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxRomania
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="romania">Румыния</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="slovakia"
                                name="slovakia"
                                className="slovakia-checkbox"
                                onChange={slovakiaCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxSlovakia
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="slovakia">Словакия</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="lithuania"
                                name="lithuania"
                                className="lithuania-checkbox"
                                onChange={lithuaniaCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxLithuania
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="lithuania">Литва</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="holland"
                                name="holland"
                                className="holland-checkbox"
                                onChange={hollandCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxHolland
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="holland">Голландия</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="germany"
                                name="germany"
                                className="germany-checkbox"
                                onChange={germanyCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxGermany
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="germany">Германия</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="greece"
                                name="greece"
                                className="greece-checkbox"
                                onChange={greeceCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxGreece
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="greece">Греция</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="spain"
                                name="spain"
                                className="spain-checkbox"
                                onChange={spainCheckboxCheking}
                                checked={
                                    countryCheckboxState.checkboxSpain
                                        ? true
                                        : false
                                }
                            />
                            <label htmlFor="spain">Испания</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="cyprus"
                                name="cyprus"
                                className="cyprus-checkbox"
                                onChange={cyprusCheckboxCheking}
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
                    <div>Пол</div>
                    <div className="filter-wrapper">
                        <div>
                            <input
                                type="checkbox"
                                id="male"
                                name="male"
                                onChange={maleCheckboxCheking}
                                checked={sexCheckboxState.male ? true : false}
                            />
                            <label htmlFor="male">Мужчины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="feemale"
                                name="feemale"
                                onChange={femaleCheckboxCheking}
                                checked={sexCheckboxState.female ? true : false}
                            />
                            <label htmlFor="feemale">Женщины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="couples"
                                name="couples"
                                onChange={couplesCheckboxCheking}
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
                        <div>
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
                                value={ageToState ? ageToState : ''}
                            />
                            <label htmlFor="age18">Возраст кандидата</label>
                        </div>
                    </div>
                </div>
                <button onClick={() => resetFilter()}>сбросить фильтр</button>
            </div>
        </div>
    )
}

export default SearchAndFilter
