import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { photosArr } from './photosArr'
import Slider from 'react-slick'

import 'react-photo-view/dist/react-photo-view.css'
import './PhotoViewerComponent.scss'

type Props = {
    projectId: string
}

const PhotoViewerComponent = ({ projectId }: Props) => {
    const currentProjectPhotots = photosArr.filter(
        (element) => element.projectId === projectId
    )

    const settings = {
        dots: true,
        autoplay: true,
        pauseOnFocus: true,
        slidesToScroll: 1,
        variableWidth: true,
        draggable: false,
        centerMode: true,
        className: 'center',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false,
                },
            },
        ],
    }

    return (
        <div className="photo-wrapper">
            <PhotoProvider loop={1}>
                <div className="photo-provider">
                    <div className="photos-container">
                        <Slider {...settings}>
                            {currentProjectPhotots[0].photos.map(
                                (element, i) => (
                                    <PhotoView key={i} src={element}>
                                        <img
                                            src={element}
                                            className="photo-item"
                                            alt=""
                                        />
                                    </PhotoView>
                                )
                            )}
                        </Slider>
                    </div>
                </div>
            </PhotoProvider>
        </div>
    )
}

export default PhotoViewerComponent
