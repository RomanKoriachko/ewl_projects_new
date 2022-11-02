import { getDatabase, ref, onValue } from 'firebase/database'

type Props = {}

type ProjectType = {
    projectName: string
    country: string
    salary: string
}

const Projects = (props: Props) => {
    let dataArr: [] = []
    const db = getDatabase()
    const starCountRef = ref(db, `vacancy/`)

    onValue(starCountRef, (snapshot) => {
        let data = snapshot.val()
        let dataItem = Object.entries(data)
        console.log(dataItem)
        for (let i = 0; i < dataItem.length; i++) {
            /* @ts-ignore*/
            dataArr.unshift(dataItem[i][1])
        }
    })

    console.log(dataArr)

    return (
        <div className="projects">
            {dataArr.map((element: ProjectType, i: number) => (
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
