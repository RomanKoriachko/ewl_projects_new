import { CountryCheckboxType, SexCheckboxType } from 'container/Main/Main'
import './SearchAndFilter.scss'

type Props = {
    setSearchContent: (prevState: string) => void
    setCountryCheckboxState: (prevState: CountryCheckboxType) => void
    setSexCheckboxState: (prevState: SexCheckboxType) => void
    setIsMinorState: (prevState: boolean) => void
}

const SearchAndFilter = ({
    setSearchContent,
    setCountryCheckboxState,
    setSexCheckboxState,
    setIsMinorState,
}: Props) => {
    const ChangeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchContent(e.target.value)
    }

    // --------------------- Countries Filter ---------------------

    const PolandCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: 'Польша',
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxSlovakia: prevState.checkboxSlovakia,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: '',
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxSlovakia: prevState.checkboxSlovakia,
              }))
    }
    const GermanyCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxGermany: 'Германия',
                  checkboxSlovakia: prevState.checkboxSlovakia,
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxGermany: '',
                  checkboxSlovakia: prevState.checkboxSlovakia,
              }))
    }
    const SlovakiaCheckboxCheking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxSlovakia: 'Словакия',
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxSlovakia: '',
              }))
    }

    // --------------------- Sex Filter ---------------------

    const MaleCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const FemaleCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const CouplesCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // --------------------- Age from filter ---------------------

    const isMinorChecking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked ? setIsMinorState(true) : setIsMinorState(false)
    }

    return (
        <div className="search-and-filter">
            <input
                type="text"
                placeholder="Пошук"
                className="search"
                onChange={ChangeSeacrchContent}
            />
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
                                onChange={PolandCheckboxCheking}
                            />
                            <label htmlFor="poland">Poland</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="germany"
                                name="germany"
                                className="germany-checkbox"
                                onChange={GermanyCheckboxCheking}
                            />
                            <label htmlFor="germany">Germany</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="slovakia"
                                name="slovakia"
                                className="slovakia-checkbox"
                                onChange={SlovakiaCheckboxCheking}
                            />
                            <label htmlFor="slovakia">Slovakia</label>
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
                                onChange={MaleCheckboxCheking}
                            />
                            <label htmlFor="male">Только мужчины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="feemale"
                                name="feemale"
                                onChange={FemaleCheckboxCheking}
                            />
                            <label htmlFor="feemale">Только женщины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="couples"
                                name="couples"
                                onChange={CouplesCheckboxCheking}
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
                            />
                            <label htmlFor="age18">Возраст "До"</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchAndFilter
