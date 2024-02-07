import React, { useEffect, useState } from 'react'
import { CurrentProjectType, NewProjectType } from '../../NewProjectType'
import { getDataFromServer } from 'helper/getData'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { showLessData, showMoreData } from 'redux/showMoreReducer'

import './ProjectItem.scss'
import { setErrorState } from 'redux/errorReducer'

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
            `https://corsproxy.io/?https://platform-prod.ewl.com.pl/job-advertisements/external-job-advertisements/current/${correlationId}`
        )
            .then((result) => {
                dispatch(setErrorState(false))
                const newArr = JSON.parse(JSON.stringify(currentProject))
                newArr.push(result)
                setCurrentProject(newArr)
                setIsLoading(false)
            })
            .catch((error) => {
                dispatch(setErrorState(true))
                setIsLoading(false)
                console.error('Error:', error)
            })
    }

    const [newAdvertisementHtml, setNewAdvertisementHtml] = useState<string>('')

    async function getDataWithProjectId(id: string) {
        setIsLoading(true)
        getDataFromServer(
            `https://corsproxy.io/?https://platform-prod.ewl.com.pl/job-advertisements/external-job-advertisements/${id}`
        )
            .then((result) => {
                dispatch(setErrorState(false))
                setNewAdvertisementHtml(result.advertisementHtml)
                setIsLoading(false)
            })
            .catch((error) => {
                dispatch(setErrorState(true))
                setIsLoading(false)
                console.error('Error:', error)
            })
    }

    // console.log(newAdvertisementHtml)

    function onShowMoreClick(
        companyName: string,
        correlationId: string,
        id: string
    ) {
        dispatch(showMoreData(companyName))
        getData(correlationId)
        getDataWithProjectId(id)
    }

    function onShowLessClick(companyName: string, correlationId: string) {
        dispatch(showLessData(companyName))
        const newArr = JSON.parse(JSON.stringify(currentProject)).filter(
            (element: CurrentProjectType) =>
                element.correlationId !== correlationId
        )
        setCurrentProject(newArr)
    }

    const [isActualState, setIsActualState] = useState<boolean>(false)

    useEffect(() => {
        const date = new Date()
        const currentDate = date.toISOString()
        vacancy.recruitmentProjects.forEach((element) => {
            if (element.projectEndDate < currentDate) {
                setIsActualState(false)
            } else {
                setIsActualState(true)
            }
        })
        vacancy.recruitmentProjects.forEach((element) => {
            if (element.projectEndDate === null) {
                setIsActualState(true)
            }
        })
    }, [])

    return (
        <div
            key={vacancy.id}
            className={`project-item ${
                isActualState ? undefined : 'not-actual'
            }`}
        >
            <p className="project-header">{vacancy.companyName}</p>
            <div className="row project-first-descroption-row">
                <div className="row project-row">
                    <div className="project-sex">{vacancy.allowGender}</div>
                    <div className="row project-location-row">
                        <div className="project-location">
                            {vacancy.cityNames}
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`project-short-description ${
                    showMoreState[vacancy.companyName] ? 'hide' : 'show'
                }`}
                dangerouslySetInnerHTML={{
                    __html: vacancy.advertisementHtml,
                }}
            />
            <div
                className={showMoreState[vacancy.companyName] ? 'show' : 'hide'}
            >
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
                            showMoreState[vacancy.companyName] ? 'hide' : 'show'
                        }`}
                        onClick={() =>
                            onShowMoreClick(
                                vacancy.companyName,
                                vacancy.correlationId,
                                vacancy.id
                            )
                        }
                    >
                        Розгорнути
                    </button>
                    <button
                        className={`show-more-btn project-item-btn ${
                            showMoreState[vacancy.companyName] ? 'show' : 'hide'
                        }`}
                        onClick={() =>
                            onShowLessClick(
                                vacancy.companyName,
                                vacancy.correlationId
                            )
                        }
                    >
                        Згорнути
                    </button>
                    {/* <CopyButton
                                        statusNodeMap={StatusNodeMap}
                                        className="copy-btn project-item-btn"
                                        value={`Назва проєкту\n${
                                            element.projectName
                                        }\n\nСтать\n${element.sex.trim()}\n\nВік від ${
                                            element.ageFrom
                                        }, Вік до ${
                                            element.ageTo
                                        }\n\nНаціональність\n${
                                            element.nationalaty
                                        }\n\nЛокалізація\n${element.country}, ${
                                            element.location
                                        }\nhttps://www.google.com.ua/maps/place/${
                                            element.country
                                        }+${element.location.replace(
                                            / /gi,
                                            '+'
                                        )}\n\nЗаробітня плата\n${
                                            element.salary
                                        }\n\nОпис вакансії\n${
                                            element.projectInfo
                                        }\n\nГрафік роботи\n${
                                            element.workSchedule
                                        }\n\nПроживання\n${element.housing}${
                                            element.housingPhoto !== ''
                                                ? `\n\nФото житла\n${element.housingPhoto}`
                                                : ''
                                        }\n\nХарчування\n${element.food}${
                                            element.additionalInfo !== ''
                                                ? `\n\nДодаткова інформація\n${element.additionalInfo}`
                                                : ''
                                        }
                                    ${
                                        element.video !== ''
                                            ? `\n\nВідео з проєкту\n${element.video}`
                                            : ''
                                    }`.trim()}
                                    /> */}
                </div>
            </div>
        </div>
    )
}

export default ProjectItem
