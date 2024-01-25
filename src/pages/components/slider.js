import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "@/styles/Slider.module.css";
import Image from "next/image";

export default function SliderItems({ datass }) {
  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <Carousel>
          {datass?.length === 0 ? (
            <div>Loading...</div>
          ) : (
            datass?.map((data) => (
              <div>
                <Image src={data.image} alt="image" height={250} width={1000} style={{objectFit:"cover"}}/>
              </div>
            ))
          )}
        </Carousel>
      </div>
    </div>
  );
}
