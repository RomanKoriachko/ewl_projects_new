import { UserType } from 'container/Main/Main'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { useState, useEffect } from 'react'
import EditProject from '../EditProject/EditProject'
import './Projects.scss'

type Props = {
    loginData: UserType
    editProject: ProjectType
    setEditProject: (prevState: ProjectType) => void
}

type ProjectType = {
    projectName: string
    country: string
    salary: string
}

const Projects = ({ loginData, editProject, setEditProject }: Props) => {
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
            <div className="projects">
                {loginData.email === 'mazaxaka.tyt@gmail.com'
                    ? projectsArr.map((element: ProjectType, i: number) => (
                          <div key={i} className="project-item">
                              <div className="project-item-header">
                                  <p>Назва проекту</p>
                                  <div>{element.projectName}</div>
                              </div>
                              <div className="project-item-country">
                                  <p>Країна</p>
                                  <div>{element.country}</div>
                              </div>
                              <div className="project-item-salary">
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
                      ))
                    : projectsArr.map((element: ProjectType, i: number) => (
                          <div key={i} className="project-item">
                              <div className="project-item-header">
                                  <p>Назва проекту</p>
                                  <div>{element.projectName}</div>
                              </div>
                              <div className="project-item-country">
                                  <p>Країна</p>
                                  <div>{element.country}</div>
                              </div>
                              <div className="project-item-salary">
                                  <p>Cтавка в злотих</p>
                                  <div>{element.salary}</div>
                              </div>
                          </div>
                      ))}
            </div>
        </div>
    )
}

export default Projects
