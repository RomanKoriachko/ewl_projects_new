import { CountryCheckboxType } from 'container/Main/Main'
import './SearchAndFilter.scss'

type Props = {
    countryCheckboxState: CountryCheckboxType
    setSearchContent: (prevState: string) => void
    setCountryCheckboxState: (prevState: CountryCheckboxType) => void
}

const SearchAndFilter = ({
    countryCheckboxState,
    setSearchContent,
    setCountryCheckboxState,
}: Props) => {
    const ChangeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchContent(e.target.value)
    }

    // країна, стать, вік, регіон

    const PolandCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setCountryCheckboxState((prevState: CountryCheckboxType) => ({
            checkboxPoland: e.target.checked,
            checkboxGermany: prevState.checkboxGermany,
            checkboxSlovakia: prevState.checkboxSlovakia,
        }))
    }
    const GermanyCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setCountryCheckboxState((prevState: CountryCheckboxType) => ({
            checkboxPoland: prevState.checkboxPoland,
            checkboxGermany: e.target.checked,
            checkboxSlovakia: prevState.checkboxSlovakia,
        }))
    }
    const SlovakiaCheckboxCheking = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setCountryCheckboxState((prevState: CountryCheckboxType) => ({
            checkboxPoland: prevState.checkboxPoland,
            checkboxGermany: prevState.checkboxGermany,
            checkboxSlovakia: e.target.checked,
        }))
    }

    return (
        <div className="search-and-filter">
            <input
                type="text"
                placeholder="Пошук"
                className="search"
                onChange={ChangeSeacrchContent}
            />
            <button className="filters-btn">Filters</button>
            <div className="filter">
                <div>Країна</div>
                <div>
                    <input
                        type="checkbox"
                        id="poland"
                        name="poland"
                        className="poland-checkbox"
                        onChange={PolandCheckboxCheking}
                    />
                    <label htmlFor="poland">Poland</label>
                    <input
                        type="checkbox"
                        id="germany"
                        name="germany"
                        className="germany-checkbox"
                        onChange={GermanyCheckboxCheking}
                    />
                    <label htmlFor="germany">Germany</label>
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
    )
}

export default SearchAndFilter
