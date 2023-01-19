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
    isActul: boolean
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
    projectInfo: ``,
    category: '',
    isActul: false,
}

export const newProjectSlice = createSlice({
    name:'addNewProjectData',
    initialState,
    reducers:{
        changeCountry: (state, action) => ({
            ...state,
            country: action.payload
        }),
        changeSalary: (state, action) => ({
            ...state,
            salary: action.payload
        }),
        changeProjectName: (state, action) => ({
            ...state,
            projectName: action.payload
        }),
        changeProjectLocation: (state, action) => ({
            ...state,
            location: action.payload
        }),
        changeSex: (state, action) => ({
            ...state,
            sex: state.sex + " " + action.payload
        }),
        addNewSex: (state, action) => ({
            ...state,
            sex: action.payload
        }),
        changeProjectAgeFrom: (state, action) => ({
            ...state,
            ageFrom: action.payload
        }),
        changeProjectAgeTo: (state, action) => ({
            ...state,
            ageTo: action.payload
        }),
        changeProjectNationality: (state, action) => ({
            ...state,
            nationalaty: action.payload
        }),
        changeProjectAdditionalInfo: (state, action) => ({
            ...state,
            additionalInfo: action.payload
        }),
        changeProjectHousing: (state, action) => ({
            ...state,
            housing: action.payload
        }),
        changeProjectInfo: (state, action) => ({
            ...state,
            projectInfo: action.payload
        }),
        changeCategory: (state, action) => ({
            ...state,
            category: action.payload
        }),
        changeIsActual: (state, action) =>( {
            ...state,
            isActul: action.payload
        }),
        deliteProjectData: (state, action) => ({
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
            isActul: false,
        })
    }
})

export const {changeCountry, changeSalary, changeProjectName, changeProjectLocation, changeSex, addNewSex, changeProjectAgeFrom, changeProjectAgeTo, changeProjectNationality, changeProjectAdditionalInfo, changeProjectHousing, changeProjectInfo, changeCategory, deliteProjectData, changeIsActual} = newProjectSlice.actions
export default newProjectSlice.reducer