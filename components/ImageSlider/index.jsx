import { useState, useEffect } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import styles from './Slider.module.css'


const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }

    //a slow animation function to loop throw the slides
    const animate = async () => {
        setTimeout(() => {
            nextSlide();
            animate();
        }, 5000);
    };

    useEffect(() => {
        animate();
    }, []);

    return (
        <section className={styles.slider}>
            <FaArrowAltCircleLeft className={styles.left_arrow} onClick={prevSlide} />
            <FaArrowAltCircleRight className={styles.right_arrow} onClick={nextSlide} />
            {slides.map((slide, index) => {
                return (
                    <div
                        key={index}
                    >
                        {index === current && (
                            <img src={slide} alt='travel image' className={styles.image} />
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default ImageSlider;