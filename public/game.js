/* ==========================================================================
   Dental Dash: The Ultimate Educational Dental Hygiene Runner Game Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Canvas & Context ---
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = 960;
    const CANVAS_HEIGHT = 540;
    const GROUND_Y = 430;

    // --- Audio Synthesizer (Web Audio API) ---
    class SoundSynth {
        constructor() {
            this.ctx = null;
            this.muted = false;
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) this.ctx = new AudioCtx();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }

        playTone(freq, type, duration, startVol = 0.3, endVol = 0.01) {
            if (this.muted || !this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(startVol, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(endVol, this.ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) { console.error(e); }
        }

        playJump() {
            if (this.muted || !this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(260, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(650, this.ctx.currentTime + 0.16);
                gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.16);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.16);
            } catch (e) {}
        }

        playZap() {
            if (this.muted || !this.ctx) return;
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(900, this.ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.22);
                gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
                gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.22);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.22);
            } catch (e) {}
        }

        playCollect() {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, idx) => {
                setTimeout(() => this.playTone(freq, 'triangle', 0.12, 0.28), idx * 45);
            });
        }

        playGermDestroy() {
            this.playTone(180, 'square', 0.14, 0.35);
        }

        playHurt() {
            this.playTone(120, 'sawtooth', 0.28, 0.45);
        }

        playQuizCorrect() {
            const notes = [440, 554.37, 659.25, 880];
            notes.forEach((f, i) => setTimeout(() => this.playTone(f, 'sine', 0.22, 0.35), i * 70));
        }

        playLevelUp() {
            const notes = [392, 523.25, 659.25, 783.99, 1046.50];
            notes.forEach((f, i) => setTimeout(() => this.playTone(f, 'square', 0.18, 0.3), i * 80));
        }

        playGameOver() {
            const notes = [400, 350, 300, 250];
            notes.forEach((f, i) => setTimeout(() => this.playTone(f, 'sawtooth', 0.28, 0.35), i * 100));
        }
    }

    const sound = new SoundSynth();

    // --- Educational Tips Database ---
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

    // --- Educational Quizzes Database ---
    const QUIZZES = [
        {
            q: "How many times a day should you brush your teeth?",
            options: ["Once a week", "Twice a day for 2 minutes", "Only after eating candy"],
            correct: 1,
            tip: "Brushing twice a day for 2 minutes removes plaque bacteria effectively!"
        },
        {
            q: "What component in toothpaste protects teeth from cavities?",
            options: ["Sugar", "Fluoride", "Food coloring"],
            correct: 1,
            tip: "Fluoride bonds with enamel to make teeth stronger against decay!"
        },
        {
            q: "Why is flossing important for healthy teeth?",
            options: ["It makes teeth turn pink", "It cleans between teeth where brushes can't reach", "It is only for grown-ups"],
            correct: 1,
            tip: "Flossing cleans tight interdental spaces to prevent gum disease!"
        },
        {
            q: "Which snack is tooth-friendly and promotes clean teeth?",
            options: ["Sticky Toffee", "Crunchy Fresh Apple", "Fizzy Soda"],
            correct: 1,
            tip: "Crunchy apples stimulate saliva and help scrub tooth surfaces!"
        },
        {
            q: "How often should you replace your toothbrush?",
            options: ["Every 3 months", "Every 5 years", "Never"],
            correct: 0,
            tip: "Frayed bristles can't clean effectively and can harbor bacteria!"
        }
    ];

    // --- Level Configuration Database ---
    const LEVELS = [
        { level: 1, title: "Level 1: Sugar Bug Rampage", targetMeters: 400, speed: 6.5, bg: "linear-gradient(to bottom, #7400b8, #6930c3, #5e60ce, #4ea8de, #90e0ef)" },
        { level: 2, title: "Level 2: Cavity & Decay Attack", targetMeters: 900, speed: 8.0, bg: "linear-gradient(to bottom, #4c1d95, #5b21b6, #1e40af, #0284c7, #38bdf8)" },
        { level: 3, title: "Level 3: Bacteria Swarm Sky", targetMeters: 1500, speed: 9.5, bg: "linear-gradient(to bottom, #831843, #9d174d, #991b1b, #c2410c, #fb923c)" },
        { level: 4, title: "Level 4: Acid Erosion Storm", targetMeters: 2200, speed: 11.0, bg: "linear-gradient(to bottom, #064e3b, #047857, #0f766e, #0284c7, #7dd3fc)" },
        { level: 5, title: "Level 5: Master Fluoride Kingdom", targetMeters: 99999, speed: 12.5, bg: "linear-gradient(to bottom, #0f172a, #1e1b4b, #312e81, #4338ca, #818cf8)" }
    ];

    // --- Leaderboard Manager ---
    const DEFAULT_LEADERBOARD = [
        { name: "Dr. Priyanka Sawant", score: 4850, grade: "S", date: "2026-09-10" },
        { name: "FlossMaster_Pro", score: 3920, grade: "S", date: "2026-09-08" },
        { name: "ToothFairy_99", score: 3100, grade: "A", date: "2026-09-05" },
        { name: "FluorideHero", score: 2450, grade: "A", date: "2026-09-01" },
        { name: "BrushBoss", score: 1800, grade: "B", date: "2026-08-28" }
    ];

    function getLeaderboard() {
        const stored = localStorage.getItem('dental_dash_leaderboard');
        if (!stored) {
            localStorage.setItem('dental_dash_leaderboard', JSON.stringify(DEFAULT_LEADERBOARD));
            return DEFAULT_LEADERBOARD;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            return DEFAULT_LEADERBOARD;
        }
    }

    function saveScore(name, score, grade) {
        const board = getLeaderboard();
        const today = new Date().toISOString().split('T')[0];
        board.push({ name: name || "Anonymous Defender", score, grade, date: today });
        board.sort((a, b) => b.score - a.score);
        const top10 = board.slice(0, 10);
        localStorage.setItem('dental_dash_leaderboard', JSON.stringify(top10));
        renderLeaderboardUI();
    }

    function renderLeaderboardUI() {
        const tbody = document.getElementById('leaderboardTableBody');
        const board = getLeaderboard();
        tbody.innerHTML = '';
        board.forEach((entry, idx) => {
            const tr = document.createElement('tr');
            let rankHtml = `<span class="rank-badge">${idx + 1}</span>`;
            if (idx === 0) rankHtml = `<span class="rank-badge rank-1">👑 1</span>`;
            else if (idx === 1) rankHtml = `<span class="rank-badge rank-2">🥇 2</span>`;
            else if (idx === 2) rankHtml = `<span class="rank-badge rank-3">🥈 3</span>`;

            let title = "Tooth Cadet";
            if (entry.score > 3500) title = "👑 Master Endodontist";
            else if (entry.score > 2500) title = "🛡️ Fluoride Superhero";
            else if (entry.score > 1500) title = "🪥 Hygiene Captain";
            else if (entry.score > 800) title = "✨ Smile Defender";

            tr.innerHTML = `
                <td>${rankHtml}</td>
                <td>
                    <strong>${escapeHtml(entry.name)}</strong>
                    <span class="player-title">${title}</span>
                </td>
                <td><strong style="color: #0077b6;">${entry.grade}</strong></td>
                <td><strong style="color: #2a9d8f;">${entry.score}</strong></td>
                <td style="font-size: 0.85rem; color: #64748b;">${entry.date}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
    }

    // --- Particle System ---
    class Particle {
        constructor(x, y, color, size, speedX, speedY, life) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.life = life;
            this.maxLife = life;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // --- Floating Text Effect ---
    class FloatingText {
        constructor(x, y, text, color) {
            this.x = x;
            this.y = y;
            this.text = text;
            this.color = color;
            this.life = 45;
            this.maxLife = 45;
        }

        update() {
            this.y -= 1.3;
            this.life--;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
            ctx.fillStyle = this.color;
            ctx.font = 'bold 22px Outfit, sans-serif';
            ctx.shadowColor = '#000';
            ctx.shadowBlur = 6;
            ctx.fillText(this.text, this.x, this.y);
            ctx.restore();
        }
    }

    // --- Main Game State ---
    const state = {
        mode: 'START', // START, RUNNING, QUIZ, GAMEOVER
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
    };

    // --- Player Character (Sparkle the Hero Tooth - Enlarged Size 75px x 90px) ---
    const player = {
        x: 120,
        y: GROUND_Y - 90,
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
        animFrame: 0,

        jump() {
            if (this.isGrounded) {
                this.velocityY = this.jumpForce;
                this.isGrounded = false;
                this.doubleJumpAvailable = true;
                sound.playJump();
                createSparkles(this.x + 35, this.y + 80, '#90e0ef', 10);
            } else if (this.doubleJumpAvailable) {
                this.velocityY = this.jumpForce * 0.88;
                this.doubleJumpAvailable = false;
                sound.playJump();
                createSparkles(this.x + 35, this.y + 50, '#48cae4', 15);
            }
        },

        duck(ducking) {
            this.isDucking = ducking;
            if (ducking) {
                this.height = 50;
            } else {
                this.height = 90;
            }
        },

        zap() {
            if (state.zapCharges > 0 && !this.isZapping) {
                state.zapCharges--;
                this.isZapping = true;
                this.zapTimer = 20;
                sound.playZap();
                createZapBeam();
            }
        },

        update() {
            // Apply Gravity
            this.velocityY += this.gravity;
            this.y += this.velocityY;

            const targetY = this.isDucking ? GROUND_Y - 50 : GROUND_Y - 90;
            if (this.y >= targetY) {
                this.y = targetY;
                this.velocityY = 0;
                this.isGrounded = true;
            }

            if (this.zapTimer > 0) {
                this.zapTimer--;
                if (this.zapTimer === 0) this.isZapping = false;
            }

            this.animFrame += 0.2;
        },

        draw(ctx) {
            ctx.save();

            // Shield Aura
            if (state.shieldTimer > 0) {
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 58, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(144, 224, 239, 0.4)';
                ctx.strokeStyle = '#90e0ef';
                ctx.lineWidth = 4;
                ctx.fill();
                ctx.stroke();
            }

            const x = this.x;
            const y = this.y;
            const w = this.width;
            const h = this.height;

            // Superhero Cape
            ctx.fillStyle = '#e63946';
            ctx.beginPath();
            const capeWave = Math.sin(this.animFrame) * 10;
            ctx.moveTo(x + 15, y + 25);
            ctx.lineTo(x - 32, y + 45 + capeWave);
            ctx.lineTo(x + 15, y + h - 15);
            ctx.closePath();
            ctx.fill();

            // Tooth Body (Shiny White with gradient)
            const toothGrad = ctx.createLinearGradient(x, y, x + w, y + h);
            toothGrad.addColorStop(0, '#ffffff');
            toothGrad.addColorStop(1, '#e0f2fe');

            ctx.fillStyle = toothGrad;
            ctx.strokeStyle = '#0077b6';
            ctx.lineWidth = 3.5;

            // Draw Cute Tooth Shape (Crown + 2 Roots)
            ctx.beginPath();
            ctx.moveTo(x + 15, y);
            ctx.bezierCurveTo(x, y, x, y + 32, x + 8, y + 45);
            ctx.bezierCurveTo(x + 8, y + h - 12, x + 20, y + h, x + 30, y + h - 18);
            ctx.bezierCurveTo(x + 38, y + 55, x + 44, y + 55, x + 50, y + h - 18);
            ctx.bezierCurveTo(x + 60, y + h, x + 72, y + h - 12, x + 72, y + 45);
            ctx.bezierCurveTo(x + 78, y + 32, x + 78, y, x + 60, y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Shiny Enamel Highlight
            ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.beginPath();
            ctx.ellipse(x + 24, y + 18, 10, 5, Math.PI / 4, 0, Math.PI * 2);
            ctx.fill();

            // Eyes & Big Smile
            ctx.fillStyle = '#03045e';
            ctx.beginPath();
            ctx.arc(x + 28, y + 28, 5.5, 0, Math.PI * 2);
            ctx.arc(x + 50, y + 28, 5.5, 0, Math.PI * 2);
            ctx.fill();

            // Eye Sparkles
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x + 26, y + 26, 2, 0, Math.PI * 2);
            ctx.arc(x + 48, y + 26, 2, 0, Math.PI * 2);
            ctx.fill();

            // Cheerful Smile
            ctx.strokeStyle = '#d90429';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x + 39, y + 34, 9, 0.1, Math.PI - 0.1);
            ctx.stroke();

            // Superhero Mask
            ctx.fillStyle = '#00b4d8';
            ctx.beginPath();
            ctx.ellipse(x + 39, y + 27, 22, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            // Toothbrush Weapon in Hand
            const brushX = x + w - 5;
            const brushY = y + 32;
            ctx.fillStyle = '#ffb703';
            ctx.fillRect(brushX, brushY, 26, 6); // Handle
            ctx.fillStyle = '#48cae4';
            ctx.fillRect(brushX + 20, brushY - 8, 10, 8); // Bristles

            // Zap Beam Effect
            if (this.isZapping) {
                ctx.fillStyle = '#00f5d4';
                ctx.shadowColor = '#00f5d4';
                ctx.shadowBlur = 18;
                ctx.fillRect(brushX + 30, brushY - 14, 450, 22);

                // Sparkling Beam Particles
                for (let i = 0; i < 8; i++) {
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(brushX + 30 + Math.random() * 440, brushY - 12 + Math.random() * 18, 5, 5);
                }
            }

            ctx.restore();
        }
    };

    function createSparkles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const speedX = (Math.random() - 0.5) * 7;
            const speedY = (Math.random() - 0.5) * 7;
            state.particles.push(new Particle(x, y, color, Math.random() * 5 + 3, speedX, speedY, 28));
        }
    }

    function createZapBeam() {
        for (let i = 0; i < state.obstacles.length; i++) {
            const obs = state.obstacles[i];
            if (obs.x > player.x && obs.x < player.x + 500 && Math.abs((player.y + 30) - obs.y) < 100) {
                // Destroy obstacle with Zap!
                createSparkles(obs.x + obs.width / 2, obs.y + obs.height / 2, '#ffb703', 25);
                sound.playGermDestroy();
                state.score += 150;
                state.germsDefeated++;
                state.floatingTexts.push(new FloatingText(obs.x, obs.y, '+150 ZAPPED!', '#ffb703'));
                triggerDentalToast("Toothbrush Zap destroyed harmful bacteria!");
                state.obstacles.splice(i, 1);
                i--;
            }
        }
    }

    // --- Obstacles Generator (Enlarged Sizes 65px x 65px with Text Badges) ---
    function spawnObstacle() {
        const types = ['sugar_bug', 'decay_blob', 'bacteria_swarm', 'acid_puddle'];
        const type = types[Math.floor(Math.random() * types.length)];

        let obs = {
            type,
            x: CANVAS_WIDTH + 60,
            y: GROUND_Y - 65,
            width: 65,
            height: 65,
            speed: state.speed,
            anim: 0
        };

        if (type === 'bacteria_swarm') {
            obs.y = GROUND_Y - 140; // Mid-air, duck under or jump-zap!
            obs.width = 60;
            obs.height = 60;
        } else if (type === 'acid_puddle') {
            obs.y = GROUND_Y - 20;
            obs.height = 20;
            obs.width = 95;
        }

        state.obstacles.push(obs);
    }

    // --- Collectibles Generator (Enlarged Sizes 55px x 55px) ---
    function spawnCollectible() {
        const items = ['toothbrush', 'toothpaste', 'dentist_badge', 'apple', 'floss'];
        const type = items[Math.floor(Math.random() * items.length)];

        const item = {
            type,
            x: CANVAS_WIDTH + 70,
            y: GROUND_Y - (Math.random() > 0.4 ? 150 : 75),
            width: 55,
            height: 55,
            floatAnim: 0
        };

        state.collectibles.push(item);
    }

    // --- Toast Notification Engine ---
    let toastTimeout = null;
    function triggerDentalToast(msg) {
        const toast = document.getElementById('dentalToast');
        const text = document.getElementById('toastText');
        text.textContent = msg;
        toast.classList.add('show');
        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // --- Level Progression & Quiz Trigger ---
    function checkLevelProgression() {
        const currentLvl = LEVELS[state.currentLevelIdx];
        if (state.meters >= currentLvl.targetMeters && state.currentLevelIdx < LEVELS.length - 1 && !state.levelQuizPending) {
            state.levelQuizPending = true;
            triggerQuiz();
        }
    }

    // --- Draw Parallax Background ---
    function drawBackground(ctx) {
        state.bgOffset = (state.bgOffset + state.speed * 0.4) % CANVAS_WIDTH;
        const currentLvl = LEVELS[state.currentLevelIdx];

        // Canvas Background Gradient
        canvas.style.background = currentLvl.bg;

        // Sky & Sparkle Stars
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        for (let i = 0; i < 18; i++) {
            const sx = (i * 75 - state.bgOffset * 0.2 + CANVAS_WIDTH * 2) % CANVAS_WIDTH;
            const sy = 40 + (i * 24) % 180;
            ctx.beginPath();
            ctx.arc(sx, sy, (i % 3) + 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Tooth Castles & Clean Dental Skyline
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        for (let i = 0; i < 6; i++) {
            const bx = (i * 200 - state.bgOffset * 0.3 + CANVAS_WIDTH * 2) % CANVAS_WIDTH;
            ctx.beginPath();
            ctx.arc(bx + 40, GROUND_Y - 140, 45, Math.PI, 0);
            ctx.rect(bx, GROUND_Y - 140, 85, 140);
            ctx.fill();
        }

        // Shiny Floor Track with Toothpaste Mint Stripe
        ctx.fillStyle = '#0077b6';
        ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

        const stripGrad = ctx.createLinearGradient(0, GROUND_Y, 0, GROUND_Y + 14);
        stripGrad.addColorStop(0, '#52b788');
        stripGrad.addColorStop(1, '#2a9d8f');
        ctx.fillStyle = stripGrad;
        ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, 14);

        // Track Dash Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.setLineDash([35, 25]);
        ctx.lineDashOffset = -state.bgOffset * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, GROUND_Y + 45);
        ctx.lineTo(CANVAS_WIDTH, GROUND_Y + 45);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // --- Draw HUD (Heads Up Display) ---
    function drawHUD(ctx) {
        ctx.save();

        // Top HUD Bar Background
        ctx.fillStyle = 'rgba(3, 4, 94, 0.72)';
        ctx.fillRect(15, 12, CANVAS_WIDTH - 30, 52);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 2;
        ctx.strokeRect(15, 12, CANVAS_WIDTH - 30, 52);

        // Hearts HP
        for (let i = 0; i < state.maxHealth; i++) {
            ctx.font = '24px sans-serif';
            ctx.fillText(i < state.health ? '❤️' : '🖤', 28 + i * 34, 46);
        }

        // Current Level Badge
        ctx.fillStyle = '#ffb703';
        ctx.font = 'bold 17px Outfit, sans-serif';
        const lvlTitle = LEVELS[state.currentLevelIdx].title;
        ctx.fillText(`LVL ${state.currentLevelIdx + 1}`, 145, 45);

        // Score & Meters
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 19px Outfit, sans-serif';
        ctx.fillText(`SCORE: ${state.score}`, 225, 45);

        ctx.fillStyle = '#90e0ef';
        ctx.fillText(`DISTANCE: ${Math.floor(state.meters)}m`, 410, 45);

        // Zap Charges Counter
        ctx.fillStyle = '#ffb703';
        ctx.fillText(`🪥 ZAP: ${state.zapCharges}/${state.maxZapCharges}`, 610, 45);

        // Shield Indicator
        if (state.shieldTimer > 0) {
            ctx.fillStyle = '#48cae4';
            ctx.fillText(`🛡️ SHIELD: ${Math.ceil(state.shieldTimer / 60)}s`, 790, 45);
        }

        ctx.restore();
    }

    // --- Main Game Loop ---
    function gameLoop() {
        if (state.mode === 'RUNNING') {
            updateGame();
        }

        renderGame();
        requestAnimationFrame(gameLoop);
    }

    function updateGame() {
        // Meters and Speed ramp-up
        state.meters += state.speed * 0.05;
        state.score += 1;

        // Level Progression Check
        checkLevelProgression();

        // Shield Timer
        if (state.shieldTimer > 0) {
            state.shieldTimer--;
        }

        // Player update
        player.update();

        // Spawning Logic
        if (Math.random() < 0.016 && state.obstacles.length < 3) {
            spawnObstacle();
        }

        if (Math.random() < 0.013 && state.collectibles.length < 2) {
            spawnCollectible();
        }

        // Update Obstacles
        for (let i = 0; i < state.obstacles.length; i++) {
            const obs = state.obstacles[i];
            obs.x -= state.speed;
            obs.anim += 0.1;

            // Collision check with Player
            if (checkCollision(player, obs)) {
                if (state.shieldTimer > 0) {
                    // Shield protects player!
                    createSparkles(obs.x + 30, obs.y + 30, '#90e0ef', 20);
                    sound.playGermDestroy();
                    state.obstacles.splice(i, 1);
                    i--;
                    triggerDentalToast("Fluoride Shield protected you from cavity decay!");
                } else {
                    // Player takes damage
                    createSparkles(player.x + 35, player.y + 35, '#e63946', 20);
                    sound.playHurt();
                    state.health--;
                    state.obstacles.splice(i, 1);
                    i--;

                    if (state.health <= 0) {
                        endGame();
                    }
                }
            } else if (obs.x < -120) {
                state.obstacles.splice(i, 1);
                i--;
            }
        }

        // Update Collectibles
        for (let i = 0; i < state.collectibles.length; i++) {
            const item = state.collectibles[i];
            item.x -= state.speed;
            item.floatAnim += 0.08;

            if (checkCollision(player, item)) {
                sound.playCollect();
                createSparkles(item.x + 25, item.y + 25, '#ffb703', 20);
                state.itemsCollected++;

                if (item.type === 'toothbrush') {
                    state.score += 150;
                    state.zapCharges = Math.min(state.maxZapCharges, state.zapCharges + 2);
                    state.floatingTexts.push(new FloatingText(item.x, item.y, '+150 & ZAP REFILL!', '#ffb703'));
                    triggerDentalToast(DENTAL_TIPS[0]);
                } else if (item.type === 'toothpaste') {
                    state.score += 200;
                    state.shieldTimer = 300; // 5 seconds shield
                    state.floatingTexts.push(new FloatingText(item.x, item.y, 'FLUORIDE SHIELD!', '#48cae4'));
                    triggerDentalToast(DENTAL_TIPS[1]);
                } else if (item.type === 'dentist_badge') {
                    state.score += 500;
                    state.floatingTexts.push(new FloatingText(item.x, item.y, '+500 DENTIST STAR!', '#ffd166'));
                    triggerDentalToast(DENTAL_TIPS[5]);
                } else if (item.type === 'apple' || item.type === 'floss') {
                    state.score += 100;
                    state.health = Math.min(state.maxHealth, state.health + 1);
                    state.floatingTexts.push(new FloatingText(item.x, item.y, '+1 HEART RESTORE!', '#52b788'));
                    triggerDentalToast(item.type === 'apple' ? DENTAL_TIPS[7] : DENTAL_TIPS[2]);
                }

                state.collectibles.splice(i, 1);
                i--;
            } else if (item.x < -120) {
                state.collectibles.splice(i, 1);
                i--;
            }
        }

        // Update Particles & Floating Text
        state.particles.forEach((p, idx) => {
            p.update();
            if (p.life <= 0) state.particles.splice(idx, 1);
        });

        state.floatingTexts.forEach((ft, idx) => {
            ft.update();
            if (ft.life <= 0) state.floatingTexts.splice(idx, 1);
        });
    }

    function checkCollision(p, obj) {
        return (
            p.x < obj.x + obj.width &&
            p.x + p.width > obj.x &&
            p.y < obj.y + obj.height &&
            p.y + p.height > obj.y
        );
    }

    function renderGame() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw Parallax Background
        drawBackground(ctx);

        // Draw Collectibles (Enlarged Size 55px with glowing aura & text badge)
        state.collectibles.forEach(item => {
            const floatY = item.y + Math.sin(item.floatAnim) * 8;
            ctx.save();
            ctx.fillStyle = '#ffb703';
            ctx.shadowColor = '#ffb703';
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(item.x + 28, floatY + 28, 28, 0, Math.PI * 2);
            ctx.fill();

            // Outer ring
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.font = '28px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            let icon = '🪥';
            let label = 'BRUSH';
            if (item.type === 'toothpaste') { icon = '🧴'; label = 'PASTE'; }
            else if (item.type === 'dentist_badge') { icon = '⭐'; label = 'STAR'; }
            else if (item.type === 'apple') { icon = '🍎'; label = 'APPLE'; }
            else if (item.type === 'floss') { icon = '🧵'; label = 'FLOSS'; }
            ctx.fillText(icon, item.x + 28, floatY + 24);

            // Label Text Badge
            ctx.fillStyle = '#03045e';
            ctx.font = 'bold 11px Outfit, sans-serif';
            ctx.fillText(label, item.x + 28, floatY + 44);

            ctx.restore();
        });

        // Draw Obstacles (Enlarged Size 65px with bold neon outlines & badges)
        state.obstacles.forEach(obs => {
            ctx.save();
            if (obs.type === 'sugar_bug') {
                // Red Candy Monster
                ctx.fillStyle = '#e63946';
                ctx.shadowColor = '#e63946';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(obs.x + 32, obs.y + 32, 30, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 3;
                ctx.stroke();

                ctx.font = '28px sans-serif';
                ctx.fillText('👾', obs.x + 16, obs.y + 40);

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 11px Outfit, sans-serif';
                ctx.fillText('SUGAR BUG', obs.x + 4, obs.y - 6);
            } else if (obs.type === 'decay_blob') {
                // Brown Cavity Blob
                ctx.fillStyle = '#7f5539';
                ctx.shadowColor = '#7f5539';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(obs.x + 32, obs.y + 32, 32, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 3;
                ctx.stroke();

                ctx.font = '28px sans-serif';
                ctx.fillText('🦠', obs.x + 16, obs.y + 40);

                ctx.fillStyle = '#ffb703';
                ctx.font = 'bold 11px Outfit, sans-serif';
                ctx.fillText('CAVITY BLOB', obs.x + 0, obs.y - 6);
            } else if (obs.type === 'bacteria_swarm') {
                // Purple Spiked Microbe
                ctx.fillStyle = '#7209b7';
                ctx.shadowColor = '#7209b7';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(obs.x + 30, obs.y + 30, 28, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 3;
                ctx.stroke();

                ctx.font = '26px sans-serif';
                ctx.fillText('😈', obs.x + 14, obs.y + 38);

                ctx.fillStyle = '#90e0ef';
                ctx.font = 'bold 11px Outfit, sans-serif';
                ctx.fillText('BACTERIA', obs.x + 4, obs.y - 6);
            } else if (obs.type === 'acid_puddle') {
                // Soda Acid Puddle
                ctx.fillStyle = '#fb8500';
                ctx.shadowColor = '#fb8500';
                ctx.shadowBlur = 14;
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

                ctx.fillStyle = '#fff';
                ctx.font = 'bold 11px Outfit, sans-serif';
                ctx.fillText('🧪 ACID PUDDLE', obs.x + 8, obs.y + 15);
            }
            ctx.restore();
        });

        // Draw Player
        player.draw(ctx);

        // Draw Particles & Floating Text
        state.particles.forEach(p => p.draw(ctx));
        state.floatingTexts.forEach(ft => ft.draw(ctx));

        // Draw HUD
        drawHUD(ctx);
    }

    // --- Mid-Run Quiz System ---
    let quizInterval = null;
    let quizTimeRemaining = 10;

    function triggerQuiz() {
        state.mode = 'QUIZ';
        const quizObj = QUIZZES[Math.floor(Math.random() * QUIZZES.length)];
        const quizOverlay = document.getElementById('quizOverlay');
        const qTitle = document.getElementById('quizQuestion');
        const optionsContainer = document.getElementById('quizOptions');
        const feedback = document.getElementById('quizFeedback');
        const timerEl = document.getElementById('quizTimer');

        qTitle.textContent = quizObj.q;
        optionsContainer.innerHTML = '';
        feedback.textContent = '';
        quizTimeRemaining = 10;
        timerEl.textContent = `⏱️ ${quizTimeRemaining}s`;

        quizObj.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.innerHTML = `<span style="width:28px; height:28px; border-radius:50%; background:#e2e8f0; display:inline-flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem;">${String.fromCharCode(65 + idx)}</span> ${opt}`;
            btn.onclick = () => handleQuizAnswer(idx, quizObj.correct, quizObj.tip, btn);
            optionsContainer.appendChild(btn);
        });

        quizOverlay.classList.remove('hidden');

        if (quizInterval) clearInterval(quizInterval);
        quizInterval = setInterval(() => {
            quizTimeRemaining--;
            timerEl.textContent = `⏱️ ${quizTimeRemaining}s`;
            if (quizTimeRemaining <= 0) {
                clearInterval(quizInterval);
                closeQuiz(false, "Time expired! Remember to brush 2x daily!");
            }
        }, 1000);
    }

    function handleQuizAnswer(selectedIdx, correctIdx, tip, btn) {
        clearInterval(quizInterval);
        const allBtns = document.querySelectorAll('.quiz-option-btn');
        allBtns.forEach(b => b.disabled = true);

        if (selectedIdx === correctIdx) {
            btn.classList.add('correct');
            sound.playQuizCorrect();
            document.getElementById('quizFeedback').innerHTML = `<span style="color:#16a34a;">✅ Correct! +300 PTS & Fluoride Shield Awarded!</span>`;
            state.score += 300;
            state.shieldTimer = 300;
            setTimeout(() => closeQuiz(true, tip), 1600);
        } else {
            btn.classList.add('wrong');
            allBtns[correctIdx].classList.add('correct');
            sound.playHurt();
            document.getElementById('quizFeedback').innerHTML = `<span style="color:#dc2626;">❌ Keep learning! ${tip}</span>`;
            setTimeout(() => closeQuiz(false, tip), 2200);
        }
    }

    function closeQuiz(isCorrect, tip) {
        document.getElementById('quizOverlay').classList.add('hidden');
        triggerDentalToast(tip);

        // Advance to next level
        if (state.currentLevelIdx < LEVELS.length - 1) {
            state.currentLevelIdx++;
            const newLvl = LEVELS[state.currentLevelIdx];
            state.speed = newLvl.speed;
            sound.playLevelUp();

            const banner = document.getElementById('levelUpBanner');
            document.getElementById('levelBannerTitle').textContent = `LEVEL ${newLvl.level} UNLOCKED!`;
            document.getElementById('levelBannerSubtitle').textContent = newLvl.title;
            banner.classList.add('show');
            setTimeout(() => banner.classList.remove('show'), 3000);
        }

        state.levelQuizPending = false;
        state.mode = 'RUNNING';
    }

    // --- Game Over & Defined Dental Health Report Card ---
    function endGame() {
        state.mode = 'GAMEOVER';
        sound.playGameOver();

        const screen = document.getElementById('gameOverScreen');
        document.getElementById('reportScore').textContent = `${state.score} PTS`;
        document.getElementById('statMeters').textContent = `${Math.floor(state.meters)}m`;
        document.getElementById('statGerms').textContent = state.germsDefeated;
        document.getElementById('statItems').textContent = state.itemsCollected;

        // Calculate Defined Hygiene Grade & Description
        let grade = 'D';
        let gradeTitle = "Cavity Risk";
        let gradeDesc = "High sugar exposure detected! Schedule a checkup with Dr. Priyanka Sawant soon.";
        let advice = "Brush for 2 minutes twice a day and visit your dentist regularly to improve your smile score!";

        if (state.score >= 3500) {
            grade = 'S';
            gradeTitle = "Master Fluoride Superhero";
            gradeDesc = "Pristine enamel, 0 cavity damage, and master-level dental hygiene!";
            advice = "Outstanding Champion! Your dental care knowledge and cavity defense are world-class!";
        } else if (state.score >= 2500) {
            grade = 'A';
            gradeTitle = "Dental Health Champion";
            gradeDesc = "Excellent brushing habits & strong fluoride enamel defense!";
            advice = "Great Job! Keep flossing daily to clean hidden interdental areas!";
        } else if (state.score >= 1500) {
            grade = 'B';
            gradeTitle = "Smile Defender";
            gradeDesc = "Good care, minor plaque buildup to watch out for.";
            advice = "Good effort! Remember to limit sugary sodas & snacks to prevent acid erosion!";
        } else if (state.score >= 800) {
            grade = 'C';
            gradeTitle = "Tooth Trainee";
            gradeDesc = "Needs more regular 2-minute brushing twice a day.";
            advice = "You're getting better! Focus on brushing twice daily and eating crisp fresh apples!";
        }

        document.getElementById('reportGrade').textContent = grade;
        document.getElementById('reportGradeTitle').textContent = gradeTitle;
        document.getElementById('reportGradeDesc').textContent = gradeDesc;
        document.getElementById('reportAdvice').textContent = advice;

        screen.classList.remove('hidden');
    }

    // --- Game Control Handlers ---
    function resetAndStart() {
        state.mode = 'RUNNING';
        state.currentLevelIdx = 0;
        state.score = 0;
        state.meters = 0;
        state.speed = LEVELS[0].speed;
        state.health = state.maxHealth;
        state.germsDefeated = 0;
        state.itemsCollected = 0;
        state.shieldTimer = 0;
        state.zapCharges = 3;
        state.obstacles = [];
        state.collectibles = [];
        state.particles = [];
        state.floatingTexts = [];
        state.levelQuizPending = false;
        player.y = GROUND_Y - 90;
        player.velocityY = 0;

        document.getElementById('startScreen').classList.add('hidden');
        document.getElementById('gameOverScreen').classList.add('hidden');
        sound.init();
    }

    // --- Keyboard & Touch Event Listeners ---
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
            e.preventDefault();
            if (state.mode === 'RUNNING') player.jump();
            else if (state.mode === 'START') resetAndStart();
        } else if (e.code === 'ArrowDown') {
            e.preventDefault();
            if (state.mode === 'RUNNING') player.duck(true);
        } else if (e.code === 'KeyF') {
            e.preventDefault();
            if (state.mode === 'RUNNING') player.zap();
        }
    });

    window.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowDown') {
            player.duck(false);
        }
    });

    // Touch Buttons
    document.getElementById('touchJumpBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (state.mode === 'RUNNING') player.jump();
    });

    document.getElementById('touchSlideBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (state.mode === 'RUNNING') player.duck(true);
    });

    document.getElementById('touchSlideBtn').addEventListener('touchend', (e) => {
        e.preventDefault();
        player.duck(false);
    });

    document.getElementById('touchZapBtn').addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (state.mode === 'RUNNING') player.zap();
    });

    // Touch Swipe Gesture Detection on Canvas
    let touchStartX = 0;
    let touchStartY = 0;

    canvas.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }, { passive: true });

    canvas.addEventListener('touchend', (e) => {
        if (state.mode !== 'RUNNING') return;
        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - touchStartX;
        const deltaY = touch.clientY - touchStartY;

        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            if (deltaY < -30) {
                // Swipe Up -> Jump
                player.jump();
            } else if (deltaY > 30) {
                // Swipe Down -> Duck / Slide
                player.duck(true);
                setTimeout(() => player.duck(false), 700);
            }
        } else if (Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15) {
            // Tap -> Zap Laser Attack
            player.zap();
        }
    }, { passive: true });

    // Canvas click zap
    canvas.addEventListener('click', () => {
        if (state.mode === 'RUNNING') player.zap();
    });

    // Button Listeners
    document.getElementById('startGameBtn').addEventListener('click', resetAndStart);
    document.getElementById('restartGameBtn').addEventListener('click', resetAndStart);

    document.getElementById('saveScoreBtn').addEventListener('click', () => {
        const input = document.getElementById('playerNameInput');
        const name = input.value.trim();
        const grade = document.getElementById('reportGrade').textContent;
        saveScore(name || 'Smile Hero', state.score, grade);
        document.getElementById('leaderboardModal').classList.remove('hidden');
    });

    // Help Modal Handlers
    const helpModal = document.getElementById('helpModal');
    document.getElementById('openHelpBtn').addEventListener('click', () => helpModal.classList.remove('hidden'));
    document.getElementById('startHelpBtn').addEventListener('click', () => helpModal.classList.remove('hidden'));
    document.getElementById('closeHelpBtn').addEventListener('click', () => helpModal.classList.add('hidden'));
    document.getElementById('closeHelpFooterBtn').addEventListener('click', () => helpModal.classList.add('hidden'));

    // Leaderboard Modal Handlers
    const lbModal = document.getElementById('leaderboardModal');
    document.getElementById('openLeaderboardBtn').addEventListener('click', () => {
        renderLeaderboardUI();
        lbModal.classList.remove('hidden');
    });
    document.getElementById('reportViewLeaderboardBtn').addEventListener('click', () => {
        renderLeaderboardUI();
        lbModal.classList.remove('hidden');
    });
    document.getElementById('closeLeaderboardBtn').addEventListener('click', () => lbModal.classList.add('hidden'));
    document.getElementById('closeLeaderboardFooterBtn').addEventListener('click', () => lbModal.classList.add('hidden'));

    document.getElementById('clearLeaderboardBtn').addEventListener('click', () => {
        if (confirm("Reset leaderboard high scores to defaults?")) {
            localStorage.removeItem('dental_dash_leaderboard');
            renderLeaderboardUI();
        }
    });

    // Audio Toggle Handler
    const soundBtn = document.getElementById('soundToggleBtn');
    soundBtn.addEventListener('click', () => {
        sound.init();
        sound.muted = !sound.muted;
        soundBtn.innerHTML = sound.muted ? '<i class="fa-solid fa-volume-xmark"></i>' : '<i class="fa-solid fa-volume-high"></i>';
    });

    // Initial Leaderboard Load & Game Loop Start
    renderLeaderboardUI();
    requestAnimationFrame(gameLoop);
});
