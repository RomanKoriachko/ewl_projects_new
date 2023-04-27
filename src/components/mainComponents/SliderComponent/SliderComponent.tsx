import Slider from 'react-slick'
import './SliderComponent.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
                <div className="slider-item">
                    <img src="images/slider-img-1.webp" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">
                            Легко підбирай вакансію для свого кандидата
                        </p>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="images/slider-img-2.webp" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">
                            Зручно копіюй опис вакансії
                        </p>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="images/slider-img-3.webp" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">
                            Отримуй актуальну інформацію про приїзди
                        </p>
                    </div>
                </div>
                <div className="slider-item">
                    <img src="images/slider-img-4.webp" alt="" />
                    <div className="slider-content">
                        <p className="slider-text">
                            Регулярне оновлення бази вакансій для твого комфорту
                        </p>
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default SliderComponent
