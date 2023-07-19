import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ProjectPage.scss'
import { ProjectType } from 'components/mainComponents/Projects/Projects'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useAppSelector } from 'redux/hooks'
import CopyButton from '@yozora/react-common-copy-button'

type Props = {}

type ICopyStatus = 'waiting' | 'copying' | 'failed' | 'succeed'

const ProjectPage = (props: Props) => {
    const { projectName } = useParams()

    const [projectsArr, setProjectsArr] = useState<ProjectType[]>([])
    const darkThemeState = useAppSelector((state) => state.darkThemeState)

    useEffect(() => {
        const dbEffect = getDatabase()
        const starCountRefEffect = ref(dbEffect, `vacancy/`)
        onValue(starCountRefEffect, (snapshot) => {
            let data = snapshot.val()
            setProjectsArr(Object.values(data))
        })
    }, [projectsArr.length])

    const currentProject = projectsArr.filter(
        (element) => element.projectName === projectName
    )
    console.log(currentProject)

    const splitString = (string: string) => {
        let arrFromString = string.split(' ')
        if (string.includes('\n')) {
            arrFromString = string.split('\n')
        }
        let filtredArrFromString = arrFromString.filter(
            (element) => element.length > 0
        )
        return filtredArrFromString
    }

    // change copy button placeholder
    const StatusNodeMap: Record<ICopyStatus, React.ReactNode> = {
        waiting: 'Копіювати',
        copying: 'Копіюю..',
        failed: 'Помилка!',
        succeed: 'Скопійовано!',
    }

    return (
        <main className={`main ${darkThemeState.main}`}>
            <div className="project-page">
                <div className="container">
                    <div className="project-page-item">
                        {currentProject.length >= 1 ? (
                            <>
                                <p className="project-header">
                                    {currentProject[0].projectName}
                                </p>
                                <div className="row project-first-descroption-row">
                                    <div className="row project-row">
                                        <div>
                                            <div className="project-sex row">
                                                {splitString(
                                                    currentProject[0].sex
                                                ).map(
                                                    (el: string, i: number) => (
                                                        <div key={i}>{el}</div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="row project-location-row">
                                            <div className="project-country">
                                                {currentProject[0].country},
                                            </div>
                                            <div className="project-location">
                                                <a
                                                    href={`https://www.google.com.ua/maps/place/${currentProject[0].country}+${currentProject[0].location}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {currentProject[0].location}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-category">
                                        {currentProject[0].category}
                                    </div>
                                </div>
                                <div className="is-actual-state">
                                    Актуальний:{' '}
                                    {currentProject[0].isActual ? 'Так' : 'Ні'}
                                </div>
                                <div className="row project-age-row">
                                    <div className="project-item-section">
                                        <div>
                                            <span className="bold-text">
                                                Вік від:
                                            </span>{' '}
                                            {currentProject[0].ageFrom}
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>
                                            <span className="bold-text">
                                                Вік до:
                                            </span>{' '}
                                            {currentProject[0].ageTo}
                                        </div>
                                    </div>
                                </div>
                                <div className="project-item-section">
                                    <div className="project-info">
                                        <span className="bold-text">
                                            Заробітня плата:
                                        </span>{' '}
                                        <div className="textfield-content">
                                            {currentProject[0].salary}
                                        </div>
                                    </div>
                                </div>
                                <div className="show">
                                    <div className="project-item-section">
                                        <div>
                                            <span className="bold-text">
                                                Національність:
                                            </span>{' '}
                                            {currentProject[0].nationalaty}
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div className="textfield-content">
                                            {currentProject[0].projectInfo}
                                        </div>
                                    </div>
                                    {currentProject[0].video !== '' ? (
                                        <div className="project-item-section">
                                            <div>
                                                <span className="bold-text">
                                                    Відео з проєкту:
                                                </span>{' '}
                                                <div className="column textfield-content">
                                                    {splitString(
                                                        currentProject[0].video
                                                    ).map(
                                                        (
                                                            el: string,
                                                            i: number
                                                        ) => (
                                                            <a
                                                                className="synchroner-link"
                                                                key={i}
                                                                href={el}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                            >
                                                                {el}
                                                            </a>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : undefined}
                                    <div className="project-item-section">
                                        <div>
                                            <span className="bold-text">
                                                Графік роботи:
                                            </span>{' '}
                                            <div className="textfield-content">
                                                {currentProject[0].workSchedule}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>
                                            <span className="bold-text">
                                                Проживання:
                                            </span>{' '}
                                            <div className="textfield-content">
                                                {currentProject[0].housing}
                                                {currentProject[0]
                                                    .housingPhoto ? (
                                                    <div>
                                                        <a
                                                            href={
                                                                currentProject[0]
                                                                    .housingPhoto
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            Фото житла
                                                        </a>
                                                    </div>
                                                ) : undefined}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="project-item-section">
                                        <div>
                                            <span className="bold-text">
                                                Харчування:
                                            </span>{' '}
                                            <div className="textfield-content">
                                                {currentProject[0].food}
                                            </div>
                                        </div>
                                    </div>
                                    {currentProject[0].additionalInfo !== '' ? (
                                        <div className="project-item-section">
                                            <div>
                                                <span className="bold-text">
                                                    Додаткова інформація:
                                                </span>{' '}
                                                <div className="textfield-content">
                                                    {
                                                        currentProject[0]
                                                            .additionalInfo
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ) : undefined}
                                    {currentProject[0].synchronerLink !== '' ? (
                                        <div className="project-item-section">
                                            <div>
                                                <span className="bold-text">
                                                    Посилання на приїзд:
                                                </span>{' '}
                                                <div className="column textfield-content">
                                                    {currentProject[0].synchronerLink.includes(
                                                        'http'
                                                    ) ? (
                                                        splitString(
                                                            currentProject[0]
                                                                .synchronerLink
                                                        ).map(
                                                            (
                                                                el: string,
                                                                i: number
                                                            ) => (
                                                                <a
                                                                    className="synchroner-link"
                                                                    key={i}
                                                                    href={el}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                >
                                                                    Посилання на
                                                                    приїзд №
                                                                    {i + 1}
                                                                </a>
                                                            )
                                                        )
                                                    ) : (
                                                        <div>
                                                            {
                                                                currentProject[0]
                                                                    .synchronerLink
                                                            }
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : undefined}
                                    {currentProject[0].contact !== '' ? (
                                        <div className="project-item-section">
                                            <div>
                                                <span className="bold-text">
                                                    Регіон, контакт опікуна:
                                                </span>{' '}
                                                <div className="textfield-content">
                                                    {currentProject[0].contact}
                                                </div>
                                            </div>
                                        </div>
                                    ) : undefined}
                                </div>
                                <div className="project-item-buttons">
                                    <CopyButton
                                        statusNodeMap={StatusNodeMap}
                                        className="copy-btn project-item-btn"
                                        value={`Назва проєкту\n${
                                            currentProject[0].projectName
                                        }\n\nСтать\n${currentProject[0].sex.trim()}\n\nВік від ${
                                            currentProject[0].ageFrom
                                        }, Вік до ${
                                            currentProject[0].ageTo
                                        }\n\nНаціональність\n${
                                            currentProject[0].nationalaty
                                        }\n\nЛокалізація\n${
                                            currentProject[0].country
                                        }, ${
                                            currentProject[0].location
                                        }\nhttps://www.google.com.ua/maps/place/${
                                            currentProject[0].country
                                        }+${currentProject[0].location.replace(
                                            / /gi,
                                            '+'
                                        )}\n\nЗаробітня плата\n${
                                            currentProject[0].salary
                                        }\n\nОпис вакансії\n${
                                            currentProject[0].projectInfo
                                        }\n\nГрафік роботи\n${
                                            currentProject[0].workSchedule
                                        }\n\nПроживання\n${
                                            currentProject[0].housing
                                        }${
                                            currentProject[0].housingPhoto !==
                                            ''
                                                ? `\n\nФото житла\n${currentProject[0].housingPhoto}`
                                                : ''
                                        }\n\nХарчування\n${
                                            currentProject[0].food
                                        }${
                                            currentProject[0].additionalInfo !==
                                            ''
                                                ? `\n\nДодаткова інформація\n${currentProject[0].additionalInfo}`
                                                : ''
                                        }
                                    ${
                                        currentProject[0].video !== ''
                                            ? `\n\nВідео з проєкту\n${currentProject[0].video}`
                                            : ''
                                    }`.trim()}
                                    />
                                </div>
                            </>
                        ) : undefined}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProjectPage
