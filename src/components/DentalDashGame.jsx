import React, { useEffect, useRef, useState } from 'react';
import './DentalDashGame.css';

/**
 * DentalDashGame - A plug-and-play 2D Educational Runner Game for React & Next.js Websites.
 * Features: 5 Levels, Level Transition Quizzes, Mobile Touch Swipe Gestures, Audio Synth,
 * Object Encyclopedia Modal, and Persistent Leaderboard.
 */
export default function DentalDashGame({
  clinicName = "Root Square Dental Clinic",
  onScoreSubmit = null,
  showLeaderboardInitially = false
}) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START'); // START, RUNNING, QUIZ, GAMEOVER
  const [score, setScore] = useState(0);
  const [meters, setMeters] = useState(0);
  const [showLevelBanner, setShowLevelBanner] = useState(false);
  const [levelBannerInfo, setLevelBannerInfo] = useState({ title: '', subtitle: '' });
  const [toastText, setToastText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(showLeaderboardInitially);
  const [playerName, setPlayerName] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);

  // Level Transition Quiz Checkpoint State
  const [quizObj, setQuizObj] = useState(null);
  const [quizTimer, setQuizTimer] = useState(10);
  const [quizFeedback, setQuizFeedback] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const quizIntervalRef = useRef(null);

  // End Game Stats
  const [reportStats, setReportStats] = useState({
    score: 0,
    meters: 0,
    germs: 0,
    items: 0,
    grade: 'C',
    title: 'Tooth Trainee',
    desc: 'Needs regular 2-minute brushing twice a day.',
    advice: 'Brush for 2 minutes twice every day!'
  });

  // Touch Swipe Gesture Tracking Ref
  const touchStartPos = useRef({ x: 0, y: 0 });

  // Web Audio Synth Ref
  const audioCtxRef = useRef(null);

  // --- Web Audio Synth Functions ---
  const playTone = (freq, type, duration, startVol = 0.3, endVol = 0.01) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(startVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(endVol, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  const soundJump = () => playTone(260, 'sine', 0.16, 0.3);
  const soundZap = () => playTone(900, 'sawtooth', 0.22, 0.35);
  const soundCollect = () => {
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => setTimeout(() => playTone(f, 'triangle', 0.12, 0.25), i * 45));
  };
  const soundGermDestroy = () => playTone(180, 'square', 0.14, 0.35);
  const soundHurt = () => playTone(120, 'sawtooth', 0.28, 0.45);
  const soundLevelUp = () => {
    [392, 523.25, 659.25, 783.99, 1046.50].forEach((f, i) => setTimeout(() => playTone(f, 'square', 0.18, 0.3), i * 80));
  };
  const soundQuizCorrect = () => {
    [440, 554.37, 659.25, 880].forEach((f, i) => setTimeout(() => playTone(f, 'sine', 0.22, 0.35), i * 70));
  };
  const soundGameOver = () => {
    [400, 350, 300, 250].forEach((f, i) => setTimeout(() => playTone(f, 'sawtooth', 0.28, 0.35), i * 100));
  };

  // --- Educational Database ---
  const DENTAL_TIPS = [
    "Brush your teeth twice daily for at least 2 full minutes!",
    "Fluoride toothpaste strengthens tooth enamel against acid attacks!",
    "Flossing daily cleans 35% of tooth surfaces that brushes can't reach!",
    "Limit sugary sweets & soda to prevent bacteria from making cavity acid!",
    "Replace your toothbrush every 3 months or when bristles get frayed!",
    "Visit Dr. Priyanka Sawant every 6 months for professional checkups!",
    "Drinking water after meals rinses away lingering food particles!",
    "Crunchy fruits like apples stimulate gums & boost natural saliva flow!"
  ];

  const QUIZZES = [
    { q: "How many times a day should you brush your teeth?", options: ["Once a week", "Twice a day for 2 minutes", "Only after eating candy"], correct: 1, tip: "Brushing twice a day for 2 minutes removes plaque bacteria effectively!" },
    { q: "What component in toothpaste protects teeth from cavities?", options: ["Sugar", "Fluoride", "Food coloring"], correct: 1, tip: "Fluoride bonds with enamel to make teeth stronger against decay!" },
    { q: "Why is flossing important for healthy teeth?", options: ["It makes teeth turn pink", "It cleans between teeth where brushes can't reach", "It is only for grown-ups"], correct: 1, tip: "Flossing cleans tight interdental spaces to prevent gum disease!" },
    { q: "Which snack is tooth-friendly and promotes clean teeth?", options: ["Sticky Toffee", "Crunchy Fresh Apple", "Fizzy Soda"], correct: 1, tip: "Crunchy apples stimulate saliva and help scrub tooth surfaces!" },
    { q: "How often should you replace your toothbrush?", options: ["Every 3 months", "Every 5 years", "Never"], correct: 0, tip: "Frayed bristles can't clean effectively and can harbor bacteria!" }
  ];

  const LEVELS = [
    { level: 1, title: "Level 1: Sugar Bug Rampage", targetMeters: 400, speed: 6.5, bg: "linear-gradient(to bottom, #7400b8, #6930c3, #5e60ce, #4ea8de, #90e0ef)" },
    { level: 2, title: "Level 2: Cavity & Decay Attack", targetMeters: 900, speed: 8.0, bg: "linear-gradient(to bottom, #4c1d95, #5b21b6, #1e40af, #0284c7, #38bdf8)" },
    { level: 3, title: "Level 3: Bacteria Swarm Sky", targetMeters: 1500, speed: 9.5, bg: "linear-gradient(to bottom, #831843, #9d174d, #991b1b, #c2410c, #fb923c)" },
    { level: 4, title: "Level 4: Acid Erosion Storm", targetMeters: 2200, speed: 11.0, bg: "linear-gradient(to bottom, #064e3b, #047857, #0f766e, #0284c7, #7dd3fc)" },
    { level: 5, title: "Level 5: Master Fluoride Kingdom", targetMeters: 99999, speed: 12.5, bg: "linear-gradient(to bottom, #0f172a, #1e1b4b, #312e81, #4338ca, #818cf8)" }
  ];

  // --- Leaderboard Storage ---
  useEffect(() => {
    const DEFAULT_LEADERBOARD = [
      { name: "Dr. Priyanka Sawant", score: 4850, grade: "S", date: "2026-09-10" },
      { name: "FlossMaster_Pro", score: 3920, grade: "S", date: "2026-09-08" },
      { name: "ToothFairy_99", score: 3100, grade: "A", date: "2026-09-05" },
      { name: "FluorideHero", score: 2450, grade: "A", date: "2026-09-01" },
      { name: "BrushBoss", score: 1800, grade: "B", date: "2026-08-28" }
    ];
    const stored = localStorage.getItem('dental_dash_leaderboard');
    if (!stored) {
      localStorage.setItem('dental_dash_leaderboard', JSON.stringify(DEFAULT_LEADERBOARD));
      setLeaderboard(DEFAULT_LEADERBOARD);
    } else {
      try { setLeaderboard(JSON.parse(stored)); } catch (e) { setLeaderboard(DEFAULT_LEADERBOARD); }
    }
  }, []);

  const handleSaveScore = () => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = { name: playerName.trim() || 'Smile Defender', score: reportStats.score, grade: reportStats.grade, date: today };
    const updated = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem('dental_dash_leaderboard', JSON.stringify(updated));
    setShowLeaderboardModal(true);
    if (onScoreSubmit) onScoreSubmit(newEntry);
  };

  // Toast Handler
  const showToastMsg = (msg) => {
    setToastText(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  // --- Canvas Game Loop Engine ---
  const engineRef = useRef({
    mode: 'START',
    currentLevelIdx: 0,
    score: 0,
    meters: 0,
    speed: 6.5,
    health: 3,
    maxHealth: 3,
    germsDefeated: 0,
    itemsCollected: 0,
    shieldTimer: 0,
    zapCharges: 3,
    maxZapCharges: 5,
    obstacles: [],
    collectibles: [],
    particles: [],
    floatingTexts: [],
    bgOffset: 0,
    levelQuizPending: false
  });

  const playerRef = useRef({
    x: 120,
    y: 340,
    width: 75,
    height: 90,
    velocityY: 0,
    gravity: 0.8,
    jumpForce: -16.5,
    isGrounded: true,
    doubleJumpAvailable: true,
    isDucking: false,
    isZapping: false,
    zapTimer: 0,
    animFrame: 0
  });

  const jumpPlayer = () => {
    const p = playerRef.current;
    if (p.isGrounded) {
      p.velocityY = p.jumpForce;
      p.isGrounded = false;
      p.doubleJumpAvailable = true;
      soundJump();
      createSparkles(p.x + 35, p.y + 80, '#90e0ef', 10);
    } else if (p.doubleJumpAvailable) {
      p.velocityY = p.jumpForce * 0.88;
      p.doubleJumpAvailable = false;
      soundJump();
      createSparkles(p.x + 35, p.y + 50, '#48cae4', 15);
    }
  };

  const duckPlayer = (ducking) => {
    const p = playerRef.current;
    p.isDucking = ducking;
    p.height = ducking ? 50 : 90;
  };

  const zapPlayer = () => {
    const e = engineRef.current;
    const p = playerRef.current;
    if (e.zapCharges > 0 && !p.isZapping) {
      e.zapCharges--;
      p.isZapping = true;
      p.zapTimer = 20;
      soundZap();
      // Zap Beam Destruction
      for (let i = 0; i < e.obstacles.length; i++) {
        const obs = e.obstacles[i];
        if (obs.x > p.x && obs.x < p.x + 500 && Math.abs((p.y + 30) - obs.y) < 100) {
          createSparkles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#ffb703', 25);
          e.score += 150;
          e.germsDefeated++;
          soundGermDestroy();
          e.floatingTexts.push({ x: obs.x, y: obs.y, text: '+150 ZAPPED!', color: '#ffb703', life: 45, maxLife: 45 });
          showToastMsg("Toothbrush Zap destroyed harmful bacteria!");
          e.obstacles.splice(i, 1);
          i--;
        }
      }
    }
  };

  const createSparkles = (x, y, color, count) => {
    const e = engineRef.current;
    for (let i = 0; i < count; i++) {
      const speedX = (Math.random() - 0.5) * 7;
      const speedY = (Math.random() - 0.5) * 7;
      e.particles.push({ x, y, color, size: Math.random() * 5 + 3, speedX, speedY, life: 28, maxLife: 28 });
    }
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (engineRef.current.mode === 'RUNNING') jumpPlayer();
        else if (engineRef.current.mode === 'START') startGame();
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        if (engineRef.current.mode === 'RUNNING') duckPlayer(true);
      } else if (e.code === 'KeyF') {
        e.preventDefault();
        if (engineRef.current.mode === 'RUNNING') zapPlayer();
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'ArrowDown') duckPlayer(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // --- Mobile Touch Gestures (Swipe Detection) ---
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (engineRef.current.mode !== 'RUNNING') return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartPos.current.x;
    const deltaY = touch.clientY - touchStartPos.current.y;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY < -30) {
        jumpPlayer();
      } else if (deltaY > 30) {
        duckPlayer(true);
        setTimeout(() => duckPlayer(false), 700);
      }
    } else if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15) {
      zapPlayer();
    }
  };

  // Start Game Function
  const startGame = () => {
    const e = engineRef.current;
    const p = playerRef.current;
    e.mode = 'RUNNING';
    e.score = 0;
    e.meters = 0;
    e.currentLevelIdx = 0;
    e.speed = LEVELS[0].speed;
    e.health = 3;
    e.germsDefeated = 0;
    e.itemsCollected = 0;
    e.shieldTimer = 0;
    e.zapCharges = 3;
    e.obstacles = [];
    e.collectibles = [];
    e.particles = [];
    e.floatingTexts = [];
    e.levelQuizPending = false;
    p.y = 340;
    p.velocityY = 0;

    setGameState('RUNNING');
  };

  // Trigger Level Transition Quiz (Asked ONLY when advancing levels!)
  const triggerLevelQuiz = () => {
    const e = engineRef.current;
    e.mode = 'QUIZ';
    e.levelQuizPending = true;
    const qObj = QUIZZES[Math.floor(Math.random() * QUIZZES.length)];
    setQuizObj(qObj);
    setQuizTimer(10);
    setQuizFeedback('');
    setIsAnswered(false);
    setGameState('QUIZ');

    if (quizIntervalRef.current) clearInterval(quizIntervalRef.current);
    quizIntervalRef.current = setInterval(() => {
      setQuizTimer(prev => {
        if (prev <= 1) {
          clearInterval(quizIntervalRef.current);
          completeLevelTransition(false, "Time expired! Brushing 2x daily keeps teeth strong!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleQuizAnswer = (selectedIdx) => {
    if (isAnswered) return;
    setIsAnswered(true);
    if (quizIntervalRef.current) clearInterval(quizIntervalRef.current);

    const e = engineRef.current;
    if (selectedIdx === quizObj.correct) {
      soundQuizCorrect();
      setQuizFeedback("✅ Correct! +300 PTS & Fluoride Shield Awarded!");
      e.score += 300;
      e.shieldTimer = 300;
      setTimeout(() => completeLevelTransition(true, quizObj.tip), 1500);
    } else {
      soundHurt();
      setQuizFeedback(`❌ Keep learning! ${quizObj.tip}`);
      setTimeout(() => completeLevelTransition(false, quizObj.tip), 2000);
    }
  };

  const completeLevelTransition = (isCorrect, tip) => {
    const e = engineRef.current;
    showToastMsg(tip);

    // Advance Level
    if (e.currentLevelIdx < LEVELS.length - 1) {
      e.currentLevelIdx++;
      const newLvl = LEVELS[e.currentLevelIdx];
      e.speed = newLvl.speed;
      soundLevelUp();
      setLevelBannerInfo({ title: `LEVEL ${newLvl.level} UNLOCKED!`, subtitle: newLvl.title });
      setShowLevelBanner(true);
      setTimeout(() => setShowLevelBanner(false), 3000);
    }

    e.levelQuizPending = false;
    e.mode = 'RUNNING';
    setGameState('RUNNING');
  };

  // --- Canvas Rendering Loop ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const loop = () => {
      const e = engineRef.current;
      const p = playerRef.current;

      if (e.mode === 'RUNNING') {
        e.meters += e.speed * 0.05;
        e.score += 1;
        setScore(e.score);
        setMeters(Math.floor(e.meters));

        // Check Level Transition Quiz Condition (ONLY when reaching next level target & no quiz pending)
        const currentLvl = LEVELS[e.currentLevelIdx];
        if (e.meters >= currentLvl.targetMeters && e.currentLevelIdx < LEVELS.length - 1 && !e.levelQuizPending) {
          triggerLevelQuiz();
          return;
        }

        // Shield timer
        if (e.shieldTimer > 0) e.shieldTimer--;

        // Player physics
        p.velocityY += p.gravity;
        p.y += p.velocityY;
        const targetY = p.isDucking ? 380 : 340;
        if (p.y >= targetY) {
          p.y = targetY;
          p.velocityY = 0;
          p.isGrounded = true;
        }

        if (p.zapTimer > 0) {
          p.zapTimer--;
          if (p.zapTimer === 0) p.isZapping = false;
        }
        p.animFrame += 0.2;

        // Spawn obstacles
        if (Math.random() < 0.016 && e.obstacles.length < 3) {
          const types = ['sugar_bug', 'decay_blob', 'bacteria_swarm', 'acid_puddle'];
          const type = types[Math.floor(Math.random() * types.length)];
          let y = 365;
          let w = 65, h = 65;
          if (type === 'bacteria_swarm') y = 290;
          else if (type === 'acid_puddle') { y = 410; h = 20; w = 95; }
          e.obstacles.push({ type, x: 980, y, width: w, height: h });
        }

        // Spawn collectibles
        if (Math.random() < 0.013 && e.collectibles.length < 2) {
          const items = ['toothbrush', 'toothpaste', 'dentist_badge', 'apple', 'floss'];
          const type = items[Math.floor(Math.random() * items.length)];
          e.collectibles.push({ type, x: 980, y: Math.random() > 0.4 ? 280 : 355, width: 55, height: 55, floatAnim: 0 });
        }

        // Update obstacles & collisions
        for (let i = 0; i < e.obstacles.length; i++) {
          const obs = e.obstacles[i];
          obs.x -= e.speed;
          if (p.x < obs.x + obs.width && p.x + p.width > obs.x && p.y < obs.y + obs.height && p.y + p.height > obs.y) {
            if (e.shieldTimer > 0) {
              createSparkles(obs.x + 30, obs.y + 30, '#90e0ef', 20);
              soundGermDestroy();
              e.obstacles.splice(i, 1);
              i--;
              showToastMsg("Fluoride Shield protected you from cavity decay!");
            } else {
              createSparkles(p.x + 35, p.y + 35, '#e63946', 20);
              soundHurt();
              e.health--;
              e.obstacles.splice(i, 1);
              i--;
              if (e.health <= 0) {
                e.mode = 'GAMEOVER';
                soundGameOver();
                setGameState('GAMEOVER');
                // Calculate stats
                let grade = 'D', title = "Cavity Risk", desc = "High sugar exposure detected!";
                let advice = "Brush for 2 minutes twice every day!";
                if (e.score >= 3500) { grade = 'S'; title = "Master Fluoride Superhero"; desc = "Pristine enamel & master hygiene!"; advice = "Outstanding Champion! Your dental care knowledge and cavity defense are world-class!"; }
                else if (e.score >= 2500) { grade = 'A'; title = "Dental Health Champion"; desc = "Excellent daily brushing routine!"; advice = "Great Job! Keep flossing daily to clean hidden interdental areas!"; }
                else if (e.score >= 1500) { grade = 'B'; title = "Smile Defender"; desc = "Good care, watch out for plaque!"; advice = "Good effort! Remember to limit sugary sodas & snacks to prevent acid erosion!"; }
                else if (e.score >= 800) { grade = 'C'; title = "Tooth Trainee"; desc = "Needs regular 2-minute brushing twice a day."; advice = "You're getting better! Focus on brushing twice daily and eating crisp fresh apples!"; }

                setReportStats({
                  score: e.score, meters: Math.floor(e.meters), germs: e.germsDefeated, items: e.itemsCollected,
                  grade, title, desc, advice
                });
              }
            }
          } else if (obs.x < -120) { e.obstacles.splice(i, 1); i--; }
        }

        // Update collectibles
        for (let i = 0; i < e.collectibles.length; i++) {
          const item = e.collectibles[i];
          item.x -= e.speed;
          item.floatAnim += 0.08;
          if (p.x < item.x + item.width && p.x + p.width > item.x && p.y < item.y + item.height && p.y + p.height > item.y) {
            soundCollect();
            createSparkles(item.x + 25, item.y + 25, '#ffb703', 20);
            e.itemsCollected++;
            if (item.type === 'toothbrush') {
              e.score += 150; e.zapCharges = Math.min(5, e.zapCharges + 2);
              e.floatingTexts.push({ x: item.x, y: item.y, text: '+150 & ZAP REFILL!', color: '#ffb703', life: 45, maxLife: 45 });
              showToastMsg(DENTAL_TIPS[0]);
            } else if (item.type === 'toothpaste') {
              e.score += 200; e.shieldTimer = 300;
              e.floatingTexts.push({ x: item.x, y: item.y, text: 'FLUORIDE SHIELD!', color: '#48cae4', life: 45, maxLife: 45 });
              showToastMsg(DENTAL_TIPS[1]);
            } else if (item.type === 'dentist_badge') {
              e.score += 500;
              e.floatingTexts.push({ x: item.x, y: item.y, text: '+500 DENTIST STAR!', color: '#ffd166', life: 45, maxLife: 45 });
              showToastMsg(DENTAL_TIPS[5]);
            } else {
              e.score += 100; e.health = Math.min(3, e.health + 1);
              e.floatingTexts.push({ x: item.x, y: item.y, text: '+1 HEART RESTORE!', color: '#52b788', life: 45, maxLife: 45 });
              showToastMsg(item.type === 'apple' ? DENTAL_TIPS[7] : DENTAL_TIPS[2]);
            }
            e.collectibles.splice(i, 1); i--;
          } else if (item.x < -120) { e.collectibles.splice(i, 1); i--; }
        }

        // Update particles & floating texts
        e.particles.forEach((part, idx) => {
          part.x += part.speedX; part.y += part.speedY; part.life--;
          if (part.life <= 0) e.particles.splice(idx, 1);
        });
        e.floatingTexts.forEach((ft, idx) => {
          ft.y -= 1.3; ft.life--;
          if (ft.life <= 0) e.floatingTexts.splice(idx, 1);
        });
      }

      // --- Draw Canvas Scene ---
      ctx.clearRect(0, 0, 960, 540);

      // Background Sky Gradient
      const currentLvl = LEVELS[e.currentLevelIdx];
      canvas.style.background = currentLvl.bg;
      e.bgOffset = (e.bgOffset + e.speed * 0.4) % 960;

      // Sparkle Stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
      for (let i = 0; i < 18; i++) {
        const sx = (i * 75 - e.bgOffset * 0.2 + 1920) % 960;
        const sy = 40 + (i * 24) % 180;
        ctx.beginPath(); ctx.arc(sx, sy, (i % 3) + 2, 0, Math.PI * 2); ctx.fill();
      }

      // Tooth Castles Skyline
      ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
      for (let i = 0; i < 6; i++) {
        const bx = (i * 200 - e.bgOffset * 0.3 + 1920) % 960;
        ctx.beginPath(); ctx.arc(bx + 40, 290, 45, Math.PI, 0); ctx.rect(bx, 290, 85, 140); ctx.fill();
      }

      // Track & Toothpaste Stripe
      ctx.fillStyle = '#0077b6';
      ctx.fillRect(0, 430, 960, 110);
      const stripGrad = ctx.createLinearGradient(0, 430, 0, 444);
      stripGrad.addColorStop(0, '#52b788'); stripGrad.addColorStop(1, '#2a9d8f');
      ctx.fillStyle = stripGrad;
      ctx.fillRect(0, 430, 960, 14);

      // Dashed Track Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 4;
      ctx.setLineDash([35, 25]);
      ctx.lineDashOffset = -e.bgOffset * 1.5;
      ctx.beginPath(); ctx.moveTo(0, 475); ctx.lineTo(960, 475); ctx.stroke();
      ctx.setLineDash([]);

      // Render Collectibles (55px x 55px Circle Badge)
      e.collectibles.forEach(item => {
        const fy = item.y + Math.sin(item.floatAnim) * 8;
        ctx.save();
        ctx.fillStyle = '#ffb703'; ctx.shadowColor = '#ffb703'; ctx.shadowBlur = 14;
        ctx.beginPath(); ctx.arc(item.x + 28, fy + 28, 28, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3; ctx.stroke();

        ctx.font = '28px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        let icon = '🪥'; let label = 'BRUSH';
        if (item.type === 'toothpaste') { icon = '🧴'; label = 'PASTE'; }
        else if (item.type === 'dentist_badge') { icon = '⭐'; label = 'STAR'; }
        else if (item.type === 'apple') { icon = '🍎'; label = 'APPLE'; }
        else if (item.type === 'floss') { icon = '🧵'; label = 'FLOSS'; }
        ctx.fillText(icon, item.x + 28, fy + 24);

        ctx.fillStyle = '#03045e'; ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.fillText(label, item.x + 28, fy + 44);
        ctx.restore();
      });

      // Render Obstacles (65px x 65px with Text Badges)
      e.obstacles.forEach(obs => {
        ctx.save();
        if (obs.type === 'sugar_bug') {
          ctx.fillStyle = '#e63946'; ctx.shadowColor = '#e63946'; ctx.shadowBlur = 12;
          ctx.beginPath(); ctx.arc(obs.x + 32, obs.y + 32, 30, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
          ctx.font = '28px sans-serif'; ctx.fillText('👾', obs.x + 16, obs.y + 40);
          ctx.fillStyle = '#ffffff'; ctx.font = 'bold 11px Outfit, sans-serif'; ctx.fillText('SUGAR BUG', obs.x + 4, obs.y - 6);
        } else if (obs.type === 'decay_blob') {
          ctx.fillStyle = '#7f5539'; ctx.shadowColor = '#7f5539'; ctx.shadowBlur = 12;
          ctx.beginPath(); ctx.arc(obs.x + 32, obs.y + 32, 32, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
          ctx.font = '28px sans-serif'; ctx.fillText('🦠', obs.x + 16, obs.y + 40);
          ctx.fillStyle = '#ffb703'; ctx.font = 'bold 11px Outfit, sans-serif'; ctx.fillText('CAVITY BLOB', obs.x + 0, obs.y - 6);
        } else if (obs.type === 'bacteria_swarm') {
          ctx.fillStyle = '#7209b7'; ctx.shadowColor = '#7209b7'; ctx.shadowBlur = 12;
          ctx.beginPath(); ctx.arc(obs.x + 30, obs.y + 30, 28, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.stroke();
          ctx.font = '26px sans-serif'; ctx.fillText('😈', obs.x + 14, obs.y + 38);
          ctx.fillStyle = '#90e0ef'; ctx.font = 'bold 11px Outfit, sans-serif'; ctx.fillText('BACTERIA', obs.x + 4, obs.y - 6);
        } else if (obs.type === 'acid_puddle') {
          ctx.fillStyle = '#fb8500'; ctx.shadowColor = '#fb8500'; ctx.shadowBlur = 14;
          ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
          ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
          ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Outfit, sans-serif'; ctx.fillText('🧪 ACID PUDDLE', obs.x + 8, obs.y + 15);
        }
        ctx.restore();
      });

      // Render Player Tooth
      ctx.save();
      if (e.shieldTimer > 0) {
        ctx.beginPath(); ctx.arc(p.x + p.width / 2, p.y + p.height / 2, 58, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(144, 224, 239, 0.4)'; ctx.strokeStyle = '#90e0ef'; ctx.lineWidth = 4;
        ctx.fill(); ctx.stroke();
      }

      const x = p.x, y = p.y, w = p.width, h = p.height;
      // Waving Cape
      ctx.fillStyle = '#e63946'; ctx.beginPath();
      const capeWave = Math.sin(p.animFrame) * 10;
      ctx.moveTo(x + 15, y + 25); ctx.lineTo(x - 32, y + 45 + capeWave); ctx.lineTo(x + 15, y + h - 15);
      ctx.closePath(); ctx.fill();

      // Tooth Crown & Roots
      const toothGrad = ctx.createLinearGradient(x, y, x + w, y + h);
      toothGrad.addColorStop(0, '#ffffff'); toothGrad.addColorStop(1, '#e0f2fe');
      ctx.fillStyle = toothGrad; ctx.strokeStyle = '#0077b6'; ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(x + 15, y);
      ctx.bezierCurveTo(x, y, x, y + 32, x + 8, y + 45);
      ctx.bezierCurveTo(x + 8, y + h - 12, x + 20, y + h, x + 30, y + h - 18);
      ctx.bezierCurveTo(x + 38, y + 55, x + 44, y + 55, x + 50, y + h - 18);
      ctx.bezierCurveTo(x + 60, y + h, x + 72, y + h - 12, x + 72, y + 45);
      ctx.bezierCurveTo(x + 78, y + 32, x + 78, y, x + 60, y);
      ctx.closePath(); ctx.fill(); ctx.stroke();

      // Shiny Enamel
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'; ctx.beginPath();
      ctx.ellipse(x + 24, y + 18, 10, 5, Math.PI / 4, 0, Math.PI * 2); ctx.fill();

      // Eyes & Smile
      ctx.fillStyle = '#03045e'; ctx.beginPath();
      ctx.arc(x + 28, y + 28, 5.5, 0, Math.PI * 2); ctx.arc(x + 50, y + 28, 5.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath();
      ctx.arc(x + 26, y + 26, 2, 0, Math.PI * 2); ctx.arc(x + 48, y + 26, 2, 0, Math.PI * 2); ctx.fill();

      ctx.strokeStyle = '#d90429'; ctx.lineWidth = 3; ctx.beginPath();
      ctx.arc(x + 39, y + 34, 9, 0.1, Math.PI - 0.1); ctx.stroke();

      // Superhero Mask
      ctx.fillStyle = '#00b4d8'; ctx.beginPath();
      ctx.ellipse(x + 39, y + 27, 22, 8, 0, 0, Math.PI * 2); ctx.fill();

      // Toothbrush Weapon
      const brushX = x + w - 5; const brushY = y + 32;
      ctx.fillStyle = '#ffb703'; ctx.fillRect(brushX, brushY, 26, 6);
      ctx.fillStyle = '#48cae4'; ctx.fillRect(brushX + 20, brushY - 8, 10, 8);

      // Zap Beam Laser Effect
      if (p.isZapping) {
        ctx.fillStyle = '#00f5d4'; ctx.shadowColor = '#00f5d4'; ctx.shadowBlur = 18;
        ctx.fillRect(brushX + 30, brushY - 14, 450, 22);
        for (let i = 0; i < 8; i++) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(brushX + 30 + Math.random() * 440, brushY - 12 + Math.random() * 18, 5, 5);
        }
      }
      ctx.restore();

      // Particles & Floating Text
      e.particles.forEach(part => {
        ctx.save(); ctx.globalAlpha = Math.max(0, part.life / part.maxLife);
        ctx.fillStyle = part.color; ctx.beginPath(); ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      });

      e.floatingTexts.forEach(ft => {
        ctx.save(); ctx.globalAlpha = Math.max(0, ft.life / ft.maxLife);
        ctx.fillStyle = ft.color; ctx.font = 'bold 22px Outfit, sans-serif';
        ctx.shadowColor = '#000'; ctx.shadowBlur = 6; ctx.fillText(ft.text, ft.x, ft.y); ctx.restore();
      });

      // HUD Overlay
      ctx.save();
      ctx.fillStyle = 'rgba(3, 4, 94, 0.72)'; ctx.fillRect(15, 12, 930, 52);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'; ctx.lineWidth = 2; ctx.strokeRect(15, 12, 930, 52);

      for (let i = 0; i < e.maxHealth; i++) {
        ctx.font = '24px sans-serif'; ctx.fillText(i < e.health ? '❤️' : '🖤', 28 + i * 34, 46);
      }
      ctx.fillStyle = '#ffb703'; ctx.font = 'bold 17px Outfit, sans-serif';
      ctx.fillText(`LVL ${e.currentLevelIdx + 1}`, 145, 45);
      ctx.fillStyle = '#ffffff'; ctx.font = 'bold 19px Outfit, sans-serif';
      ctx.fillText(`SCORE: ${e.score}`, 225, 45);
      ctx.fillStyle = '#90e0ef';
      ctx.fillText(`DISTANCE: ${Math.floor(e.meters)}m`, 410, 45);
      ctx.fillStyle = '#ffb703';
      ctx.fillText(`🪥 ZAP: ${e.zapCharges}/${e.maxZapCharges}`, 610, 45);
      if (e.shieldTimer > 0) {
        ctx.fillStyle = '#48cae4';
        ctx.fillText(`🛡️ SHIELD: ${Math.ceil(e.shieldTimer / 60)}s`, 790, 45);
      }
      ctx.restore();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="dental-game-react-root">
      {/* Header Navigation */}
      <header className="react-game-header">
        <div className="react-game-title">
          <i className="fa-solid fa-tooth"></i>
          <span>Tooth Defender: Dental Dash</span>
        </div>
        <div className="react-header-btns">
          <button className="react-btn-icon" onClick={() => setIsMuted(!isMuted)}>
            <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
          </button>
          <button className="react-btn" onClick={() => setShowHelpModal(true)}>
            <i className="fa-solid fa-book-open"></i> Help & Guide
          </button>
          <button className="react-btn" onClick={() => setShowLeaderboardModal(true)}>
            <i className="fa-solid fa-trophy"></i> Leaderboard
          </button>
        </div>
      </header>

      {/* Main Game Container */}
      <main className="react-canvas-container">
        <div 
          className="react-canvas-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <canvas ref={canvasRef} width="960" height="540" />

          {/* Toast Notification */}
          {showToast && (
            <div className="react-dental-toast">
              <i className="fa-solid fa-lightbulb"></i>
              <span>{toastText}</span>
            </div>
          )}

          {/* On-Canvas Level Up Banner */}
          {showLevelBanner && (
            <div className="react-level-banner">
              <h2>{levelBannerInfo.title}</h2>
              <p>{levelBannerInfo.subtitle}</p>
            </div>
          )}

          {/* Start Screen */}
          {gameState === 'START' && (
            <div className="react-overlay">
              <i className="fa-solid fa-tooth" style={{ fontSize: '3.5rem', color: '#caf0f8', marginBottom: 12 }}></i>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', margin: '0 0 8px 0' }}>TOOTH DEFENDER: DENTAL DASH</h1>
              <p style={{ maxWidth: 580, color: '#caf0f8', marginBottom: 24 }}>Dodge decay, beat sugary germs through 5 exciting levels, collect healthy toothbrushes, and master dental hygiene skills!</p>

              <div style={{ display: 'flex', gap: 14, marginBottom: 25, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', padding: '10px 16px', borderRadius: 12 }}>
                  <span style={{ background: '#fff', color: '#03045e', padding: '4px 8px', borderRadius: 6, fontWeight: 700 }}>SPACE / ↑</span> Jump / Double Jump
                </div>
                <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', padding: '10px 16px', borderRadius: 12 }}>
                  <span style={{ background: '#fff', color: '#03045e', padding: '4px 8px', borderRadius: 6, fontWeight: 700 }}>↓ / DOWN</span> Duck / Slide
                </div>
                <div style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', padding: '10px 16px', borderRadius: 12 }}>
                  <span style={{ background: '#fff', color: '#03045e', padding: '4px 8px', borderRadius: 6, fontWeight: 700 }}>F / CLICK</span> Toothbrush Zap Attack
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
                <button className="react-btn" onClick={startGame} style={{ fontSize: '1.2rem', padding: '14px 40px', borderRadius: 40 }}>
                  <i className="fa-solid fa-play"></i> START DENTAL DASH
                </button>
                <button className="react-btn" onClick={() => setShowHelpModal(true)} style={{ borderRadius: 40, padding: '14px 28px', background: 'rgba(255,255,255,0.2)' }}>
                  <i className="fa-solid fa-book-open"></i> Game Guide
                </button>
              </div>
            </div>
          )}

          {/* Level Transition Quiz Overlay */}
          {gameState === 'QUIZ' && quizObj && (
            <div className="react-overlay">
              <div className="react-quiz-box">
                <div className="react-quiz-header">
                  <span className="react-quiz-badge"><i className="fa-solid fa-graduation-cap"></i> Level Up Checkpoint</span>
                  <span className="react-quiz-timer">⏱️ {quizTimer}s</span>
                </div>
                <h3 className="react-quiz-question">{quizObj.q}</h3>
                <div className="react-quiz-options">
                  {quizObj.options.map((opt, idx) => (
                    <button 
                      key={idx} 
                      className={`react-quiz-opt-btn ${isAnswered ? (idx === quizObj.correct ? 'correct' : 'wrong') : ''}`}
                      disabled={isAnswered}
                      onClick={() => handleQuizAnswer(idx)}
                    >
                      <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#e2e8f0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{String.fromCharCode(65 + idx)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
                {quizFeedback && <div style={{ fontWeight: 600, marginTop: 8 }}>{quizFeedback}</div>}
              </div>
            </div>
          )}

          {/* Game Over / Dental Health Report Card */}
          {gameState === 'GAMEOVER' && (
            <div className="react-overlay">
              <div className="react-report-card">
                <div className="react-report-header">
                  <h2>DENTAL HEALTH REPORT CARD</h2>
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Run Completed!</p>
                </div>

                <div className="react-grade-container">
                  <div className="react-grade-circle">{reportStats.grade}</div>
                  <div className="react-grade-details">
                    <div className="react-grade-title">{reportStats.title}</div>
                    <div className="react-grade-desc">{reportStats.desc}</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#03045e', marginTop: 4 }}>{reportStats.score} PTS</div>
                  </div>
                </div>

                <div className="react-stats-grid">
                  <div className="react-stat-box"><div className="num">{reportStats.meters}m</div><div className="label">Distance</div></div>
                  <div className="react-stat-box"><div className="num">{reportStats.germs}</div><div className="label">Germs Defeated</div></div>
                  <div className="react-stat-box"><div className="num">{reportStats.items}</div><div className="label">Healthy Items</div></div>
                </div>

                <div className="react-advice-box">
                  <strong><i className="fa-solid fa-user-doctor"></i> Dentist Advice:</strong> {reportStats.advice}
                </div>

                <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
                  <input 
                    type="text" 
                    placeholder="Enter Champion Name (e.g. Alex)"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    style={{ flex: 1, padding: '10px 16px', borderRadius: 12, border: '2px solid #cbd5e1', fontSize: '0.98rem' }}
                  />
                  <button className="react-btn" onClick={handleSaveScore}>Submit Score</button>
                </div>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                  <button className="react-btn" onClick={startGame} style={{ borderRadius: 40, padding: '12px 28px' }}>
                    <i className="fa-solid fa-rotate-right"></i> Play Again
                  </button>
                  <button className="react-btn" onClick={() => setShowLeaderboardModal(true)} style={{ borderRadius: 40, padding: '12px 24px', background: '#e2e8f0', color: '#334155' }}>
                    <i className="fa-solid fa-trophy"></i> Leaderboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Touch Controls */}
        <div className="react-mobile-controls">
          <div className="react-touch-btn-group">
            <button className="react-touch-btn" onClick={jumpPlayer}>
              <i className="fa-solid fa-arrow-up"></i> JUMP
            </button>
            <button className="react-touch-btn" onClick={() => { duckPlayer(true); setTimeout(() => duckPlayer(false), 700); }}>
              <i className="fa-solid fa-arrow-down"></i> SLIDE
            </button>
          </div>
          <button className="react-touch-btn react-touch-btn-zap" onClick={zapPlayer}>
            <i className="fa-solid fa-bolt"></i> ZAP BRUSH!
          </button>
        </div>
      </main>

      {/* Help & Object Encyclopedia Modal */}
      {showHelpModal && (
        <div className="react-modal-backdrop" onClick={() => setShowHelpModal(false)}>
          <div className="react-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="react-modal-header">
              <h3><i className="fa-solid fa-book-open"></i> Dental Game & Object Encyclopedia</h3>
              <button className="react-modal-close" onClick={() => setShowHelpModal(false)}>✕</button>
            </div>
            <div className="react-modal-body">
              <h4 style={{ color: '#03045e', borderBottom: '2px solid #e2e8f0', paddingBottom: 6 }}>🪥 Tooth-Friendly Collectibles</h4>
              <div className="react-encyclopedia-grid">
                <div className="react-encyclopedia-card">
                  <div className="react-item-badge react-bg-friendly">🪥</div>
                  <div><strong>Toothbrush (+150 PTS)</strong>: Restores Zap charges. Brushing 2x daily removes 99% of plaque!</div>
                </div>
                <div className="react-encyclopedia-card">
                  <div className="react-item-badge react-bg-friendly">🧴</div>
                  <div><strong>Toothpaste (+200 PTS)</strong>: Fluoride Invincibility Shield. Fluoride protects enamel from acid!</div>
                </div>
                <div className="react-encyclopedia-card">
                  <div className="react-item-badge react-bg-friendly">⭐</div>
                  <div><strong>Dentist Badge Star (+500 PTS)</strong>: Checkups every 6 months catch hidden cavities early!</div>
                </div>
                <div className="react-encyclopedia-card">
                  <div className="react-item-badge react-bg-friendly">🍎</div>
                  <div><strong>Fresh Apple (+1 Heart HP)</strong>: Crunchy fruits stimulate gums & natural saliva flow!</div>
                </div>
              </div>

              <h4 style={{ color: '#03045e', borderBottom: '2px solid #e2e8f0', paddingBottom: 6, marginTop: 15 }}>👾 Germs & Decay Obstacles</h4>
              <div className="react-encyclopedia-grid">
                <div className="react-encyclopedia-card">
                  <div className="react-item-badge react-bg-obstacle">👾</div>
                  <div><strong>Sugar Bug</strong>: Crawling candy bug. Sugar feeds oral bacteria that produce cavity acid.</div>
                </div>
                <div className="react-encyclopedia-card">
                  <div className="react-item-badge react-bg-obstacle">🦠</div>
                  <div><strong>Cavity Blob</strong>: Untreated decay leads to deep painful root infections.</div>
                </div>
                <div className="react-encyclopedia-card">
                  <div className="react-item-badge react-bg-obstacle">😈</div>
                  <div><strong>Bacteria Swarm</strong>: Flying microbe. Duck or Zap to protect gums from toxins!</div>
                </div>
                <div className="react-encyclopedia-card">
                  <div className="react-item-badge react-bg-obstacle">🧪</div>
                  <div><strong>Soda Acid Puddle</strong>: Acidic sodas strip away protective enamel layers directly.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      {showLeaderboardModal && (
        <div className="react-modal-backdrop" onClick={() => setShowLeaderboardModal(false)}>
          <div className="react-modal-box" style={{ maxWidth: 680 }} onClick={(e) => e.stopPropagation()}>
            <div className="react-modal-header">
              <h3><i className="fa-solid fa-trophy" style={{ color: '#ffb703' }}></i> Dental Champions Leaderboard</h3>
              <button className="react-modal-close" onClick={() => setShowLeaderboardModal(false)}>✕</button>
            </div>
            <div className="react-modal-body">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                    <th style={{ padding: 10 }}>Rank</th>
                    <th style={{ padding: 10 }}>Defender</th>
                    <th style={{ padding: 10 }}>Grade</th>
                    <th style={{ padding: 10 }}>Score</th>
                    <th style={{ padding: 10 }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: 10, fontWeight: 700 }}>#{idx + 1}</td>
                      <td style={{ padding: 10 }}><strong>{item.name}</strong></td>
                      <td style={{ padding: 10, fontWeight: 700, color: '#0077b6' }}>{item.grade}</td>
                      <td style={{ padding: 10, fontWeight: 700, color: '#2a9d8f' }}>{item.score}</td>
                      <td style={{ padding: 10, fontSize: '0.85rem', color: '#64748b' }}>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <footer style={{ padding: 14, textAlign: 'center', color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>
        {clinicName} &copy; 2026. Designed to inspire lifelong healthy smiles!
      </footer>
    </div>
  );
}
