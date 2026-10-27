// Import module style
import style from './Carrousel.module.css';
// Import Swiper React components
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
// import images
import image1 from '../../../Assets/Desktop/Carrousel/Banner carousel 1 _ 1440 (1).png';
import image2 from '../../../Assets/Desktop/Carrousel/Banner carousel 2 _ 1440 (1).png';
import image3 from '../../../Assets/Desktop/Carrousel/Banner carousel 3 _ 1440 (1).png';


const Carrousel = () => {

    return (
        <div className={style.carrouselContaner}>

            <Swiper
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className={style.swiperContainer}
            >
                <SwiperSlide className={style.swiperslideContainer}>
                    <img src={image1} alt='image1' />
                </SwiperSlide>

                <SwiperSlide className={style.swiperslideContainer}>
                    <img src={image2} alt='image2' />
                </SwiperSlide>

                <SwiperSlide className={style.swiperslideContainer}>
                    <img src={image3} alt='image3' />
                </SwiperSlide>

            </Swiper>
        </div>
    )
}

export default Carrousel;