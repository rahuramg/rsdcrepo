import React, { useState } from 'react';
import DentalDashGame from './DentalDashGame';
import DentalSurgeonGame from './DentalSurgeonGame';
import { Gamepad2, Stethoscope, Sparkles, Trophy } from 'lucide-react';

export default function DentalGameSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('surgeon'); // 'surgeon' or 'dash'

  return (
    <section id="game" style={{ background: 'linear-gradient(135deg, #03045e 0%, #0077b6 100%)', color: 'white', padding: '70px 20px', textAlign: 'center', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {!isPlaying ? (
          <div style={{ textAlign: 'center' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} /> Interactive Dental Arcade & Simulator Hub
            </span>
            <h2 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '2.5rem', margin: '15px 0', color: '#fff' }}>
              Root Square Interactive Dental Games
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#caf0f8', maxWidth: '750px', margin: '0 auto 35px', lineHeight: '1.6' }}>
              Experience interactive dental education! Step into the shoes of a dental surgeon performing root canals, extractions, implants, scaling, braces, and bridges—or race through our tooth defender runner arcade!
            </p>

            {/* Game Selector Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px', marginBottom: '30px', textAlignment: 'left' }}>
              {/* Game 1 Card */}
              <div 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  border: activeTab === 'surgeon' ? '3px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '20px', 
                  padding: '25px', 
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setActiveTab('surgeon');
                  setIsPlaying(true);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ background: '#38bdf8', padding: '12px', borderRadius: '14px', color: '#03045e' }}>
                    <Stethoscope size={28} />
                  </div>
                  <div>
                    <span style={{ background: '#f59e0b', color: '#000', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>NEW SIMULATOR</span>
                    <h3 style={{ margin: '4px 0 0', fontSize: '1.3rem', color: '#fff' }}>Dental Surgeon Simulator</h3>
                  </div>
                </div>
                <p style={{ color: '#caf0f8', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 20px' }}>
                  Diagnose patients & perform 6 real clinical treatments: Root Canal, Scaling, Extractions, Implants, Braces & Bridges with interactive surgical tools!
                </p>
                <button 
                  className="btn-primary" 
                  style={{ background: 'linear-gradient(135deg, #00b4d8, #48cae4)', color: '#03045e', fontWeight: 800, padding: '12px 24px', borderRadius: '30px', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                >
                  <Stethoscope size={20} /> Play Surgeon Simulator
                </button>
              </div>

              {/* Game 2 Card */}
              <div 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  border: activeTab === 'dash' ? '3px solid #38bdf8' : '1px solid rgba(255,255,255,0.2)', 
                  borderRadius: '20px', 
                  padding: '25px', 
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => {
                  setActiveTab('dash');
                  setIsPlaying(true);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{ background: '#48cae4', padding: '12px', borderRadius: '14px', color: '#03045e' }}>
                    <Gamepad2 size={28} />
                  </div>
                  <div>
                    <span style={{ background: '#38bdf8', color: '#000', fontSize: '0.75rem', fontWeight: 800, padding: '3px 8px', borderRadius: '10px', textTransform: 'uppercase' }}>ARCADE RUNNER</span>
                    <h3 style={{ margin: '4px 0 0', fontSize: '1.3rem', color: '#fff' }}>Tooth Defender: Dental Dash</h3>
                  </div>
                </div>
                <p style={{ color: '#caf0f8', fontSize: '0.95rem', lineHeight: '1.5', margin: '0 0 20px' }}>
                  Fast-paced endless runner! Jump over cavity germs & sugary treats, zap tartar with laser toothbrushes, and test hygiene trivia!
                </p>
                <button 
                  className="btn-primary" 
                  style={{ background: 'linear-gradient(135deg, #00b4d8, #48cae4)', color: '#03045e', fontWeight: 800, padding: '12px 24px', borderRadius: '30px', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                >
                  <Gamepad2 size={20} /> Play Dental Dash Arcade
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Active Game Header & Tab Controls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setActiveTab('surgeon')}
                  style={{
                    background: activeTab === 'surgeon' ? '#38bdf8' : 'rgba(255,255,255,0.15)',
                    color: activeTab === 'surgeon' ? '#03045e' : '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Stethoscope size={18} /> Dental Surgeon Simulator
                </button>
                <button
                  onClick={() => setActiveTab('dash')}
                  style={{
                    background: activeTab === 'dash' ? '#38bdf8' : 'rgba(255,255,255,0.15)',
                    color: activeTab === 'dash' ? '#03045e' : '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Gamepad2 size={18} /> Tooth Defender Arcade
                </button>
              </div>

              <button 
                onClick={() => setIsPlaying(false)}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight: 600 }}
              >
                Close Arcade
              </button>
            </div>

            {/* Game Renderer */}
            {activeTab === 'surgeon' ? (
              <DentalSurgeonGame />
            ) : (
              <DentalDashGame clinicName="Root Square Dental Clinic" />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
