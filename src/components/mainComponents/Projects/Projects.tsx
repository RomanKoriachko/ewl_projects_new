import { UserType } from 'container/Main/Main'
import { getDatabase, ref, onValue, remove } from 'firebase/database'
import { useState, useEffect } from 'react'

type Props = {
    loginData: UserType
}

type ProjectType = {
    projectName: string
    country: string
    salary: string
}

const Projects = ({ loginData }: Props) => {
    const [projectsArr, setProjectsArr] = useState<[]>([])

    useEffect(() => {
        const dbEffect = getDatabase()
        const starCountRefEffect = ref(dbEffect, `vacancy/`)
        onValue(starCountRefEffect, (snapshot) => {
            let data = snapshot.val()
            /* @ts-ignore */
            setProjectsArr(Object.values(data))
            console.log('useEffect')
        })
    }, [projectsArr.length])

    const db = getDatabase()

    const deliteProject = (project: string) => {
        const starCountRef = ref(db, `vacancy/${project}`)
        remove(starCountRef)
            .then(() => {
                console.log(projectsArr)
                console.log('deliting')
            })
            .catch(() => {
                alert('miss data')
            })
    }

    console.log(projectsArr)

    return (
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
                              <button>Редагувати</button>
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
    )
}

export default Projects
