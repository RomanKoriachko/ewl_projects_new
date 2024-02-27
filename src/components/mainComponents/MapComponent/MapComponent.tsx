import { forwardRef, useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getSearchInput } from 'redux/searchContentReducer'
import { NewProjectType } from '../Projects/NewProjectType'

import './MapComponent.scss'

type Props = {}

type CoordinatesType = {
    id: string
    lat: number
    long: number
}

const MapComponent = forwardRef((props: Props, ref) => {
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
    }

    const [descriptionStyle, setDescriptionStyle] = useState({
        display: 'none',
        top: '0%',
        left: '0%',
    })

    const [currentProjectObj, setCurrentProjectObj] = useState<NewProjectType>()

    function onMouseOver(id: string) {
        setDescriptionStyle({
            display: 'block',
            top: '50%',
            left: '70%',
        })
        const currentProject = allProjectsArr.filter(
            (project) => project.id === id
        )
        setCurrentProjectObj(currentProject[0])
    }
    function onMouseOut() {
        setDescriptionStyle({
            display: 'none',
            top: '0%',
            left: '0%',
        })
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
            mapContainerClassName="map-container"
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
        </GoogleMap>
    )
})

export default MapComponent
