import { MapPin, Phone, Clock } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="contact bg-light">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">Visit Us</span>
                    <h2>Contact & Location</h2>
                </div>
                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="icon"><MapPin size={24} /></div>
                            <div>
                                <h3>Clinic Address</h3>
                                <p>Root Square Dental Clinic<br/>Kalina, Santacruz East<br/>Mumbai, Maharashtra 400098</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="icon"><Phone size={24} /></div>
                            <div>
                                <h3>Call Us</h3>
                                <p>+91 8928187627</p>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="icon"><Clock size={24} /></div>
                            <div>
                                <h3>Timings</h3>
                                <p>Mon - Sat: 10:00 AM - 9:00 PM<br/>Sunday: By Appointment</p>
                            </div>
                        </div>
                    </div>
                    <div className="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.825656111005!2d72.8631675!3d19.075073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9dd397cf789%3A0x5a3b6d1f2ceb565f!2sRoot%20Square%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1715582312345!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{border: 0}}
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
