import { update, ref, getDatabase, get, child } from 'firebase/database'
import {
    addNewEditedSex,
    deliteEditedProjectData,
    editCategory,
    editCountry,
    editFood,
    editIsActual,
    editProjectAdditionalInfo,
    editProjectAgeFrom,
    editProjectAgeTo,
    editProjectHousing,
    editProjectInfo,
    editProjectLocation,
    editProjectName,
    editProjectNationality,
    editSalary,
    editSex,
    editVideo,
    editWorkSchedule,
} from 'redux/editProjectReduser'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { FormGroup, Switch, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import './EditProject.scss'
import { setFormState } from 'redux/editFormReducer'

type Props = {}

const EditProject = (props: Props) => {
    const editProjectState = useAppSelector((state) => state.editProjectState)
    const dispatch = useAppDispatch()

    const countrysOptions = [
        '',
        'Польща',
        'Чехія',
        'Румунія',
        'Словаччина',
        'Литва',
        'Голландія',
        'Німеччина',
        'Греція',
        'Іспанія',
        'Кіпр',
    ]

    const handleChangeProjectSalary = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editSalary(e.target.value))
    }
    const handleChangeProjectName = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectName(e.target.value))
    }
    const handleChangeProjectLocation = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectLocation(e.target.value))
    }
    const handleChangeProjectCategory = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editCategory(e.target.value))
    }

    const handleChangeSex = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            dispatch(editSex(e.target.value))
        } else if (editProjectState.sex.includes(e.target.value)) {
            let tempStr = editProjectState.sex
            let newStr = tempStr.replace(e.target.value, '')
            newStr.trim()
            dispatch(addNewEditedSex(newStr.trim()))
        }
    }

    const errorElement = editProjectState.sex
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

    const handleChangeIsActual = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(editIsActual(e.target.checked))
    }

    const handleChangeProjectAgeFrom = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '')
        dispatch(editProjectAgeFrom(onlyNumbers))
    }
    const handleChangeProjectAgeTo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const onlyNumbers = e.target.value.replace(/\D/g, '')
        dispatch(editProjectAgeTo(onlyNumbers))
    }
    const handleChangeProjectNationalaty = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectNationality(e.target.value))
    }
    const handleChangeProjectAdditionalInfo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectAdditionalInfo(e.target.value))
    }
    const handleChangeProjectVideo = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editVideo(e.target.value))
    }
    const handleChangeProjectHousing = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editProjectHousing(e.target.value))
    }
    const handleChangeProjectWorkSchedule = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editWorkSchedule(e.target.value))
    }
    const handleChangeProjectFood = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(editFood(e.target.value))
    }
    const handleChangeProjectProjectInfo = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        dispatch(editProjectInfo(e.target.value))
    }

    const closeEditForm = () => {
        dispatch(setFormState(false))
    }

    const onEditClick = (
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
        category: string,
        isActual: boolean,
        video: string,
        workSchedule: string,
        food: string
    ) => {
        const dbRef = ref(getDatabase())
        get(child(dbRef, `vacancy/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (
                        snapshot
                            .val()
                            .hasOwnProperty(editProjectState.projectName)
                    ) {
                        const db = getDatabase()
                        const projectData = {
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
                            isActual: isActual,
                            video: video,
                            workSchedule: workSchedule,
                            food: food,
                        }
                        const updates = {}
                        /* @ts-ignore*/
                        updates[`vacancy/${projectName}`] = projectData
                        dispatch(deliteEditedProjectData(''))
                        return update(ref(db), updates)
                    } else {
                        alert('Такого проекта не існує')
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
        if (editProjectState.sex === '') {
            alert('Необхідно обрати стать')
        } else if (editProjectState.ageFrom > editProjectState.ageTo) {
            alert('Вік Від не може бути більше, ніж Вік До')
        } else {
            onEditClick(
                editProjectState.country,
                editProjectState.salary,
                editProjectState.projectName,
                editProjectState.location,
                editProjectState.sex,
                editProjectState.ageFrom,
                editProjectState.ageTo,
                editProjectState.nationalaty,
                editProjectState.additionalInfo,
                editProjectState.housing,
                editProjectState.projectInfo,
                editProjectState.category,
                editProjectState.isActual,
                editProjectState.video,
                editProjectState.workSchedule,
                editProjectState.food
            )
            dispatch(setFormState(false))
        }
    }

    let inputSize: 'medium' | 'small' | undefined = 'medium'

    if (window.innerWidth <= 576) {
        inputSize = 'small'
    } else {
        inputSize = 'medium'
    }

    return (
        <div className="project-edit-form">
            <div className="project-edit-header">
                <p className="tablet-header">Редагувати проєкт</p>
                <button onClick={closeEditForm}></button>
            </div>
            <form onSubmit={onSendClick}>
                <Autocomplete
                    id="esit-country-select"
                    renderInput={(params) => (
                        <TextField {...params} label="Країна" required />
                    )}
                    size={inputSize}
                    options={countrysOptions}
                    value={editProjectState.country}
                    onChange={(event: any, newValue: string | null) => {
                        dispatch(editCountry(newValue))
                    }}
                />
                <div className="sex-select-edit">
                    <FormControl required error={error}>
                        <FormLabel>Вибір статі</FormLabel>
                        <div className="row edit-sex-and-switch">
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
                                                editProjectState.sex.includes(
                                                    'Чоловіки'
                                                )
                                                    ? true
                                                    : false
                                            }
                                            className="checkbox"
                                            value="Чоловіки"
                                            onChange={handleChangeSex}
                                            name="Чоловіки"
                                        />
                                    }
                                    label="Чоловіки"
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
                                                editProjectState.sex.includes(
                                                    'Жінки'
                                                )
                                                    ? true
                                                    : false
                                            }
                                            className="checkbox"
                                            value="Жінки"
                                            onChange={handleChangeSex}
                                            name="Жінки"
                                        />
                                    }
                                    label="Жінки"
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
                                                editProjectState.sex.includes(
                                                    'Пари'
                                                )
                                                    ? true
                                                    : false
                                            }
                                            className="checkbox"
                                            value="Пари"
                                            onChange={handleChangeSex}
                                            name="Пари"
                                        />
                                    }
                                    label="Пари"
                                />
                            </div>
                            <div>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                color="warning"
                                                onChange={handleChangeIsActual}
                                                checked={
                                                    editProjectState.isActual
                                                }
                                            />
                                        }
                                        label="Актуальний"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </FormControl>
                </div>
                <TextField
                    required
                    label="Назва проєкту"
                    variant="outlined"
                    id="edit-project-name"
                    size={inputSize}
                    value={editProjectState.projectName}
                    onChange={handleChangeProjectName}
                />
                <TextField
                    required
                    label="Заробітня плата"
                    variant="outlined"
                    id="edit-salary"
                    size={inputSize}
                    value={editProjectState.salary}
                    onChange={handleChangeProjectSalary}
                />
                <TextField
                    required
                    label="Локалізація"
                    variant="outlined"
                    id="edit-location"
                    size={inputSize}
                    value={editProjectState.location}
                    onChange={handleChangeProjectLocation}
                />
                <TextField
                    required
                    label="Категорія"
                    variant="outlined"
                    id="edit-category"
                    size={inputSize}
                    value={editProjectState.category}
                    onChange={handleChangeProjectCategory}
                />
                <div className="row age-wrapper">
                    <TextField
                        required
                        label="Вік від"
                        variant="outlined"
                        id="edit-age-from"
                        size={inputSize}
                        value={editProjectState.ageFrom}
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <TextField
                        required
                        label="Вік до"
                        variant="outlined"
                        id="edit-age-to"
                        size={inputSize}
                        value={editProjectState.ageTo}
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <TextField
                    required
                    label="Національність"
                    variant="outlined"
                    id="edit-nationalaty"
                    size={inputSize}
                    value={editProjectState.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <TextField
                    required
                    label="Посилання на приїзд"
                    variant="outlined"
                    id="edit-additionalInfo"
                    size={inputSize}
                    value={editProjectState.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <TextField
                    label="Відео з проєкту"
                    variant="outlined"
                    id="edit-video"
                    size={inputSize}
                    value={editProjectState.video}
                    onChange={handleChangeProjectVideo}
                />
                <TextField
                    required
                    label="Проживання"
                    variant="outlined"
                    id="edit-housing"
                    size={inputSize}
                    value={editProjectState.housing}
                    onChange={handleChangeProjectHousing}
                />
                <TextField
                    required
                    label="Графік роботи"
                    variant="outlined"
                    id="edit-work-Schedule"
                    size={inputSize}
                    value={editProjectState.workSchedule}
                    onChange={handleChangeProjectWorkSchedule}
                />
                <TextField
                    required
                    label="Харчування"
                    variant="outlined"
                    id="edit-food"
                    size={inputSize}
                    value={editProjectState.food}
                    onChange={handleChangeProjectFood}
                />
                <TextField
                    required
                    label="Опис проєкту"
                    variant="outlined"
                    id="edit-projectInfo"
                    multiline
                    rows={5}
                    value={editProjectState.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                />
                <button className="edit-project-btn" type="submit">
                    Редагувати проєкт
                </button>
            </form>
        </div>
    )
}

export default EditProject
