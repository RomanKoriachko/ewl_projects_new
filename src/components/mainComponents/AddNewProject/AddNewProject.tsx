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
import { FormGroup, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import {
    addCheckedCheckbox,
    removeAllCheckboxes,
} from 'redux/checkboxCheckedReducer'
type Props = {}

const AddNewProject = (props: Props) => {
    const projectState = useAppSelector((state) => state.newProjectState)
    const checkboxState = useAppSelector((state) => state.checkboxCheckedState)
    const dispatch = useAppDispatch()

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
        } else if (projectState.sex.includes(e.target.value)) {
            let tempStr = projectState.sex
            let newStr = tempStr.replace(e.target.value, '')
            newStr.trim()
            dispatch(addNewSex(newStr.trim()))
        }
        dispatch(
            addCheckedCheckbox({
                value: e.target.value,
                checked: e.target.checked,
            })
        )
    }

    const errorElement = projectState.sex
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
                        snapshot.val().hasOwnProperty(projectState.projectName)
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
                        dispatch(removeAllCheckboxes())
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
        if (projectState.sex === '') {
            alert('Необходимо выбрать пол')
        } else if (projectState.ageFrom && projectState.ageTo) {
            writeProjectData(
                projectState.country,
                projectState.salary,
                projectState.projectName,
                projectState.location,
                projectState.sex,
                projectState.ageFrom,
                projectState.ageTo,
                projectState.nationalaty,
                projectState.additionalInfo,
                projectState.housing,
                projectState.projectInfo,
                projectState.category
            )
        }
    }

    let inputSize: 'medium' | 'small' | undefined = 'medium'

    if (window.innerWidth <= 576) {
        inputSize = 'small'
    } else {
        inputSize = 'medium'
    }

    return (
        <div className="project-form">
            <p className="add-project-header">Добавить проект</p>
            <form onSubmit={onSendClick} id="add-project">
                <Autocomplete
                    id="country"
                    renderInput={(params) => (
                        <TextField {...params} label="Страна" required />
                    )}
                    options={countrysOptions}
                    value={projectState.country}
                    size={inputSize}
                    onChange={(event: any, newValue: string | null) => {
                        dispatch(changeCountry(newValue))
                    }}
                />
                <FormControl required error={error}>
                    <FormLabel>Выбор пола</FormLabel>
                    <FormGroup>
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
                                            checkboxState['Мужчины']
                                                ? true
                                                : false
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
                                            checkboxState['Женщины']
                                                ? true
                                                : false
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
                                        checked={
                                            checkboxState['Пары'] ? true : false
                                        }
                                        className="checkbox"
                                        value="Пары"
                                        onChange={handleChangeSex}
                                        name="Пары"
                                    />
                                }
                                label="Пары"
                            />
                        </div>
                    </FormGroup>
                </FormControl>
                <TextField
                    required
                    label="Название проекта"
                    variant="outlined"
                    id="project"
                    size={inputSize}
                    value={projectState.projectName}
                    onChange={handleChangeProjectName}
                />
                <TextField
                    required
                    label="Ставка"
                    variant="outlined"
                    id="salary"
                    size={inputSize}
                    value={projectState.salary}
                    onChange={handleChangeSalary}
                />
                <TextField
                    required
                    label="Локализация"
                    variant="outlined"
                    id="location"
                    size={inputSize}
                    value={projectState.location}
                    onChange={handleChangeProjectLocation}
                />
                <TextField
                    required
                    label="Категория"
                    variant="outlined"
                    id="category"
                    size={inputSize}
                    value={projectState.category}
                    onChange={handleChangeProjectCategory}
                />
                <div className="row age-row">
                    <TextField
                        required
                        label="Возраст От"
                        variant="outlined"
                        id="age-from"
                        size={inputSize}
                        value={projectState.ageFrom}
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <TextField
                        required
                        label="Возраст До"
                        variant="outlined"
                        id="age-to"
                        size={inputSize}
                        value={projectState.ageTo}
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <TextField
                    required
                    label="Национальность"
                    variant="outlined"
                    id="nationalaty"
                    size={inputSize}
                    value={projectState.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <TextField
                    required
                    label="Дополнительная информация"
                    variant="outlined"
                    id="additionalInfo"
                    size={inputSize}
                    value={projectState.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <TextField
                    required
                    label="Примеры жилья"
                    variant="outlined"
                    id="housing"
                    size={inputSize}
                    value={projectState.housing}
                    onChange={handleChangeProjectHousing}
                />
                <TextField
                    required
                    label="Описание проекта"
                    variant="outlined"
                    id="projectInfo"
                    multiline
                    size={inputSize}
                    value={projectState.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                />
                <button className="add-project-btn" type="submit">
                    Добавить проект
                </button>
            </form>
        </div>
    )
}

export default AddNewProject
