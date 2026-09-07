/* ==========================================================================
   Sorry Khushi - Ultra-Smooth Interactive Logic & Optimized Web Audio Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const bgCanvas = document.getElementById('bgCanvas');
  const confettiCanvas = document.getElementById('confettiCanvas');
  const bgmToggle = document.getElementById('bgmToggle');
  const bgmText = document.getElementById('bgmText');
  const soundFxToggle = document.getElementById('soundFxToggle');
  const settingsToggle = document.getElementById('settingsToggle');
  const playground = document.getElementById('playground');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const dodgeToast = document.getElementById('dodgeToast');
  const timerCounter = document.getElementById('timerCounter');
  const loveSlider = document.getElementById('loveSlider');
  const meterPercent = document.getElementById('meterPercent');
  const meterBadge = document.getElementById('meterBadge');
  const victoryModal = document.getElementById('victoryModal');
  const closeVictoryBtn = document.getElementById('closeVictoryBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const husbandPhoneInput = document.getElementById('husbandPhoneInput');
  const wifeNameInput = document.getElementById('wifeNameInput');
  const photoFileInput = document.getElementById('photoFileInput');
  const uploadCustomPhotoBtn = document.getElementById('uploadCustomPhotoBtn');

  // State Variables
  let soundEnabled = true;
  let bgmPlaying = false;
  let yesScale = 1.0;
  let husbandPhone = localStorage.getItem('khushi_phone') || '918955718622';
  let wifeName = localStorage.getItem('khushi_name') || 'Khushi';
  let startTime = localStorage.getItem('khushi_start_time') || (Date.now() - (3 * 3600 * 1000 + 42 * 60 * 1000));
  const savedPhoto = localStorage.getItem('khushi_custom_photo');
  if (savedPhoto) {
    const img1 = document.getElementById('img1');
    if (img1) img1.src = savedPhoto;
  }

  // Dodge Toast Dynamic Captions
  const dodgeCaptions = [
    `Oye ${wifeName}! You can't click NO! 🙈`,
    "Wait, think about momos & chocolates first! 🍫",
    "Error 404: Anger Not Found! 😜",
    "No key is broken! Click YES 🥺",
    "I will get you bubble tea & ice cream! 🧋",
    "Okay last chance... please forgive me? 🌹",
    "You are not allowed to stay mad forever! 💕"
  ];
  let captionIndex = 0;

  /* ==========================================================================
     1. Web Audio API Sound Synthesizer (Mobile Unlocked + Haptics)
     ========================================================================== */
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Silent first-touch listener for Mobile Safari & Android Chrome audio unlock
  const unlockAudioOnTouch = () => {
    initAudio();
    window.removeEventListener('touchstart', unlockAudioOnTouch);
    window.removeEventListener('click', unlockAudioOnTouch);
  };
  window.addEventListener('touchstart', unlockAudioOnTouch, { passive: true, once: true });
  window.addEventListener('click', unlockAudioOnTouch, { passive: true, once: true });

  // Play cute pop chime (hover / click)
  function playPop(freq = 587.33, duration = 0.15) {
    if (!soundEnabled) return;
    initAudio();
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Play playful boing sound + Haptic Vibration (on mobile button dodge)
  function playBoing() {
    if (navigator.vibrate) {
      try { navigator.vibrate(40); } catch (e) {}
    }
    if (!soundEnabled) return;
    initAudio();
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(550, audioCtx.currentTime + 0.12);
      osc.frequency.linearRampToValueAtTime(280, audioCtx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {}
  }

  // Play fanfare celebration (on YES click)
  function playFanfare() {
    if (!soundEnabled) return;
    initAudio();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => playPop(freq, 0.35), idx * 110);
    });
  }

  // Play a sweet music-box / kalimba romantic bell note
  function playSweetNote(freq, duration = 0.9, volume = 0.08) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      
      // Main fundamental note
      const osc1 = audioCtx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Sparkle harmonic note (octave above)
      const osc2 = audioCtx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, now);

      const gain1 = audioCtx.createGain();
      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(volume, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const gain2 = audioCtx.createGain();
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.linearRampToValueAtTime(volume * 0.35, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.6);

      osc1.connect(gain1);
      osc2.connect(gain2);

      gain1.connect(audioCtx.destination);
      gain2.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {}
  }

  // Sweet Romantic Song Melody (Kalimba / Music Box Lullaby)
  const romanticMelody = [
    { note: 523.25, bass: 261.63 }, // C5 + C4
    { note: 659.25, bass: null },   // E5
    { note: 783.99, bass: null },   // G5
    { note: 987.77, bass: null },   // B5
    { note: 880.00, bass: 220.00 }, // A5 + A3
    { note: 783.99, bass: null },   // G5
    { note: 659.25, bass: null },   // E5
    { note: 523.25, bass: null },   // C5
    { note: 698.46, bass: 174.61 }, // F5 + F3
    { note: 880.00, bass: null },   // A5
    { note: 1046.50, bass: null },  // C6
    { note: 987.77, bass: null },   // B5
    { note: 783.99, bass: 196.00 }, // G5 + G3
    { note: 659.25, bass: null },   // E5
    { note: 587.33, bass: null },   // D5
    { note: 523.25, bass: null }    // C5
  ];

  // Ambient Romantic BGM Synthesizer (Sweet Music Box Loop)
  let bgmInterval = null;
  function toggleBgm() {
    initAudio();
    bgmPlaying = !bgmPlaying;
    if (bgmPlaying) {
      bgmToggle.classList.add('active');
      bgmText.textContent = "Pause BGM 🎵";
      let step = 0;

      bgmInterval = setInterval(() => {
        if (!bgmPlaying) return;
        const item = romanticMelody[step];
        playSweetNote(item.note, 0.85, 0.08);
        if (item.bass) {
          playSweetNote(item.bass, 1.2, 0.05);
        }
        step = (step + 1) % romanticMelody.length;
      }, 360);
    } else {
      bgmToggle.classList.remove('active');
      bgmText.textContent = "Play Sweet Song 🎵";
      clearInterval(bgmInterval);
    }
  }

  bgmToggle.addEventListener('click', toggleBgm);
  soundFxToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundFxToggle.classList.toggle('active', soundEnabled);
  });

  /* ==========================================================================
     2. Hardware-Accelerated Floating Hearts Canvas (Pre-rendered Offscreen Bitmaps)
     ========================================================================== */
  const ctx = bgCanvas.getContext('2d');
  let width, height;
  let particles = [];

  // Pre-render heart shapes into offscreen canvas templates for ultra-fast rendering
  const heartCanvasCache = {};
  const heartColors = ['#ff4d8d', '#ff758c', '#ffb3c1', '#ffd700'];

  function createHeartOffscreen(color, size) {
    const key = `${color}_${Math.round(size)}`;
    if (heartCanvasCache[key]) return heartCanvasCache[key];

    const canvas = document.createElement('canvas');
    const padding = 10;
    canvas.width = size + padding * 2;
    canvas.height = size + padding * 2;
    const c = canvas.getContext('2d');

    c.translate(canvas.width / 2, canvas.height / 2);
    c.fillStyle = color;
    c.beginPath();
    const topCurveHeight = size * 0.3;
    c.moveTo(0, topCurveHeight);
    c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
    c.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    c.closePath();
    c.fill();

    heartCanvasCache[key] = canvas;
    return canvas;
  }

  function resizeCanvas() {
    width = bgCanvas.width = window.innerWidth;
    height = bgCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas, { passive: true });
  resizeCanvas();

  class HeartParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 40;
      this.size = Math.floor(Math.random() * 12 + 12);
      this.speedY = Math.random() * 1.2 + 0.6;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.6;
      this.opacity = Math.random() * 0.6 + 0.25;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
      this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
      this.cachedCanvas = createHeartOffscreen(this.color, this.size);
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotSpeed;
      if (this.y < -40) this.reset();
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(this.cachedCanvas, -this.cachedCanvas.width / 2, -this.cachedCanvas.height / 2);
      ctx.restore();
    }
  }

  // 22 particles for silky smooth 60fps performance without CPU overload
  for (let i = 0; i < 22; i++) {
    particles.push(new HeartParticle());
  }

  function animateBg() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    requestAnimationFrame(animateBg);
  }
  animateBg();

  /* ==========================================================================
     3. Smooth Dodging NO Button Physics (Throttled, Zero Reflow Lag)
     ========================================================================== */
  let playgroundRect = null;
  let noBtnRect = null;

  function updateCachedRects() {
    playgroundRect = playground.getBoundingClientRect();
    noBtnRect = noBtn.getBoundingClientRect();
  }
  window.addEventListener('resize', updateCachedRects, { passive: true });
  setTimeout(updateCachedRects, 300);

  function moveNoButton() {
    playBoing();
    if (!playgroundRect) updateCachedRects();

    const maxX = Math.max(30, playgroundRect.width - (noBtnRect ? noBtnRect.width : 120) - 20);
    const maxY = Math.max(30, playgroundRect.height - (noBtnRect ? noBtnRect.height : 50) - 20);

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;

    // Grow YES button smoothly
    yesScale = Math.min(1.8, yesScale + 0.1);
    yesBtn.style.transform = `scale(${yesScale})`;

    // Show Dodge Toast Caption
    dodgeToast.textContent = dodgeCaptions[captionIndex];
    dodgeToast.classList.remove('hidden');
    captionIndex = (captionIndex + 1) % dodgeCaptions.length;

    // Recalculate cached rect after moving
    requestAnimationFrame(updateCachedRects);
  }

  // Throttled Proximity Detection using requestAnimationFrame (Zero Layout Thrashing)
  let isCheckingProximity = false;
  playground.addEventListener('mousemove', (e) => {
    if (isCheckingProximity) return;
    isCheckingProximity = true;

    requestAnimationFrame(() => {
      if (noBtnRect) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const btnCenterX = noBtnRect.left + noBtnRect.width / 2;
        const btnCenterY = noBtnRect.top + noBtnRect.height / 2;

        const distance = Math.hypot(mouseX - btnCenterX, mouseY - btnCenterY);
        if (distance < 65) {
          moveNoButton();
        }
      }
      isCheckingProximity = false;
    });
  }, { passive: true });

  // Instant hover / touch trigger
  noBtn.addEventListener('mouseenter', moveNoButton);
  noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  }, { passive: false });
  noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  /* ==========================================================================
     4. YES Button Victory Action & Confetti Engine
     ========================================================================== */
  const confettiCtx = confettiCanvas.getContext('2d');
  let confettiParticles = [];
  let confettiAnimationId = null;

  function triggerConfetti() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    confettiParticles = [];
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);

    const colors = ['#ff4d8d', '#ff758c', '#ffd700', '#25d366', '#00f0ff', '#ffffff'];
    for (let i = 0; i < 90; i++) {
      confettiParticles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 14,
        vy: (Math.random() - 0.8) * 14,
        size: Math.random() * 7 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 8,
        opacity: 1
      });
    }

    function renderConfetti() {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      let aliveCount = 0;

      for (let i = 0; i < confettiParticles.length; i++) {
        const p = confettiParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28; // Gravity
        p.opacity -= 0.01;
        p.rotation += p.rotSpeed;

        if (p.opacity > 0) {
          aliveCount++;
          confettiCtx.save();
          confettiCtx.translate(p.x, p.y);
          confettiCtx.rotate((p.rotation * Math.PI) / 180);
          confettiCtx.globalAlpha = p.opacity;
          confettiCtx.fillStyle = p.color;
          confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          confettiCtx.restore();
        }
      }

      if (aliveCount > 0) {
        confettiAnimationId = requestAnimationFrame(renderConfetti);
      } else {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }
    renderConfetti();
  }

  yesBtn.addEventListener('click', () => {
    playFanfare();
    triggerConfetti();
    victoryModal.classList.remove('hidden');
  });

  closeVictoryBtn.addEventListener('click', () => {
    playFanfare();
    triggerConfetti();
    const phone = husbandPhone.replace(/[^0-9]/g, '') || '918955718622';
    const message = `Hey Karan! I officially forgive you! Sending you the warmest, biggest hug right now! I love you so much! 🤗💖`;
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    victoryModal.classList.add('hidden');
  });

  /* ==========================================================================
     5. Sad Timer Realtime Counter
     ========================================================================== */
  function updateSadTimer() {
    const now = Date.now();
    const diff = Math.max(0, now - startTime);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    timerCounter.textContent = `${pad(hours)}h : ${pad(minutes)}m : ${pad(seconds)}s`;
  }
  setInterval(updateSadTimer, 1000);
  updateSadTimer();

  /* ==========================================================================
     6. Love Meter Slider Handler
     ========================================================================== */
  const meterBadges = [
    { max: 250, text: "Angry Khushi 😠 (Emergency Momos Needed!)" },
    { max: 500, text: "Slightly Unhappy 🥺 (Needs Soft Hugs)" },
    { max: 750, text: "Considering Momos & Forgiveness 🥟" },
    { max: 999, text: "99% Forgiven! Almost there... 💕" },
    { max: 1000, text: "1000% Madly In Love Again! 🔥❤️" }
  ];

  loveSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    meterPercent.textContent = `${val}%`;

    const found = meterBadges.find(b => val <= b.max) || meterBadges[meterBadges.length - 1];
    meterBadge.textContent = found.text;

    playPop(400 + val * 0.4, 0.05);
  });

  /* ==========================================================================
     7. 3D Flip Card Handler
     ========================================================================== */
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      playPop(650, 0.15);
    });
  });



  /* ==========================================================================
     9. Polaroid Photo Upload (Saved to LocalStorage)
     ========================================================================== */
  uploadCustomPhotoBtn.addEventListener('click', () => {
    photoFileInput.click();
  });

  photoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const base64Data = evt.target.result;
        document.getElementById('img1').src = base64Data;
        localStorage.setItem('khushi_custom_photo', base64Data);
        playPop(750, 0.2);
      };
      reader.readAsDataURL(file);
    }
  });

  /* ==========================================================================
     10. Personalize Settings Modal
     ========================================================================== */
  settingsToggle.addEventListener('click', () => {
    husbandPhoneInput.value = husbandPhone;
    wifeNameInput.value = wifeName;
    settingsModal.classList.remove('hidden');
  });

  closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });

  saveSettingsBtn.addEventListener('click', () => {
    husbandPhone = husbandPhoneInput.value.trim();
    wifeName = wifeNameInput.value.trim() || 'Khushi';

    localStorage.setItem('khushi_phone', husbandPhone);
    localStorage.setItem('khushi_name', wifeName);

    settingsModal.classList.add('hidden');
    playPop(900, 0.2);
    alert('Settings Saved! Your phone number is ready for WhatsApp coupons! ❤️');
  });

  /* ==========================================================================
     11. Spin Wheel of Forgiveness Engine
     ========================================================================== */
  const wheelCanvas = document.getElementById('wheelCanvas');
  const spinBtn = document.getElementById('spinBtn');
  const wheelModal = document.getElementById('wheelModal');
  const wheelPrizeTitle = document.getElementById('wheelPrizeTitle');
  const claimWheelPrizeBtn = document.getElementById('claimWheelPrizeBtn');
  const closeWheelBtn = document.getElementById('closeWheelBtn');

  const wheelPrizes = [
    "Midnight Ice Cream Date 🍦",
    "Head & Shoulder Massage 💆‍♂️",
    "Cooks Favorite Dinner 👨‍🍳",
    "Unlimited Shopping Spree 🛍️",
    "Surprise Gift Tomorrow 🎁",
    "Extra Huge Bear Hug 🫂"
  ];
  const wheelColors = ['#ff4d8d', '#2b102c', '#ff758c', '#1e112a', '#ffb703', '#ffb3c1'];

  let currentAngle = 0;
  let isSpinning = false;

  function drawWheel() {
    if (!wheelCanvas) return;
    const wCtx = wheelCanvas.getContext('2d');
    const numSlices = wheelPrizes.length;
    const sliceAngle = (2 * Math.PI) / numSlices;
    const center = 150;
    const radius = 145;

    wCtx.clearRect(0, 0, 300, 300);

    for (let i = 0; i < numSlices; i++) {
      const angle = currentAngle + i * sliceAngle;
      wCtx.beginPath();
      wCtx.moveTo(center, center);
      wCtx.arc(center, center, radius, angle, angle + sliceAngle);
      wCtx.closePath();
      wCtx.fillStyle = wheelColors[i % wheelColors.length];
      wCtx.fill();
      wCtx.lineWidth = 2;
      wCtx.strokeStyle = 'rgba(255,255,255,0.3)';
      wCtx.stroke();

      // Text label
      wCtx.save();
      wCtx.translate(center, center);
      wCtx.rotate(angle + sliceAngle / 2);
      wCtx.textAlign = "right";
      wCtx.fillStyle = "#ffffff";
      wCtx.font = "bold 12px Plus Jakarta Sans, sans-serif";
      wCtx.fillText(wheelPrizes[i], radius - 12, 4);
      wCtx.restore();
    }
  }
  drawWheel();

  if (spinBtn) {
    spinBtn.addEventListener('click', () => {
      if (isSpinning) return;
      isSpinning = true;
      playPop(500, 0.2);

      const extraRounds = Math.floor(Math.random() * 4) + 5;
      const targetPrizeIndex = Math.floor(Math.random() * wheelPrizes.length);
      const sliceAngle = (2 * Math.PI) / wheelPrizes.length;
      
      const targetAngle = extraRounds * (2 * Math.PI) + (Math.PI * 1.5 - (targetPrizeIndex * sliceAngle + sliceAngle / 2));
      const startAngle = currentAngle;
      const startAnimTime = performance.now();
      const spinDuration = 3500;

      function animateSpin(now) {
        const elapsed = now - startAnimTime;
        const progress = Math.min(1, elapsed / spinDuration);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        currentAngle = startAngle + (targetAngle - startAngle) * easeProgress;
        drawWheel();

        if (Math.floor(elapsed / 160) % 2 === 0) playPop(350, 0.03);

        if (progress < 1) {
          requestAnimationFrame(animateSpin);
        } else {
          isSpinning = false;
          triggerConfetti();
          playFanfare();
          const prize = wheelPrizes[targetPrizeIndex];
          if (wheelPrizeTitle) wheelPrizeTitle.textContent = prize;
          if (wheelModal) wheelModal.classList.remove('hidden');

          if (claimWheelPrizeBtn) {
            claimWheelPrizeBtn.onclick = () => {
              const phone = husbandPhone.replace(/[^0-9]/g, '');
              const message = `Hey Karan! I spun the Wheel of Forgiveness and I won: "${prize}"! You have to fulfill this today! ❤️`;
              let waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
              if (phone) waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
              window.open(waUrl, '_blank');
            };
          }
        }
      }
      requestAnimationFrame(animateSpin);
    });
  }

  if (closeWheelBtn) {
    closeWheelBtn.addEventListener('click', () => {
      if (wheelModal) wheelModal.classList.add('hidden');
    });
  }

  /* ==========================================================================
     12. Love Compliment Jar & Sealed Letter Handlers
     ========================================================================== */
  const jarReasonDisplay = document.getElementById('jarReasonDisplay');
  document.querySelectorAll('.jar-heart-bubble').forEach(heart => {
    heart.addEventListener('click', () => {
      const reason = heart.dataset.reason || "You are amazing!";
      if (jarReasonDisplay) {
        jarReasonDisplay.textContent = reason;
      }
      playPop(700, 0.15);
    });
  });

  const envelope = document.getElementById('envelope');
  const letterPaper = document.getElementById('letterPaper');
  if (envelope && letterPaper) {
    envelope.addEventListener('click', () => {
      playPop(850, 0.25);
      envelope.style.display = 'none';
      letterPaper.classList.remove('hidden');
      triggerConfetti();
    });
  }
});
