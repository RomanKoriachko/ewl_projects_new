import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { changeFilterState } from 'redux/isFilterOpenReducer'
import SearchAndFilter from '../SearchAndFilter/SearchAndFilter'
import './TabletFilter.scss'

type Props = {}

const TabletFilter = (props: Props) => {
    const isFilterOpenState = useAppSelector((state) => state.isFilterOpenState)
    const dispatch = useAppDispatch()

    // Open Filter
    const onfilterClick = () => {
        if (isFilterOpenState === 'close') {
            dispatch(changeFilterState('open'))
            document.body.style.overflow = 'hidden'
        } else {
            dispatch(changeFilterState('close'))
            document.body.style.overflow = 'auto'
        }
    }

    // filter width
    const filterWidth = 1 + window.innerWidth - window.innerWidth / 5

    return (
        <div className={`tablet-filter show-filter ${isFilterOpenState}`}>
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
