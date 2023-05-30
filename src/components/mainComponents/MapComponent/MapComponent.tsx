import './MapComponent.scss'
import { useState } from 'react'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { getSearchInput } from 'redux/searchContentReducer'
import { ProjectType } from '../Projects/Projects'

type Props = {}

const MapComponent = (props: Props) => {
    const filtredArrState = useAppSelector((state) => state.filtredArrState)
    const dispatch = useAppDispatch()
    const [mapCentring, setmapCentring] = useState<{
        lat: number
        lng: number
    }>({ lat: 52.915845892170395, lng: 18.496121727194044 })

    const { isLoaded } = useLoadScript({
        /* @ts-ignore */
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    })
    if (!isLoaded) return <div>loading...</div>

    const onMarkerClick = (location: string) => {
        const currentProject = filtredArrState.filter(
            (element) => element.location === location
        )
        dispatch(getSearchInput(currentProject[0].lat))
        setmapCentring({
            lat: parseFloat(currentProject[0].lat),
            lng: parseFloat(currentProject[0].lng),
        })
    }

    return (
        <GoogleMap
            zoom={6}
            center={mapCentring}
            mapContainerClassName="map-container"
        >
            {filtredArrState.map((element: ProjectType, i: number) => (
                <Marker
                    key={i}
                    position={{
                        lat: Number(element.lat),
                        lng: Number(element.lng),
                    }}
                    visible={element.isActual ? true : false}
                    onClick={() => onMarkerClick(element.location)}
                />
            ))}
        </GoogleMap>
    )
}

export default MapComponent
