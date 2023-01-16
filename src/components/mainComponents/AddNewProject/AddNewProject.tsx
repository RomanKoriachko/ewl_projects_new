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
import { TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import Button from '@mui/material/Button'
import { createTheme, ThemeProvider } from '@mui/material/styles'

type Props = {}

type CheckedType = {
    [name: string]: boolean
}

const AddNewProject = (props: Props) => {
    const ProjectState = useAppSelector((state) => state.newProjectState)
    const dispatch = useAppDispatch()

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

    const [checked, setChecked] = useState<CheckedType>({})

    const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(changeSex(e.target.value))
        } else if (ProjectState.sex.includes(e.target.value)) {
            let tempStr = ProjectState.sex
            let newStr = tempStr.replace(e.target.value, '')
            newStr.trim()
            dispatch(addNewSex(newStr.trim()))
        }
        setChecked((prevState: CheckedType) => ({
            ...prevState,
            [e.target.value]: e.target.checked,
        }))
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
                        setChecked({})
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
            ProjectState.country === null ||
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

    const countrysOptions = [
        '',
        'Польша',
        'Чехия',
        'Румыния',
        'Словакия',
        'Литва',
        'Голландия',
        'Германия',
        'Греция',
        'Испания',
        'Кипр',
    ]

    const errorElement = ProjectState.sex
        .split(' ')
        .filter((element) => element.length > 1)

    let error = true
    errorElement.forEach((element) => {
        if (element.length < 1) {
            error = true
        } else {
            error = false
        }
    })

    return (
        <div className="project-form">
            <p className="add-project-header">Добавить проект</p>
            <form onSubmit={onSendClick} id="add-project">
                <Autocomplete
                    id="country"
                    renderInput={(params) => (
                        <TextField {...params} label="Страна" />
                    )}
                    options={countrysOptions}
                    value={ProjectState.country}
                    onChange={(event: any, newValue: string | null) => {
                        dispatch(changeCountry(newValue))
                    }}
                />
                <div className="sex-select">
                    <FormControl required error={error}>
                        <FormLabel>Выбор пола</FormLabel>
                        <div className="row sex-select-wrapper">
                            <FormControlLabel
                                className="checkbox-item"
                                control={
                                    <Checkbox
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                        }}
                                        checked={
                                            checked['Мужчины'] ? true : false
                                        }
                                        className="checkbox"
                                        value="Мужчины"
                                        onChange={handleChangeSex}
                                        name="Мужчины"
                                    />
                                }
                                label="Мужчины"
                            />
                            <FormControlLabel
                                className="checkbox-item"
                                control={
                                    <Checkbox
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                        }}
                                        checked={
                                            checked['Женщины'] ? true : false
                                        }
                                        className="checkbox"
                                        value="Женщины"
                                        onChange={handleChangeSex}
                                        name="Женщины"
                                    />
                                }
                                label="Женщины"
                            />
                            <FormControlLabel
                                className="checkbox-item"
                                control={
                                    <Checkbox
                                        sx={{
                                            '&.Mui-checked': {
                                                color: '#EB6A09',
                                            },
                                        }}
                                        checked={checked['Пары'] ? true : false}
                                        className="checkbox"
                                        value="Пары"
                                        onChange={handleChangeSex}
                                        name="Пары"
                                    />
                                }
                                label="Пары"
                            />
                        </div>
                    </FormControl>
                </div>
                <TextField
                    label="Название проекта"
                    variant="outlined"
                    id="project"
                    value={ProjectState.projectName}
                    onChange={handleChangeProjectName}
                />
                <TextField
                    label="Ставка"
                    variant="outlined"
                    id="salary"
                    value={ProjectState.salary}
                    onChange={handleChangeSalary}
                />
                <TextField
                    label="Локализация"
                    variant="outlined"
                    id="location"
                    value={ProjectState.location}
                    onChange={handleChangeProjectLocation}
                />
                <TextField
                    label="Категория"
                    variant="outlined"
                    id="category"
                    value={ProjectState.category}
                    onChange={handleChangeProjectCategory}
                />
                <div className="row age-row">
                    <TextField
                        label="Возраст От"
                        variant="outlined"
                        id="age-from"
                        value={ProjectState.ageFrom}
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <TextField
                        label="Возраст До"
                        variant="outlined"
                        id="age-to"
                        value={ProjectState.ageTo}
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <TextField
                    label="Национальность"
                    variant="outlined"
                    id="nationalaty"
                    value={ProjectState.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <TextField
                    label="Дополнительная информация"
                    variant="outlined"
                    id="additionalInfo"
                    value={ProjectState.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <TextField
                    label="Примеры жилья"
                    variant="outlined"
                    id="housing"
                    value={ProjectState.housing}
                    onChange={handleChangeProjectHousing}
                />
                <TextField
                    label="Описание проекта"
                    variant="outlined"
                    id="projectInfo"
                    multiline
                    value={ProjectState.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                />
                <button role="button" className="add-project-btn" type="submit">
                    Добавить проект
                </button>
            </form>
        </div>
    )
}

export default AddNewProject
