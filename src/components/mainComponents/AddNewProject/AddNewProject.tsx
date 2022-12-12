import { ProjectType } from 'container/Main/Main'
import { getDatabase, ref, set, get, child } from 'firebase/database'
import './AddNewProject.scss'

type Props = {
    project: ProjectType
    setNewProject: (prevState: ProjectType) => void
}

const AddNewProject = ({ project, setNewProject }: Props) => {
    const handleChangeCountry = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
    // const handleChangeProjectSex = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     /* @ts-ignore */
    //     setNewProject((prevState: ProjectType) => ({
    //         ...prevState,
    //         sex: e.target.value,
    //     }))
    // }

    // let sexState: string = ''
    // let maleState: string = ''
    // let femaleState: string = ''
    // let couplesState: string = ''
    // let tempArr: string[] | null = []

    // const [newTempArr, setNewTempArr] = useState<[]>([])

    // const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.checked && e.target.value === 'Мужчины') {
    //         maleState = 'Мужчины'
    //         sexState = maleState + femaleState + couplesState
    //         tempArr = sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g)
    //         /* @ts-ignore */
    //         setNewTempArr(sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g))
    //         console.log(newTempArr)
    //         // /* @ts-ignore */
    //         // setNewProject((prevState: ProjectType) => ({
    //         //     ...prevState,
    //         //     sex: tempArr?.join(', '),
    //         // }))
    //     } else if (!e.target.checked && e.target.value === 'Мужчины') {
    //         maleState = ''
    //         sexState = femaleState + couplesState
    //         tempArr = sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g)
    //         /* @ts-ignore */
    //         setNewTempArr(sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g))
    //         console.log(newTempArr)
    //         /* @ts-ignore */
    //         // setNewProject((prevState: ProjectType) => ({
    //         //     ...prevState,
    //         //     sex: tempArr?.join(', '),
    //         // }))
    //     } else if (e.target.checked && e.target.value === 'Женщины') {
    //         femaleState = 'Женщины'
    //         sexState = maleState + femaleState + couplesState
    //         tempArr = sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g)
    //         /* @ts-ignore */
    //         setNewTempArr(sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g))
    //         console.log(newTempArr)
    //         // /* @ts-ignore */
    //         // setNewProject((prevState: ProjectType) => ({
    //         //     ...prevState,
    //         //     sex: tempArr?.join(', '),
    //         // }))
    //     } else if (!e.target.checked && e.target.value === 'Женщины') {
    //         femaleState = ''
    //         sexState = maleState + couplesState
    //         tempArr = sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g)
    //         /* @ts-ignore */
    //         setNewTempArr(sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g))
    //         console.log(newTempArr)
    //         // /* @ts-ignore */
    //         // setNewProject((prevState: ProjectType) => ({
    //         //     ...prevState,
    //         //     sex: tempArr?.join(', '),
    //         // }))
    //     } else if (e.target.checked && e.target.value === 'Пары') {
    //         couplesState = 'Пары'
    //         sexState = maleState + femaleState + couplesState
    //         tempArr = sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g)
    //         /* @ts-ignore */
    //         setNewTempArr(sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g))
    //         console.log(newTempArr)
    //         // /* @ts-ignore */
    //         // setNewProject((prevState: ProjectType) => ({
    //         //     ...prevState,
    //         //     sex: tempArr?.join(', '),
    //         // }))
    //     } else if (!e.target.checked && e.target.value === 'Пары') {
    //         couplesState = ''
    //         sexState = maleState + femaleState
    //         tempArr = sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g)
    //         /* @ts-ignore */
    //         setNewTempArr(sexState.match(/[А-ЯЁA-Z][а-яёa-z]+/g))
    //         console.log(newTempArr)
    //         // /* @ts-ignore */
    //         // setNewProject((prevState: ProjectType) => ({
    //         //     ...prevState,
    //         //     sex: tempArr?.join(', '),
    //         // }))
    //     }
    // }

    const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            /* @ts-ignore */
            setNewProject((prevState: ProjectType) => ({
                ...prevState,
                sex: prevState.sex + ' ' + e.target.value,
            }))
        } else if (project.sex.includes(e.target.value)) {
            let tempStr = project.sex
            let newStr = tempStr.replace(e.target.value, '')
            /* @ts-ignore */
            setNewProject((prevState: ProjectType) => ({
                ...prevState,
                sex: newStr,
            }))
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
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            ageFrom: e.target.value,
        }))
    }
    const handleChangeProjectAgeTo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        /* @ts-ignore */
        setNewProject((prevState: ProjectType) => ({
            ...prevState,
            ageTo: e.target.value,
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
        e: React.ChangeEvent<HTMLTextAreaElement>
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
        ageFrom: string,
        ageTo: string,
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
                        alert('Проект уже существует')
                        /* @ts-ignore */
                        setNewProject(() => ({
                            country: '',
                            salary: '',
                            projectName: '',
                            location: '',
                            sex: '',
                            ageFrom: '',
                            ageTo: '',
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
                            ageFrom: ageFrom,
                            ageTo: ageTo,
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
            project.ageFrom === '' ||
            project.ageTo === '' ||
            project.nationalaty === '' ||
            project.additionalInfo === '' ||
            project.housing === '' ||
            project.projectInfo === ''
        ) {
            alert('Все поля обязательны для заполнения')
        } else {
            writeProjectData(
                project.country,
                project.salary,
                project.projectName,
                project.location,
                project.sex,
                project.ageFrom,
                project.ageTo,
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
                ageFrom: '',
                ageTo: '',
                nationalaty: '',
                additionalInfo: '',
                housing: '',
                projectInfo: '',
            }))
            resetSex()
        }
    }

    return (
        <div className="project-form">
            <p>Добавить проект</p>
            <form onSubmit={onSendClick} id="add-project">
                <label htmlFor="country">Выбор страны</label>
                <select
                    name="country"
                    id="country"
                    form="add-project"
                    value={project.country}
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
                    <input
                        type="checkbox"
                        id="male"
                        name="sex"
                        value="Мужчины"
                        className="chechbox"
                        onChange={handleChangeSex}
                    />
                    <label htmlFor="male">Мужчины</label>
                    <input
                        type="checkbox"
                        id="female"
                        name="sex"
                        value="Женщины"
                        className="chechbox"
                        onChange={handleChangeSex}
                    />
                    <label htmlFor="female">Женщины</label>
                    <input
                        type="checkbox"
                        id="couples"
                        name="sex"
                        value="Пары"
                        className="chechbox"
                        onChange={handleChangeSex}
                    />
                    <label htmlFor="couples">Пары</label>
                </div>
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
                    placeholder="Название проекта"
                    value={project.projectName}
                    onChange={handleChangeProjectName}
                />
                <input
                    type="text"
                    id="location"
                    placeholder="Локализация"
                    value={project.location}
                    onChange={handleChangeProjectLocation}
                />
                <div>
                    <input
                        type="text"
                        id="age-from"
                        placeholder="Возраст От"
                        value={project.ageFrom}
                        maxLength={2}
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <input
                        type="text"
                        id="age-to"
                        placeholder="Возраст До"
                        value={project.ageTo}
                        maxLength={2}
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <input
                    type="text"
                    id="nationalaty"
                    placeholder="Национальность"
                    value={project.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <input
                    type="text"
                    id="additionalInfo"
                    placeholder="Дополнительная информация"
                    value={project.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <input
                    type="text"
                    id="housing"
                    placeholder="Примеры жилья"
                    value={project.housing}
                    onChange={handleChangeProjectHousing}
                />
                <textarea
                    name="projectInfo"
                    id="projectInfo"
                    placeholder="Описание проекта"
                    cols={30}
                    rows={10}
                    value={project.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                ></textarea>
                <button type="submit">Добавить проект</button>
            </form>
        </div>
    )
}

export default AddNewProject
