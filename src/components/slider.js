import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import styles from "@/styles/Slider.module.css";
import Link from "next/link";

export default function SliderItems({ datass }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % datass.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [datass]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
  };
  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {datass?.map((data, index) => (
          <div key={index}>
            <Link href="/fashion-product-page">
              <img
                className={styles.image}
                src={data.image}
                alt={`Slide ${index + 1}`}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
