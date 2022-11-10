import { ProjectType } from 'container/Main/Main'
import { getDatabase, ref, set, get, child } from 'firebase/database'
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
    const handleChangeProjectLocation = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            location: e.target.value,
        }))
    }
    const handleChangeProjectSex = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            sex: e.target.value,
        }))
    }
    const handleChangeProjectAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            age: e.target.value,
        }))
    }
    const handleChangeProjectNationalaty = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            nationalaty: e.target.value,
        }))
    }
    const handleChangeProjectAdditionalInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            additionalInfo: e.target.value,
        }))
    }
    const handleChangeProjectHousing = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            housing: e.target.value,
        }))
    }
    const handleChangeProjectProjectInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            projectInfo: e.target.value,
        }))
    }

    const db = getDatabase()

    function writeProjectData(
        country: string,
        salary: string,
        projectName: string,
        location: string,
        sex: string,
        age: string,
        nationalaty: string,
        additionalInfo: string,
        housing: string,
        projectInfo: string
    ) {
        const dbRef = ref(getDatabase())
        get(child(dbRef, `vacancy/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val().hasOwnProperty(project.projectName)) {
                        alert('Проект вже існує')
                        /* @ts-ignore */
                        setNewProject(() => ({
                            country: '',
                            salary: '',
                            projectName: '',
                            location: '',
                            sex: '',
                            age: '',
                            nationalaty: '',
                            additionalInfo: '',
                            housing: '',
                            projectInfo: '',
                        }))
                    } else {
                        set(ref(db, `vacancy/${projectName}/`), {
                            country: country,
                            salary: salary,
                            projectName: projectName,
                            location: location,
                            sex: sex,
                            age: age,
                            nationalaty: nationalaty,
                            additionalInfo: additionalInfo,
                            housing: housing,
                            projectInfo: projectInfo,
                        })
                    }
                } else {
                    console.log('No data available')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const onSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            project.country === '' ||
            project.salary === '' ||
            project.projectName === '' ||
            project.location === '' ||
            project.sex === '' ||
            project.age === '' ||
            project.nationalaty === '' ||
            project.additionalInfo === '' ||
            project.housing === '' ||
            project.projectInfo === ''
        ) {
            alert("всі поля обов'язкові")
        } else {
            writeProjectData(
                project.country,
                project.salary,
                project.projectName,
                project.location,
                project.sex,
                project.age,
                project.nationalaty,
                project.additionalInfo,
                project.housing,
                project.projectInfo
            )
            /* @ts-ignore */
            setNewProject(() => ({
                country: '',
                salary: '',
                projectName: '',
                location: '',
                sex: '',
                age: '',
                nationalaty: '',
                additionalInfo: '',
                housing: '',
                projectInfo: '',
            }))
        }
    }

    return (
        <div className="project-form">
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
                <input
                    type="text"
                    id="location"
                    placeholder="Локалізація"
                    value={project.location}
                    onChange={handleChangeProjectLocation}
                />
                <input
                    type="text"
                    id="sex"
                    placeholder="Стать"
                    value={project.sex}
                    onChange={handleChangeProjectSex}
                />
                <input
                    type="text"
                    id="age"
                    placeholder="Вік"
                    value={project.age}
                    onChange={handleChangeProjectAge}
                />
                <input
                    type="text"
                    id="nationalaty"
                    placeholder="Національність"
                    value={project.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <input
                    type="text"
                    id="additionalInfo"
                    placeholder="Додаткова інформація"
                    value={project.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <input
                    type="text"
                    id="housing"
                    placeholder="Приклади житла"
                    value={project.housing}
                    onChange={handleChangeProjectHousing}
                />
                <input
                    type="text"
                    id="projectInfo"
                    placeholder="Опис проекту"
                    value={project.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                />
                <button type="submit">Додати проект</button>
            </form>
        </div>
    )
}

export default AddNewProject
