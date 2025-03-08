import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { trendingItems } from "../../data/MenuData";
import MenuTitle from './TrendingFoodTitle';
import FoodSlide from './FoodSlide';

const TrendingFood = () => {
  useEffect(() => {
    console.log(document.querySelector('.swiper-button-prev'));
    console.log(document.querySelector('.swiper-button-next'));
  }, []);

  return (
    <section id="tranding" className="py-8">
      <MenuTitle />

      <div className="container mx-auto relative">
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={3}
          spaceBetween={30}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            enabled: true,
          }}
          className="tranding-slider"
        >
          {trendingItems.map((item, index) => (
            <SwiperSlide key={index}>
              <FoodSlide item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-full cursor-pointer">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </div>
        <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10  text-white p-2 rounded-full cursor-pointer">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
      </div>
    </section>
  );
};

export default TrendingFood;
