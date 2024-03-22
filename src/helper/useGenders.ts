import {
    CurrentProjectType,
    NewProjectType,
} from 'components/mainComponents/Projects/NewProjectType'
import { ActualProjectsType } from 'redux/actualProjectsReducer'

export const separateGenders = (
    actualState: ActualProjectsType[],
    setGenders: (value: React.SetStateAction<string[]>) => void,
    vacancy?: NewProjectType,
    vacancyArr?: CurrentProjectType[]
) => {
    let activeGenders
    if (vacancy) {
        activeGenders = vacancy.recruitmentProjects.map((vacanies) => vacanies)
    } else if (vacancyArr) {
        activeGenders = vacancyArr[0].recruitmentProjects.map(
            (vacanies) => vacanies
        )
    }

    const newGenders: string[] = []

    if (activeGenders) {
        if (
            (vacancy &&
                actualState.some(
                    (item) => item.id === vacancy.id && item.isActual
                )) ||
            (vacancyArr &&
                actualState.some(
                    (item) => item.id === vacancyArr[0].id && item.isActual
                ))
        ) {
            activeGenders.forEach((element) => {
                if (element.vacancies.currentSumOfAllVacancies > 0) {
                    if (
                        !newGenders.includes('Пари') &&
                        element.vacancies.currentNumberOfAnyGenderVacancies > 0
                    ) {
                        newGenders.push('Пари')
                    }
                    if (
                        !newGenders.includes('Чоловіки') &&
                        element.vacancies.currentNumberOfManVacancies > 0
                    ) {
                        newGenders.push('Чоловіки')
                    }
                    if (
                        !newGenders.includes('Жінки') &&
                        element.vacancies.currentNumberOfWomanVacancies > 0
                    ) {
                        newGenders.push('Жінки')
                    }
                }
            })
        }
    }

    // console.log(newGenders)
    // console.log(vacancy)
    // console.log(vacancyArr)

    if (
        vacancy &&
        actualState.some((item) => item.id === vacancy.id && !item.isActual)
    ) {
        vacancy.recruitmentProjects.forEach((item) => {
            if (
                !newGenders.includes('Пари') &&
                item.numberOfAnyGenderVacancies > 0
            ) {
                newGenders.push('Пари')
            }
            if (
                !newGenders.includes('Чоловіки') &&
                item.numberOfManVacancies > 0
            ) {
                newGenders.push('Чоловіки')
            }
            if (
                !newGenders.includes('Жінки') &&
                item.numberOfWomanVacancies > 0
            ) {
                newGenders.push('Жінки')
            }
        })
    } else if (
        vacancyArr &&
        actualState.some(
            (item) => item.id === vacancyArr[0].id && !item.isActual
        )
    ) {
        vacancyArr[0].recruitmentProjects.forEach((item) => {
            if (
                !newGenders.includes('Пари') &&
                item.numberOfAnyGenderVacancies > 0
            ) {
                newGenders.push('Пари')
            }
            if (
                !newGenders.includes('Чоловіки') &&
                item.numberOfManVacancies > 0
            ) {
                newGenders.push('Чоловіки')
            }
            if (
                !newGenders.includes('Жінки') &&
                item.numberOfWomanVacancies > 0
            ) {
                newGenders.push('Жінки')
            }
        })
    }

    if (newGenders.length < 1 && vacancyArr) {
        newGenders.push(vacancyArr[0].allowGender)
    }

    setGenders(newGenders)
}
