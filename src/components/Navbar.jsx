import { useState } from 'react';
import { Menu, X } from 'lucide-react';


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="#" className="logo">
                    <img src="/new_logo.jpg" alt="Root Square Dental Clinic Logo" className="navbar-logo" />
                </a>
                
                <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    <li><a href="#home" className="nav-link active" onClick={() => setIsOpen(false)}>Home</a></li>
                    <li><a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>About Us</a></li>
                    <li><a href="#services" className="nav-link" onClick={() => setIsOpen(false)}>Services</a></li>
                    <li><a href="#gallery" className="nav-link" onClick={() => setIsOpen(false)}>Gallery</a></li>
                    <li><a href="#reviews" className="nav-link" onClick={() => setIsOpen(false)}>Reviews</a></li>
                    <li><a href="#blogs" className="nav-link" onClick={() => setIsOpen(false)}>Blogs</a></li>
                    <li><a href="#contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact & Location</a></li>
                    <li><a href="#contact" className="btn-primary nav-btn" onClick={() => setIsOpen(false)}>Book Appointment</a></li>
                </ul>
            </div>
        </nav>
    );
}
