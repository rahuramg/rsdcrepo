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
                    <div className="review-card">
                        <div className="stars">
                            <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
                        </div>
                        <p className="review-text">"Had a great experience with treatment. Dr. Priyanka is friendly, patient and is always ready to answer all questions - no matter how many questions there are! I'm glad I found her in the neighbourhood."</p>
                        <div className="reviewer">
                            <div className="avatar">M</div>
                            <div className="info">
                                <h4>Manisha Panwar</h4>
                                <span>Verified Patient</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-card">
                        <div className="stars">
                            <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
                        </div>
                        <p className="review-text">"Hey!! Took my mom to the clinic for teeth treatment. The treatment was great, the service and hospitality is good. The work done is great. Very happy with the work. Could not even feel the pain. Thank you for the service ❤️"</p>
                        <div className="reviewer">
                            <div className="avatar">P</div>
                            <div className="info">
                                <h4>Poorva Yadav</h4>
                                <span>Verified Patient</span>
                            </div>
                        </div>
                    </div>
                    <div className="review-card">
                        <div className="stars">
                            <Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" /><Star size={18} fill="currentColor" />
                        </div>
                        <p className="review-text">"I did extraction and filling. Hospitality was amazing. Doctors were super and staff as well. I would like to recommend all my friends, family and relatives to come, I'm sure you will like it. Thank you!"</p>
                        <div className="reviewer">
                            <div className="avatar">J</div>
                            <div className="info">
                                <h4>July Khiangte</h4>
                                <span>Verified Patient</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
