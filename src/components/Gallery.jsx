import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
    { src: '/clinic_tour/014.jpg', note: 'Modern and comfortable waiting area.' },
    { src: '/clinic_tour/039.JPG', note: 'State-of-the-art dental chair and equipment.' },
    { src: '/clinic_tour/041.JPG', note: 'Advanced diagnostic and sterilization tools.' },
    { src: '/clinic_tour/049.JPG', note: 'Spacious, well-lit clinic environment.' },
    { src: '/clinic_tour/050.JPG', note: 'Precision dental care setup.' },
    { src: '/clinic_tour/051.JPG', note: 'Hygienic and clean treatment rooms.' },
    { src: '/clinic_tour/052_edited.jpg', note: 'Premium dental care experience.' },
    { src: '/clinic_tour/053.JPG', note: 'Equipped with the latest dental technology.' },
    { src: '/clinic_tour/128.jpg', note: 'Relaxing atmosphere for all our patients.' },
    { src: '/clinic_tour/149.JPG', note: 'Professional and welcoming staff area.' },
    { src: '/clinic_tour/336.jpg', note: 'Comprehensive consultation room.' },
    { src: '/clinic_tour/IMG-20230404-WA0009.jpg', note: 'Root Square Dental Clinic Exterior.' }
];

export default function Gallery() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
    };

    return (
        <section id="gallery" className="gallery bg-light">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">Clinic Tour</span>
                    <h2>Gallery</h2>
                    <p>Take a virtual tour of our modern and comfortable dental clinic.</p>
                </div>

                <div className="gallery-slider">
                    <button className="slider-btn prev" onClick={prevSlide} aria-label="Previous image">
                        <ChevronLeft size={30} />
                    </button>
                    
                    <div className="slider-content">
                        <img 
                            src={galleryImages[currentIndex].src} 
                            alt={`Clinic Tour ${currentIndex + 1}`} 
                            className="slider-image"
                        />
                        <div className="slider-note">
                            <p>{galleryImages[currentIndex].note}</p>
                        </div>
                    </div>

                    <button className="slider-btn next" onClick={nextSlide} aria-label="Next image">
                        <ChevronRight size={30} />
                    </button>
                </div>
                
                <div className="slider-dots">
                    {galleryImages.map((_, index) => (
                        <span 
                            key={index} 
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
}
