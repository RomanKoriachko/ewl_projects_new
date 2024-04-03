import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import { photosArr } from './photosArr'
import Flicking from '@egjs/react-flicking'

import './PhotoViewerComponent.scss'
import 'react-photo-view/dist/react-photo-view.css'
import '@egjs/react-flicking/dist/flicking.css'

type Props = {
    projectId: string
}

const PhotoViewerComponent = ({ projectId }: Props) => {
    const currentProjectPhotots = photosArr.filter(
        (element) => element.projectId === projectId
    )

    return (
        <div className="photo-wrapper">
            <PhotoProvider>
                <div className="photo-provider">
                    <div className="photos-container">
                        <Flicking align="prev" bound={true}>
                            {currentProjectPhotots.length > 0
                                ? currentProjectPhotots[0].photos.map(
                                      (photo, i) => (
                                          <div
                                              key={i}
                                              className="photo-item-container"
                                          >
                                              <PhotoView src={photo}>
                                                  <img
                                                      src={photo}
                                                      className="photo-item"
                                                      alt=""
                                                  />
                                              </PhotoView>
                                          </div>
                                      )
                                  )
                                : undefined}
                        </Flicking>
                    </div>
                </div>
            </PhotoProvider>
        </div>
    )
}

export default PhotoViewerComponent
