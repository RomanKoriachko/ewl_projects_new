import { useState } from 'react'
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import './TabletFilter.scss'

type Props = {}

const TabletFilter = (props: Props) => {
    const [isFilteOpen, setIsFilteOpen] = useState<string>('close')

    // Open Filter
    const onfilterClick = () => {
        if (isFilteOpen === 'close') {
            setIsFilteOpen('open')
        } else {
            setIsFilteOpen('close')
        }
    }

    // Disable scroll
    if (isFilteOpen === 'open') {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }

    // filter width
    const filterWidth = 1 + window.innerWidth - window.innerWidth / 5

    return (
        <div className={`tablet-filter show-filter ${isFilteOpen}`}>
            <button
                className="filter-button"
                onClick={() => onfilterClick()}
            ></button>
            <div className="filter-wrapper">
                <div
                    className="filter-content"
                    style={{
                        width: filterWidth,
                    }}
                >
                    <SearchAndFilter />
                </div>
            </div>
        </div>
    )
}

export default TabletFilter
