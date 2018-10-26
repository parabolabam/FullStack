import React, { Component } from 'react';
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

            <Slider {...settings} style={{width:"100%"}}>
                    <div className="slider-item">
                        <img style={{width:"100%"}} src="https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjmt5m8taPeAhVhoYsKHQ8OAiEQjRx6BAgBEAU&url=https%3A%2F%2Fcancan.lt%2F&psig=AOvVaw24svM-dnqMuH8Q2Z2TVBeX&ust=1540619620056429" alt=""/>
                    </div>
                    <div className="slider-item">
                        <img style={{width:"100%"}} src="https://miro.medium.com/max/1400/0*4Amqi40eLI6XBGpL.png" alt=""/>
                    </div>
                    <div className="slider-item">
                        <img style={{width:"100%"}} src="https://hsto.org/web/c33/228/563/c3322856334b481d878835887423faec.png" alt=""/>
                    </div>
                </Slider>
        );
    }
}