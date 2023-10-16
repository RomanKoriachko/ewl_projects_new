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
    isActul: boolean
    video: string
    workSchedule: string
    food: string
    synchronerLink: string
    contact: string
    housingPhoto: string
    date: number
    lat: string
    lng: string
    partner: string
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
    projectInfo: ``,
    category: '',
    isActul: false,
    video: '',
    workSchedule: '',
    food: '',
    synchronerLink: '',
    contact: '',
    housingPhoto: '',
    date: 0,
    lat: '',
    lng: '',
    partner: '',
}

export const newProjectSlice = createSlice({
    name: 'addNewProjectData',
    initialState,
    reducers: {
        changeCountry: (state, action) => ({
            ...state,
            country: action.payload,
        }),
        changeSalary: (state, action) => ({
            ...state,
            salary: action.payload,
        }),
        changeProjectName: (state, action) => ({
            ...state,
            projectName: action.payload,
        }),
        changeProjectLocation: (state, action) => ({
            ...state,
            location: action.payload,
        }),
        changeSex: (state, action) => ({
            ...state,
            sex: state.sex + ' ' + action.payload,
        }),
        addNewSex: (state, action) => ({
            ...state,
            sex: action.payload,
        }),
        changeProjectAgeFrom: (state, action) => ({
            ...state,
            ageFrom: action.payload,
        }),
        changeProjectAgeTo: (state, action) => ({
            ...state,
            ageTo: action.payload,
        }),
        changeProjectNationality: (state, action) => ({
            ...state,
            nationalaty: action.payload,
        }),
        changeProjectAdditionalInfo: (state, action) => ({
            ...state,
            additionalInfo: action.payload,
        }),
        changeProjectHousing: (state, action) => ({
            ...state,
            housing: action.payload,
        }),
        changeProjectHousingPhoto: (state, action) => ({
            ...state,
            housingPhoto: action.payload,
        }),
        changeProjectInfo: (state, action) => ({
            ...state,
            projectInfo: action.payload,
        }),
        changeCategory: (state, action) => ({
            ...state,
            category: action.payload,
        }),
        changeIsActual: (state, action) => ({
            ...state,
            isActul: action.payload,
        }),
        changeVideo: (state, action) => ({
            ...state,
            video: action.payload,
        }),
        changeWorkSchedule: (state, action) => ({
            ...state,
            workSchedule: action.payload,
        }),
        changeFood: (state, action) => ({
            ...state,
            food: action.payload,
        }),
        changeSynchronerlink: (state, action) => ({
            ...state,
            synchronerLink: action.payload,
        }),
        changeContact: (state, action) => ({
            ...state,
            contact: action.payload,
        }),
        changeDate: (state, action) => ({
            ...state,
            date: action.payload,
        }),
        changeLat: (state, action) => ({
            ...state,
            lat: action.payload,
        }),
        changeLng: (state, action) => ({
            ...state,
            lng: action.payload,
        }),
        changePartner: (state, action) => ({
            ...state,
            partner: action.payload,
        }),
        deliteProjectData: (state, action) => ({
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
            isActul: false,
            video: action.payload,
            workSchedule: action.payload,
            food: action.payload,
            synchronerLink: action.payload,
            contact: action.payload,
            housingPhoto: action.payload,
            date: 0,
            lat: action.payload,
            lng: action.payload,
            partner: action.payload,
        }),
    },
})

export const {
    changeCountry,
    changeSalary,
    changeProjectName,
    changeProjectLocation,
    changeSex,
    addNewSex,
    changeProjectAgeFrom,
    changeProjectAgeTo,
    changeProjectNationality,
    changeProjectAdditionalInfo,
    changeProjectHousing,
    changeProjectHousingPhoto,
    changeProjectInfo,
    changeCategory,
    deliteProjectData,
    changeIsActual,
    changeVideo,
    changeWorkSchedule,
    changeFood,
    changeSynchronerlink,
    changeContact,
    changeDate,
    changeLat,
    changeLng,
    changePartner,
} = newProjectSlice.actions
export default newProjectSlice.reducer
