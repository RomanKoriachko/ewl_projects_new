import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useState, useEffect } from 'react'
import EditProject from '../EditProject/EditProject'
import './Projects.scss'
import CopyButton from '@yozora/react-common-copy-button'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getProjectData } from 'redux/editProjectReduser'
import { showLessData, showMoreData } from 'redux/showMoreReducer'
import { setFormState } from 'redux/editFormReducer'
import { getFiltredArrData } from 'redux/filtredArrReducer'
import { Link } from 'react-router-dom'
import { getDataFromServer } from 'helper/getData'
import { CurrentProjectType, NewProjectType } from './NewProjectType'
import { ProjectItem } from './components'
import { setNewDataArr } from 'redux/dataArrReducer'
import { NationalityCheckboxType } from 'redux/nationalityCheckboxReducer'
import {
    CountryCheckboxType,
    setInitialCountries,
} from 'redux/countryCheckboxReducer'

type Props = {}

type ICopyStatus = 'waiting' | 'copying' | 'failed' | 'succeed'

const Projects = (props: Props) => {
    const dataArrState = useAppSelector((state) => state.dataArrState)
    const searchState = useAppSelector((state) => state.searchState)
    const countryCheckboxState = useAppSelector(
        (state) => state.countryCheckboxState
    )
    const genderCheckboxState = useAppSelector(
        (state) => state.genderCheckboxState
    )
    const isMinorState = useAppSelector((state) => state.isMinorState)
    const isActualState = useAppSelector((state) => state.isActualState)
    const sortingState = useAppSelector((state) => state.sortingState)
    const ageSearchState = useAppSelector((state) => state.ageSearchState)
    const filterState = useAppSelector((state) => state.filterState)
    const showMoreState = useAppSelector((state) => state.showMoreState)
    const editFormState = useAppSelector((state) => state.editFormState)
    const nationalityCheckboxState = useAppSelector(
        (state) => state.nationalityCheckboxState
    )
    const dispatch = useAppDispatch()

    // ---------------------- Search ----------------------

    const tempArr: NewProjectType[] = dataArrState.filter(
        (element: NewProjectType) =>
            element.advertisementHtml
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.cityNames
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.companyName
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.jobPositionName
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.typeOfContract
                .toLowerCase()
                .includes(searchState.toLowerCase())
    )

    // ---------------------- country filter ----------------------

    let filtredCountryArr: NewProjectType[] = []

    if (filterState) {
        const activeCountries: string[] = countryCheckboxState
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

    if (filterState) {
        const activeGenders: string[] = genderCheckboxState
            .filter((gender) => gender.checked)
            .map((gender) => gender.name)

        filtredGenderArr = filtredCountryArr.filter((el) => {
            for (const gender of activeGenders) {
                if (
                    el.allowGender.includes(gender) ||
                    el.allowGender.includes('Any')
                ) {
                    return true
                }
            }
            return false
        })
        if (activeGenders.length < 1) {
            filtredGenderArr = filtredCountryArr
        }
    } else {
        filtredGenderArr = filtredCountryArr
    }

    // ---------------------- nationality filter ----------------------

    let filtredNationalityArr: NewProjectType[] = []

    if (filterState) {
        const activeNationalities: string[] = nationalityCheckboxState
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

    // // ---------------------- is actual filter ----------------------

    // let temporaryIsActualArr: ProjectType[] = []

    // if (filterState) {
    //     if (isActualState === 'actual') {
    //         temporaryIsActualArr = temporaryIsMinorArr.filter(
    //             (el: ProjectType) => el.isActual
    //         )
    //     } else if (isActualState === 'notActual') {
    //         temporaryIsActualArr = temporaryIsMinorArr.filter(
    //             (el: ProjectType) => el.isActual === false
    //         )
    //     } else {
    //         temporaryIsActualArr = temporaryIsMinorArr
    //     }
    // } else {
    //     temporaryIsActualArr = temporaryIsMinorArr
    // }
    // if (isActualState === 'actual') {
    //     temporaryIsActualArr = temporaryIsMinorArr.filter(
    //         (el: ProjectType) => el.isActual
    //     )
    // } else if (isActualState === 'notActual') {
    //     temporaryIsActualArr = temporaryIsMinorArr.filter(
    //         (el: ProjectType) => el.isActual === false
    //     )
    // } else {
    //     temporaryIsActualArr = temporaryIsMinorArr
    // }

    // ---------------------- is miner filter ----------------------

    let temporaryIsMinorArr: NewProjectType[] = []

    if (filterState) {
        if (isMinorState) {
            temporaryIsMinorArr = filtredNationalityArr.filter(
                (el: NewProjectType) => el.minAge < 18
            )
        } else {
            temporaryIsMinorArr = filtredNationalityArr
        }
    } else {
        temporaryIsMinorArr = filtredNationalityArr
    }

    // ---------------------- Age to filter ----------------------

    let filtredArr: NewProjectType[] = []

    if (filterState) {
        if (ageSearchState) {
            filtredArr = temporaryIsMinorArr.filter(
                (el: NewProjectType) =>
                    ageSearchState >= el.minAge && ageSearchState <= el.maxAge
            )
        } else {
            filtredArr = temporaryIsMinorArr
        }
    } else {
        filtredArr = temporaryIsMinorArr
    }

    // ---------------------- Sorting filter ----------------------

    if (sortingState === 'name') {
        filtredArr.sort((a, b) => (a.companyName > b.companyName ? 1 : -1))
    } else {
        filtredArr.sort((a, b) => (a.modifiedOn > b.modifiedOn ? -1 : 1))
    }

    console.log(filtredArr)

    // let raw = localStorage.getItem('loginData')
    // let localLoginData: LocalDataType = {
    //     email: '',
    //     password: '',
    //     isLogged: false,
    //     isAdmin: false,
    // }
    // if (raw) {
    //     localLoginData = JSON.parse(raw)
    // }

    // const splitString = (string: string) => {
    //     let arrFromString = string.split(' ')
    //     if (string.includes('\n')) {
    //         arrFromString = string.split('\n')
    //     }
    //     let filtredArrFromString = arrFromString.filter(
    //         (element) => element.length > 0
    //     )
    //     return filtredArrFromString
    // }

    // const getShortString = (string: string) => {
    //     let tempStr
    //     if (string.length > 80) {
    //         tempStr = string.slice(0, 80) + '...'
    //     } else {
    //         tempStr = string
    //     }
    //     return tempStr
    // }

    // change copy button placeholder
    const StatusNodeMap: Record<ICopyStatus, React.ReactNode> = {
        waiting: 'Копіювати',
        copying: 'Копіюю..',
        failed: 'Помилка!',
        succeed: 'Скопійовано!',
    }

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

    useEffect(() => {
        async function getData() {
            getDataFromServer(
                'https://corsproxy.io/?https://platform-prod.ewl.com.pl/job-advertisements/external-job-advertisements'
            )
                .then((result) => {
                    dispatch(setNewDataArr(result.value))
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        }
        getData()
    }, [dispatch])

    // console.log(filtredArr)

    return (
        <div className="projects-content">
            <div
                className={`scroll-up ${
                    scrollUpState ? 'show-scroll-up' : 'hide-scroll-up'
                }`}
                onClick={onScrollUpClick}
            ></div>
            {filtredArr.length === 0 ? (
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
