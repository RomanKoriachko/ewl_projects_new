import { CountryCheckboxType, SexCheckboxType } from 'container/Main/Main'
import './SearchAndFilter.scss'

type Props = {
    setSearchContent: (prevState: string) => void
    setCountryCheckboxState: (prevState: CountryCheckboxType) => void
    setSexCheckboxState: (prevState: SexCheckboxType) => void
    setIsMinorState: (prevState: boolean) => void
    setAgeToState: (prevState: number) => void
    countryCheckboxState: CountryCheckboxType
    sexCheckboxState: SexCheckboxType
    isMinorState: boolean
    ageToState: number
}

const SearchAndFilter = ({
    setSearchContent,
    setCountryCheckboxState,
    setSexCheckboxState,
    setIsMinorState,
    setAgeToState,
    countryCheckboxState,
    sexCheckboxState,
    isMinorState,
    ageToState,
}: Props) => {
    const changeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchContent(e.target.value)
    }

    // --------------------- Countries Filter ---------------------

    const polandCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: 'Польша',
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: '',
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const czechCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: 'Чехия',
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: '',
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const romaniaCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: 'Румыния',
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: '',
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const slovakiaCheckboxCheking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: 'Словакия',
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: '',
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const lithuaniaCheckboxCheking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: 'Литва',
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: '',
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const hollandCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: 'Голландия',
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: '',
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const germanyCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: 'Германия',
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: '',
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const greeceCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: 'Греция',
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: '',
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const spainCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: 'Испания',
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: '',
                  checkboxCyprus: prevState.checkboxCyprus,
              }))
    }
    const cyprusCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: 'Кипр',
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxCzech: prevState.checkboxCzech,
                  checkboxRomania: prevState.checkboxRomania,
                  checkboxSlovakia: prevState.checkboxSlovakia,
                  checkboxLithuania: prevState.checkboxLithuania,
                  checkboxHolland: prevState.checkboxHolland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxGreece: prevState.checkboxGreece,
                  checkboxSpain: prevState.checkboxSpain,
                  checkboxCyprus: '',
              }))
    }

    // --------------------- Sex Filter ---------------------

    const maleCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setSexCheckboxState((prevState: SexCheckboxType) => ({
                  male: 'Только мужчины',
                  female: prevState.female,
                  couples: prevState.couples,
              }))
            : /* @ts-ignore */
              setSexCheckboxState((prevState: SexCheckboxType) => ({
                  male: '',
                  female: prevState.female,
                  couples: prevState.couples,
              }))
    }
    const femaleCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setSexCheckboxState((prevState: SexCheckboxType) => ({
                  male: prevState.male,
                  female: 'Только женщины',
                  couples: prevState.couples,
              }))
            : /* @ts-ignore */
              setSexCheckboxState((prevState: SexCheckboxType) => ({
                  male: prevState.male,
                  female: '',
                  couples: prevState.couples,
              }))
    }
    const couplesCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setSexCheckboxState((prevState: SexCheckboxType) => ({
                  male: prevState.male,
                  female: prevState.female,
                  couples: 'Пары',
              }))
            : /* @ts-ignore */
              setSexCheckboxState((prevState: SexCheckboxType) => ({
                  male: prevState.male,
                  female: prevState.female,
                  couples: '',
              }))
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
        setCountryCheckboxState({
            checkboxPoland: '',
            checkboxCzech: '',
            checkboxRomania: '',
            checkboxSlovakia: '',
            checkboxLithuania: '',
            checkboxHolland: '',
            checkboxGermany: '',
            checkboxGreece: '',
            checkboxSpain: '',
            checkboxCyprus: '',
        })
        setSexCheckboxState({
            male: '',
            female: '',
            couples: '',
        })
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
                            <label htmlFor="male">Только мужчины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="feemale"
                                name="feemale"
                                onChange={femaleCheckboxCheking}
                                checked={sexCheckboxState.female ? true : false}
                            />
                            <label htmlFor="feemale">Только женщины</label>
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
                            <label htmlFor="age18">Возраст "До"</label>
                        </div>
                    </div>
                </div>
                <button onClick={() => resetFilter()}>сбросить фильтр</button>
            </div>
        </div>
    )
}

export default SearchAndFilter
