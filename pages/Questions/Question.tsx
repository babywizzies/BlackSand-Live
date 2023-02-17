import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper"

const Testimonials = () => {
  return (
    <section className="testimonial container section" id="testimonials">
        <h2 className="testimonial__title">Frequently Asked Questions</h2>

        <Swiper 
        className="testimonial__container"
        loop={true}
        grabCursor={true}
        spaceBetween={24}
        pagination={{
            clickable: true,
        }}
        breakpoints={{
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 48,
            },
        }}
        modules={[Pagination]}
        >
                    <SwiperSlide className="testimonial__card">
                        <h3 className="testimonial__name">What is Heroes of Cumberland?</h3>
                        <p className="testimonial__description">Heroes of Cumberland is a @forgottenrunes derivative project centered on creating web games and building out our little corner of the Runiverse. All of our games will be free to play and made with pure fun at the forefront, but owning a Hero will allow you to save your high scores and earn achievements in game, writing them to the metadata of your token.</p>
                    </SwiperSlide>

                    <SwiperSlide className="testimonial__card">
                        <h3 className="testimonial__name">How do I get my free Hero?</h3>
                        <p className="testimonial__description">If you had a @forgottenrunes token with lore in your wallet during the snapshot taken July 26th a free Hero of Cumberland will be included in your transaction. If you just want the free mint, set the amount to 0 and click mint</p>
                    </SwiperSlide>

                    <SwiperSlide className="testimonial__card">
                        <h3 className="testimonial__name">What if I did not have that?</h3>
                        <p className="testimonial__description">You can mint one for 0.033eth. Alternatively, follow our twitter and hang around the discord as there may be opportunities to win heroes in the future.</p>
                    </SwiperSlide>
        </Swiper>
    </section>

  )
}

export default Testimonials