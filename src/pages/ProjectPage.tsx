import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAppSelector } from 'redux/hooks'
import { separateGenders } from 'helper/useGenders'
import { getDataFromServer } from 'helper/getDataFromServer'
import { CurrentProjectType } from 'components/mainComponents/Projects/NewProjectType'
import { CopyButtonComponent } from 'components/mainComponents/Projects/components'

import './ProjectPage.scss'

type Props = {}

const ProjectPage = (props: Props) => {
    const { id } = useParams()

    const darkThemeState = useAppSelector((state) => state.darkThemeState)

    const [currentProject, setCurrentProject] = useState<CurrentProjectType[]>(
        []
    )

    const [loadingState, setLoadingState] = useState<boolean>(false)
    const [errorState, setErrorState] = useState<boolean>(false)

    useEffect(() => {
        async function getDataWithProjectId(id: string) {
            setLoadingState(true)
            getDataFromServer(
                `/api/job-advertisements/external-job-advertisements/${id}`
            )
                .then((result) => {
                    // dispatch(setErrorState(false))
                    setErrorState(false)
                    const arr = []
                    arr.push(result)
                    setCurrentProject(arr)
                    setLoadingState(false)
                })
                .catch((error) => {
                    // dispatch(setErrorState(true))
                    setErrorState(true)
                    setLoadingState(false)
                    console.error('Error:', error)
                })
        }
        if (id) {
            getDataWithProjectId(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log(currentProject)

    const [projectDescription, setProjectDescription] = useState<
        CurrentProjectType[]
    >([])

    // console.log(projectDescription)

    useEffect(() => {
        async function getDataWithProjectId() {
            getDataFromServer(
                `/api/job-advertisements/external-job-advertisements/current/${currentProject[0].correlationId}`
            )
                .then((result) => {
                    const arr = []
                    arr.push(result)
                    setErrorState(false)
                    setProjectDescription(arr)
                })
                .catch((error) => {
                    setErrorState(true)
                    console.error('Error:', error)
                })
        }
        if (currentProject.length > 0) {
            getDataWithProjectId()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProject.length])

    const [genders, setGenders] = useState<string[]>([])

    const actualState = useAppSelector((state) => state.actualProjectsState)

    useEffect(() => {
        if (currentProject.length > 0)
            separateGenders(actualState, setGenders, undefined, currentProject)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProject.length])

    function splitCityNames(project: CurrentProjectType) {
        return project.cityNames.split(',')
    }

    return (
        <main className={`main ${darkThemeState.main}`}>
            {errorState ? (
                <div className="error-message">
                    Сталась помилка при завантаженні даних
                </div>
            ) : (
                <div className="project-page">
                    {loadingState ? (
                        <div className="loading"></div>
                    ) : currentProject.length > 0 ? (
                        <div className="container">
                            <div className={`project-page-item`}>
                                {currentProject.length >= 1 ? (
                                    <>
                                        <p className="project-header">
                                            {currentProject[0].companyName}
                                        </p>
                                        <div className="row project-first-descroption-row">
                                            <div className="row project-row">
                                                <div>
                                                    <div className="project-sex row">
                                                        {genders.map(
                                                            (element, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="project-sex"
                                                                >
                                                                    {element}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="row project-location-row">
                                                    <div className="project-location">
                                                        {splitCityNames(
                                                            currentProject[0]
                                                        ).map((city) => (
                                                            <a
                                                                key={city}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                href={`https://www.google.com.ua/maps/place/${city}`}
                                                            >
                                                                {city}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to="/">
                                                <div className="link-wrapper row">
                                                    <div className="arrow-img"></div>
                                                    <div>назад</div>
                                                </div>
                                            </Link>
                                        </div>
                                        <div
                                            key={currentProject[0].companyId}
                                            className="current-project-info"
                                        >
                                            <div
                                                className="current-project-description"
                                                dangerouslySetInnerHTML={{
                                                    __html: currentProject[0]
                                                        .advertisementHtml,
                                                }}
                                            />
                                            <div className="current-project-item">
                                                <p className="current-project-item-title">
                                                    Опис вакансії
                                                </p>
                                                {projectDescription.length >
                                                0 ? (
                                                    <div>
                                                        {
                                                            projectDescription[0]
                                                                .description
                                                        }
                                                    </div>
                                                ) : undefined}
                                            </div>
                                            <div className="current-project-item">
                                                <p className="current-project-item-title">
                                                    Бонуси
                                                </p>
                                                {projectDescription.length >
                                                0 ? (
                                                    <div>
                                                        {
                                                            projectDescription[0]
                                                                .benefits
                                                        }
                                                    </div>
                                                ) : undefined}
                                            </div>
                                            <div className="current-project-item">
                                                <p className="current-project-item-title">
                                                    Контактні особи
                                                </p>
                                                {currentProject[0].contactPeople
                                                    .length > 0 ? (
                                                    currentProject[0].contactPeople.map(
                                                        (coordinator) => (
                                                            <div
                                                                key={
                                                                    coordinator.userId
                                                                }
                                                                className="current-project-coordinator-item"
                                                            >
                                                                <p className="current-project-coordinator-name">
                                                                    {
                                                                        coordinator.userName
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        coordinator.phoneNumber
                                                                    }
                                                                </p>
                                                                <p>
                                                                    {
                                                                        coordinator.email
                                                                    }
                                                                </p>
                                                            </div>
                                                        )
                                                    )
                                                ) : (
                                                    <p>не вказано</p>
                                                )}
                                            </div>
                                        </div>
                                        <CopyButtonComponent
                                            correlationId={
                                                currentProject[0].correlationId
                                            }
                                        />
                                    </>
                                ) : undefined}
                            </div>
                        </div>
                    ) : undefined}
                </div>
            )}
        </main>
    )
}

export default ProjectPage
