import React, { useState, useEffect, useRef } from 'react';
import { 
  Stethoscope, 
  Sparkles, 
  Trophy, 
  ChevronRight,
  User,
  Zap,
  HelpCircle
} from 'lucide-react';
import './DentalSurgeonGame.css';

// 6 Patient Clinical Scenarios & Procedures
const PATIENTS_DATA = [
  {
    id: 'scaling',
    name: 'Priya Patel',
    age: 28,
    avatar: '👩‍💼',
    scaredExpression: '😬',
    happyExpression: '😄',
    complaint: 'Bleeding gums when brushing, bad breath, and hard yellow crust along teeth.',
    correctDiagnosis: 'Heavy Plaque & Calculus Build-up',
    diagnosisOptions: [
      'Heavy Plaque & Calculus Build-up',
      'Irreversible Pulpitis',
      'Impacted Wisdom Tooth',
      'Jaw Fractured Bone'
    ],
    treatmentTitle: 'Ultrasonic Scaling & Dental Polishing',
    xrayIcon: '🦷🧫',
    steps: [
      { id: 1, tool: 'Ultrasonic Scaler', icon: '⚡', sound: 'BZZZZZZ! ⚡', action: 'Hold to vibrate & dissolve tartar crust', targetText: 'PRESS & HOLD on tooth to dissolve yellow tartar!' },
      { id: 2, tool: 'Dental Curette', icon: '🪝', sound: 'SCRAPE! 🪝', action: 'Hold to scrape deep subgingival tartar', targetText: 'PRESS & HOLD to scrape gumline tartar!' },
      { id: 3, tool: 'Water Spray & Suction', icon: '💦', sound: 'SPLASH! 💦', action: 'Hold to flush away loose debris & germs', targetText: 'PRESS & HOLD to spray & flush mouth clean!' },
      { id: 4, tool: 'Prophy Paste & Cup', icon: '✨', sound: 'SHINE! ✨', action: 'Hold to polish teeth shiny smooth', targetText: 'PRESS & HOLD to polish tooth shiny smooth!' }
    ],
    educationalFact: 'Dental scaling removes calcified plaque (calculus) that regular toothbrushing cannot dissolve, preventing gum disease!',
    doctorDialogue: [
      "Dr. {docName}, patient Priya's teeth have thick yellow tartar build-up. Let's clean it!",
      "Hold down the Ultrasonic Scaler! Watch the yellow tartar dissolve away!",
      "Scrape away subgingival tartar with the Curette!",
      "Flush away all the loose debris with the Water Spray!",
      "Awesome Dr. {docName}! Polish her tooth shiny smooth!"
    ],
    patientDialogue: [
      "My gums bleed when I brush, Doctor!",
      "I can feel the tartar vibrating away!",
      "The scraping feels so refreshing!",
      "Ahhh, the cool water feels great!",
      "Wow! My tooth is so shiny and smooth now! Thank you Dr. {docName}!"
    ],
    quiz: {
      question: 'Why is dental scaling necessary even if you brush twice a day?',
      options: [
        'Brushing cannot remove hardened calcified tartar (calculus)',
        'Scaling turns teeth into pure gold',
        'Scaling replaces the need to floss forever',
        'To bleach teeth pure white instantly'
      ],
      correct: 0
    }
  },
  {
    id: 'root-canal',
    name: 'Aarav Sharma',
    age: 34,
    avatar: '👨‍💼',
    scaredExpression: '😫',
    happyExpression: '😃',
    complaint: 'Severe throbbing pain in lower molar that lingers after hot drinks.',
    correctDiagnosis: 'Irreversible Pulpitis (Deep Nerve Decay)',
    diagnosisOptions: [
      'Superficial Enamel Stain',
      'Irreversible Pulpitis (Deep Nerve Decay)',
      'Orthodontic Malocclusion',
      'Mild Tartar Accumulation'
    ],
    treatmentTitle: 'Root Canal Therapy (Endodontics)',
    xrayIcon: '🦴⚡',
    steps: [
      { id: 1, tool: 'High-Speed Dental Drill', icon: '⚙️', sound: 'WHIRRRR! ⚙️', action: 'Hold to drill access cavity through enamel', targetText: 'PRESS & HOLD to drill cavity access hole!' },
      { id: 2, tool: 'Barbed Nerve Extractor', icon: '💉', sound: 'EXTRACT! 💉', action: 'Hold to pull out infected nerve pulp', targetText: 'PRESS & HOLD to extract infected nerve pulp!' },
      { id: 3, tool: 'Rotary Canal File', icon: '🌀', sound: 'CLEAN! 🌀', action: 'Hold to disinfect and shape canal walls', targetText: 'PRESS & HOLD to clean & disinfect root canal!' },
      { id: 4, tool: 'Gutta-Percha Filler', icon: '🔴', sound: 'SEAL! 🔴', action: 'Hold to pack rubber gutta-percha sealant', targetText: 'PRESS & HOLD to pack rubber gutta-percha filler!' },
      { id: 5, tool: 'Porcelain Dental Crown', icon: '👑', sound: 'CROWN SNAP! 👑', action: 'Hold to place golden protective crown', targetText: 'PRESS & HOLD to fit protective dental crown!' }
    ],
    educationalFact: 'Root canal treatment saves natural teeth by removing infected nerve pulp without extracting the tooth!',
    doctorDialogue: [
      "Dr. {docName}, patient Aarav has severe throbbing pain! Let's save his tooth!",
      "Hold down the High-Speed Drill to open a clean cavity access hole!",
      "Use the Barbed Extractor to gently pull out the infected nerve pulp!",
      "Disinfect and shape the canal walls with the Rotary File!",
      "Pack the clean canal tightly with Gutta-Percha filler!",
      "Fantastic Dr. {docName}! Snap the Dental Crown on top to protect it!"
    ],
    patientDialogue: [
      "Ouch! My tooth throbbed all night, Doctor!",
      "The drilling opened up the pressure!",
      "Phew, the pain is going away as you remove the nerve!",
      "The canal feels so clean now!",
      "The rubber filler seals it tight!",
      "Yay! My pain is completely gone and I have a shiny new crown! Thanks Dr. {docName}!"
    ],
    quiz: {
      question: 'What material is standardly used to fill disinfected root canals?',
      options: [
        'Gutta-Percha (biocompatible rubber)',
        'Liquid Concrete',
        'Pure Silver wire',
        'Chewing gum'
      ],
      correct: 0
    }
  },
  {
    id: 'extraction',
    name: 'Rahul Verma',
    age: 42,
    avatar: '👨‍🔧',
    scaredExpression: '😨',
    happyExpression: '🤩',
    complaint: 'Severely cracked tooth broken deep below gum line after trauma.',
    correctDiagnosis: 'Unsalvageable Vertical Root Fracture',
    diagnosisOptions: [
      'Unsalvageable Vertical Root Fracture',
      'Mild Surface Cavity',
      'Slight Teeth Crowding',
      'Superficial Plaque'
    ],
    treatmentTitle: 'Surgical Tooth Extraction',
    xrayIcon: 't🦷💥',
    steps: [
      { id: 1, tool: 'Local Anesthesia Syringe', icon: '💉', sound: 'NUMB! 💉', action: 'Hold to inject anesthetic around socket', targetText: 'PRESS & HOLD to inject painless anesthetic!' },
      { id: 2, tool: 'Dental Elevator', icon: '⛏️', sound: 'WOBBLE! ⛏️', action: 'Hold to loosen tooth root in socket', targetText: 'PRESS & HOLD to loosen cracked tooth!' },
      { id: 3, tool: 'Extraction Forceps', icon: '🛠️', sound: 'POP OUT! 🛠️', action: 'Hold to lift broken tooth out of socket', targetText: 'PRESS & HOLD to lift tooth out with forceps!' },
      { id: 4, tool: 'Antiseptic Swab', icon: '🧪', sound: 'SANITIZE! 🧪', action: 'Hold to sanitize empty socket clean', targetText: 'PRESS & HOLD to sanitize empty socket!' },
      { id: 5, tool: 'Sterile Pressure Gauze', icon: '🩹', sound: 'HEAL! 🩹', action: 'Hold to place sterile pressure gauze pad', targetText: 'PRESS & HOLD to place pressure gauze pad!' }
    ],
    educationalFact: 'Extractions remove unsalvageable teeth. Biting on gauze promotes a healthy blood clot and prevents dry socket.',
    doctorDialogue: [
      "Dr. {docName}, patient Rahul's broken molar cannot be saved. We must extract it gently.",
      "Inject Local Anesthetic first so Rahul feels no pain at all!",
      "Loosen the tooth root with the Dental Elevator until it wobbles!",
      "Grasp the tooth with Extraction Forceps and lift it cleanly out!",
      "Sanitize the socket clean with an Antiseptic Swab!",
      "Place a Sterile Pressure Gauze pad so a healthy blood clot forms!"
    ],
    patientDialogue: [
      "My cracked tooth hurts whenever I eat, Doctor!",
      "Ah, the anesthetic numbed it right up! I feel no pain!",
      "I can feel it loosening!",
      "Pop! The bad tooth is out!",
      "That antiseptic feels nice and clean!",
      "Thank you Dr. {docName}! The pressure gauze is comfortable and the pain is gone!"
    ],
    quiz: {
      question: 'What is the most critical purpose of placing gauze right after an extraction?',
      options: [
        'To promote blood clot formation and prevent dry socket',
        'To absorb leftover toothpaste',
        'To make the patient talk funnier',
        'To change tooth color'
      ],
      correct: 0
    }
  },
  {
    id: 'implant',
    name: 'Ananya Rao',
    age: 50,
    avatar: '👩‍🏫',
    scaredExpression: '😟',
    happyExpression: '😄',
    complaint: 'Missing upper molar for 2 years; struggling to chew food.',
    correctDiagnosis: 'Single Tooth Edentulism (Missing Tooth Gap)',
    diagnosisOptions: [
      'Gingival Bleeding',
      'Single Tooth Edentulism (Missing Tooth Gap)',
      'Tooth Enamel Wear',
      'Impacted Canine'
    ],
    treatmentTitle: 'Titanium Dental Implant Surgery',
    xrayIcon: '🦴🔩',
    steps: [
      { id: 1, tool: 'Osteotomy Drill', icon: '⚙️', sound: 'DRILL BONE! ⚙️', action: 'Hold to drill precision pilot hole in jawbone', targetText: 'PRESS & HOLD to drill pilot hole in jawbone!' },
      { id: 2, tool: 'Titanium Screw Post', icon: '🔩', sound: 'SCREW IN! 🔩', action: 'Hold to insert titanium screw into bone', targetText: 'PRESS & HOLD to screw titanium implant post!' },
      { id: 3, tool: 'Abutment Key', icon: '🔧', sound: 'CONNECT! 🔧', action: 'Hold to attach connector abutment key', targetText: 'PRESS & HOLD to attach abutment connector!' },
      { id: 4, tool: 'Porcelain Crown', icon: '👑', sound: 'SNAP CROWN! 👑', action: 'Hold to fit porcelain crown onto implant', targetText: 'PRESS & HOLD to fit porcelain crown!' }
    ],
    educationalFact: 'Titanium implants fuse directly with jawbone (osseointegration), creating permanent root anchors for new teeth!',
    doctorDialogue: [
      "Dr. {docName}, patient Ananya has a missing tooth gap. Let's build her a titanium implant!",
      "Drill a precision pilot hole into the jawbone with the Osteotomy Drill!",
      "Screw the biocompatible Titanium Post into the bone!",
      "Attach the gold Abutment Connector onto the titanium post!",
      "Superb Dr. {docName}! Snap the custom Porcelain Crown on top!"
    ],
    patientDialogue: [
      "I miss chewing properly on my right side, Doctor!",
      "The pilot drill is creating the perfect anchor spot!",
      "I can see the titanium screw driving in securely!",
      "The abutment connector is locked on tight!",
      "Awesome! My new implant crown feels just like a real natural tooth! Thanks Dr. {docName}!"
    ],
    quiz: {
      question: 'What unique process allows titanium implants to integrate with human jawbone?',
      options: [
        'Osseointegration (bone fusion with titanium)',
        'Photosynthesis',
        'Magnetism',
        'Enamel crystallization'
      ],
      correct: 0
    }
  },
  {
    id: 'braces',
    name: 'Karan Malhotra',
    age: 19,
    avatar: '🧑‍🎓',
    scaredExpression: '😬',
    happyExpression: '😎',
    complaint: 'Crooked, overlapping front teeth causing bite misalignment.',
    correctDiagnosis: 'Severe Orthodontic Malocclusion & Crowding',
    diagnosisOptions: [
      'Enamel Fluorosis',
      'Severe Orthodontic Malocclusion & Crowding',
      'Root Canal Abscess',
      'Loose Temporary Crown'
    ],
    treatmentTitle: 'Orthodontic Braces Alignment',
    xrayIcon: '🦷🪡',
    steps: [
      { id: 1, tool: 'Acid Etch Gel', icon: '💧', sound: 'ETCH! 💧', action: 'Hold to apply blue enamel etching gel', targetText: 'PRESS & HOLD to apply blue etch gel!' },
      { id: 2, tool: 'Resin Bonding Glue', icon: '🧪', sound: 'GLUE! 🧪', action: 'Hold to apply bonding glue to teeth', targetText: 'PRESS & HOLD to apply resin bonding glue!' },
      { id: 3, tool: 'Bracket Placer', icon: '⏹️', sound: 'CLICK BRACKETS! ⏹️', action: 'Hold to snap metal brackets onto teeth', targetText: 'PRESS & HOLD to place metal brackets!' },
      { id: 4, tool: 'Nitinol Archwire', icon: '〰️', sound: 'THREAD WIRE! 〰️', action: 'Hold to thread flexible alignment archwire', targetText: 'PRESS & HOLD to thread nitinol archwire!' },
      { id: 5, tool: 'Elastic Ligature Bands', icon: '⭕', sound: 'RAINBOW BANDS! ⭕', action: 'Hold to snap colorful elastic bands', targetText: 'PRESS & HOLD to snap rainbow elastic bands!' }
    ],
    educationalFact: 'Orthodontic braces apply gentle continuous pressure to align teeth safely through jawbone remodeling!',
    doctorDialogue: [
      "Dr. {docName}, patient Karan wants straight teeth! Let's fit his cool braces!",
      "Apply blue Acid Etch Gel to prepare his tooth enamel!",
      "Place clear Resin Bonding Glue onto each tooth center!",
      "Snap the stainless steel brackets precisely onto each tooth!",
      "Thread the Nitinol Alignment Archwire through the bracket slots!",
      "Snap the colorful Rainbow Elastic Bands to lock the wire in place! Stylish work Dr. {docName}!"
    ],
    patientDialogue: [
      "I want a straight, confident smile, Doctor!",
      "The blue etch gel feels cool on my teeth!",
      "The bonding glue is ready for brackets!",
      "Click! The metal brackets look super cool!",
      "The wire is threaded right through!",
      "WOAH! The rainbow bands look so awesome! Thank you Dr. {docName}!"
    ],
    quiz: {
      question: 'How do orthodontic braces safely move teeth through solid jawbone?',
      options: [
        'By applying light continuous force triggering bone remodeling',
        'By melting jawbone with heat',
        'By pulling teeth out and gluing them back',
        'By shrinking teeth size'
      ],
      correct: 0
    }
  },
  {
    id: 'crown-bridge',
    name: 'Sneha Gupta',
    age: 45,
    avatar: '👩‍🎨',
    scaredExpression: '😟',
    happyExpression: '😍',
    complaint: 'Missing center tooth flanked by two worn neighbor teeth.',
    correctDiagnosis: 'Edentulous Space with Abutment Candidates',
    diagnosisOptions: [
      'Periodontal Pocketing',
      'Edentulous Space with Abutment Candidates',
      'Dental Fluorosis',
      'Acute Gingivitis'
    ],
    treatmentTitle: 'Fixed Dental Crown & 3-Unit Bridge Restoration',
    xrayIcon: '🦷🌉',
    steps: [
      { id: 1, tool: 'Diamond Shaver Bur', icon: '⚙️', sound: 'SHAVE PEGS! ⚙️', action: 'Hold to shape neighbor teeth into abutment pegs', targetText: 'PRESS & HOLD to shape neighbor teeth into pegs!' },
      { id: 2, tool: 'Impression Mold Tray', icon: '📋', sound: 'MOLD BITE! 📋', action: 'Hold to take high-precision bite mold', targetText: 'PRESS & HOLD to take bite impression mold!' },
      { id: 3, tool: 'Dual-Cure Resin Cement', icon: '🧪', sound: 'COAT CEMENT! 🧪', action: 'Hold to coat cement onto prepped pegs', targetText: 'PRESS & HOLD to coat dental resin cement!' },
      { id: 4, tool: '3-Unit Porcelain Bridge', icon: '🌉', sound: 'SLIDE BRIDGE! 🌉', action: 'Hold to slide & seat 3-unit bridge unit', targetText: 'PRESS & HOLD to seat 3-unit bridge permanently!' }
    ],
    educationalFact: 'Dental bridges span tooth gaps using neighbor teeth (abutments) as anchors, restoring full chewing force!',
    doctorDialogue: [
      "Dr. {docName}, patient Sneha needs a 3-unit bridge to fill her gap! Let's build it!",
      "Shave the neighbor teeth into smooth abutment pegs with the Diamond Bur!",
      "Take a precision bite mold with the Impression Mold Tray!",
      "Coat the prepped pegs with Dual-Cure Resin Cement!",
      "Slide and seat the 3-Unit Porcelain Bridge into place! Spectacular work Dr. {docName}!"
    ],
    patientDialogue: [
      "I have a gap right in the middle of my teeth, Doctor!",
      "The neighbor teeth are shaped into smooth pegs!",
      "The bite mold took the exact shape!",
      "The cement is ready to bond the bridge!",
      "Amazing! The 3-unit bridge filled the gap seamlessly! Thank you Dr. {docName}!"
    ],
    quiz: {
      question: 'What are the supporting natural teeth called in a dental bridge procedure?',
      options: [
        'Abutment teeth',
        'Deciduous teeth',
        'Impacted teeth',
        'Anchor molars'
      ],
      correct: 0
    }
  }
];

