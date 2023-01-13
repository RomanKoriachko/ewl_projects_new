import { getDatabase, ref, set, get, child } from 'firebase/database'
import {
    addNewSex,
    changeCategory,
    changeCountry,
    changeProjectAdditionalInfo,
    changeProjectAgeFrom,
    changeProjectAgeTo,
    changeProjectHousing,
    changeProjectInfo,
    changeProjectLocation,
    changeProjectName,
    changeProjectNationality,
    changeSalary,
    changeSex,
    deliteProjectData,
} from 'redux/newProjectReduser'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import './AddNewProject.scss'

type Props = {}

const AddNewProject = (props: Props) => {
    const ProjectState = useAppSelector((state) => state.newProjectState)
    const dispatch = useAppDispatch()

    const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeCountry(e.target.value))
    }

    const handleChangeSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeSalary(e.target.value))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeProjectName(e.target.value))
    }
    const handleChangeProjectLocation = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeProjectLocation(e.target.value))
    }
    const handleChangeProjectCategory = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeCategory(e.target.value))
    }

    const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(changeSex(e.target.value))
        } else if (ProjectState.sex.includes(e.target.value)) {
            let tempStr = ProjectState.sex
            let newStr = tempStr.replace(e.target.value, '')
            newStr.trim()
            dispatch(addNewSex(newStr.trim()))
        }
    }

    let checkbox = document.querySelectorAll('.chechbox')

    const resetSex = () => {
        for (let i = 0; i < checkbox.length; i++) {
            /* @ts-ignore */
            checkbox[i].checked = false
        }
    }

    const handleChangeProjectAgeFrom = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '')
        dispatch(changeProjectAgeFrom(onlyNumbers))
    }
    const handleChangeProjectAgeTo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '')
        dispatch(changeProjectAgeTo(onlyNumbers))
    }
    const handleChangeProjectNationalaty = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeProjectNationality(e.target.value))
    }
    const handleChangeProjectAdditionalInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeProjectAdditionalInfo(e.target.value))
    }
    const handleChangeProjectHousing = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeProjectHousing(e.target.value))
    }
    const handleChangeProjectProjectInfo = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        dispatch(changeProjectInfo(e.target.value))
    }

    const db = getDatabase()

    function writeProjectData(
        country: string,
        salary: string,
        projectName: string,
        location: string,
        sex: string,
        ageFrom: number,
        ageTo: number,
        nationalaty: string,
        additionalInfo: string,
        housing: string,
        projectInfo: string,
        category: string
    ) {
        const dbRef = ref(getDatabase())
        get(child(dbRef, `vacancy/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (
                        snapshot.val().hasOwnProperty(ProjectState.projectName)
                    ) {
                        alert('Проект с таким названием уже добавлен')
                    } else {
                        set(ref(db, `vacancy/${projectName}/`), {
                            country: country,
                            salary: salary,
                            projectName: projectName,
                            location: location,
                            sex: sex,
                            ageFrom: ageFrom,
                            ageTo: ageTo,
                            nationalaty: nationalaty,
                            additionalInfo: additionalInfo,
                            housing: housing,
                            projectInfo: projectInfo,
                            category: category,
                        })
                        dispatch(deliteProjectData(''))
                        resetSex()
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
            ProjectState.country === '' ||
            ProjectState.salary === '' ||
            ProjectState.projectName === '' ||
            ProjectState.location === '' ||
            ProjectState.sex === '' ||
            ProjectState.ageFrom === undefined ||
            ProjectState.ageTo === undefined ||
            ProjectState.nationalaty === '' ||
            ProjectState.additionalInfo === '' ||
            ProjectState.housing === '' ||
            ProjectState.projectInfo === '' ||
            ProjectState.category === ''
        ) {
            alert('Все поля обязательны для заполнения')
        } else if (ProjectState.ageFrom > ProjectState.ageTo) {
            alert('Возраст От не может быть больше возраста До')
        } else {
            writeProjectData(
                ProjectState.country,
                ProjectState.salary,
                ProjectState.projectName,
                ProjectState.location,
                ProjectState.sex,
                ProjectState.ageFrom,
                ProjectState.ageTo,
                ProjectState.nationalaty,
                ProjectState.additionalInfo,
                ProjectState.housing,
                ProjectState.projectInfo,
                ProjectState.category
            )
        }
    }

    return (
        <div className="project-form">
            <p className="add-project-header">Добавить проект</p>
            <form onSubmit={onSendClick} id="add-project">
                <label htmlFor="country">Выбор страны</label>
                <select
                    name="country"
                    id="country"
                    form="add-project"
                    value={ProjectState.country}
                    onChange={handleChangeCountry}
                >
                    <option value="empty"></option>
                    <option value="Польша">Польша</option>
                    <option value="Чехия">Чехия</option>
                    <option value="Румыния">Румыния</option>
                    <option value="Словакия">Словакия</option>
                    <option value="Литва">Литва</option>
                    <option value="Голландия">Голландия</option>
                    <option value="Германия">Германия</option>
                    <option value="Греция">Греция</option>
                    <option value="Испания">Испания</option>
                    <option value="Кипр">Кипр</option>
                </select>
                <div className="sex-select">
                    <p>Выбор пола</p>
                    <div className="row sex-select-wrapper">
                        <div>
                            <input
                                type="checkbox"
                                id="project-male"
                                name="sex"
                                value="Мужчины"
                                className="chechbox"
                                onChange={handleChangeSex}
                            />
                            <label htmlFor="project-male">Мужчины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="project-female"
                                name="sex"
                                value="Женщины"
                                className="chechbox"
                                onChange={handleChangeSex}
                            />
                            <label htmlFor="project-female">Женщины</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                id="project-couples"
                                name="sex"
                                value="Пары"
                                className="chechbox"
                                onChange={handleChangeSex}
                            />
                            <label htmlFor="project-couples">Пары</label>
                        </div>
                    </div>
                </div>
                <input
                    type="text"
                    id="project"
                    placeholder="Название проекта"
                    value={ProjectState.projectName}
                    onChange={handleChangeProjectName}
                />
                <input
                    type="text"
                    id="salary"
                    placeholder="Ставка"
                    value={ProjectState.salary}
                    onChange={handleChangeSalary}
                />
                <input
                    type="text"
                    id="location"
                    placeholder="Локализация"
                    value={ProjectState.location}
                    onChange={handleChangeProjectLocation}
                />
                <input
                    type="text"
                    id="category"
                    placeholder="Категория"
                    value={ProjectState.category}
                    onChange={handleChangeProjectCategory}
                />
                <div className="row age-row">
                    <input
                        type="text"
                        id="age-from"
                        placeholder="Возраст От"
                        value={ProjectState.ageFrom}
                        maxLength={2}
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <input
                        type="text"
                        id="age-to"
                        placeholder="Возраст До"
                        value={ProjectState.ageTo}
                        maxLength={2}
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <input
                    type="text"
                    id="nationalaty"
                    placeholder="Национальность"
                    value={ProjectState.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <input
                    type="text"
                    id="additionalInfo"
                    placeholder="Дополнительная информация"
                    value={ProjectState.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <input
                    type="text"
                    id="housing"
                    placeholder="Примеры жилья"
                    value={ProjectState.housing}
                    onChange={handleChangeProjectHousing}
                />
                <textarea
                    name="projectInfo"
                    id="projectInfo"
                    placeholder="Описание проекта"
                    cols={30}
                    rows={10}
                    value={ProjectState.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                ></textarea>
                <button type="submit">Добавить проект</button>
            </form>
        </div>
    )
}

export default AddNewProject
