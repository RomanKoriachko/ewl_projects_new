import { UserType } from 'container/Main/Main'
import { getDatabase, ref, onValue } from 'firebase/database'
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

    let dataArr: [] = []
    useEffect(() => {
        const db = getDatabase()
        const starCountRef = ref(db, `vacancy/`)
        onValue(starCountRef, (snapshot) => {
            let data = snapshot.val()
            let dataItem = Object.entries(data)
            for (let i = 0; i < dataItem.length; i++) {
                /* @ts-ignore*/
                dataArr.unshift(dataItem[i][1])
                setProjectsArr(dataArr)
            }
        })
    }, [])

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
                              <button>Видалити</button>
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