export default function DentalSurgeonGame() {
  const [playerDoctorName, setPlayerDoctorName] = useState('');
  const [isNameRegistered, setIsNameRegistered] = useState(false);
  const [gameStage, setGameStage] = useState('register'); // 'register', 'menu', 'exam', 'surgery', 'quiz', 'completed', 'leaderboard'
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [diagnosisChoice, setDiagnosisChoice] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeTool, setActiveTool] = useState(null);
  
  // Hold-to-operate mechanics state
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdIntervalRef = useRef(null);

  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showCelebrationStars, setShowCelebrationStars] = useState(false);

  useEffect(() => {
    const savedLb = localStorage.getItem('dental_surgeon_leaderboard');
    if (savedLb) {
      try {
        setLeaderboard(JSON.parse(savedLb));
      } catch (e) {
        console.error('Failed to parse leaderboard', e);
      }
    } else {
      const defaultLb = [
        { name: 'Dr. Evelyn Reed', score: 2850, title: 'Master Chief Surgeon 🥇', date: '2026-09-20' },
        { name: 'Dr. Marcus Vance', score: 2400, title: 'Senior Orthodontist 🥈', date: '2026-09-22' },
        { name: 'Dr. Sarah Lin', score: 1950, title: 'Endodontic Specialist 🥉', date: '2026-09-25' }
      ];
      setLeaderboard(defaultLb);
      localStorage.setItem('dental_surgeon_leaderboard', JSON.stringify(defaultLb));
    }
  }, []);

  const currentPatient = PATIENTS_DATA[selectedPatientIndex];

  // Register Doctor Name
  const handleRegisterDoctor = (e) => {
    e.preventDefault();
    if (!playerDoctorName.trim()) return;
    setIsNameRegistered(true);
    setGameStage('menu');
  };

  // Select Patient
  const handleSelectPatient = (index) => {
    setSelectedPatientIndex(index);
    setGameStage('exam');
    setDiagnosisChoice('');
    setCurrentStepIndex(0);
    setHoldProgress(0);
  };

  // Submit Diagnosis
  const handleDiagnosisSubmit = (option) => {
    setDiagnosisChoice(option);
    if (option === currentPatient.correctDiagnosis) {
      setScore(prev => prev + 250);
    } else {
      setScore(prev => Math.max(0, prev - 50));
    }
    setTimeout(() => {
      setGameStage('surgery');
      setActiveTool(currentPatient.steps[0].tool);
    }, 700);
  };

  // Hold-to-operate handlers
  const startHolding = () => {
    const currentStep = currentPatient.steps[currentStepIndex];
    if (activeTool !== currentStep.tool || isHolding) return;

    setIsHolding(true);
    holdIntervalRef.current = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdIntervalRef.current);
          setIsHolding(false);
          triggerStepCompletion();
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const stopHolding = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    setIsHolding(false);
    if (holdProgress < 100) {
      setHoldProgress(0);
    }
  };

  const triggerStepCompletion = () => {
    setShowCelebrationStars(true);
    setScore(prev => prev + 150);

    setTimeout(() => {
      setShowCelebrationStars(false);
      if (currentStepIndex + 1 < currentPatient.steps.length) {
        const nextIdx = currentStepIndex + 1;
        setCurrentStepIndex(nextIdx);
        setHoldProgress(0);
        setActiveTool(currentPatient.steps[nextIdx].tool);
      } else {
        setGameStage('quiz');
        setSelectedQuizOption(null);
        setQuizSubmitted(false);
      }
    }, 800);
  };

  // Quiz Answer Submit
  const handleQuizAnswer = (optionIdx) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(optionIdx);
    setQuizSubmitted(true);

    if (optionIdx === currentPatient.quiz.correct) {
      setScore(prev => prev + 200);
    }

    setTimeout(() => {
      let title = 'Dental Resident';
      if (score >= 2500) title = 'Master Chief Surgeon 🥇';
      else if (score >= 1800) title = 'Senior Specialist 🥈';
      else if (score >= 1000) title = 'Associate Surgeon 🥉';

      const docTitle = playerDoctorName.startsWith('Dr.') ? playerDoctorName : `Dr. ${playerDoctorName}`;
      const newEntry = {
        name: docTitle,
        score: score + (optionIdx === currentPatient.quiz.correct ? 200 : 0),
        title: title,
        date: new Date().toISOString().split('T')[0]
      };

      const updatedLb = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
      setLeaderboard(updatedLb);
      localStorage.setItem('dental_surgeon_leaderboard', JSON.stringify(updatedLb));
      setGameStage('completed');
    }, 1200);
  };

  const formattedDocName = playerDoctorName.startsWith('Dr.') ? playerDoctorName : `Dr. ${playerDoctorName}`;

  const getDoctorText = () => {
    if (!currentPatient || !currentPatient.doctorDialogue) return '';
    if (gameStage === 'exam') return currentPatient.doctorDialogue[0].replace('{docName}', formattedDocName);
    if (gameStage === 'surgery') {
      const idx = Math.min(currentStepIndex + 1, currentPatient.doctorDialogue.length - 1);
      return currentPatient.doctorDialogue[idx].replace('{docName}', formattedDocName);
    }
    return `Superb dental care ${formattedDocName}!`;
  };

  const getPatientText = () => {
    if (!currentPatient || !currentPatient.patientDialogue) return '';
    if (gameStage === 'exam') return currentPatient.patientDialogue[0].replace('{docName}', formattedDocName);
    if (gameStage === 'surgery') {
      const idx = Math.min(currentStepIndex + 1, currentPatient.patientDialogue.length - 1);
      return currentPatient.patientDialogue[idx].replace('{docName}', formattedDocName);
    }
    return `Thank you ${formattedDocName}! My tooth feels great!`;
  };

  return (
    <div className="dental-surgeon-container">
      {/* Header */}
      <div className="ds-header">
        <div className="ds-title">
          <Stethoscope size={26} color="#38bdf8" /> Dental Surgeon Simulator
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {isNameRegistered && (
            <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={18} /> {formattedDocName}
            </div>
          )}
          <div className="ds-score-badge">
            🏆 Score: <strong>{score}</strong>
          </div>
          {gameStage !== 'register' && gameStage !== 'menu' && (
            <button 
              onClick={() => setGameStage('menu')} 
              style={{ background: '#334155', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
            >
              Waiting Room
            </button>
          )}
        </div>
      </div>

      {/* Screen 0: Upfront Doctor Registration */}
      {gameStage === 'register' && (
        <div className="ds-welcome-screen">
          <div className="ds-doctor-avatar-large">
            <span style={{ fontSize: '3.5rem' }}>👨‍⚕️</span>
          </div>
          <h2 style={{ color: '#fff', margin: '0 0 8px', fontSize: '1.8rem' }}>Welcome Doctor!</h2>
          <p style={{ color: '#94a3b8', margin: '0 0 25px', lineHeight: '1.5' }}>
            Enter your Doctor name to start diagnosing patients, operating with tools, and leading the clinic scoreboards!
          </p>

          <form onSubmit={handleRegisterDoctor} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="text"
              placeholder="Enter Doctor Name (e.g. Dr. Alex Vance)"
              value={playerDoctorName}
              onChange={(e) => setPlayerDoctorName(e.target.value)}
              required
              style={{ padding: '14px 20px', borderRadius: '30px', border: '3px solid #38bdf8', background: '#0f172a', color: '#fff', fontSize: '1.1rem', textAlign: 'center', outline: 'none' }}
            />
            <button type="submit" className="ds-btn-primary" style={{ fontSize: '1.15rem', padding: '14px' }}>
              👨‍⚕️ Start Surgical Practice
            </button>
          </form>
        </div>
      )}

      {/* Screen 1: Waiting Room & Patient Selection */}
      {gameStage === 'menu' && (
        <div>
          <div style={{ padding: '20px 25px 5px', textAlign: 'center' }}>
            <h2 style={{ color: '#fff', margin: '0 0 8px', fontSize: '1.6rem' }}>
              🩺 Clinic Patient Waiting Room
            </h2>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>
              Select a patient to examine, diagnose their dental condition, and perform treatments!
            </p>
          </div>

          <div className="ds-patient-grid">
            {PATIENTS_DATA.map((pt, index) => (
              <div key={pt.id} className="ds-patient-card" onClick={() => handleSelectPatient(index)}>
                <div>
                  <div className="ds-patient-header">
                    <div className="ds-avatar">{pt.avatar}</div>
                    <div>
                      <h3 className="ds-patient-name">{pt.name}, {pt.age}</h3>
                      <span className="ds-treatment-tag">{pt.id.toUpperCase()}</span>
                    </div>
                  </div>
                  <p className="ds-patient-complaint">
                    <strong>Complaint:</strong> "{pt.complaint}"
                  </p>
                </div>
                <button className="ds-btn-primary" style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', fontSize: '0.95rem' }}>
                  Examine Patient <ChevronRight size={18} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 25px 25px', textAlign: 'center' }}>
            <button 
              onClick={() => setGameStage('leaderboard')} 
              style={{ background: 'rgba(255,255,255,0.1)', color: '#38bdf8', border: '2px solid #38bdf8', padding: '10px 24px', borderRadius: '30px', cursor: 'pointer', fontWeight: 800 }}
            >
              🏅 View Clinic Leaderboard
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Diagnostic Examination & Questionnaire */}
      {gameStage === 'exam' && (
        <div style={{ padding: '20px' }}>
          {/* Dual Doctor & Patient Avatars Dialogue */}
          <div className="ds-dual-avatar-scene">
            <div className="ds-avatar-box">
              <div className="ds-avatar-circle">👨‍⚕️</div>
              <div className="ds-avatar-name">Chief Dr. Marcus</div>
            </div>

            <div className="ds-dialogue-area">
              <div className="ds-bubble-doctor">
                💬 "{getDoctorText()}"
              </div>
              <div className="ds-bubble-patient">
                💬 {currentPatient.scaredExpression} "{getPatientText()}"
              </div>
            </div>

            <div className="ds-avatar-box">
              <div className="ds-avatar-circle patient">{currentPatient.avatar}</div>
              <div className="ds-avatar-name patient">{currentPatient.name}</div>
            </div>
          </div>

          {/* Exam Scanner & High-Contrast White Questionnaire Card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px', alignItems: 'start' }}>
            <div style={{ background: '#020617', border: '3px solid #3b82f6', borderRadius: '20px', padding: '20px', textAlign: 'center' }}>
              <h3 style={{ color: '#38bdf8', margin: '0 0 10px' }}>🔬 Radiograph X-Ray Scanner</h3>
              <div style={{ fontSize: '4.5rem', margin: '15px 0' }}>{currentPatient.xrayIcon}</div>
              <div style={{ background: '#ffffff', color: '#000000', border: '2px solid #000', borderRadius: '12px', padding: '12px', textAlign: 'left' }}>
                <p style={{ margin: '0 0 4px', color: '#0284c7', fontSize: '0.85rem', fontWeight: 900 }}>PATIENT SYMPTOMS:</p>
                <p style={{ margin: 0, color: '#000000', fontSize: '1rem', fontWeight: 800 }}>"{currentPatient.complaint}"</p>
              </div>
            </div>

            {/* High-Contrast White Questionnaire Bubble */}
            <div className="ds-questionnaire-card">
              <h3 className="ds-questionnaire-title">
                📋 Patient Diagnosis Questionnaire
              </h3>
              <p className="ds-questionnaire-sub">
                Dr. {formattedDocName}, examine the symptoms above and select the correct diagnosis (+250 points):
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentPatient.diagnosisOptions.map((opt, i) => (
                  <button 
                    key={i} 
                    className={`ds-diag-btn ${diagnosisChoice === opt ? (opt === currentPatient.correctDiagnosis ? 'correct' : 'wrong') : ''}`}
                    onClick={() => handleDiagnosisSubmit(opt)}
                  >
                    {i + 1}. {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Operating Room / Surgery View */}
      {gameStage === 'surgery' && (
        <div style={{ padding: '15px' }}>
          {/* Dual Doctor & Patient Avatars Dialogue */}
          <div className="ds-dual-avatar-scene" style={{ marginBottom: '15px' }}>
            <div className="ds-avatar-box">
              <div className="ds-avatar-circle">👨‍⚕️</div>
              <div className="ds-avatar-name">Chief Dr. Marcus</div>
            </div>

            <div className="ds-dialogue-area">
              <div className="ds-bubble-doctor">
                💬 "{getDoctorText()}"
              </div>
              <div className="ds-bubble-patient">
                💬 {isHolding ? '😯' : currentPatient.scaredExpression} "{getPatientText()}"
              </div>
            </div>

            <div className="ds-avatar-box">
              <div className="ds-avatar-circle patient">{currentPatient.avatar}</div>
              <div className="ds-avatar-name patient">{currentPatient.name}</div>
            </div>
          </div>

          <div className="ds-surgery-layout">
            {/* Instrument Tray */}
            <div className="ds-tools-panel">
              <h4 style={{ margin: '0 0 8px', color: '#38bdf8', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                🧰 Surgical Instrument Tray
              </h4>

              {currentPatient.steps.map((step, idx) => (
                <div 
                  key={step.id} 
                  className={`ds-tool-card ${activeTool === step.tool ? 'active' : ''} ${idx < currentStepIndex ? 'completed' : ''}`}
                  onClick={() => {
                    if (idx <= currentStepIndex) setActiveTool(step.tool);
                  }}
                >
                  <div className="ds-tool-icon">
                    {step.icon}
                  </div>
                  <div>
                    <div className="ds-tool-name">{step.tool}</div>
                    <div className="ds-tool-action">Step {idx + 1}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Operating Canvas */}
            <div className="ds-canvas-area">
              <div style={{ background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38bdf8', color: '#38bdf8', padding: '6px 16px', borderRadius: '20px', fontWeight: 800, fontSize: '0.9rem', marginBottom: '8px' }}>
                Active Instrument: <strong>{activeTool}</strong>
              </div>

              {/* Patient Mouth Stage & Tooth Graphics */}
              <div className="ds-mouth-stage">
                <div className="ds-gums">
                  {[0, 1, 2, 3, 4].map((slotIdx) => {
                    const isTarget = slotIdx === 2;
                    return (
                      <div 
                        key={slotIdx} 
                        className={`ds-tooth-unit ${isTarget ? 'target' : ''} ${isHolding ? 'operating' : ''}`}
                        onMouseDown={isTarget ? startHolding : undefined}
                        onMouseUp={isTarget ? stopHolding : undefined}
                        onTouchStart={isTarget ? startHolding : undefined}
                        onTouchEnd={isTarget ? stopHolding : undefined}
                      >
                        {isTarget && (
                          <>
                            {isHolding && (
                              <div className="ds-sound-effect-bubble">
                                {currentPatient.steps[currentStepIndex].sound}
                              </div>
                            )}

                            {showCelebrationStars && (
                              <div style={{ position: 'absolute', fontSize: '2rem', zIndex: 10 }}>
                                🎉✨⭐
                              </div>
                            )}

                            {/* Step Tooth Condition Visual Layers */}
                            {currentPatient.id === 'scaling' && (
                              <>
                                {currentStepIndex === 0 && (
                                  <div className="ds-tartar-layer" style={{ opacity: 1 - (holdProgress / 100) }}></div>
                                )}
                                {currentStepIndex >= 3 && <div className="ds-water-splash"></div>}
                                {currentStepIndex === 3 && holdProgress >= 100 && (
                                  <div style={{ position: 'absolute', color: '#38bdf8', fontWeight: 900, fontSize: '0.75rem' }}>SHINY!</div>
                                )}
                              </>
                            )}

                            {currentPatient.id === 'root-canal' && (
                              <>
                                {currentStepIndex === 0 && <div className="ds-decay-pit"></div>}
                                {currentStepIndex === 1 && <div className="ds-pulp-nerve"></div>}
                                {currentStepIndex >= 3 && <div className="ds-gutta-fill"></div>}
                                {currentStepIndex === 4 && <div className="ds-crown-overlay">👑 Crown</div>}
                              </>
                            )}

                            {currentPatient.id === 'extraction' && (
                              <>
                                {currentStepIndex === 2 && isHolding && <div style={{ fontSize: '1.2rem' }}>⛏️</div>}
                                {currentStepIndex >= 3 && <div style={{ fontSize: '1.4rem' }}>🩹 Gauze</div>}
                              </>
                            )}

                            {currentPatient.id === 'implant' && (
                              <>
                                {currentStepIndex >= 1 && <div className="ds-implant-screw-overlay"></div>}
                                {currentStepIndex === 3 && <div className="ds-crown-overlay">🦷 Crown</div>}
                              </>
                            )}

                            {currentPatient.id === 'braces' && (
                              <>
                                {currentStepIndex >= 2 && <div className="ds-bracket-overlay"></div>}
                                {currentStepIndex >= 3 && <div className="ds-archwire-overlay"></div>}
                                {currentStepIndex >= 4 && <div className="ds-elastic-band-overlay"></div>}
                              </>
                            )}

                            {currentPatient.id === 'crown-bridge' && (
                              <>
                                {currentStepIndex >= 3 && (
                                  <div className="ds-bridge-unit-overlay">🌉 3-Unit Bridge</div>
                                )}
                              </>
                            )}
                          </>
                        )}

                        {!isTarget && (
                          <div style={{ fontSize: '1.2rem', opacity: 0.6 }}>🦷</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hold-to-Operate Action Button */}
              <div style={{ textAlign: 'center', margin: '8px 0' }}>
                <button 
                  className={`ds-hold-btn ${isHolding ? 'holding' : ''}`}
                  onMouseDown={startHolding}
                  onMouseUp={stopHolding}
                  onTouchStart={startHolding}
                  onTouchEnd={stopHolding}
                >
                  <Zap size={22} /> {isHolding ? 'OPERATING... HOLD STEADY!' : currentPatient.steps[currentStepIndex].targetText}
                </button>
              </div>

              {/* Progress Meter */}
              <div className="ds-progress-bar-wrap">
                <div className="ds-progress-fill" style={{ width: `${holdProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screen 4: Post-Op Mini Quiz & Questionnaire */}
      {gameStage === 'quiz' && (
        <div style={{ padding: '30px 20px', maxWidth: '620px', margin: '0 auto', textAlign: 'center' }}>
          <div className="ds-questionnaire-card">
            <Sparkles color="#0284c7" size={38} style={{ marginBottom: '8px' }} />
            <h2 className="ds-questionnaire-title">Surgery Completed Successfully! 🎉</h2>
            <p className="ds-questionnaire-sub">
              Answer this medical bonus question to earn +200 surgeon points!
            </p>

            <h3 style={{ color: '#000000', margin: '15px 0 20px', fontSize: '1.2rem', fontWeight: 900, lineHeight: 1.4 }}>
              ❓ {currentPatient.quiz.question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentPatient.quiz.options.map((opt, idx) => (
                <button
                  key={idx}
                  className={`ds-diag-btn ${selectedQuizOption === idx ? (idx === currentPatient.quiz.correct ? 'correct' : 'wrong') : ''}`}
                  onClick={() => handleQuizAnswer(idx)}
                >
                  {idx + 1}. {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Screen 5: Patient Completion Summary */}
      {gameStage === 'completed' && (
        <div style={{ padding: '35px 20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <Trophy color="#f59e0b" size={56} style={{ marginBottom: '12px' }} />
          <h2 style={{ color: '#fff', margin: '0 0 8px' }}>Procedure Success! 🎉</h2>
          <p style={{ color: '#cbd5e1', marginBottom: '20px' }}>
            {formattedDocName} successfully completed treatment on {currentPatient.name}.
          </p>

          <div style={{ background: '#1e293b', border: '3px solid #334155', borderRadius: '18px', padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 6px', color: '#38bdf8' }}>Total Surgeon Score</h3>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f59e0b' }}>{score} pts</div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => setGameStage('menu')} 
              className="ds-btn-primary" 
              style={{ flex: 1 }}
            >
              Treat Next Patient
            </button>
            <button 
              onClick={() => setGameStage('leaderboard')} 
              style={{ background: '#334155', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '30px', cursor: 'pointer', fontWeight: 800 }}
            >
              View Leaderboard
            </button>
          </div>
        </div>
      )}

      {/* Screen 6: Leaderboard */}
      {gameStage === 'leaderboard' && (
        <div className="ds-leaderboard-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy color="#f59e0b" size={26} /> Clinic Top Dental Surgeons
            </h3>
            <button 
              onClick={() => setGameStage('menu')} 
              style={{ background: '#38bdf8', color: '#0f172a', fontWeight: 800, border: 'none', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.88rem' }}
            >
              Play Again
            </button>
          </div>

          <table className="ds-lb-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Doctor Name</th>
                <th>Title</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={idx}>
                  <td>
                    <span className={`ds-rank-badge ${idx === 0 ? 'ds-rank-1' : (idx === 1 ? 'ds-rank-2' : (idx === 2 ? 'ds-rank-3' : ''))}`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td style={{ fontWeight: 800, color: '#f8fafc' }}>{entry.name}</td>
                  <td style={{ color: '#38bdf8', fontSize: '0.85rem' }}>{entry.title}</td>
                  <td style={{ fontWeight: 900, color: '#f59e0b' }}>{entry.score} pts</td>
                  <td style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
