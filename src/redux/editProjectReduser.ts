import { createSlice } from '@reduxjs/toolkit'

type ProjectType = {
    country: string
    salary: string
    projectName: string
    location: string
    sex: string
    ageFrom: number
    ageTo: number
    nationalaty: string
    additionalInfo: string
    housing: string
    projectInfo: string
    category: string
    isActual: boolean
    video: string
    workSchedule: string
    food: string
    synchronerLink: string
    contact: string
    housingPhoto: string
    date: string
}

const initialState: ProjectType = {
    country: '',
    salary: '',
    projectName: '',
    location: '',
    sex: '',
    ageFrom: 0,
    ageTo: 0,
    nationalaty: '',
    additionalInfo: '',
    housing: '',
    projectInfo: '',
    category: '',
    isActual: false,
    video: '',
    workSchedule: '',
    food: '',
    synchronerLink: '',
    contact: '',
    housingPhoto: '',
    date: '',
}

export const editProjectSlice = createSlice({
    name: 'editProjectData',
    initialState,
    reducers: {
        editCountry: (state, action) => ({
            ...state,
            country: action.payload,
        }),
        editSalary: (state, action) => ({
            ...state,
            salary: action.payload,
        }),
        editProjectName: (state, action) => ({
            ...state,
            projectName: action.payload,
        }),
        editProjectLocation: (state, action) => ({
            ...state,
            location: action.payload,
        }),
        editSex: (state, action) => ({
            ...state,
            sex: state.sex + ' ' + action.payload,
        }),
        addNewEditedSex: (state, action) => ({
            ...state,
            sex: action.payload,
        }),
        editProjectAgeFrom: (state, action) => ({
            ...state,
            ageFrom: action.payload,
        }),
        editProjectAgeTo: (state, action) => ({
            ...state,
            ageTo: action.payload,
        }),
        editProjectNationality: (state, action) => ({
            ...state,
            nationalaty: action.payload,
        }),
        editProjectAdditionalInfo: (state, action) => ({
            ...state,
            additionalInfo: action.payload,
        }),
        editProjectHousing: (state, action) => ({
            ...state,
            housing: action.payload,
        }),
        editProjectHousingPhoto: (state, action) => ({
            ...state,
            housingPhoto: action.payload,
        }),
        editProjectInfo: (state, action) => ({
            ...state,
            projectInfo: action.payload,
        }),
        editCategory: (state, action) => ({
            ...state,
            category: action.payload,
        }),
        editIsActual: (state, action) => ({
            ...state,
            isActual: action.payload,
        }),
        editVideo: (state, action) => ({
            ...state,
            video: action.payload,
        }),
        editWorkSchedule: (state, action) => ({
            ...state,
            workSchedule: action.payload,
        }),
        editFood: (state, action) => ({
            ...state,
            food: action.payload,
        }),
        editSynchronerLink: (state, action) => ({
            ...state,
            synchronerLink: action.payload,
        }),
        editContact: (state, action) => ({
            ...state,
            contact: action.payload,
        }),
        editDate: (state, action) => ({
            ...state,
            date: action.payload,
        }),
        deliteEditedProjectData: (state, action) => ({
            country: action.payload,
            salary: action.payload,
            projectName: action.payload,
            location: action.payload,
            sex: action.payload,
            ageFrom: 0,
            ageTo: 0,
            nationalaty: action.payload,
            additionalInfo: action.payload,
            housing: action.payload,
            projectInfo: action.payload,
            category: action.payload,
            isActual: false,
            video: action.payload,
            workSchedule: action.payload,
            food: action.payload,
            synchronerLink: action.payload,
            contact: action.payload,
            housingPhoto: action.payload,
            date: action.payload,
        }),
        getProjectData: (state, action) => ({
            country: action.payload.country,
            salary: action.payload.salary,
            projectName: action.payload.projectName,
            location: action.payload.location,
            sex: action.payload.sex,
            ageFrom: action.payload.ageFrom,
            ageTo: action.payload.ageTo,
            nationalaty: action.payload.nationalaty,
            additionalInfo: action.payload.additionalInfo,
            housing: action.payload.housing,
            projectInfo: action.payload.projectInfo,
            category: action.payload.category,
            isActual: action.payload.isActual,
            video: action.payload.video,
            workSchedule: action.payload.workSchedule,
            food: action.payload.food,
            synchronerLink: action.payload.synchronerLink,
            contact: action.payload.contact,
            housingPhoto: action.payload.housingPhoto,
            date: action.payload.date,
        }),
    },
})

export const {
    editCountry,
    editSalary,
    editProjectName,
    editProjectLocation,
    editSex,
    addNewEditedSex,
    editProjectAgeFrom,
    editProjectAgeTo,
    editProjectNationality,
    editProjectAdditionalInfo,
    editProjectHousing,
    editProjectHousingPhoto,
    editProjectInfo,
    deliteEditedProjectData,
    editCategory,
    getProjectData,
    editIsActual,
    editVideo,
    editWorkSchedule,
    editFood,
    editSynchronerLink,
    editContact,
    editDate,
} = editProjectSlice.actions
export default editProjectSlice.reducer
