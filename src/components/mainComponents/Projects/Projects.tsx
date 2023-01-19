import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useState, useEffect } from 'react'
import EditProject from '../EditProject/EditProject'
import './Projects.scss'
import CopyButton from '@yozora/react-common-copy-button'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getProjectData } from 'redux/editProjectReduser'
import { showLessData, showMoreData } from 'redux/ShowMoreReducer'
import { setFormState } from 'redux/editFormReducer'

type Props = {}

type ProjectType = {
    country: string
    salary: string
    projectName: string
    location: string
    sex: string
    ageFrom: string
    ageTo: string
    nationalaty: string
    additionalInfo: string
    housing: string
    projectInfo: string
    category: string
    isActual: boolean
}

type ICopyStatus = 'waiting' | 'copying' | 'failed' | 'succeed'

const Projects = (props: Props) => {
    const searchState = useAppSelector((state) => state.searchState)
    const countryCheckboxState = useAppSelector(
        (state) => state.countryCheckboxState
    )
    const sexCheckboxState = useAppSelector((state) => state.sexCheckboxState)
    const isMinorState = useAppSelector((state) => state.isMinorState)
    const ageSearchState = useAppSelector((state) => state.ageSearchState)
    const filterState = useAppSelector((state) => state.filterState)
    const showMoreState = useAppSelector((state) => state.showMoreState)
    const editFormState = useAppSelector((state) => state.editFormState)
    const dispatch = useAppDispatch()

    const [projectsArr, setProjectsArr] = useState<ProjectType[]>([])

    useEffect(() => {
        const dbEffect = getDatabase()
        const starCountRefEffect = ref(dbEffect, `vacancy/`)
        onValue(starCountRefEffect, (snapshot) => {
            let data = snapshot.val()
            setProjectsArr(Object.values(data))
        })
    }, [projectsArr.length])

    const db = getDatabase()

    const deliteProject = (project: string) => {
        set(ref(db, `vacancy/${project}/`), {
            country: null,
            salary: null,
            projectName: null,
            location: null,
            sex: null,
            ageFrom: null,
            ageTo: null,
            nationalaty: null,
            additionalInfo: null,
            housing: null,
            projectInfo: null,
            category: null,
            isActual: null,
        })
    }

    const edit = (
        project: string,
        country: string,
        salary: string,
        location: string,
        sex: string,
        ageFrom: string,
        ageTo: string,
        nationalaty: string,
        additionalInfo: string,
        housing: string,
        projectInfo: string,
        category: string,
        isActual: boolean
    ) => {
        dispatch(
            getProjectData({
                projectName: project,
                country: country,
                project: project,
                salary: salary,
                location: location,
                sex: sex,
                ageFrom: ageFrom,
                ageTo: ageTo,
                nationalaty: nationalaty,
                additionalInfo: additionalInfo,
                housing: housing,
                projectInfo: projectInfo,
                category: category,
                isActual: isActual,
            })
        )
        editFormState
            ? dispatch(setFormState(false))
            : dispatch(setFormState(true))
    }

    // ---------------------- Search ----------------------

    const tempArr: ProjectType[] = projectsArr.filter(
        (element: ProjectType) =>
            element.country.toLowerCase().includes(searchState.toLowerCase()) ||
            element.salary.toLowerCase().includes(searchState.toLowerCase()) ||
            element.projectName
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.location
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.sex.toLowerCase().includes(searchState.toLowerCase()) ||
            element.ageFrom.toLowerCase().includes(searchState.toLowerCase()) ||
            element.ageTo.toLowerCase().includes(searchState.toLowerCase()) ||
            element.nationalaty
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.additionalInfo
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.housing.toLowerCase().includes(searchState.toLowerCase()) ||
            element.projectInfo
                .toLowerCase()
                .includes(searchState.toLowerCase()) ||
            element.category.toLowerCase().includes(searchState.toLowerCase())
    )

    // ---------------------- country filter ----------------------

    let filtredCountryArr: ProjectType[] = []
    let temporaryCountryArr1: ProjectType[] = []
    let temporaryCountryArr2: ProjectType[] = []
    let temporaryCountryArr3: ProjectType[] = []
    let temporaryCountryArr4: ProjectType[] = []
    let temporaryCountryArr5: ProjectType[] = []
    let temporaryCountryArr6: ProjectType[] = []
    let temporaryCountryArr7: ProjectType[] = []
    let temporaryCountryArr8: ProjectType[] = []
    let temporaryCountryArr9: ProjectType[] = []
    let temporaryCountryArr10: ProjectType[] = []

    if (filterState) {
        if (countryCheckboxState.checkboxPoland) {
            temporaryCountryArr1 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxPoland)
            )
        }
        if (countryCheckboxState.checkboxCzech) {
            temporaryCountryArr2 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxCzech)
            )
        }
        if (countryCheckboxState.checkboxRomania) {
            temporaryCountryArr3 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxRomania)
            )
        }
        if (countryCheckboxState.checkboxSlovakia) {
            temporaryCountryArr4 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxSlovakia)
            )
        }
        if (countryCheckboxState.checkboxLithuania) {
            temporaryCountryArr5 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxLithuania)
            )
        }
        if (countryCheckboxState.checkboxHolland) {
            temporaryCountryArr6 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxHolland)
            )
        }
        if (countryCheckboxState.checkboxGermany) {
            temporaryCountryArr7 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxGermany)
            )
        }
        if (countryCheckboxState.checkboxGreece) {
            temporaryCountryArr8 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxGreece)
            )
        }
        if (countryCheckboxState.checkboxSpain) {
            temporaryCountryArr9 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxSpain)
            )
        }
        if (countryCheckboxState.checkboxCyprus) {
            temporaryCountryArr10 = tempArr.filter((el: ProjectType) =>
                el.country.includes(countryCheckboxState.checkboxCyprus)
            )
        }
        if (
            countryCheckboxState.checkboxPoland === '' &&
            countryCheckboxState.checkboxCzech === '' &&
            countryCheckboxState.checkboxRomania === '' &&
            countryCheckboxState.checkboxSlovakia === '' &&
            countryCheckboxState.checkboxLithuania === '' &&
            countryCheckboxState.checkboxHolland === '' &&
            countryCheckboxState.checkboxGermany === '' &&
            countryCheckboxState.checkboxGreece === '' &&
            countryCheckboxState.checkboxSpain === '' &&
            countryCheckboxState.checkboxCyprus === ''
        ) {
            filtredCountryArr = tempArr
        } else {
            filtredCountryArr = [
                ...temporaryCountryArr1,
                ...temporaryCountryArr2,
                ...temporaryCountryArr3,
                ...temporaryCountryArr4,
                ...temporaryCountryArr5,
                ...temporaryCountryArr6,
                ...temporaryCountryArr7,
                ...temporaryCountryArr8,
                ...temporaryCountryArr9,
                ...temporaryCountryArr10,
            ]
        }
    } else {
        filtredCountryArr = tempArr
    }

    // ---------------------- sex filter ----------------------

    let filtredSexArr: ProjectType[] = []
    let temporarySexArr1: ProjectType[] = []
    let temporarySexArr2: ProjectType[] = []
    let temporarySexArr3: ProjectType[] = []

    if (filterState) {
        if (sexCheckboxState.male && filterState) {
            temporarySexArr1 = filtredCountryArr.filter((el: ProjectType) =>
                el.sex.includes(sexCheckboxState.male)
            )
        }
        if (sexCheckboxState.female && filterState) {
            temporarySexArr2 = filtredCountryArr.filter((el: ProjectType) =>
                el.sex.includes(sexCheckboxState.female)
            )
        }
        if (sexCheckboxState.couples && filterState) {
            temporarySexArr3 = filtredCountryArr.filter((el: ProjectType) =>
                el.sex.includes(sexCheckboxState.couples)
            )
        }
        if (
            sexCheckboxState.male === '' &&
            sexCheckboxState.female === '' &&
            sexCheckboxState.couples === ''
        ) {
            filtredSexArr = filtredCountryArr
        } else {
            filtredSexArr = [
                ...temporarySexArr1,
                ...temporarySexArr2,
                ...temporarySexArr3,
            ]
        }
    } else {
        filtredSexArr = filtredCountryArr
    }

    // ---------------------- is miner filter ----------------------

    let temporaryIsMinorArr: ProjectType[] = []

    if (filterState) {
        if (isMinorState) {
            temporaryIsMinorArr = filtredSexArr.filter(
                (el: ProjectType) => parseInt(el.ageFrom) < 18
            )
        } else {
            temporaryIsMinorArr = filtredSexArr
        }
    } else {
        temporaryIsMinorArr = filtredSexArr
    }

    // ---------------------- Age to filter ----------------------

    let filtredArr: ProjectType[] = []

    if (filterState) {
        if (ageSearchState) {
            filtredArr = temporaryIsMinorArr.filter(
                (el: ProjectType) =>
                    ageSearchState >= parseInt(el.ageFrom) &&
                    ageSearchState <= parseInt(el.ageTo)
            )
        } else {
            filtredArr = temporaryIsMinorArr
        }
    } else {
        filtredArr = temporaryIsMinorArr
    }

    const filtredArrForUsers: ProjectType[] = filtredArr.filter(
        (element: ProjectType) => element.isActual
    )

    let raw = localStorage.getItem('loginData')
    let localLoginData
    if (raw) {
        localLoginData = JSON.parse(raw)
    }

    const splitString = (string: string) => {
        let arrFromString = string.split(' ')
        let filtredArrFromString = arrFromString.filter(
            (element) => element.length > 0
        )
        return filtredArrFromString
    }

    const getShortString = (string: string) => {
        let tempStr
        if (string.length > 80) {
            tempStr = string.slice(0, 80) + '...'
        } else {
            tempStr = string
        }
        return tempStr
    }

    // disable scroll
    if (editFormState) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'auto'
    }

    // change copy button placeholder
    const StatusNodeMap: Record<ICopyStatus, React.ReactNode> = {
        waiting: 'Копіювати',
        copying: 'Копіюю..',
        failed: 'Помилка!',
        succeed: 'Скопійовано!',
    }

    return (
        <div className="projects-content">
            <div className={`${editFormState ? 'show' : 'hide'}`}>
                <div
                    className="project-edit-bg"
                    onClick={
                        window.innerWidth > 992
                            ? () => dispatch(setFormState(false))
                            : undefined
                    }
                ></div>
                <EditProject />
            </div>
            {localLoginData.email === 'mazaxaka.tyt@gmail.com' ||
            localLoginData.email === 'juliiaderevianko@gmail.com' ||
            localLoginData.email === 'admin@gmail.com' ? (
                filtredArr.length === 0 ? (
                    <div className="no-search-results">Співпадінь нема</div>
                ) : (
                    <div className="projects">
                        {filtredArr.map((element: ProjectType, i: number) => (
                            <div key={i} className="project-item">
                                <div className="project-item-section">
                                    <p className="project-header">
                                        {element.projectName}
                                    </p>
                                    <p className="is-actual-state">
                                        Актуальний:{' '}
                                        {element.isActual ? 'Так' : 'Ні'}
                                    </p>
                                </div>
                                <div className="project-item-section row project-firs-descroption-row">
                                    <div className="row project-row">
                                        <div>
                                            <div className="project-sex row">
                                                {splitString(element.sex).map(
                                                    (el: string, i: number) => (
                                                        <div key={i}>{el}</div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="project-country">
                                                {element.country},
                                            </div>
                                            <div className="project-location">
                                                {element.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-category">
                                        {element.category}
                                    </div>
                                </div>
                                <div className="row project-age-row">
                                    <div className="project-item-section">
                                        <div>Вік від: {element.ageFrom}</div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>Вік до: {element.ageTo}</div>
                                    </div>
                                </div>
                                <div className="project-item-section">
                                    <div>Ставка у злотих: {element.salary}</div>
                                </div>
                                <div>
                                    <div
                                        className={`project-item-section project-info ${
                                            showMoreState[element.projectName]
                                                ? 'hide'
                                                : 'show'
                                        }`}
                                    >
                                        {getShortString(element.projectInfo)}
                                    </div>
                                </div>
                                <div
                                    className={
                                        showMoreState[element.projectName]
                                            ? 'show'
                                            : 'hide'
                                    }
                                >
                                    <div className="project-item-section">
                                        <div>
                                            Національність:{' '}
                                            {element.nationalaty}
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>
                                            Посилання на синхронер:{' '}
                                            <a href={element.additionalInfo}>
                                                {element.additionalInfo}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>
                                            Приклади житла: {element.housing}
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div className="project-info">
                                            {element.projectInfo}
                                        </div>
                                    </div>
                                </div>
                                <div className="row project-item-buttons">
                                    <div className="row">
                                        <button
                                            className="delite-btn project-item-btn"
                                            onClick={() =>
                                                deliteProject(
                                                    element.projectName
                                                )
                                            }
                                            disabled={projectsArr.length <= 1}
                                        >
                                            Видалити
                                        </button>
                                        <button
                                            className="edit-btn project-item-btn"
                                            onClick={() =>
                                                edit(
                                                    element.projectName,
                                                    element.country,
                                                    element.salary,
                                                    element.location,
                                                    element.sex,
                                                    element.ageFrom,
                                                    element.ageTo,
                                                    element.nationalaty,
                                                    element.additionalInfo,
                                                    element.housing,
                                                    element.projectInfo,
                                                    element.category,
                                                    element.isActual
                                                )
                                            }
                                        >
                                            Редагувати
                                        </button>
                                    </div>
                                    <div className="row">
                                        <button
                                            className={`show-more-btn project-item-btn ${
                                                showMoreState[
                                                    element.projectName
                                                ]
                                                    ? 'hide'
                                                    : 'show'
                                            }`}
                                            onClick={() =>
                                                dispatch(
                                                    showMoreData(
                                                        element.projectName
                                                    )
                                                )
                                            }
                                        >
                                            Розгорнути
                                        </button>
                                        <button
                                            className={`show-more-btn project-item-btn ${
                                                showMoreState[
                                                    element.projectName
                                                ]
                                                    ? 'show'
                                                    : 'hide'
                                            }`}
                                            onClick={() =>
                                                dispatch(
                                                    showLessData(
                                                        element.projectName
                                                    )
                                                )
                                            }
                                        >
                                            Згорнути
                                        </button>
                                        <CopyButton
                                            statusNodeMap={StatusNodeMap}
                                            className="copy-btn project-item-btn"
                                            value={`Назва проєкту\n${
                                                element.projectName
                                            }\n\nСтать\n${element.sex.trim()}\n\nКраїна\n${
                                                element.country
                                            }\n\nСтавка у злотих\n${
                                                element.salary
                                            }\n\nЛокалізація\n${
                                                element.location
                                            }\n\nКатегорія\n${
                                                element.category
                                            }\n\nВік від\n${
                                                element.ageFrom
                                            }\n\nВік до\n${
                                                element.ageTo
                                            }\n\nНвціональність\n${
                                                element.nationalaty
                                            }\n\nДодаткова інформація\n${
                                                element.additionalInfo
                                            }\n\nПриклади житла\n${
                                                element.housing
                                            }\n\nОпис вакансії\n${
                                                element.projectInfo
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : filtredArr.length === 0 ? (
                <div className="no-search-results">Співпадінь нема</div>
            ) : (
                <div className="projects">
                    {filtredArrForUsers.map(
                        (element: ProjectType, i: number) => (
                            <div key={i} className="project-item">
                                <div className="project-item-section">
                                    <p className="project-header">
                                        {element.projectName}
                                    </p>
                                </div>
                                <div className="project-item-section row project-firs-descroption-row">
                                    <div className="row project-row">
                                        <div>
                                            <div className="project-sex row">
                                                {splitString(element.sex).map(
                                                    (el: string, i: number) => (
                                                        <div key={i}>{el}</div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="project-country">
                                                {element.country},
                                            </div>
                                            <div className="project-location">
                                                {element.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-category">
                                        {element.category}
                                    </div>
                                </div>
                                <div className="row project-age-row">
                                    <div className="project-item-section">
                                        <div>Вік від: {element.ageFrom}</div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>Вік до: {element.ageTo}</div>
                                    </div>
                                </div>
                                <div className="project-item-section">
                                    <div>Cтавка у злотих: {element.salary}</div>
                                </div>
                                <div>
                                    <div
                                        className={`project-item-section project-info ${
                                            showMoreState[element.projectName]
                                                ? 'hide'
                                                : 'show'
                                        }`}
                                    >
                                        {getShortString(element.projectInfo)}
                                    </div>
                                </div>
                                <div
                                    className={
                                        showMoreState[element.projectName]
                                            ? 'show'
                                            : 'hide'
                                    }
                                >
                                    <div className="project-item-section">
                                        <div>
                                            Національність:{' '}
                                            {element.nationalaty}
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>
                                            Додаткова інформація:{' '}
                                            {element.additionalInfo}
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>
                                            Приклади житла: {element.housing}
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div className="project-info">
                                            {element.projectInfo}
                                        </div>
                                    </div>
                                </div>
                                <div className="row project-item-buttons">
                                    <div className="row">
                                        <button
                                            className={`show-more-btn project-item-btn ${
                                                showMoreState[
                                                    element.projectName
                                                ]
                                                    ? 'hide'
                                                    : 'show'
                                            }`}
                                            onClick={() =>
                                                dispatch(
                                                    showMoreData(
                                                        element.projectName
                                                    )
                                                )
                                            }
                                        >
                                            Разгорнути
                                        </button>
                                        <button
                                            className={`show-more-btn project-item-btn ${
                                                showMoreState[
                                                    element.projectName
                                                ]
                                                    ? 'show'
                                                    : 'hide'
                                            }`}
                                            onClick={() =>
                                                dispatch(
                                                    showLessData(
                                                        element.projectName
                                                    )
                                                )
                                            }
                                        >
                                            Згорнути
                                        </button>
                                        <CopyButton
                                            statusNodeMap={StatusNodeMap}
                                            className="copy-btn project-item-btn"
                                            value={`Назва проєкту\n${
                                                element.projectName
                                            }\n\nСтать\n${element.sex.trim()}\n\nКраїна\n${
                                                element.country
                                            }\n\nСтавка у злотих\n${
                                                element.salary
                                            }\n\nЛокалізація\n${
                                                element.location
                                            }\n\nКатегорія\n${
                                                element.category
                                            }\n\nВік від\n${
                                                element.ageFrom
                                            }\n\nВік до\n${
                                                element.ageTo
                                            }\n\nНаціональність\n${
                                                element.nationalaty
                                            }\n\nДодаткова інформація\n${
                                                element.additionalInfo
                                            }\n\nПриклади житла\n${
                                                element.housing
                                            }\n\nОпис вакансії\n${
                                                element.projectInfo
                                            }`}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default Projects
