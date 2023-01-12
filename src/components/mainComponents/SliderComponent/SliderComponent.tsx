import Slider from 'react-slick'
import './SliderComponent.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Parallax } from 'react-parallax'

type Props = {}

const SliderComponent = (props: Props) => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    }

    return (
        <div className="slider">
            <Slider {...settings}>
                <Parallax
                    strength={200}
                    blur={{ min: -15, max: 15 }}
                    bgImage="images/slider-img-1.jpg"
                    style={{
                        backgroundSize: 'contain',
                    }}
                >
                    <div className="slider-item">
                        <div className="slider-content">
                            <p className="slider-text">Slide 1</p>
                        </div>
                    </div>
                </Parallax>
                <Parallax
                    strength={200}
                    blur={{ min: -15, max: 15 }}
                    bgImage="images/slider-img-2.jpg"
                >
                    <div className="slider-item">
                        <div className="slider-content">
                            <p className="slider-text">Slide 2</p>
                        </div>
                    </div>
                </Parallax>
                <Parallax
                    strength={200}
                    blur={{ min: -15, max: 15 }}
                    bgImage="images/slider-img-3.jpg"
                >
                    <div className="slider-item">
                        <div className="slider-content">
                            <p className="slider-text">Slide 3</p>
                        </div>
                    </div>
                </Parallax>
                <Parallax
                    strength={200}
                    blur={{ min: -15, max: 15 }}
                    bgImage="images/slider-img-4.jpg"
                >
                    <div className="slider-item">
                        <div className="slider-content">
                            <p className="slider-text">Slide 4</p>
                        </div>
                    </div>
                </Parallax>
                <Parallax
                    strength={200}
                    blur={{ min: -15, max: 15 }}
                    bgImage="images/slider-img-5.jpg"
                >
                    <div className="slider-item">
                        <div className="slider-content">
                            <p className="slider-text">Slide 5</p>
                        </div>
                    </div>
                </Parallax>
            </Slider>
        </div>
    )
}

export default SliderComponent
