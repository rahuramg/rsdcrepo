import { Phone as Whatsapp } from 'lucide-react';

export default function Footer() {
    return (
        <footer>
            <div className="container footer-content">
                <div className="footer-brand">
                    <a href="#" className="logo">
                        <img src="/new_logo.jpg" alt="Root Square Dental Clinic Logo" className="footer-logo" />
                    </a>
                    <p>Advanced dental care focused on your comfort and well-being. Book an appointment today for a brighter, healthier smile.</p>
                    <div className="social-links">
                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#"><Whatsapp size={18} /></a>
                    </div>
                </div>
                <div className="footer-links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Dr. Sawant</a></li>
                        <li><a href="#services">Our Services</a></li>
                        <li><a href="#reviews">Patient Reviews</a></li>
                    </ul>
                </div>
                <div className="footer-legal">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Root Square Dental Clinic. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
