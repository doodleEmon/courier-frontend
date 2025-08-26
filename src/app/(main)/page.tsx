'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Home() {
    const slides = [
        { id: 1, image: 'https://images.pexels.com/photos/4604599/pexels-photo-4604599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Delivery Truck on Road' },
        { id: 2, image: 'https://images.pexels.com/photos/33610278/pexels-photo-33610278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Packages in Warehouse' },
        { id: 3, image: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', alt: 'Delivery Person with Box' },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [currentSlide, nextSlide]);

    return (
        <div className="mt-5 relative w-full mx-auto overflow-hidden rounded-lg shadow-lg max-w-screen-xl">
            {/* Slides Container */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="w-full flex-shrink-0 h-64 md:h-[500px] relative">
                        <Image
                            src={slide.image}
                            alt={slide.alt}
                            className="w-full h-full object-cover"
                            width={1000}
                            height={1000}
                        />
                        {/* Optional: Add text overlay or content here */}
                        <div className="absolute inset-0 bg-opacity-30 flex items-center justify-center text-white text-3xl font-bold">
                            {slide.alt}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full focus:outline-none hover:bg-opacity-75 transition-opacity z-10"
            >
                <FaChevronLeft size={20} />
            </button>
            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full focus:outline-none hover:bg-opacity-75 transition-opacity z-10"
            >
                <FaChevronRight size={20} />
            </button>

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'
                            } focus:outline-none hover:bg-white transition-colors`}
                    ></button>
                ))}
            </div>
        </div>
    );
}
