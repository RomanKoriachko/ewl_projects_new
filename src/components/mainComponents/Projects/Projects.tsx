import {
    CountryCheckboxType,
    ProjectType,
    SexCheckboxType,
    UserType,
} from 'container/Main/Main'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useState, useEffect } from 'react'
import EditProject from '../EditProject/EditProject'
import './Projects.scss'

type Props = {
    loginData: UserType
    editProject: ProjectType
    searchContent: string
    countryCheckboxState: CountryCheckboxType
    sexCheckboxState: SexCheckboxType
    isMinorState: boolean
    ageToState: number
    setEditProject: (prevState: ProjectType) => void
}

const Projects = ({
    loginData,
    editProject,
    searchContent,
    countryCheckboxState,
    sexCheckboxState,
    isMinorState,
    ageToState,
    setEditProject,
}: Props) => {
    const [projectsArr, setProjectsArr] = useState<[]>([])

    useEffect(() => {
        const dbEffect = getDatabase()
        const starCountRefEffect = ref(dbEffect, `vacancy/`)
        onValue(starCountRefEffect, (snapshot) => {
            let data = snapshot.val()
            /* @ts-ignore */
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
        })
    }

    const [editFormState, setEditFormState] = useState<boolean>(false)

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
        projectInfo: string
    ) => {
        /* @ts-ignore */
        setEditProject(() => ({
            projectName: project,
            country: country,
            salary: salary,
            location: location,
            sex: sex,
            ageFrom: ageFrom,
            ageTo: ageTo,
            nationalaty: nationalaty,
            additionalInfo: additionalInfo,
            housing: housing,
            projectInfo: projectInfo,
        }))
        editFormState ? setEditFormState(false) : setEditFormState(true)
    }

    // ---------------------- Search ----------------------

    const tempArr = projectsArr.filter(
        (element: ProjectType) =>
            element.country
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
            element.salary
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
            element.projectName
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
            element.location
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
            element.sex.toLowerCase().includes(searchContent.toLowerCase()) ||
            element.ageFrom
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
            element.ageTo.toLowerCase().includes(searchContent.toLowerCase()) ||
            element.nationalaty
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
            element.additionalInfo
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
            element.housing
                .toLowerCase()
                .includes(searchContent.toLowerCase()) ||
            element.projectInfo
                .toLowerCase()
                .includes(searchContent.toLowerCase())
    )

    // ---------------------- country filter ----------------------

    let filtredCountryArr: [] = []
    let temporaryCountryArr1: [] = []
    let temporaryCountryArr2: [] = []
    let temporaryCountryArr3: [] = []
    let temporaryCountryArr4: [] = []
    let temporaryCountryArr5: [] = []
    let temporaryCountryArr6: [] = []
    let temporaryCountryArr7: [] = []
    let temporaryCountryArr8: [] = []
    let temporaryCountryArr9: [] = []
    let temporaryCountryArr10: [] = []

    if (countryCheckboxState.checkboxPoland) {
        /* @ts-ignore */
        temporaryCountryArr1 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxPoland)
        )
    }
    if (countryCheckboxState.checkboxCzech) {
        /* @ts-ignore */
        temporaryCountryArr2 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxCzech)
        )
    }
    if (countryCheckboxState.checkboxRomania) {
        /* @ts-ignore */
        temporaryCountryArr3 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxRomania)
        )
    }
    if (countryCheckboxState.checkboxSlovakia) {
        /* @ts-ignore */
        temporaryCountryArr4 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxSlovakia)
        )
    }
    if (countryCheckboxState.checkboxLithuania) {
        /* @ts-ignore */
        temporaryCountryArr5 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxLithuania)
        )
    }
    if (countryCheckboxState.checkboxHolland) {
        /* @ts-ignore */
        temporaryCountryArr6 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxHolland)
        )
    }
    if (countryCheckboxState.checkboxGermany) {
        /* @ts-ignore */
        temporaryCountryArr7 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxGermany)
        )
    }
    if (countryCheckboxState.checkboxGreece) {
        /* @ts-ignore */
        temporaryCountryArr8 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxGreece)
        )
    }
    if (countryCheckboxState.checkboxSpain) {
        /* @ts-ignore */
        temporaryCountryArr9 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxSpain)
        )
    }
    if (countryCheckboxState.checkboxCyprus) {
        /* @ts-ignore */
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
        /* @ts-ignore */
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

    // ---------------------- sex filter ----------------------

    let filtredSexArr: [] = []
    let temporarySexArr1: [] = []
    let temporarySexArr2: [] = []
    let temporarySexArr3: [] = []

    if (sexCheckboxState.male) {
        /* @ts-ignore */
        temporarySexArr1 = filtredCountryArr.filter((el: ProjectType) =>
            el.sex.includes(sexCheckboxState.male)
        )
    }
    if (sexCheckboxState.female) {
        /* @ts-ignore */
        temporarySexArr2 = filtredCountryArr.filter((el: ProjectType) =>
            el.sex.includes(sexCheckboxState.female)
        )
    }
    if (sexCheckboxState.couples) {
        /* @ts-ignore */
        temporarySexArr3 = filtredCountryArr.filter((el: ProjectType) =>
            el.sex.includes(sexCheckboxState.couples)
        )
    }
    if (
        sexCheckboxState.male === '' &&
        sexCheckboxState.female === '' &&
        sexCheckboxState.couples === ''
    ) {
        /* @ts-ignore */
        filtredSexArr = filtredCountryArr
    } else {
        filtredSexArr = [
            ...temporarySexArr1,
            ...temporarySexArr2,
            ...temporarySexArr3,
        ]
    }

    // ---------------------- is miner filter ----------------------

    let temporaryIsMinorArr: [] = []

    if (isMinorState) {
        /* @ts-ignore */
        temporaryIsMinorArr = filtredSexArr.filter(
            (el: ProjectType) => parseInt(el.ageFrom) < 18
        )
    } else {
        temporaryIsMinorArr = filtredSexArr
    }

    // ---------------------- Age to filter ----------------------

    let filtredArr: [] = []

    if (ageToState) {
        /* @ts-ignore */
        filtredArr = temporaryIsMinorArr.filter(
            (el: ProjectType) =>
                ageToState >= parseInt(el.ageFrom) &&
                ageToState <= parseInt(el.ageTo)
        )
    } else {
        filtredArr = temporaryIsMinorArr
    }

    return (
        <div className="main-content">
            <div className={`${editFormState ? 'show' : 'hide'}`}>
                <div
                    className="project-edit-bg"
                    onClick={() => setEditFormState(false)}
                ></div>
                <EditProject
                    editProject={editProject}
                    setEditProject={setEditProject}
                    setEditFormState={setEditFormState}
                />
            </div>
            {loginData.email === 'mazaxaka.tyt@gmail.com' ||
            loginData.email === 'juliiaderevianko@gmail.com' ? (
                filtredArr.length === 0 ? (
                    <div className="no-search-results">Совпадений нет</div>
                ) : (
                    <div className="projects">
                        {filtredArr.map((element: ProjectType, i: number) => (
                            <div key={i} className="project-item">
                                <div className="project-item-section">
                                    <p>Название проекта</p>
                                    <div>{element.projectName}</div>
                                </div>
                                <div className="project-item-section">
                                    <p>Страна</p>
                                    <div>{element.country}</div>
                                </div>
                                <div className="project-item-section">
                                    <p>Cтавка в злотых</p>
                                    <div>{element.salary}</div>
                                </div>
                                <div className="project-item-section">
                                    <p>Локализация</p>
                                    <div>{element.location}</div>
                                </div>
                                <div className="project-item-section">
                                    <p>Пол</p>
                                    <div>{element.sex}</div>
                                </div>
                                <div className="row">
                                    <div className="project-item-section">
                                        <p>Возраст от</p>
                                        <div>{element.ageFrom}</div>
                                    </div>
                                    <div className="project-item-section">
                                        <p>Возраст до</p>
                                        <div>{element.ageTo}</div>
                                    </div>
                                </div>
                                <div className="project-item-section">
                                    <p>Национальность</p>
                                    <div>{element.nationalaty}</div>
                                </div>
                                <div className="project-item-section">
                                    <p>Дополнительная информация</p>
                                    <div>{element.additionalInfo}</div>
                                </div>
                                <div className="project-item-section">
                                    <p>Примеры жилья</p>
                                    <div>{element.housing}</div>
                                </div>
                                <div className="project-item-section">
                                    <p>Описание вакансии</p>
                                    <div>{element.projectInfo}</div>
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            deliteProject(element.projectName)
                                        }
                                        disabled={projectsArr.length <= 1}
                                    >
                                        Удалить
                                    </button>
                                    <button
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
                                                element.projectInfo
                                            )
                                        }
                                    >
                                        Редактировать
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : filtredArr.length === 0 ? (
                <div className="no-search-results">Співпадінь нема</div>
            ) : (
                <div className="projects">
                    {filtredArr.map((element: ProjectType, i: number) => (
                        <div key={i} className="project-item">
                            <div className="project-item-section">
                                <p>Назва проекту</p>
                                <div>{element.projectName}</div>
                            </div>
                            <div className="project-item-section">
                                <p>Країна</p>
                                <div>{element.country}</div>
                            </div>
                            <div className="project-item-section">
                                <p>Cтавка в злотих</p>
                                <div>{element.salary}</div>
                            </div>
                            <div className="project-item-section">
                                <p>Локалізація</p>
                                <div>{element.location}</div>
                            </div>
                            <div className="project-item-section">
                                <p>Стать</p>
                                <div>{element.sex}</div>
                            </div>
                            <div className="row">
                                <div className="project-item-section">
                                    <p>Возраст от</p>
                                    <div>{element.ageFrom}</div>
                                </div>
                                <div className="project-item-section">
                                    <p>Возраст до</p>
                                    <div>{element.ageTo}</div>
                                </div>
                            </div>
                            <div className="project-item-section">
                                <p>Національність</p>
                                <div>{element.nationalaty}</div>
                            </div>
                            <div className="project-item-section">
                                <p>Додаткова інформація</p>
                                <div>{element.additionalInfo}</div>
                            </div>
                            <div className="project-item-section">
                                <p>Приклади житла</p>
                                <div>{element.housing}</div>
                            </div>
                            <div className="project-item-section">
                                <p>Опис вакансії</p>
                                <div>{element.projectInfo}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Projects
