import { CheckCircle } from 'lucide-react';

export default function About() {
    return (
        <section id="about" className="about">
            <div className="container about-container">
                <div className="about-image">
                    <img src="/133.jpg" alt="Dr. Priyanka Sawant - Endodontist" />
                    <div className="experience-badge">
                        <span className="years">Specialist</span>
                        <span className="text">Endodontics</span>
                    </div>
                </div>
                <div className="about-text">
                    <div className="section-header">
                        <span className="section-subtitle">About The Doctor</span>
                        <h2>Meet Dr. Priyanka Sawant</h2>
                    </div>
                    <p className="lead">Specialist in Conservative Dentistry and Endodontics</p>
                    <p>Dr. Priyanka Sawant is a highly skilled endodontist dedicated to providing state-of-the-art dental care. With a strong focus on conservative dentistry, her primary goal is to preserve natural teeth through advanced, painless root canal treatments.</p>
                    <p>As a leading practitioner at Root Square Dental Clinic, Dr. Sawant combines her extensive clinical expertise with a compassionate approach, ensuring every patient feels comfortable and well-informed. She is actively involved in dental research and stays updated with the latest technological advancements in the field to deliver exceptional results.</p>
                    <ul className="about-features">
                        <li><CheckCircle size={20} /> Painless Single-Visit Root Canals</li>
                        <li><CheckCircle size={20} /> Advanced Microscopic Endodontics</li>
                        <li><CheckCircle size={20} /> Aesthetic and Restorative Dentistry</li>
                        <li><CheckCircle size={20} /> Evidence-Based Clinical Practice</li>
                    </ul>
                    <a href="https://www.linkedin.com/in/dr-priyanka-h-sawant-3b7a92144/" target="_blank" rel="noreferrer" className="linkedin-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> View LinkedIn Profile
                    </a>
                </div>
            </div>
        </section>
    );
}
