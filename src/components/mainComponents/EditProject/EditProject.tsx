import { ProjectType } from 'container/Main/Main'
import { update, ref, getDatabase, get, child } from 'firebase/database'
import './EditProject.scss'

type Props = {
    editProject: ProjectType
    setEditProject: (prevState: ProjectType) => void
    setEditFormState: (prevState: boolean) => void
}

const EditProject = ({
    editProject,
    setEditProject,
    setEditFormState,
}: Props) => {
    const handleChangeProjectCountry = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
        if (e.target.value === 'empty') {
            alert('необходимо выбрать страну')
        }
    }
    const handleChangeProjectSalary = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            salary: e.target.value,
        }))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            projectName: e.target.value,
        }))
    }
    const handleChangeProjectLocation = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            location: e.target.value,
        }))
    }
    const handleChangeProjectSex = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            sex: e.target.value,
        }))
    }
    const handleChangeProjectAge = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            age: e.target.value,
        }))
    }
    const handleChangeProjectNationalaty = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            nationalaty: e.target.value,
        }))
    }
    const handleChangeProjectAdditionalInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            additionalInfo: e.target.value,
        }))
    }
    const handleChangeProjectHousing = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            housing: e.target.value,
        }))
    }
    const handleChangeProjectProjectInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            projectInfo: e.target.value,
        }))
    }

    const closeEditForm = () => {
        setEditFormState(false)
    }

    const onEditClick = (
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
    ) => {
        const dbRef = ref(getDatabase())
        get(child(dbRef, `vacancy/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (
                        snapshot.val().hasOwnProperty(editProject.projectName)
                    ) {
                        const db = getDatabase()
                        const projectData = {
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
                        }
                        const updates = {}
                        /* @ts-ignore*/
                        updates[`vacancy/${projectName}`] = projectData
                        /* @ts-ignore*/
                        setEditProject(() => ({
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
                        return update(ref(db), updates)
                    } else {
                        alert('такого проекту не існує')
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
            editProject.country === '' ||
            editProject.salary === '' ||
            editProject.projectName === '' ||
            editProject.location === '' ||
            editProject.sex === '' ||
            editProject.age === '' ||
            editProject.nationalaty === '' ||
            editProject.additionalInfo === '' ||
            editProject.housing === '' ||
            editProject.projectInfo === '' ||
            editProject.country === 'empty' ||
            editProject.sex === 'empty'
        ) {
            alert("всі поля обов'язкові")
        } else {
            onEditClick(
                editProject.country,
                editProject.salary,
                editProject.projectName,
                editProject.location,
                editProject.sex,
                editProject.age,
                editProject.nationalaty,
                editProject.additionalInfo,
                editProject.housing,
                editProject.projectInfo
            )
            setEditFormState(false)
        }
    }

    return (
        <div className="project-edit-form">
            <div className="project-edit-header">
                <p>Редагувати проект</p>
                <button onClick={closeEditForm}>X</button>
            </div>
            <form onSubmit={onSendClick}>
                <label htmlFor="country">Вибір країни</label>
                <select
                    name="country"
                    id="country"
                    form="add-project"
                    value={editProject.country}
                    onChange={handleChangeProjectCountry}
                >
                    <option value="Польша">Польша</option>
                    <option value="Германия">Германия</option>
                    <option value="Словакия">Словакия</option>
                </select>
                <input
                    type="text"
                    id="salary"
                    placeholder="Ставка"
                    value={editProject.salary}
                    onChange={handleChangeProjectSalary}
                />
                <input
                    type="text"
                    id="project"
                    placeholder="назва проекту"
                    value={editProject.projectName}
                    onChange={handleChangeProjectName}
                />
                <input
                    type="text"
                    id="location"
                    placeholder="Локалізація"
                    value={editProject.location}
                    onChange={handleChangeProjectLocation}
                />
                <label htmlFor="sex">Выбор пола</label>
                <select
                    name="sex"
                    id="sex"
                    form="add-project"
                    value={editProject.sex}
                    onChange={handleChangeProjectSex}
                >
                    <option value="Только мужчины">Только Мужчины</option>
                    <option value="Только женщины">Только Женщины</option>
                    <option value="Пары">Пары</option>
                </select>
                <input
                    type="text"
                    id="age"
                    placeholder="Вік"
                    value={editProject.age}
                    onChange={handleChangeProjectAge}
                />
                <input
                    type="text"
                    id="nationalaty"
                    placeholder="Національність"
                    value={editProject.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <input
                    type="text"
                    id="additionalInfo"
                    placeholder="Додаткова інформація"
                    value={editProject.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <input
                    type="text"
                    id="housing"
                    placeholder="Приклади житла"
                    value={editProject.housing}
                    onChange={handleChangeProjectHousing}
                />
                <input
                    type="text"
                    id="projectInfo"
                    placeholder="Опис проекту"
                    value={editProject.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                />
                <button type="submit">Редагувати проект</button>
            </form>
        </div>
    )
}

export default EditProject
