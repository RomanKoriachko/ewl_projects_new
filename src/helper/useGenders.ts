import {
    CurrentProjectType,
    NewProjectType,
} from 'components/mainComponents/Projects/NewProjectType'

export const separateGenders = (
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
        activeGenders.forEach((element) => {
            if (
                element.numberOfAnyGenderVacancies > 0 &&
                !newGenders.includes('Пари')
            ) {
                newGenders.push('Пари')
            }
            if (
                element.numberOfManVacancies > 0 &&
                !newGenders.includes('Чоловіки')
            ) {
                newGenders.push('Чоловіки')
            }
            if (
                element.numberOfWomanVacancies > 0 &&
                !newGenders.includes('Жінки')
            ) {
                newGenders.push('Жінки')
            }
        })
    }

    if (newGenders.length < 1 && vacancy) {
        newGenders.push(vacancy.allowGender)
    }

    if (newGenders.length < 1 && vacancyArr) {
        newGenders.push(vacancyArr[0].allowGender)
    }

    setGenders(newGenders)
}
