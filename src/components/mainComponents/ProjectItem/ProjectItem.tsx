import React from 'react'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { Link } from 'react-router-dom'
import { ProjectType } from '../Projects/Projects'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { showLessData, showMoreData } from 'redux/ShowMoreReducer'
import { getProjectData } from 'redux/editProjectReduser'
import { setFormState } from 'redux/editFormReducer'
import CopyButton from '@yozora/react-common-copy-button'
import { useState, useEffect } from 'react'

type Props = {}

type LocalDataType = {
    email: string
    password: string
    isLogged: boolean
    isAdmin: boolean
}

type ICopyStatus = 'waiting' | 'copying' | 'failed' | 'succeed'

const ProjectItem = (element: ProjectType) => {
    const showMoreState = useAppSelector((state) => state.showMoreState)
    const editFormState = useAppSelector((state) => state.editFormState)
    const dispatch = useAppDispatch()

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

    const getShortString = (string: string) => {
        let tempStr
        if (string.length > 80) {
            tempStr = string.slice(0, 80) + '...'
        } else {
            tempStr = string
        }
        return tempStr
    }

    let raw = localStorage.getItem('loginData')
    let localLoginData: LocalDataType = {
        email: '',
        password: '',
        isLogged: false,
        isAdmin: false,
    }
    if (raw) {
        localLoginData = JSON.parse(raw)
    }

    // ---------------------- edit project ----------------------

    const edit = (
        project: string,
        country: string,
        salary: string,
        location: string,
        sex: string,
        ageFrom: string,
        ageTo: string,
        nationalaty: string,
        additionalInfo: string,
        housing: string,
        projectInfo: string,
        category: string,
        isActual: boolean,
        video: string,
        workSchedule: string,
        food: string,
        synchronerLink: string,
        contact: string,
        housingPhoto: string,
        date: number,
        lat: string,
        lng: string
    ) => {
        dispatch(
            getProjectData({
                projectName: project,
                country: country,
                project: project,
                salary: salary,
                location: location,
                sex: sex,
                ageFrom: ageFrom,
                ageTo: ageTo,
                nationalaty: nationalaty,
                additionalInfo: additionalInfo,
                housing: housing,
                projectInfo: projectInfo,
                category: category,
                isActual: isActual,
                video: video,
                workSchedule: workSchedule,
                food: food,
                synchronerLink: synchronerLink,
                contact: contact,
                housingPhoto: housingPhoto,
                date: date,
                lat: lat,
                lng: lng,
            })
        )
        editFormState
            ? dispatch(setFormState(false))
            : dispatch(setFormState(true))
    }

    // change copy button placeholder
    const StatusNodeMap: Record<ICopyStatus, React.ReactNode> = {
        waiting: 'Копіювати',
        copying: 'Копіюю..',
        failed: 'Помилка!',
        succeed: 'Скопійовано!',
    }

    return (
        <>
            <Link to={`/${element.projectName}`}>
                <p className="project-header">{element.projectName}</p>
            </Link>
            <div className="row project-first-descroption-row">
                <div className="row project-row">
                    <div>
                        <div className="project-sex row">
                            {splitString(element.sex).map(
                                (el: string, i: number) => (
                                    <div key={i}>{el}</div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="row project-location-row">
                        <div className="project-country">
                            {element.country},
                        </div>
                        <div className="project-location">
                            <a
                                href={`https://www.google.com.ua/maps/place/${element.country}+${element.location}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {element.location}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="project-category">{element.category}</div>
            </div>
            <div className="is-actual-state">
                Актуальний: {element.isActual ? 'Так' : 'Ні'}
            </div>
            <div className="row project-age-row">
                <div className="project-item-section">
                    <div>
                        <span className="bold-text">Вік від:</span>{' '}
                        {element.ageFrom}
                    </div>
                </div>
                <div className="project-item-section">
                    <div>
                        <span className="bold-text">Вік до:</span>{' '}
                        {element.ageTo}
                    </div>
                </div>
            </div>
            <div className="project-item-section">
                <div className="project-info">
                    <span className="bold-text">Заробітня плата:</span>{' '}
                    <div className="textfield-content">{element.salary}</div>
                </div>
            </div>
            <div
                className={`project-item-section project-info ${
                    showMoreState[element.projectName] ? 'hide' : 'show'
                }`}
            >
                {getShortString(element.projectInfo)}
            </div>
            <div
                className={showMoreState[element.projectName] ? 'show' : 'hide'}
            >
                <div className="project-item-section">
                    <div>
                        <span className="bold-text">Національність:</span>{' '}
                        {element.nationalaty}
                    </div>
                </div>
                <div className="project-item-section">
                    <div className="textfield-content">
                        {element.projectInfo}
                    </div>
                </div>
                {element.video !== '' ? (
                    <div className="project-item-section">
                        <div>
                            <span className="bold-text">Відео з проєкту:</span>{' '}
                            <div className="column textfield-content">
                                {splitString(element.video).map(
                                    (el: string, i: number) => (
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
                        <span className="bold-text">Графік роботи:</span>{' '}
                        <div className="textfield-content">
                            {element.workSchedule}
                        </div>
                    </div>
                </div>
                <div className="project-item-section">
                    <div>
                        <span className="bold-text">Проживання:</span>{' '}
                        <div className="textfield-content">
                            {element.housing}
                            {element.housingPhoto ? (
                                <div>
                                    <a
                                        href={element.housingPhoto}
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
                        <span className="bold-text">Харчування:</span>{' '}
                        <div className="textfield-content">{element.food}</div>
                    </div>
                </div>
                {element.additionalInfo !== '' ? (
                    <div className="project-item-section">
                        <div>
                            <span className="bold-text">
                                Додаткова інформація:
                            </span>{' '}
                            <div className="textfield-content">
                                {element.additionalInfo}
                            </div>
                        </div>
                    </div>
                ) : undefined}
                {element.synchronerLink !== '' ? (
                    <div className="project-item-section">
                        <div>
                            <span className="bold-text">
                                Посилання на приїзд:
                            </span>{' '}
                            <div className="column textfield-content">
                                {element.synchronerLink.includes('http') ? (
                                    splitString(element.synchronerLink).map(
                                        (el: string, i: number) => (
                                            <a
                                                className="synchroner-link"
                                                key={i}
                                                href={el}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Посилання на приїзд №{i + 1}
                                            </a>
                                        )
                                    )
                                ) : (
                                    <div>{element.synchronerLink}</div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : undefined}
                {element.contact !== '' ? (
                    <div className="project-item-section">
                        <div>
                            <span className="bold-text">
                                Регіон, контакт опікуна:
                            </span>{' '}
                            <div className="textfield-content">
                                {element.contact}
                            </div>
                        </div>
                    </div>
                ) : undefined}
            </div>
            <div className="row project-item-buttons">
                {localLoginData.email === 'mazaxaka.tyt@gmail.com' ||
                localLoginData.email === 'juliiaderevianko@gmail.com' ||
                localLoginData.email === 'admin@gmail.com' ? (
                    <div className="row">
                        <button
                            className="edit-btn project-item-btn"
                            onClick={() =>
                                edit(
                                    element.projectName,
                                    element.country,
                                    element.salary,
                                    element.location,
                                    element.sex,
                                    element.ageFrom,
                                    element.ageTo,
                                    element.nationalaty,
                                    element.additionalInfo,
                                    element.housing,
                                    element.projectInfo,
                                    element.category,
                                    element.isActual,
                                    element.video,
                                    element.workSchedule,
                                    element.food,
                                    element.synchronerLink,
                                    element.contact,
                                    element.housingPhoto,
                                    element.date,
                                    element.lat,
                                    element.lng
                                )
                            }
                        >
                            Редагувати
                        </button>
                    </div>
                ) : undefined}
                <div className="row">
                    <button
                        className={`show-more-btn project-item-btn ${
                            showMoreState[element.projectName] ? 'hide' : 'show'
                        }`}
                        onClick={() =>
                            dispatch(showMoreData(element.projectName))
                        }
                    >
                        Розгорнути
                    </button>
                    <button
                        className={`show-more-btn project-item-btn ${
                            showMoreState[element.projectName] ? 'show' : 'hide'
                        }`}
                        onClick={() =>
                            dispatch(showLessData(element.projectName))
                        }
                    >
                        Згорнути
                    </button>
                    <CopyButton
                        statusNodeMap={StatusNodeMap}
                        className="copy-btn project-item-btn"
                        value={`Назва проєкту\n${
                            element.projectName
                        }\n\nСтать\n${element.sex.trim()}\n\nВік від ${
                            element.ageFrom
                        }, Вік до ${element.ageTo}\n\nНаціональність\n${
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
                    />
                </div>
            </div>
        </>
    )
}

export default ProjectItem
