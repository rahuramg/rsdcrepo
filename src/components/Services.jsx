import { FileX } from 'lucide-react';

export default function Services() {
    return (
        <section id="services" className="services bg-light">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">Our Expertise</span>
                    <h2>Comprehensive Dental Services</h2>
                    <p>We offer a wide range of specialized dental treatments tailored to your unique needs.</p>
                </div>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-tooth"></i></div>
                        <h3>Root Canal Treatment</h3>
                        <p>Advanced, painless RCT performed by an Endodontic specialist to save your infected or damaged tooth.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-smile-beam"></i></div>
                        <h3>Cosmetic Dentistry</h3>
                        <p>Smile designing, veneers, and teeth whitening to give you the flawless smile you've always wanted.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon"><FileX size={30} /></div>
                        <h3>Crowns & Bridges</h3>
                        <p>High-quality, natural-looking ceramic and zirconia crowns to restore the shape and function of your teeth.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-syringe"></i></div>
                        <h3>Dental Implants</h3>
                        <p>Permanent and durable solutions for missing teeth that look, feel, and function like natural teeth.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-child"></i></div>
                        <h3>Pediatric Dentistry</h3>
                        <p>Gentle and friendly dental care for children, ensuring they develop healthy oral habits early on.</p>
                    </div>
                    <div className="service-card">
                        <div className="service-icon"><i className="fa-solid fa-stethoscope"></i></div>
                        <h3>General Dentistry</h3>
                        <p>Routine checkups, digital X-rays, scaling, and polishing to maintain your overall oral hygiene.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
