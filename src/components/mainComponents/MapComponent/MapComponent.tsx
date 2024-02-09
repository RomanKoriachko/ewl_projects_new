import './MapComponent.scss'
import { useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getSearchInput } from 'redux/searchContentReducer'

type Props = {}

type CoordinatesType = {
    id: string
    lat: number
    long: number
}

const MapComponent = (props: Props) => {
    const filtredArrState = useAppSelector((state) => state.filtredArrState)
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

    const { isLoaded } = useLoadScript({
        /* @ts-ignore */
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    })
    if (!isLoaded) return <div>loading...</div>

    return (
        <GoogleMap
            zoom={5}
            center={mapCentring}
            mapContainerClassName="map-container"
        >
            {uniqueCoordinates.map((element) => (
                <Marker
                    key={element.id}
                    position={{
                        lat: element.lat,
                        lng: element.long,
                    }}
                    onClick={() => onMarkerClick(element.id)}
                />
            ))}
        </GoogleMap>
    )
}

export default MapComponent
