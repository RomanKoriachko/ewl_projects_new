import { getDatabase, ref, set, get, child } from 'firebase/database'
import {
    addNewSex,
    changeCategory,
    changeCountry,
    changeFood,
    changeIsActual,
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
    changeSynchronerlink,
    changeVideo,
    changeWorkSchedule,
    deliteProjectData,
} from 'redux/newProjectReduser'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import './AddNewProject.scss'
import { FormGroup, Switch, TextField } from '@mui/material'
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

    const isActualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeIsActual(e.target.checked))
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
    const handleChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeVideo(e.target.value))
    }
    const handleChangeProjectHousing = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeProjectHousing(e.target.value))
    }
    const handleChangeWorkSchedule = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(changeWorkSchedule(e.target.value))
    }
    const handleChangeFood = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeFood(e.target.value))
    }
    const handleChangeProjectProjectInfo = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        dispatch(changeProjectInfo(e.target.value))
    }
    const handleChangeProjectSynchronerLink = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        dispatch(changeSynchronerlink(e.target.value))
    }

    // --------- write data ---------
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
        category: string,
        isActual: boolean,
        video: string,
        workSchedule: string,
        food: string,
        synchronerLink: string
    ) {
        const dbRef = ref(getDatabase())
        get(child(dbRef, `vacancy/`))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    if (
                        snapshot.val().hasOwnProperty(projectState.projectName)
                    ) {
                        alert('Проект з такою назвою вже додано')
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
                            isActual: isActual,
                            video: video,
                            workSchedule: workSchedule,
                            food: food,
                            synchronerLink: synchronerLink,
                        })
                        dispatch(deliteProjectData(''))
                        dispatch(removeAllCheckboxes())
                        dispatch(changeIsActual(false))
                    }
                } else {
                    console.log('No data available')
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }

    //  -------- sending form ---------
    const onSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (projectState.sex === '') {
            alert('Необхідно обрати стать')
        } else if (projectState.ageFrom > projectState.ageTo) {
            alert('Вік Від не може бути більше, ніж Вік До')
        } else {
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
                projectState.category,
                projectState.isActul,
                projectState.video,
                projectState.workSchedule,
                projectState.food,
                projectState.synchronerLink
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
            <p className="add-project-header">Додати проєкт</p>
            <form onSubmit={onSendClick} id="add-project">
                <Autocomplete
                    id="country"
                    renderInput={(params) => (
                        <TextField {...params} label="Країна" required />
                    )}
                    options={countrysOptions}
                    value={projectState.country}
                    size={inputSize}
                    onChange={(event: any, newValue: string | null) => {
                        dispatch(changeCountry(newValue))
                    }}
                />
                <FormControl required error={error}>
                    <FormLabel>Вибір статі</FormLabel>
                    <FormGroup>
                        <div className="row sex-and-switch">
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
                                                checkboxState['Чоловіки']
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
                                                checkboxState['Жінки']
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
                                                checkboxState['Пари']
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
                                                onChange={isActualChange}
                                                checked={
                                                    projectState.isActul
                                                        ? true
                                                        : false
                                                }
                                            />
                                        }
                                        label="Актуальний"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                    </FormGroup>
                </FormControl>
                <TextField
                    required
                    label="Назва проєкту"
                    variant="outlined"
                    id="project"
                    size={inputSize}
                    value={projectState.projectName}
                    onChange={handleChangeProjectName}
                />
                <TextField
                    required
                    label="Заробітня плата"
                    variant="outlined"
                    id="salary"
                    size={inputSize}
                    value={projectState.salary}
                    onChange={handleChangeSalary}
                />
                <TextField
                    required
                    label="Локалізація"
                    variant="outlined"
                    id="location"
                    size={inputSize}
                    value={projectState.location}
                    onChange={handleChangeProjectLocation}
                />
                <TextField
                    required
                    label="Категорія"
                    variant="outlined"
                    id="category"
                    size={inputSize}
                    value={projectState.category}
                    onChange={handleChangeProjectCategory}
                />
                <div className="row age-row">
                    <TextField
                        required
                        label="Вік від"
                        variant="outlined"
                        id="age-from"
                        size={inputSize}
                        value={
                            projectState.ageFrom === 0
                                ? ''
                                : projectState.ageFrom
                        }
                        onChange={handleChangeProjectAgeFrom}
                    />
                    <TextField
                        required
                        label="Вік до"
                        variant="outlined"
                        id="age-to"
                        size={inputSize}
                        value={
                            projectState.ageTo === 0 ? '' : projectState.ageTo
                        }
                        onChange={handleChangeProjectAgeTo}
                    />
                </div>
                <TextField
                    required
                    label="Національність"
                    variant="outlined"
                    id="nationalaty"
                    size={inputSize}
                    value={projectState.nationalaty}
                    onChange={handleChangeProjectNationalaty}
                />
                <TextField
                    label="Посилання на приїзд"
                    variant="outlined"
                    id="synchroner-link"
                    size={inputSize}
                    value={projectState.synchronerLink}
                    onChange={handleChangeProjectSynchronerLink}
                />
                <TextField
                    label="Відео з проєкту"
                    variant="outlined"
                    id="video"
                    size={inputSize}
                    value={projectState.video}
                    onChange={handleChangeVideo}
                />
                <TextField
                    required
                    label="Проживання"
                    variant="outlined"
                    id="housing"
                    size={inputSize}
                    value={projectState.housing}
                    onChange={handleChangeProjectHousing}
                />
                <TextField
                    required
                    label="Графік роботи"
                    variant="outlined"
                    id="work-Schedule"
                    size={inputSize}
                    value={projectState.workSchedule}
                    onChange={handleChangeWorkSchedule}
                />
                <TextField
                    required
                    label="Харчування"
                    variant="outlined"
                    id="food"
                    size={inputSize}
                    value={projectState.food}
                    onChange={handleChangeFood}
                />
                <TextField
                    required
                    label="Опис проєкту"
                    variant="outlined"
                    id="projectInfo"
                    multiline
                    size={inputSize}
                    value={projectState.projectInfo}
                    onChange={handleChangeProjectProjectInfo}
                />
                <TextField
                    label="Додаткова інформація"
                    variant="outlined"
                    id="additional-info"
                    multiline
                    size={inputSize}
                    value={projectState.additionalInfo}
                    onChange={handleChangeProjectAdditionalInfo}
                />
                <button className="add-project-btn" type="submit">
                    Додати проєкт
                </button>
            </form>
        </div>
    )
}

export default AddNewProject
