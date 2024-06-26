import { useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getSearchInput } from 'redux/searchContentReducer'
import { NewProjectType } from '../Projects/NewProjectType'
import poopIcon from '../../../assets/moscow-ship.png'

import './MapComponent.scss'

type Props = {}

type CoordinatesType = {
    id: string
    lat: number
    long: number
}

const MapComponent = (props: Props) => {
    const filtredArrState = useAppSelector((state) => state.filtredArrState)
    const allProjectsArr = useAppSelector((state) => state.dataArrState)
    const dispatch = useAppDispatch()
    const [mapCentring, setmapCentring] = useState<{
        lat: number
        lng: number
    }>({ lat: 52.915845892170395, lng: 18.496121727194044 })

    const uniqueCoordinates: CoordinatesType[] = []

    filtredArrState.forEach((project) => {
        project.recruitmentProjects.forEach((recruitmentProject) => {
            const { companyGeoPosition } = recruitmentProject
            if (companyGeoPosition) {
                const { lat, long } = companyGeoPosition
                const existingCoord = uniqueCoordinates.find(
                    (coord) => coord.lat === lat && coord.long === long
                )
                if (!existingCoord) {
                    uniqueCoordinates.push({ id: project.id, lat, long })
                }
            }
        })
    })

    const onMarkerClick = (id: string) => {
        const currentProject = uniqueCoordinates.filter(
            (element) => element.id === id
        )
        dispatch(getSearchInput(currentProject[0].id))
        setmapCentring({
            lat: currentProject[0].lat,
            lng: currentProject[0].long,
        })
        setDescriptionStyle({
            display: 'none',
        })
    }

    const [descriptionStyle, setDescriptionStyle] = useState({
        display: 'none',
    })

    const [currentProjectObj, setCurrentProjectObj] = useState<NewProjectType>()

    function onMouseOver(id: string) {
        setDescriptionStyle({
            display: 'block',
        })
        const currentProject = allProjectsArr.filter(
            (project) => project.id === id
        )
        setCurrentProjectObj(currentProject[0])
    }
    function onMouseOut() {
        setDescriptionStyle({
            display: 'none',
        })
    }

    const [isMapOpen, setIsMapOpen] = useState<boolean>(false)

    function onOpenMapClick() {
        setIsMapOpen(true)
    }

    function onCloseMapClick() {
        setIsMapOpen(false)
    }

    function showTaras() {
        const url = 'https://www.youtube.com/watch?v=DyjvDsLPbeA'
        window.open(url, '_blank')
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY
            ? process.env.REACT_APP_API_KEY
            : '',
    })
    if (!isLoaded) return <div>loading...</div>

    return (
        <GoogleMap
            zoom={5}
            center={mapCentring}
            mapContainerClassName={`map-container map-open-${isMapOpen}`}
        >
            {uniqueCoordinates.map((element, i) => (
                <div className="marker" key={i}>
                    <Marker
                        position={{
                            lat: element.lat,
                            lng: element.long,
                        }}
                        onClick={() => onMarkerClick(element.id)}
                        onMouseOver={() => onMouseOver(element.id)}
                        onMouseOut={() => onMouseOut()}
                    />
                    {currentProjectObj && (
                        <div
                            className="marker-description"
                            dangerouslySetInnerHTML={{
                                __html: currentProjectObj?.mapTooltipHtml,
                            }}
                            style={descriptionStyle}
                        ></div>
                    )}
                </div>
            ))}
            <div className="poop-marker">
                <Marker
                    position={{
                        lat: 55.75661983806225,
                        lng: 37.621704195135564,
                    }}
                    icon={poopIcon}
                    onClick={showTaras}
                />
            </div>
            {isMapOpen ? (
                <button
                    onClick={() => onCloseMapClick()}
                    className={`map-btn close-map-btn map-open-${isMapOpen}`}
                >
                    згорнути
                </button>
            ) : (
                <button
                    onClick={() => onOpenMapClick()}
                    className={`map-btn open-map-btn map-open-${isMapOpen}`}
                >
                    розгорнути
                </button>
            )}
        </GoogleMap>
    )
}

export default MapComponent
