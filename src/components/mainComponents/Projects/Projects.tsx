import { CountryCheckboxType, UserType } from 'container/Main/Main'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useState, useEffect } from 'react'
import EditProject from '../EditProject/EditProject'
import './Projects.scss'

type Props = {
    loginData: UserType
    editProject: ProjectType
    searchContent: string
    countryCheckboxState: CountryCheckboxType
    setEditProject: (prevState: ProjectType) => void
}

type ProjectType = {
    projectName: string
    country: string
    salary: string
}

const Projects = ({
    loginData,
    editProject,
    searchContent,
    countryCheckboxState,
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
        })
    }

    const [editFormState, setEditFormState] = useState<boolean>(false)

    const edit = (project: string, country: string, salary: string) => {
        /* @ts-ignore */
        setEditProject(() => ({
            projectName: project,
            country: country,
            salary: salary,
        }))
        editFormState ? setEditFormState(false) : setEditFormState(true)
    }

    // ---------------filter-------------------

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
                .includes(searchContent.toLowerCase())
    )

    // ----------------country----------------------

    let filtredArr: [] = []
    let temporaryCountryArr1: [] = []
    let temporaryCountryArr2: [] = []
    let temporaryCountryArr3: [] = []

    if (countryCheckboxState.checkboxPoland) {
        /* @ts-ignore */
        temporaryCountryArr1 = tempArr.filter((el: ProjectType) =>
            el.country
                .toLowerCase()
                .includes(countryCheckboxState.checkboxPoland.toLowerCase())
        )
    }
    if (countryCheckboxState.checkboxGermany) {
        /* @ts-ignore */
        temporaryCountryArr2 = tempArr.filter((el: ProjectType) =>
            el.country
                .toLowerCase()
                .includes(countryCheckboxState.checkboxGermany.toLowerCase())
        )
    }
    if (countryCheckboxState.checkboxSlovakia) {
        /* @ts-ignore */
        temporaryCountryArr3 = tempArr.filter((el: ProjectType) =>
            el.country
                .toLowerCase()
                .includes(countryCheckboxState.checkboxSlovakia.toLowerCase())
        )
    }
    if (
        countryCheckboxState.checkboxPoland === '' &&
        countryCheckboxState.checkboxGermany === '' &&
        countryCheckboxState.checkboxSlovakia === ''
    ) {
        /* @ts-ignore */
        filtredArr = tempArr
    } else {
        filtredArr = [
            ...temporaryCountryArr1,
            ...temporaryCountryArr2,
            ...temporaryCountryArr3,
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
                filtredArr.length === 0 ? (
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
                                <div>
                                    <button
                                        onClick={() =>
                                            deliteProject(element.projectName)
                                        }
                                        disabled={projectsArr.length <= 1}
                                    >
                                        Видалити
                                    </button>
                                    <button
                                        onClick={() =>
                                            edit(
                                                element.projectName,
                                                element.country,
                                                element.salary
                                            )
                                        }
                                    >
                                        редагувати
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : filtredArr.length === 0 ? (
                <div className="no-search-results">Співпадінь нема</div>
            ) : (
                filtredArr.map((element: ProjectType, i: number) => (
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
                    </div>
                ))
            )}
        </div>
    )
}

export default Projects
