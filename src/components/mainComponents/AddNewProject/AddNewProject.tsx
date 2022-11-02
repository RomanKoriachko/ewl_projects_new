import { ProjectType } from 'container/Main/Main'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import './AddNewProject.scss'

type Props = {
    project: ProjectType
    setNewProject: (prevState: ProjectType) => void
}

const AddNewProject = ({ project, setNewProject }: Props) => {
    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
    }
    const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            salary: e.target.value,
        }))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            projectName: e.target.value,
        }))
    }

    const onSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            project.country === '' ||
            project.salary === '' ||
            project.projectName === ''
        ) {
            alert("всі поля обов'язкові")
        } else {
            writeProjectData(
                project.country,
                project.salary,
                project.projectName
            )
            /* @ts-ignore */
            setNewProject(() => ({
                country: '',
                salary: '',
                projectName: '',
            }))
        }
    }

    const db = getDatabase()
    const starCountRef = ref(db, `vacancy/`)

    function writeProjectData(
        country: string,
        salary: string,
        projectName: string
    ) {
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val()
            console.log(data)
            if (data.hasOwnProperty(project.projectName)) {
                /* @ts-ignore */
                setNewProject(() => ({
                    country: '',
                    salary: '',
                    projectName: '',
                }))
            } else {
                set(ref(db, `vacancy/${projectName}/`), {
                    country: country,
                    salary: salary,
                    projectName: projectName,
                })
            }
        })
    }

    return (
        <div className="add-project">
            <p>Додати проект</p>
            <form onSubmit={onSendClick}>
                <input
                    type="text"
                    id="country"
                    placeholder="Назва країни"
                    value={project.country}
                    onChange={handleChangeCountry}
                />
                <input
                    type="text"
                    id="salary"
                    placeholder="Ставка"
                    value={project.salary}
                    onChange={handleChangeSalary}
                />
                <input
                    type="text"
                    id="project"
                    placeholder="назва проекту"
                    value={project.projectName}
                    onChange={handleChangeProjectName}
                />
                <button type="submit">Додати проект</button>
            </form>
        </div>
    )
}

export default AddNewProject
