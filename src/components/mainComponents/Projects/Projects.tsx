import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getDataFromServer } from 'helper/getDataFromServer'
import { NewProjectType } from './NewProjectType'
import { ProjectItem } from './components'
import { setNewDataArr } from 'redux/dataArrReducer'
import {
    ActualProjectsType,
    addToActualProjectState,
} from 'redux/actualProjectsReducer'
import { getFiltredArrData } from 'redux/filtredArrReducer'

import './Projects.scss'

type Props = {}

const Projects = (props: Props) => {
    const dataArrState = useAppSelector((state) => state.dataArrState)
    const searchState = useAppSelector((state) => state.searchState)
    const filterApplyState = useAppSelector((state) => state.filterApplyState)
    const filterState = useAppSelector((state) => state.filterState)

    const dispatch = useAppDispatch()

    const [loadingState, setLoadingState] = useState(false)

    useEffect(() => {
        async function getData() {
            setLoadingState(true)
            getDataFromServer('/job-advertisements/external-job-advertisements')
                .then((result) => {
                    setLoadingState(false)
                    dispatch(setNewDataArr(result.value))
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        }
        getData()
    }, [dispatch])

    // ---------------------- Search ----------------------

    const tempArr: NewProjectType[] = dataArrState.filter(
        (element: NewProjectType) =>
            (element.advertisementHtml &&
                element.advertisementHtml
                    .toLowerCase()
                    .includes(searchState.toLowerCase())) ||
            (element.cityNames &&
                element.cityNames
                    .toLowerCase()
                    .includes(searchState.toLowerCase())) ||
            (element.companyName &&
                element.companyName
                    .toLowerCase()
                    .includes(searchState.toLowerCase())) ||
            (element.jobPositionName &&
                element.jobPositionName
                    .toLowerCase()
                    .includes(searchState.toLowerCase())) ||
            (element.typeOfContract &&
                element.typeOfContract
                    .toLowerCase()
                    .includes(searchState.toLowerCase())) ||
            element.id.includes(searchState)
    )

    // ---------------------- country filter ----------------------

    let filtredCountryArr: NewProjectType[] = []

    if (filterApplyState) {
        const activeCountries: string[] = filterState.country
            .filter((country) => country.checked)
            .map((country) => country.name)

        filtredCountryArr = tempArr.filter((el) => {
            for (const project of el.recruitmentProjects || []) {
                if (activeCountries.includes(project.countryName)) {
                    return true
                }
            }
            return false
        })
        if (activeCountries.length < 1) {
            filtredCountryArr = tempArr
        }
    } else {
        filtredCountryArr = tempArr
    }

    // ---------------------- gender filter ----------------------

    let filtredGenderArr: NewProjectType[] = []

    if (filterApplyState) {
        const activeGenders: string[] = filterState.gender
            .filter((gender) => gender.genderChecked)
            .map((gender) => gender.genderName)

        filtredGenderArr = filtredCountryArr.filter((el) =>
            el.recruitmentProjects.some((vacancy) => {
                if (
                    activeGenders.includes('Male') &&
                    vacancy.numberOfManVacancies > 0
                ) {
                    return true
                }

                if (
                    activeGenders.includes('Female') &&
                    vacancy.numberOfWomanVacancies > 0
                ) {
                    return true
                }

                if (
                    activeGenders.includes('Couples') &&
                    vacancy.numberOfAnyGenderVacancies > 0
                ) {
                    return true
                }
                return false
            })
        )
        if (activeGenders.length < 1) {
            filtredGenderArr = filtredCountryArr
        }
    } else {
        filtredGenderArr = filtredCountryArr
    }

    // ---------------------- nationality filter ----------------------

    let filtredNationalityArr: NewProjectType[] = []

    if (filterApplyState) {
        const activeNationalities: string[] = filterState.nationality
            .filter((nationality) => nationality.checked)
            .map((nationality) => nationality.name)

        filtredNationalityArr = filtredGenderArr.filter((el) => {
            for (const nationality of el.countryRestrictions || []) {
                if (activeNationalities.includes(nationality.countryName)) {
                    return true
                }
            }
            return false
        })
        if (activeNationalities.length < 1) {
            filtredNationalityArr = filtredGenderArr
        }
    } else {
        filtredNationalityArr = filtredGenderArr
    }

    //  ---------------------- is actual filter ----------------------

    const processVacancies = () => {
        const date = new Date()
        const currentDate = date.toISOString()
        const actualProjects: ActualProjectsType[] = []

        dataArrState.forEach((vacancy) => {
            let isActual = false
            vacancy.recruitmentProjects.forEach((project) => {
                if (
                    project.vacancies.currentSumOfAllVacancies > 0 &&
                    (!project.projectEndDate ||
                        project.projectEndDate > currentDate)
                ) {
                    isActual = true
                }
            })

            actualProjects.push({ id: vacancy.id, isActual })
        })

        return actualProjects
    }

    useEffect(() => {
        dispatch(addToActualProjectState(processVacancies()))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataArrState.length])

    const actualProjectsState = useAppSelector(
        (state) => state.actualProjectsState
    )
    let temporaryIsActualArr: NewProjectType[] = []

    if (filterState.actuality.isActual === 'actual') {
        temporaryIsActualArr = filtredNationalityArr.filter(
            (el: NewProjectType) => {
                return actualProjectsState.some(
                    (element) => element.id === el.id && element.isActual
                )
            }
        )
    } else if (filterState.actuality.isActual === 'notActual') {
        temporaryIsActualArr = filtredNationalityArr.filter(
            (el: NewProjectType) => {
                return actualProjectsState.some(
                    (element) => element.id === el.id && !element.isActual
                )
            }
        )
    } else {
        temporaryIsActualArr = filtredNationalityArr
    }

    // ---------------------- Age to filter ----------------------

    let filtredArr: NewProjectType[] = []

    if (filterApplyState) {
        if (filterState.age.age) {
            filtredArr = temporaryIsActualArr.filter(
                (el: NewProjectType) =>
                    filterState.age.age >= el.minAge &&
                    filterState.age.age <= el.maxAge
            )
        } else {
            filtredArr = temporaryIsActualArr
        }
    } else {
        filtredArr = temporaryIsActualArr
    }

    // ---------------------- Sorting filter ----------------------

    if (filterState.sorting.typeOfSorting === 'name') {
        filtredArr.sort((a, b) => (a.companyName > b.companyName ? 1 : -1))
    } else {
        filtredArr.sort((a, b) => (a.modifiedOn > b.modifiedOn ? -1 : 1))
    }

    useEffect(() => {
        dispatch(getFiltredArrData(filtredArr))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtredArr.length])

    // enable scroll up button

    const [scrollUpState, setScrollUpState] = useState<boolean>(false)
    window.addEventListener('scroll', function () {
        window.scrollY > 2000 ? setScrollUpState(true) : setScrollUpState(false)
    })

    // scroll up function

    const onScrollUpClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    // console.log(filtredArr)

    return (
        <div className="projects-content">
            <div
                className={`scroll-up ${
                    scrollUpState ? 'show-scroll-up' : 'hide-scroll-up'
                }`}
                onClick={onScrollUpClick}
            ></div>
            {loadingState ? (
                <div className="loading"></div>
            ) : filtredArr.length === 0 ? (
                <div className="no-search-results">Співпадінь нема</div>
            ) : (
                <div className="projects">
                    {filtredArr.map((vacancy) => (
                        <ProjectItem key={vacancy.id} vacancy={vacancy} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Projects
