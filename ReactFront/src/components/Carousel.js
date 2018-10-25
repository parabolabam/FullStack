import React, {Component} from 'react';
import Slider from 'react-slick';
import "./css/style.css"
export default class Carousel extends Component {


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (

                <Slider {...settings} >
                    <div className="slider-item">
                        <img src="https://cdn-images-1.medium.com/max/1200/1*y6C4nSvy2Woe0m7bWEn4BA.png" alt=""/>
                    </div>
                    <div className="slider-item">
                        <img src="https://miro.medium.com/max/1400/0*4Amqi40eLI6XBGpL.png" alt=""/>
                    </div>
                    <div className="slider-item">
                        <img src="https://hsto.org/web/c33/228/563/c3322856334b481d878835887423faec.png" alt=""/>
                    </div>
                </Slider>
        );
    }
}