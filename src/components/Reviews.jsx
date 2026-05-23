import { Star, StarHalf } from 'lucide-react';

export default function Reviews() {
    return (
        <section id="reviews" className="reviews">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">Patient Testimonials</span>
                    <h2>What Our Patients Say</h2>
                </div>
                <div className="reviews-container">
                    <div className="review-card">
                        <div className="stars">
                            <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
                        </div>
                        <p className="review-text">"Dr. Priyanka is absolutely wonderful! I was terrified of getting a root canal, but she made the entire process completely painless. Her clinic is modern and incredibly clean. Highly recommend Root Square Dental Clinic!"</p>
                        <div className="reviewer">
                            <div className="avatar">S</div>
                            <div className="info">
                                <h4>Sneha M.</h4>
                                <span>Verified Patient</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-card">
                        <div className="stars">
                            <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><StarHalf size={18} fill="currentColor" />
                        </div>
                        <p className="review-text">"Got my teeth cleaned and a filling done here. The staff is very polite and Dr. Sawant is very professional and explains everything clearly before starting the treatment. Great experience overall."</p>
                        <div className="reviewer">
                            <div className="avatar">R</div>
                            <div className="info">
                                <h4>Rahul P.</h4>
                                <span>Verified Patient</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-card">
                        <div className="stars">
                            <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
                        </div>
                        <p className="review-text">"Best dental clinic in Kalina! The level of care and hygiene maintained here is top-notch. Dr. Priyanka is very patient and truly an expert at endodontics."</p>
                        <div className="reviewer">
                            <div className="avatar">A</div>
                            <div className="info">
                                <h4>Anjali D.</h4>
                                <span>Verified Patient</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
