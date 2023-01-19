import {createSlice} from "@reduxjs/toolkit"

type ProjectType = {
    country: string
    salary: string
    projectName: string
    location: string
    sex: string
    ageFrom: number | undefined
    ageTo: number | undefined
    nationalaty: string
    additionalInfo: string
    housing: string
    projectInfo: string
    category: string
    isActual: boolean
}

const initialState: ProjectType = {
    country: '',
    salary: '',
    projectName: '',
    location: '',
    sex: '',
    ageFrom: undefined,
    ageTo: undefined,
    nationalaty: '',
    additionalInfo: '',
    housing: '',
    projectInfo: '',
    category: '',
    isActual: false,
}

export const editProjectSlice = createSlice({
    name:'editProjectData',
    initialState,
    reducers:{
        editCountry: (state, action) => ({
            ...state,
            country: action.payload
        }),
        editSalary: (state, action) => ({
            ...state,
            salary: action.payload
        }),
        editProjectName: (state, action) => ({
            ...state,
            projectName: action.payload
        }),
        editProjectLocation: (state, action) => ({
            ...state,
            location: action.payload
        }),
        editSex: (state, action) => ({
            ...state,
            sex: state.sex + " " + action.payload
        }),
        addNewEditedSex: (state, action) => ({
            ...state,
            sex: action.payload
        }),
        editProjectAgeFrom: (state, action) => ({
            ...state,
            ageFrom: action.payload
        }),
        editProjectAgeTo: (state, action) => ({
            ...state,
            ageTo: action.payload
        }),
        editProjectNationality: (state, action) => ({
            ...state,
            nationalaty: action.payload
        }),
        editProjectAdditionalInfo: (state, action) => ({
            ...state,
            additionalInfo: action.payload
        }),
        editProjectHousing: (state, action) => ({
            ...state,
            housing: action.payload
        }),
        editProjectInfo: (state, action) => ({
            ...state,
            projectInfo: action.payload
        }),
        editCategory: (state, action) => ({
            ...state,
            category: action.payload
        }),
        editIsActual: (state, action) => ({
            ...state,
            isActual: action.payload
        }),
        deliteEditedProjectData: (state, action) => ({
            country: action.payload,
            salary: action.payload,
            projectName: action.payload,
            location: action.payload,
            sex: action.payload,
            ageFrom: action.payload,
            ageTo: action.payload,
            nationalaty: action.payload,
            additionalInfo: action.payload,
            housing: action.payload,
            projectInfo: action.payload,
            category: action.payload,
            isActual: action.payload,
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
        }),
    }
})

export const {editCountry, editSalary, editProjectName, editProjectLocation, editSex, addNewEditedSex, editProjectAgeFrom, editProjectAgeTo, editProjectNationality, editProjectAdditionalInfo, editProjectHousing, editProjectInfo, deliteEditedProjectData, editCategory, getProjectData, editIsActual} = editProjectSlice.actions
export default editProjectSlice.reducer