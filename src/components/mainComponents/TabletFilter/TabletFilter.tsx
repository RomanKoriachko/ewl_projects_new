import { useState } from 'react'
import './TabletFilter.scss'

type Props = {}

const TabletFilter = (props: Props) => {
    const [filterState, setFilterState] = useState<string>('hide-filter')

    window.addEventListener('scroll', function () {
        if (window.scrollY > 1500) {
            setFilterState('show-filter')
        } else {
            setFilterState('hide-filter')
        }
    })

    return (
        <div className={`tablet-filter ${filterState}`}>
            <div className="filter-wrapper"></div>
        </div>
    )
}

export default TabletFilter
