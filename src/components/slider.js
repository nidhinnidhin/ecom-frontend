import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useRef } from "react";
import styles from "@/styles/Slider.module.css";
import Link from "next/link";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function SliderItems({ datass }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % datass.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [datass]);

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current, next) => setCurrentSlide(next),
  };
  return (
    <div className={styles.container}>
      <Slider ref={sliderRef} {...settings} className={styles.slider}>
        {datass?.map((data, index) => (
          <div key={index} className={styles.slide}>
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
      <div className={styles.navigation}>
        <button className={styles.leftButton} onClick={goToPrevSlide}>
          <KeyboardArrowLeftIcon />
        </button>
        <button className={styles.rightButton} onClick={goToNextSlide}>
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
