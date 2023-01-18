import { useState } from 'react'
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import './TabletFilter.scss'

type Props = {}

const TabletFilter = (props: Props) => {
    const [filterState, setFilterState] = useState<string>('hide-filter')
    const [isFilteOpen, setIsFilteOpen] = useState<string>('close')

    // // Show filter button
    // window.addEventListener('scroll', function () {
    //     if (window.scrollY > 600) {
    //         setFilterState('show-filter')
    //     } else {
    //         setFilterState('hide-filter')
    //     }
    // })

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

    window.addEventListener('scroll', function () {
        console.log(window.scrollY)
    })

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
