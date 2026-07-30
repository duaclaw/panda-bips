/* ==========================================================
   Hey Pandu — interactions & ambient life
   ========================================================== */
(function(){
  "use strict";

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Loading screen ---------------- */
  const loadingScreen = document.getElementById('loadingScreen');
  const mainContent = document.getElementById('mainContent');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hide');
      mainContent.hidden = false;
      startAmbientLife();
    }, 2200);
  });

  /* ---------------- Floating bamboo leaves (ambient) ---------------- */
  const leavesField = document.getElementById('leavesField');
  function spawnLeaf(){
    if(reduceMotion) return;
    const ns = 'http://www.w3.org/2000/svg';
    const wrap = document.createElement('div');
    wrap.className = 'leaf';
    const startX = Math.random()*100;
    const drift = (Math.random()*160 - 80) + 'px';
    const spin = (Math.random()*400 + 200) + 'deg';
    const duration = (Math.random()*8 + 10);
    const size = Math.random()*10 + 14;
    wrap.style.left = startX + 'vw';
    wrap.style.setProperty('--drift', drift);
    wrap.style.setProperty('--spin', spin);
    wrap.style.animationDuration = duration + 's';
    wrap.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 26 20"><use href="#leafShape"/></svg>`;
    leavesField.appendChild(wrap);
    setTimeout(() => wrap.remove(), duration*1000 + 200);
  }

  /* ---------------- Butterflies (ambient) ---------------- */
  const butterflyField = document.getElementById('butterflyField');
  function spawnButterfly(){
    if(reduceMotion) return;
    const wrap = document.createElement('div');
    wrap.className = 'butterfly';
    const top = Math.random()*70 + 10;
    const left = Math.random()*80 + 5;
    const duration = Math.random()*3 + 5;
    wrap.style.top = top + 'vh';
    wrap.style.left = left + 'vw';
    wrap.style.animationDuration = duration + 's';
    wrap.innerHTML = `<svg width="18" height="16" viewBox="-14 -12 28 24"><use href="#butterflyShape"/></svg>`;
    butterflyField.appendChild(wrap);
    setTimeout(() => wrap.remove(), duration*1000*3);
  }

  let ambientInterval, butterflyInterval;
  function startAmbientLife(){
    spawnLeaf(); spawnButterfly();
    ambientInterval = setInterval(spawnLeaf, 1800);
    butterflyInterval = setInterval(spawnButterfly, 6000);
  }

  /* ---------------- Cursor parallax on bamboo/clouds ---------------- */
  const bambooBack = document.querySelector('.bamboo-back');
  const bambooFront = document.querySelector('.bamboo-front');
  const clouds = document.querySelector('.clouds');
  window.addEventListener('mousemove', (e) => {
    if(reduceMotion) return;
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    bambooBack.style.transform = `translate(${x*10}px, ${y*6}px)`;
    bambooFront.style.transform = `translate(${x*20}px, ${y*10}px)`;
    clouds.style.transform = `translate(${x*14}px, ${y*4}px)`;
  }, { passive: true });

  /* ---------------- Hero panda micro-interactions ---------------- */
  const heroPanda = document.getElementById('heroPanda');
  const eyeL = heroPanda.querySelector('.eye-l');
  const eyeR = heroPanda.querySelector('.eye-r');
  const earL = heroPanda.querySelector('.ear-l');
  const earR = heroPanda.querySelector('.ear-r');
  const heartsBurst = document.getElementById('heartsBurst');

  function blink(){
    if(reduceMotion) return;
    eyeL.classList.add('blink'); eyeR.classList.add('blink');
    setTimeout(() => { eyeL.classList.remove('blink'); eyeR.classList.remove('blink'); }, 280);
  }
  function wiggleEars(){
    if(reduceMotion) return;
    earL.classList.add('wiggle'); earR.classList.add('wiggle');
    setTimeout(() => { earL.classList.remove('wiggle'); earR.classList.remove('wiggle'); }, 700);
  }
  function chewBamboo(){
    if(reduceMotion) return;
    heroPanda.classList.add('chew');
    setTimeout(() => heroPanda.classList.remove('chew'), 1100);
  }

  setInterval(blink, 3600);
  setInterval(wiggleEars, 7200);
  setInterval(chewBamboo, 9000);

  function launchHearts(){
    const count = 6;
    for(let i=0;i<count;i++){
      const h = document.createElement('span');
      h.className = 'heart';
      h.textContent = '💗';
      h.style.setProperty('--hx', (Math.random()*80 - 40) + 'px');
      h.style.left = (46 + Math.random()*8) + '%';
      h.style.animationDelay = (i*0.08) + 's';
      heartsBurst.appendChild(h);
      setTimeout(() => h.remove(), 1600);
    }
  }

  heroPanda.addEventListener('click', () => {
    heroPanda.classList.add('smiling');
    launchHearts();
    setTimeout(() => heroPanda.classList.remove('smiling'), 2200);
  });

  /* ---------------- Continue button -> smooth scroll to story ---------------- */
  const continueBtn = document.getElementById('continueBtn');
  const storySection = document.getElementById('story');
  continueBtn.addEventListener('click', () => {
    storySection.scrollIntoView({ behavior: 'smooth' });
  });

  const scrollNextBtn = document.getElementById('scrollNext');
  const finaleSection = document.getElementById('finale');
  scrollNextBtn.addEventListener('click', () => {
    finaleSection.scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------- Story card reveal on scroll ---------------- */
  const cards = document.querySelectorAll('.bamboo-card');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.35 });
  cards.forEach(c => cardObserver.observe(c));

  /* ---------------- Finale: animation + celebration ---------------- */
  const wavingPanda = document.getElementById('wavingPanda');
  let celebrated = false;
  let pandaAnimated = false;
  let animationTimeouts = [];

  function spawnTinyPawPrint(){
    if(!wavingPanda) return;
    const rect = wavingPanda.getBoundingClientRect();
    const paw = document.createElement('div');
    paw.className = 'tiny-paw';
    paw.textContent = '🐾';
    const x = rect.left + rect.width / 2 + (Math.random()*16 - 8);
    const y = rect.bottom - 15 + (Math.random()*8 - 4);
    paw.style.left = x + 'px';
    paw.style.top = y + 'px';
    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 1600);
  }

  function playFinalePandaAnimation(){
    if(pandaAnimated) return;
    pandaAnimated = true;
    if(!wavingPanda) return;

    // 1. Smiles
    const t1 = setTimeout(() => {
      wavingPanda.classList.add('smiling');
    }, 300);
    animationTimeouts.push(t1);

    // 2. Waves once
    const t2 = setTimeout(() => {
      const wavingArm = wavingPanda.querySelector('.waving-arm');
      if(wavingArm) wavingArm.classList.add('wave-once');
    }, 800);
    animationTimeouts.push(t2);

    // 3. Turns around
    const t3 = setTimeout(() => {
      const wavingArm = wavingPanda.querySelector('.waving-arm');
      if(wavingArm) wavingArm.classList.remove('wave-once');
      wavingPanda.classList.add('turned');
    }, 2300);
    animationTimeouts.push(t3);

    // 4. Walks behind the bamboo & leaves tiny fading paw prints
    const t4 = setTimeout(() => {
      wavingPanda.classList.add('walking');
      if(!reduceMotion){
        const pawInterval = setInterval(() => {
          if(!wavingPanda.classList.contains('walking')){
            clearInterval(pawInterval);
            return;
          }
          spawnTinyPawPrint();
        }, 360);
        setTimeout(() => clearInterval(pawInterval), 2000);
      }
    }, 3100);
    animationTimeouts.push(t4);

    // 5. Disappears
    const t5 = setTimeout(() => {
      wavingPanda.classList.add('disappeared');
    }, 5300);
    animationTimeouts.push(t5);
  }

  function celebrate(){
    if(celebrated) return;
    celebrated = true;
    playFinalePandaAnimation();
    if(reduceMotion) return;
    const items = ['🌿','💗','🍃','💚'];
    for(let i=0;i<26;i++){
      setTimeout(() => {
        const el = document.createElement('span');
        el.className = 'celebrate-item';
        el.textContent = items[Math.floor(Math.random()*items.length)];
        el.style.left = Math.random()*100 + 'vw';
        el.style.fontSize = (Math.random()*10+14) + 'px';
        el.style.setProperty('--cx', (Math.random()*120-60)+'px');
        el.style.setProperty('--cr', (Math.random()*360)+'deg');
        el.style.animationDuration = (Math.random()*2+3)+'s';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5200);
      }, i*90);
    }
  }
  const finaleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) celebrate(); });
  }, { threshold: 0.5 });
  finaleObserver.observe(finaleSection);

  /* ---------------- Replay ---------------- */
  document.getElementById('replayBtn').addEventListener('click', () => {
    document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    celebrated = false;
    pandaAnimated = false;
    animationTimeouts.forEach(clearTimeout);
    animationTimeouts = [];
    if(wavingPanda){
      wavingPanda.classList.remove('smiling', 'turned', 'walking', 'disappeared');
      const wavingArm = wavingPanda.querySelector('.waving-arm');
      if(wavingArm) wavingArm.classList.remove('wave-once');
    }
  });

  /* ---------------- Scroll progress (bamboo-segment bar) ---------------- */
  const progressFill = document.getElementById('progressFill');
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive:true });

  /* ---------------- Floating paw prints while scrolling ---------------- */
  let lastPawTime = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if(now - lastPawTime < 350) return;
    lastPawTime = now;
    const paw = document.createElement('div');
    paw.className = 'paw';
    paw.textContent = '🐾';
    paw.style.left = (Math.random()*90 + 5) + 'vw';
    paw.style.top = (Math.random()*70 + 15) + 'vh';
    document.body.appendChild(paw);
    setTimeout(() => paw.remove(), 1500);
  }, { passive:true });

  /* ---------------- Sound toggle (no autoplay) ---------------- */
  const soundToggle = document.getElementById('soundToggle');
  const forestAudio = document.getElementById('forestAudio');
  let soundOn = false;
  soundToggle.addEventListener('click', () => {
    soundOn = !soundOn;
    soundToggle.setAttribute('aria-pressed', String(soundOn));
    if(soundOn){
      forestAudio.volume = 0.35;
      forestAudio.play().catch(() => { /* autoplay-policy safe fallback */ });
    } else {
      forestAudio.pause();
    }
  });

})();
