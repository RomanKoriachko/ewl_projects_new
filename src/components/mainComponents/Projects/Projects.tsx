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
    setEditProject: (prevState: ProjectType) => void
}

const Projects = ({
    loginData,
    editProject,
    searchContent,
    countryCheckboxState,
    sexCheckboxState,
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

    let filtredArr: [] = []

    let filtredCountryArr: [] = []
    let temporaryCountryArr1: [] = []
    let temporaryCountryArr2: [] = []
    let temporaryCountryArr3: [] = []

    if (countryCheckboxState.checkboxPoland) {
        /* @ts-ignore */
        temporaryCountryArr1 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxPoland)
        )
    }
    if (countryCheckboxState.checkboxGermany) {
        /* @ts-ignore */
        temporaryCountryArr2 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxGermany)
        )
    }
    if (countryCheckboxState.checkboxSlovakia) {
        /* @ts-ignore */
        temporaryCountryArr3 = tempArr.filter((el: ProjectType) =>
            el.country.includes(countryCheckboxState.checkboxSlovakia)
        )
    }
    if (
        countryCheckboxState.checkboxPoland === '' &&
        countryCheckboxState.checkboxGermany === '' &&
        countryCheckboxState.checkboxSlovakia === ''
    ) {
        /* @ts-ignore */
        filtredCountryArr = tempArr
    } else {
        filtredCountryArr = [
            ...temporaryCountryArr1,
            ...temporaryCountryArr2,
            ...temporaryCountryArr3,
        ]
    }

    // ---------------------- sex filter----------------------

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

    return (
        <div>
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
            {loginData.email === 'mazaxaka.tyt@gmail.com' ? (
                filtredSexArr.length === 0 ? (
                    <div className="no-search-results">Совпадений нет</div>
                ) : (
                    <div className="projects">
                        {filtredSexArr.map(
                            (element: ProjectType, i: number) => (
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
                                        <p>Национальность </p>
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
                                                deliteProject(
                                                    element.projectName
                                                )
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
                            )
                        )}
                    </div>
                )
            ) : filtredSexArr.length === 0 ? (
                <div className="no-search-results">Співпадінь нема</div>
            ) : (
                filtredSexArr.map((element: ProjectType, i: number) => (
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
                ))
            )}
        </div>
    )
}

export default Projects
