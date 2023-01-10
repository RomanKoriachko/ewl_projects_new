import Slider from 'react-slick'
import './SliderComponent.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

type Props = {}

const SliderComponent = (props: Props) => {
    const settings = {
        dots: true,
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
                <div className="slider-item">
                    <img src="images/slider-img-1.jpg" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">Slide 1</p>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="images/slider-img-2.jpg" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">Slide 2</p>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="images/slider-img-3.jpg" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">Slide 3</p>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="images/slider-img-4.jpg" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">Slide 4</p>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="images/slider-img-5.jpg" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">Slide 5</p>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default SliderComponent
