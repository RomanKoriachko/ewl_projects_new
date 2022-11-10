import { CountryCheckboxType } from 'container/Main/Main'
import './SearchAndFilter.scss'

type Props = {
    setSearchContent: (prevState: string) => void
    setCountryCheckboxState: (prevState: CountryCheckboxType) => void
}

const SearchAndFilter = ({
    setSearchContent,
    setCountryCheckboxState,
}: Props) => {
    const ChangeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchContent(e.target.value)
    }

    const PolandCheckboxCheking = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.checked
            ? /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: 'poland',
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
                  checkboxGermany: 'germany',
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
                  checkboxSlovakia: 'slovakia',
              }))
            : /* @ts-ignore */
              setCountryCheckboxState((prevState: CountryCheckboxType) => ({
                  checkboxPoland: prevState.checkboxPoland,
                  checkboxGermany: prevState.checkboxGermany,
                  checkboxSlovakia: '',
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
            <div className="filter">
                <div className="filter-item">
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
                <div className="filter-item">
                    <div>Стать</div>
                    <div>
                        <input type="checkbox" id="male" name="male" />
                        <label htmlFor="male">Чоловік</label>
                        <input type="checkbox" id="feemale" name="feemale" />
                        <label htmlFor="feemale">Жінка</label>
                        <input type="checkbox" id="couples" name="couples" />
                        <label htmlFor="feemale">Пари</label>
                    </div>
                </div>
                <div className="filter-item">
                    <div>
                        <input type="checkbox" id="underage" name="underage" />
                        <label htmlFor="underage">Беруть неповнолітніх</label>
                    </div>
                </div>
                <div className="filter-item">
                    <div>
                        <input type="text" id="age18" name="age18" />
                        <label htmlFor="age18">Вік "До"</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchAndFilter
