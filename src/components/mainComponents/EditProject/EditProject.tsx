import { ProjectType } from 'container/Main/Main'
import { update, ref, getDatabase, get, child } from 'firebase/database'
import React from 'react'

type Props = {
    editProject: ProjectType
    setEditProject: (prevState: ProjectType) => void
}

const EditProject = ({ editProject, setEditProject }: Props) => {
    const handleChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        /* @ts-ignore */
        setEditProject((prevState: ProjectType) => ({
            ...prevState,
            country: e.target.value,
        }))
    }
    const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const onEditClick = (
        country: string,
        salary: string,
        projectName: string
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
                        }
                        const updates = {}
                        /* @ts-ignore*/
                        updates[`vacancy/${projectName}`] = projectData
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
            editProject.projectName === ''
        ) {
            alert("всі поля обов'язкові")
        } else {
            onEditClick(
                editProject.country,
                editProject.salary,
                editProject.projectName
            )
        }
    }

    return (
        <div className="project-form">
            <p>Редагувати проект</p>
            <form onSubmit={onSendClick}>
                <input
                    type="text"
                    id="country"
                    placeholder="Назва країни"
                    value={editProject.country}
                    onChange={handleChangeCountry}
                />
                <input
                    type="text"
                    id="salary"
                    placeholder="Ставка"
                    value={editProject.salary}
                    onChange={handleChangeSalary}
                />
                <input
                    type="text"
                    id="project"
                    placeholder="назва проекту"
                    value={editProject.projectName}
                    onChange={handleChangeProjectName}
                />
                <button type="submit">Редагувати проект</button>
            </form>
        </div>
    )
}

export default EditProject
