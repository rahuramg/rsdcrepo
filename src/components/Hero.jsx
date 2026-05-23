export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <span className="badge">Advanced Endodontic Care</span>
                <h1>Preserving Teeth Changing Lives.<br/><span className="highlight">Root Square Dental Clinic</span></h1>
                <p>Experience world-class, painless dentistry with Dr. Priyanka Sawant. Preserving your natural teeth and restoring your perfect smile in Kalina, Mumbai.</p>
                <div className="hero-buttons">
                    <a href="#contact" className="btn-primary">Book Your Visit</a>
                    <a href="#services" className="btn-secondary">Explore Services</a>
                </div>
                <div className="hero-stats">
                    <div className="stat">
                        <h3>5000+</h3>
                        <p>Happy Patients</p>
                    </div>
                    <div className="stat">
                        <h3>4.5★</h3>
                        <p>Google Rating</p>
                    </div>
                    <div className="stat">
                        <h3>Modern</h3>
                        <p>Equipment</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
