import './SearchAndFilter.scss'

type Props = {
    searchContent: string
    setSearchContent: (prevState: string) => void
}

const SearchAndFilter = ({ searchContent, setSearchContent }: Props) => {
    const ChangeSeacrchContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchContent(e.target.value)
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
        </div>
    )
}

export default SearchAndFilter
