import React, { useEffect, useState } from 'react'

import { CurrentProjectType, NewProjectType } from '../../NewProjectType'
import { getDataFromServer } from 'helper/getDataFromServer'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { showLessData, showMoreData } from 'redux/showMoreReducer'
import { setErrorState } from 'redux/errorReducer'
import { CopyButtonComponent } from '../CopyButtonComponent'

import './ProjectItem.scss'

type Props = { vacancy: NewProjectType }

const ProjectItem = ({ vacancy }: Props) => {
    const showMoreState = useAppSelector((state) => state.showMoreState)
    const errorState = useAppSelector((state) => state.errorState)
    const dispatch = useAppDispatch()

    const [currentProject, setCurrentProject] = useState<CurrentProjectType[]>(
        []
    )
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // console.log(currentProject)

    async function getData(correlationId: string) {
        setIsLoading(true)
        getDataFromServer(
            `https://platform-prod.ewl.com.pl/job-advertisements/external-job-advertisements/current/${correlationId}`
        )
            .then((result) => {
                dispatch(setErrorState(false))
                const newArr = JSON.parse(JSON.stringify(currentProject))
                if (!newArr.includes(result)) {
                    newArr.push(result)
                }
                setCurrentProject(newArr)
                setIsLoading(false)
            })
            .catch((error) => {
                dispatch(setErrorState(true))
                setIsLoading(false)
                console.error('Error:', error)
            })
    }

    // console.log(currentProject)

    const [newAdvertisementHtml, setNewAdvertisementHtml] = useState<string>('')

    async function getDataWithProjectId(id: string) {
        setIsLoading(true)
        getDataFromServer(
            `https://platform-prod.ewl.com.pl/job-advertisements/external-job-advertisements/${id}`
        )
            .then((result) => {
                dispatch(setErrorState(false))
                setNewAdvertisementHtml(result.advertisementHtml)
                setIsLoading(false)
            })
            .catch((error) => {
                dispatch(setErrorState(true))
                setIsLoading(false)
                setNewAdvertisementHtml('Помилка отримання даних')
                console.error('Error:', error)
            })
    }

    function onShowMoreClick(correlationId: string, id: string) {
        dispatch(showMoreData(id))
        getData(correlationId)
        getDataWithProjectId(id)
    }

    function onShowLessClick(id: string, correlationId: string) {
        dispatch(showLessData(id))
        const newArr = JSON.parse(JSON.stringify(currentProject)).filter(
            (element: CurrentProjectType) =>
                element.correlationId !== correlationId
        )
        setCurrentProject(newArr)
    }

    // Перевірка гендеру

    const [genders, setGenders] = useState<string[]>([])

    useEffect(() => {
        const activeGenders = vacancy.recruitmentProjects.map(
            (vacanies) => vacanies
        )

        const newGenders: string[] = []

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

        if (newGenders.length < 1) {
            newGenders.push(vacancy.allowGender)
        }

        setGenders(newGenders)
    }, [vacancy.allowGender, vacancy.recruitmentProjects])

    // Перевірка проєктив на актуальність

    const isActualState = useAppSelector((state) => state.actualProjectsState)

    function getIsActualState() {
        const isActual = isActualState.find(
            (element) => element.id === vacancy.id
        )
        if (isActual) {
            return isActual.isActual
        }
    }

    // Видалення \n після елемента "Додаткові послуги"
    useEffect(() => {
        if (newAdvertisementHtml) {
            const updatedHtml = newAdvertisementHtml.replace(
                /(Додаткові послуги<\/b><\/h6>)([\s\S]*?)\\n/g,
                (match, p1, p2) => {
                    const updatedText = p2.replace(/\\n/g, '')
                    return p1 + updatedText
                }
            )
            setNewAdvertisementHtml(updatedHtml)
        }
    }, [newAdvertisementHtml])

    // Отримання додаткової інформації по проєкту

    // useEffect(() => {
    //     getDataWithProjectId(vacancy.id)
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <div
            key={vacancy.id}
            className={`project-item ${
                getIsActualState() ? undefined : 'not-actual'
            }`}
        >
            <p className="project-header">{vacancy.companyName}</p>
            <div className="row project-first-descroption-row">
                <div className="row project-row">
                    {genders.map((element, i) => (
                        <div key={i} className="project-sex">
                            {element}
                        </div>
                    ))}
                    <div className="row project-location-row">
                        <div className="project-location">
                            {vacancy.cityNames}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`project-short-description ${
                    showMoreState[vacancy.id] ? 'hide' : 'show'
                }`}
                dangerouslySetInnerHTML={{
                    __html: vacancy.advertisementHtml,
                }}
            />
            <div className={showMoreState[vacancy.id] ? 'show' : 'hide'}>
                {errorState ? (
                    <div>Виникла помилка при завантаженні даних</div>
                ) : isLoading ? (
                    <div>Завантаження...</div>
                ) : (
                    currentProject.map((element) =>
                        element.companyId === vacancy.companyId ? (
                            <div
                                key={element.companyId}
                                className="current-project-info"
                            >
                                <div
                                    className="current-project-description"
                                    dangerouslySetInnerHTML={{
                                        __html: newAdvertisementHtml,
                                    }}
                                />
                                <div className="current-project-item">
                                    <p className="current-project-item-title">
                                        Опис вакансії
                                    </p>
                                    <div>{element.description}</div>
                                </div>
                                <div className="current-project-item">
                                    <p className="current-project-item-title">
                                        Бонуси
                                    </p>
                                    <p>{element.benefits}</p>
                                </div>
                                <div className="current-project-item">
                                    <p className="current-project-item-title">
                                        Контактні особи
                                    </p>
                                    {element.contactPeople.map(
                                        (coordinator) => (
                                            <div
                                                key={coordinator.userId}
                                                className="current-project-coordinator-item"
                                            >
                                                <p className="current-project-coordinator-name">
                                                    {coordinator.userName}
                                                </p>
                                                <p>{coordinator.phoneNumber}</p>
                                                <p>{coordinator.email}</p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ) : undefined
                    )
                )}
            </div>
            <div className="row project-item-buttons">
                <div className="row">
                    <button
                        className={`show-more-btn project-item-btn ${
                            showMoreState[vacancy.id] ? 'hide' : 'show'
                        }`}
                        onClick={() =>
                            onShowMoreClick(vacancy.correlationId, vacancy.id)
                        }
                    >
                        Розгорнути
                    </button>
                    <button
                        className={`show-more-btn project-item-btn ${
                            showMoreState[vacancy.id] ? 'show' : 'hide'
                        }`}
                        onClick={() =>
                            onShowLessClick(vacancy.id, vacancy.correlationId)
                        }
                    >
                        Згорнути
                    </button>
                    <CopyButtonComponent
                        correlationId={vacancy.correlationId}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProjectItem
