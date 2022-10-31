import { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'

type Props = {}

type ProjectType = {
    country: string
    salary: string
    projectName: string
}

const AddNewProject = (props: Props) => {
    const [project, setNewProject] = useState<ProjectType>({
        country: '',
        salary: '',
        projectName: '',
    })

    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
    }
    const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            salary: e.target.value,
        }))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            projectName: e.target.value,
        }))
    }

    function writeProjectData(
        country: string,
        salary: string,
        projectName: string
    ) {
        const db = getDatabase()
        set(ref(db, `vacancy/${projectName}/`), {
            country: country,
            salary: salary,
        })
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
            setNewProject(() => ({
                country: '',
                salary: '',
                projectName: '',
            }))
        }
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
