import { createSlice } from '@reduxjs/toolkit'

type ProjectType = {
    country: string
    salary: string
    projectName: string
    location: string
    sex: string
    ageFrom: string
    ageTo: string
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
    date: number
    lat: string
    lng: string
    partner: string
}

const initialState: ProjectType[] = []

export const filtredArrReducer = createSlice({
    name: 'filtredArr',
    initialState,
    reducers: {
        getFiltredArrData: (state, action) => {
            return action.payload
        },
    },
})

export const { getFiltredArrData } = filtredArrReducer.actions
export default filtredArrReducer.reducer
