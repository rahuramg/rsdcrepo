import React, { useState } from 'react';
import DentalDashGame from './DentalDashGame';
import { Gamepad2, Trophy, Sparkles } from 'lucide-react';

export default function DentalGameSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="game" style={{ background: 'linear-gradient(135deg, #03045e 0%, #0077b6 100%)', color: 'white', padding: '70px 20px', textAlignment: 'center', position: 'relative' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {!isPlaying ? (
          <div style={{ textAlign: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} /> Interactive Dental Education
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.5rem', margin: '15px 0', color: '#fff' }}>
              Tooth Defender: Dental Dash Arcade
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#caf0f8', maxWidth: '650px', margin: '0 auto 30px', lineHeight: '1.6' }}>
              Dodge decay, beat sugary germs, and tartar obstacles while collecting toothbrushes, toothpaste, and fresh apples! Test your dental hygiene knowledge with mini-quizzes and compete on our clinic leaderboard!
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => setIsPlaying(true)} 
                className="btn-primary" 
                style={{ background: 'linear-gradient(135deg, #00b4d8, #48cae4)', color: '#03045e', fontWeight: 800, fontSize: '1.15rem', padding: '14px 36px', borderRadius: '40px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px rgba(0, 180, 216, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
              >
                <Gamepad2 size={24} /> Play Game Now
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h3 style={{ margin: 0, color: '#fff', fontSize: '1.2rem' }}>🎮 Dental Health Arcade</h3>
              <button 
                onClick={() => setIsPlaying(false)}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600 }}
              >
                Close Game
              </button>
            </div>
            <DentalDashGame clinicName="Root Square Dental Clinic" />
          </div>
        )}
      </div>
    </section>
  );
}
