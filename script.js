(function () {
  'use strict';

  // Wedding start and end, Cairo time.
  var WEDDING = new Date('2026-12-18T15:00:00+02:00');
  var WEDDING_END = new Date('2026-12-18T18:00:00+02:00');

  var root = document.documentElement;
  var main = document.getElementById('invitation');
  var envelope = document.getElementById('envelope');
  var seal = document.getElementById('seal');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Languages. English is also in index.html, for visitors without JavaScript. */

  var TEXT = {
    en: {
      title: 'Tarek & Alaa | 18 December 2026',
      names: 'Tarek & Alaa',
      name1: 'Tarek', amp: '&', name2: 'Alaa',
      hint: 'Tap the seal to open',
      openLabel: 'Open the invitation',
      invite: "You're invited to the wedding of",
      portraitAlt: 'Watercolor portrait of Tarek and Alaa looking at each other, with Alaa holding a bouquet of white lilies, framed by pink flowers.',
      dateHeading: 'Date', venueHeading: 'Venue',
      weekday: 'Friday', day: '18', month: 'December', year: '2026',
      time: '3:00 PM to 6:00 PM',
      days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
      caption: 'until our wedding',
      today: 'Today is the day.',
      thanks: 'Thank you for celebrating with us.',
      googleCal: 'Add to Google Calendar',
      otherCal: 'Use Apple or Outlook Calendar',
      venue: 'Gar El Qamar Hall',
      address: 'Khatt 10, Obour',
      directions: 'Get directions',
      closing: "We can't wait to celebrate with you.",
      share: 'Share invitation',
      copied: 'Invitation link copied',
      copyThis: 'Copy this link: ',
      shareText: "You're invited to the wedding of Tarek and Alaa on 18 December 2026, from 3:00 to 6:00 PM.",
      calTitle: "Tarek & Alaa's wedding",
      calPlace: 'Gar El Qamar Hall, Khatt 10, Obour',
      icsFile: 'assets/wedding.ics',
      wishesTitle: 'Leave us a wish',
      wishesLead: 'Your message will appear here for everyone to read.',
      nameLabel: 'Your name',
      messageLabel: 'Your message',
      send: 'Send wishes',
      sending: 'Sending…',
      sent: 'Thank you! Your wishes have been added.',
      sendFailed: "Your message didn't send. Check your connection and try again.",
      needBoth: 'Please write your name and a message.',
      loading: 'Loading wishes…',
      loadFailed: "Wishes couldn't load right now. Refresh the page to try again.",
      empty: 'Be the first to leave a wish.',
      more: 'Show more wishes',
      notReady: 'Messages open soon.',
      mute: 'Turn music off', unmute: 'Turn music on',
      switchTo: 'العربية', switchLang: 'ar', switchLabel: 'التبديل إلى العربية'
    },
    ar: {
      title: 'طارق و آلاء | ١٨ ديسمبر ٢٠٢٦',
      names: 'طارق و آلاء',
      name1: 'طارق', amp: 'و', name2: 'آلاء',
      hint: 'اضغط على الختم لفتح الدعوة',
      openLabel: 'افتح الدعوة',
      invite: 'يسعدنا دعوتكم لحضور حفل زفاف',
      portraitAlt: 'لوحة مائية لطارق وآلاء ينظران إلى بعضهما، وآلاء تحمل باقة من الزنابق البيضاء، تحيط بهما زهور وردية.',
      dateHeading: 'الموعد', venueHeading: 'المكان',
      weekday: 'الجمعة', day: '١٨', month: 'ديسمبر', year: '٢٠٢٦',
      time: 'من ٣:٠٠ إلى ٦:٠٠ مساءً',
      days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية',
      caption: 'حتى موعد زفافنا',
      today: 'اليوم هو يومنا المنتظر.',
      thanks: 'شكرًا لمشاركتكم فرحتنا.',
      googleCal: 'أضف إلى تقويم Google',
      otherCal: 'استخدم تقويم Apple أو Outlook',
      venue: 'قاعة جار القمر',
      address: 'خط ١٠، العبور',
      directions: 'احصل على الاتجاهات',
      closing: 'في انتظاركم لنحتفل معًا.',
      share: 'مشاركة الدعوة',
      copied: 'تم نسخ رابط الدعوة',
      copyThis: 'انسخ هذا الرابط: ',
      shareText: 'يسعدنا دعوتكم لحضور حفل زفاف طارق وآلاء يوم ١٨ ديسمبر ٢٠٢٦، من ٣:٠٠ إلى ٦:٠٠ مساءً.',
      calTitle: 'حفل زفاف طارق وآلاء',
      calPlace: 'قاعة جار القمر، خط 10، العبور',
      icsFile: 'assets/wedding-ar.ics',
      wishesTitle: 'اترك لنا تهنئة',
      wishesLead: 'ستظهر رسالتك هنا ليقرأها الجميع.',
      nameLabel: 'اسمك',
      messageLabel: 'رسالتك',
      send: 'أرسل التهنئة',
      sending: 'جارٍ الإرسال…',
      sent: 'شكرًا لك! تمت إضافة تهنئتك.',
      sendFailed: 'لم تُرسل رسالتك. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.',
      needBoth: 'من فضلك اكتب اسمك ورسالتك.',
      loading: 'جارٍ تحميل التهاني…',
      loadFailed: 'تعذّر تحميل التهاني الآن. حدّث الصفحة وحاول مرة أخرى.',
      empty: 'كن أول من يترك تهنئة.',
      more: 'عرض المزيد من التهاني',
      notReady: 'ستتاح التهاني قريبًا.',
      mute: 'إيقاف الموسيقى', unmute: 'تشغيل الموسيقى',
      switchTo: 'English', switchLang: 'en', switchLabel: 'Switch to English'
    }
  };

  var lang = root.lang === 'ar' ? 'ar' : 'en';
  var langButton = document.getElementById('lang');
  var shareStatus = document.getElementById('share-status');

  function applyLanguage(next) {
    lang = next;
    var t = TEXT[lang];
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title = t.title;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t[el.getAttribute('data-i18n')];
    });

    seal.setAttribute('aria-label', t.openLabel);
    document.getElementById('portrait').alt = t.portraitAlt;

    langButton.textContent = t.switchTo;
    langButton.lang = t.switchLang;
    langButton.setAttribute('aria-label', t.switchLabel);

    document.getElementById('google-cal').href =
      'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + encodeURIComponent(t.calTitle) +
      '&dates=20261218T130000Z/20261218T160000Z' +
      '&location=' + encodeURIComponent(t.calPlace);
    document.getElementById('other-cal').href = t.icsFile;

    shareStatus.textContent = '';
    updateSoundLabel();
    if (typeof renderWishes === 'function') renderWishes();
    updateCountdown();
  }

  langButton.addEventListener('click', function () {
    var next = TEXT[lang].switchLang;
    try { localStorage.setItem('lang', next); } catch (e) { /* Private browsing: the choice lasts until reload. */ }
    applyLanguage(next);
  });

  /* Music: assets/music.mp3 starts on the tap that opens the envelope. Without that file, nothing shows. */

  var music = document.getElementById('music');
  var sound = document.getElementById('sound');
  var muted = false;

  function updateSoundLabel() {
    sound.setAttribute('aria-pressed', String(muted));
    sound.setAttribute('aria-label', muted ? TEXT[lang].unmute : TEXT[lang].mute);
  }

  function startMusic() {
    music.volume = 0;
    var playing = music.play();
    if (playing) playing.catch(function () { /* No music file yet, or the browser refused. */ });
    var fade = setInterval(function () {
      music.volume = Math.min(0.7, music.volume + 0.05);
      if (music.volume >= 0.7) clearInterval(fade);
    }, 200);
  }

  music.addEventListener('playing', function () { sound.hidden = false; });

  sound.addEventListener('click', function () {
    muted = !muted;
    if (muted) music.pause(); else music.play();
    updateSoundLabel();
  });

  // Stop when the guest leaves the page, and carry on when they return.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      music.pause();
    } else if (!muted && root.classList.contains('opening')) {
      var resumed = music.play();
      if (resumed) resumed.catch(function () {});
    }
  });

  /* Envelope */

  // Always start at the top, even after a reload.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  main.inert = true;

  function openEnvelope() {
    var box = seal.getBoundingClientRect();
    startMusic();
    root.classList.add('opening');
    root.classList.remove('sealed');
    main.inert = false;

    var finish = function () {
      envelope.remove();
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    };

    // Sections wait until the envelope is open, so their animations are seen rather than played behind it.
    if (reducedMotion) {
      watchSections();
      finish();
      return;
    }
    setTimeout(watchSections, 2400);
    fx.burst(box.left + box.width / 2, box.top + box.height / 2, 70, 7);
    setTimeout(finish, 2000);
    setTimeout(fx.releasePetals, 800);
  }

  seal.addEventListener('click', openEnvelope, { once: true });

  /* Effects canvas: gold dust in the air, sparkles at the fingertip, petals on opening. */

  var fx = (function () {
    var canvas = document.getElementById('fx');
    var ctx = canvas.getContext('2d');
    var dummy = { burst: function () {}, releasePetals: function () {}, hearts: function () {} };
    if (!ctx || reducedMotion) return dummy;

    var w, h;
    var GOLD = ['#e6c27e', '#c9a15f', '#f6e3b4'];
    var PETAL = ['#eda9a8', '#f3c3bb', '#e08b95', '#f8dcd0', '#d9a860'];
    var dust = [];
    var sparks = [];
    var petals = [];

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    var dustCount = w < 700 ? 22 : 44;
    for (var i = 0; i < dustCount; i++) {
      dust.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.7 + Math.random() * 1.5,
        rise: 0.08 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
        rate: 0.012 + Math.random() * 0.02,
        color: GOLD[i % GOLD.length]
      });
    }

    function burst(x, y, count, speed) {
      for (var i = 0; i < count; i++) {
        var a = Math.random() * Math.PI * 2;
        var v = speed * (0.25 + Math.random() * 0.75);
        sparks.push({
          x: x, y: y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          r: 0.8 + Math.random() * 2,
          life: 1,
          fade: 0.012 + Math.random() * 0.02,
          color: GOLD[i % GOLD.length]
        });
      }
    }

    function releasePetals() {
      var count = w < 700 ? 22 : 40;
      for (var i = 0; i < count; i++) {
        petals.push({
          x: Math.random() * w,
          y: -20 - Math.random() * h * 0.7,
          size: 5 + Math.random() * 6,
          fall: 2 + Math.random() * 1.6,
          sway: 0.6 + Math.random() * 1.2,
          phase: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.05,
          angle: Math.random() * Math.PI * 2,
          color: PETAL[i % PETAL.length]
        });
      }
    }

    // A trail of gold follows the finger or mouse.
    var lastSpark = 0;
    window.addEventListener('pointermove', function (e) {
      var now = performance.now();
      if (now - lastSpark < 45) return;
      lastSpark = now;
      burst(e.clientX, e.clientY, 2, 1.1);
    }, { passive: true });
    window.addEventListener('pointerdown', function (e) {
      burst(e.clientX, e.clientY, 12, 2.6);
    }, { passive: true });

    var last = performance.now();
    function frame(now) {
      var dt = Math.min((now - last) / 16.67, 3);
      last = now;
      ctx.clearRect(0, 0, w, h);

      dust.forEach(function (d) {
        d.y -= d.rise * dt;
        d.phase += d.rate * dt;
        d.x += Math.sin(d.phase) * 0.12 * dt;
        if (d.y < -6) { d.y = h + 6; d.x = Math.random() * w; }
        var glow = 0.25 + Math.abs(Math.sin(d.phase)) * 0.65;
        ctx.fillStyle = d.color;
        ctx.globalAlpha = glow * 0.22;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 3, 0, 6.283); ctx.fill();
        ctx.globalAlpha = glow;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, 6.283); ctx.fill();
      });

      sparks = sparks.filter(function (s) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= Math.pow(0.95, dt);
        s.vy = s.vy * Math.pow(0.95, dt) + (s.heart ? -0.012 : 0.035) * dt;
        s.life -= s.fade * dt;
        if (s.life <= 0) return false;
        ctx.fillStyle = s.color;
        if (s.heart) {
          // A heart, drawn from two curves meeting at the point.
          var k = s.r;
          ctx.globalAlpha = Math.min(1, s.life * 1.4);
          ctx.beginPath();
          ctx.moveTo(s.x, s.y + k * 0.9);
          ctx.bezierCurveTo(s.x - k * 1.6, s.y - k * 0.1, s.x - k * 0.8, s.y - k * 1.3, s.x, s.y - k * 0.45);
          ctx.bezierCurveTo(s.x + k * 0.8, s.y - k * 1.3, s.x + k * 1.6, s.y - k * 0.1, s.x, s.y + k * 0.9);
          ctx.fill();
          return true;
        }
        ctx.globalAlpha = s.life * 0.28;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 2.8, 0, 6.283); ctx.fill();
        ctx.globalAlpha = s.life;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill();
        return true;
      });

      petals = petals.filter(function (p) {
        p.y += p.fall * dt;
        p.phase += 0.025 * dt;
        p.angle += p.spin * dt;
        p.x += Math.sin(p.phase) * p.sway * dt;
        if (p.y > h + 30) return false;

        // Turning the petal over in the air: narrow its width as it rotates.
        var flip = 0.45 + Math.abs(Math.cos(p.phase)) * 0.55;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.scale(flip, 1);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 0.75, p.size * 0.65, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.65, -p.size * 0.9, -p.size * 0.6, 0, -p.size);
        ctx.fill();
        ctx.restore();
        return true;
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    // Hearts that float up and away, for a message sent with love.
    function hearts(x, y, count) {
      var HEART = ['#e08b95', '#c9a15f', '#eda9a8', '#a8324a'];
      for (var i = 0; i < count; i++) {
        sparks.push({
          heart: true,
          x: x + (Math.random() - 0.5) * 60,
          y: y,
          vx: (Math.random() - 0.5) * 2.4,
          vy: -1.5 - Math.random() * 2.5,
          r: 5 + Math.random() * 6,
          life: 1,
          fade: 0.008 + Math.random() * 0.008,
          color: HEART[i % HEART.length]
        });
      }
    }

    return { burst: burst, releasePetals: releasePetals, hearts: hearts };
  })();

  /* Countdown */

  var cdCells = document.getElementById('cd-cells');
  var cdCaption = document.getElementById('cd-caption');
  var cdDone = document.getElementById('cd-done');
  var cdNums = {};
  ['days', 'hours', 'minutes', 'seconds'].forEach(function (u) {
    cdNums[u] = document.getElementById('cd-' + u);
  });

  function setNum(el, text) {
    if (el.textContent === text) return;
    el.textContent = text;
    if (!reducedMotion && el.animate) {
      el.animate(
        [{ opacity: 0.25, transform: 'translateY(-.14em)' }, { opacity: 1, transform: 'none' }],
        { duration: 420, easing: 'cubic-bezier(.16,.84,.3,1)' }
      );
    }
  }

  function updateCountdown() {
    var now = new Date();
    var locale = lang === 'ar' ? 'ar-EG' : 'en-US';

    if (now >= WEDDING) {
      cdCells.hidden = true;
      cdCaption.hidden = true;
      cdDone.hidden = false;
      cdDone.textContent = now >= WEDDING_END ? TEXT[lang].thanks : TEXT[lang].today;
      return;
    }

    var left = Math.ceil((WEDDING - now) / 1000);
    var pad = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });
    setNum(cdNums.days, new Intl.NumberFormat(locale, { useGrouping: false }).format(Math.floor(left / 86400)));
    setNum(cdNums.hours, pad.format(Math.floor(left % 86400 / 3600)));
    setNum(cdNums.minutes, pad.format(Math.floor(left % 3600 / 60)));
    setNum(cdNums.seconds, pad.format(left % 60));
  }

  /* Flowers only start growing once their image has arrived. */

  document.querySelectorAll('.vine, .corner, .sprig').forEach(function (img) {
    function ready() { img.classList.add('loaded'); }
    if (img.complete) ready();
    else {
      img.addEventListener('load', ready);
      img.addEventListener('error', ready);
    }
  });

  /* Sections come alive as they scroll into view. */

  var sections = document.querySelectorAll('.when, .where, .wishes, .closing');
  if ('IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        seen.unobserve(entry.target);

        // The last section ends in a shower of gold over the couple's names.
        if (entry.target.classList.contains('closing')) {
          setTimeout(function () {
            var r = entry.target.querySelector('.closing-names').getBoundingClientRect();
            fx.burst(r.left + r.width / 2, r.top + r.height / 2, 60, 5);
          }, 1800);
        }
      });
    }, { rootMargin: '0px 0px -18% 0px' });
    var watchSections = function () { sections.forEach(function (s) { seen.observe(s); }); };
  } else {
    var watchSections = function () { sections.forEach(function (s) { s.classList.add('in'); }); };
  }

  /* The sky over the venue */

  var sky = document.getElementById('sky');
  var starCount = window.innerWidth < 700 ? 34 : 54;
  for (var s = 0; s < starCount; s++) {
    var star = document.createElement('span');
    star.className = 'star';
    star.style.left = (4 + Math.random() * 92) + '%';
    star.style.top = (2 + Math.random() * 62) + '%';
    star.style.setProperty('--s', (1 + Math.random() * 2.2).toFixed(1) + 'px');
    star.style.setProperty('--t', (1.6 + Math.random() * 3).toFixed(1) + 's');
    star.style.setProperty('--d', (-Math.random() * 4).toFixed(1) + 's');
    sky.appendChild(star);
  }

  /* Scroll-linked motion: the moon rises, and the portrait drifts slightly. */

  var moon = document.getElementById('moon');
  var arch = moon.parentElement;
  var heroArt = document.querySelector('.hero-art');
  var ticking = false;

  function onScroll() {
    ticking = false;
    var vh = window.innerHeight;
    var top = arch.getBoundingClientRect().top;
    var rise = Math.min(1, Math.max(0, (vh * 0.92 - top) / (vh * 0.62)));
    moon.style.setProperty('--rise', rise.toFixed(3));
    if (window.scrollY < vh * 1.5) {
      heroArt.style.setProperty('--drift', (window.scrollY * 0.07).toFixed(1) + 'px');
    }
  }

  if (!reducedMotion) {
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    }, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* Guest wishes, stored in a Google Sheet through guestbook/Code.gs. */

  // Paste the web app link from the Apps Script deployment here.
  var WISHES_URL = 'https://script.google.com/macros/s/AKfycbyE_yXJmA8ZC4I0VMLGzCKKYiHUx5R_sE0msBiF5n86KYrrKzq_t1QX9vE6EXe8RJuoWA/exec';
  var PAGE_SIZE = 6;

  // A gold wax heart. It is fixed markup, never guest text.
  var SEAL_SVG = '<svg viewBox="0 0 40 38" aria-hidden="true"><defs><radialGradient id="seal-gold" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#f3dda6"/><stop offset=".55" stop-color="#c9a15f"/><stop offset="1" stop-color="#8d6a31"/></radialGradient></defs>' +
    '<path fill="url(#seal-gold)" d="M20 36S2.5 25.6 2.5 13.2A9.2 9.2 0 0 1 20 9.4a9.2 9.2 0 0 1 17.5 3.8C37.5 25.6 20 36 20 36Z"/>' +
    '<path fill="none" stroke="#fff3d2" stroke-opacity=".55" stroke-width="1.2" d="M20 30.5S8 23 8 14.4a5.6 5.6 0 0 1 12-2.3 5.6 5.6 0 0 1 12 2.3C32 23 20 30.5 20 30.5Z"/></svg>';

  // The envelope's front, drawn once. Fixed markup, never guest text.
  var ENV_FRONT = '<svg class="letter-front" viewBox="0 0 300 132" preserveAspectRatio="none" aria-hidden="true">' +
    '<defs><linearGradient id="env-side" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e2337"/><stop offset="1" stop-color="#561829"/></linearGradient>' +
    '<linearGradient id="env-fold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a3450"/><stop offset="1" stop-color="#621d30"/></linearGradient></defs>' +
    // The pocket: a straight top edge and a bottom fold pointing up (no top V, so it reads as open).
    '<rect width="300" height="132" fill="url(#env-side)"/>' +
    '<path d="M0 129L150 55L300 129" fill="none" stroke="#2a0a16" stroke-opacity=".3" stroke-width="5" vector-effect="non-scaling-stroke"/>' +
    '<path d="M0 132L150 58L300 132Z" fill="url(#env-fold)"/>' +
    '<path d="M0 132L150 58L300 132" fill="none" stroke="#e2c084" stroke-opacity=".6" vector-effect="non-scaling-stroke"/>' +
    '<path d="M0 .5H300" fill="none" stroke="#e2c084" stroke-opacity=".8" vector-effect="non-scaling-stroke"/></svg>';

  var wishForm = document.getElementById('wish-form');
  var wishStatus = document.getElementById('wish-status');
  var wishList = document.getElementById('wish-list');
  var wishEmpty = document.getElementById('wish-empty');
  var wishMore = document.getElementById('wish-more');
  var wishSend = document.getElementById('wish-send');
  var wishes = null;
  var wishState = 'loading';
  var shown = PAGE_SIZE;
  var statusKey = '';
  var seenKeys = {};

  function wishKey(w) { return w.time + '|' + w.name; }

  // Notes fade up one after another as they scroll into view.
  var noteWatch = 'IntersectionObserver' in window && !reducedMotion
    ? new IntersectionObserver(function (entries) {
      var n = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var li = entry.target;
        noteWatch.unobserve(li);
        seenKeys[li.dataset.key] = true;
        li.style.setProperty('--delay', (n++ * 0.12) + 's');
        li.classList.add('seen');
        setTimeout(function () { li.style.removeProperty('--delay'); }, 1600);
      });
    }, { rootMargin: '0px 0px -8% 0px' })
    : null;

  function setWishStatus(key) {
    statusKey = key;
    wishStatus.textContent = key ? TEXT[lang][key] : '';
  }

  function renderWishes() {
    if (statusKey) wishStatus.textContent = TEXT[lang][statusKey];
    wishList.textContent = '';
    wishMore.hidden = true;

    if (wishState !== 'ready') {
      wishEmpty.hidden = false;
      wishEmpty.textContent = TEXT[lang][wishState === 'failed' ? 'loadFailed' : wishState === 'off' ? 'notReady' : 'loading'];
      return;
    }
    wishEmpty.hidden = wishes.length > 0;
    wishEmpty.textContent = TEXT[lang].empty;

    appendWishes(0, shown);
  }

  // Adds envelopes for wishes[from..to) to the end of the wall, leaving the ones already there untouched.
  // Guests write in either language, whatever page they are on.
  function scriptOf(s) {
    return /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/.test(s) ? 'ar' : 'en';
  }

  function appendWishes(from, to) {
    var dateFormat = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'long' });
    wishes.slice(from, to).forEach(function (w) {
      var item = document.createElement('li');
      item.className = 'wish';
      item.dataset.key = wishKey(w);
      if (!noteWatch || seenKeys[item.dataset.key]) item.classList.add('seen');
      else noteWatch.observe(item);
      item.innerHTML = '<div class="letter-back"></div>' +
        '<div class="letter-flap"><span class="out"></span><span class="in"></span></div>' + ENV_FRONT +
        '<span class="letter-seal"><span class="half-a">' + SEAL_SVG + '</span><span class="half-b">' + SEAL_SVG + '</span></span>';
      var slot = document.createElement('div');
      slot.className = 'letter-slot';
      var note = document.createElement('div');
      note.className = 'wish-card';
      var text = document.createElement('p');
      text.className = 'wish-text';
      text.dir = 'auto';
      text.textContent = w.message;
      text.lang = scriptOf(w.message);
      var sign = document.createElement('p');
      sign.className = 'wish-sign';
      sign.dir = 'auto';
      sign.textContent = w.name;
      sign.lang = scriptOf(w.name);
      var when = document.createElement('time');
      when.className = 'wish-date';
      when.dateTime = w.time;
      when.textContent = dateFormat.format(new Date(w.time));
      note.append(text, sign, when);
      slot.appendChild(note);
      item.insertBefore(slot, item.querySelector('.letter-front'));
      wishList.appendChild(item);
    });
    wishMore.hidden = wishes.length <= shown;
  }

  function loadWishes() {
    // Until the Google Sheet is connected, the section stays out of sight.
    if (!WISHES_URL) {
      document.querySelector('.wishes').hidden = true;
      return;
    }
    fetch(WISHES_URL)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.ok) throw new Error('not ok');
        wishes = data.messages;
        wishState = 'ready';
        renderWishes();
      })
      .catch(function () {
        wishState = 'failed';
        renderWishes();
      });
  }

  wishMore.addEventListener('click', function () {
    var from = shown;
    shown += PAGE_SIZE;
    appendWishes(from, shown);
  });

  wishForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = wishForm.elements.name.value.trim();
    var message = wishForm.elements.message.value.trim();
    if (!name || !message) {
      setWishStatus('needBoth');
      (name ? wishForm.elements.message : wishForm.elements.name).focus();
      return;
    }

    wishSend.disabled = true;
    wishForm.classList.add('sending');
    setWishStatus('sending');

    // Sent as plain text so the browser doesn't need extra permission from Google first.
    fetch(WISHES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ name: name, message: message, lang: lang, website: wishForm.elements.website.value })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data.ok) throw new Error(data.error || 'not ok');
        var added = data.message || { time: new Date().toISOString(), name: name, message: message };
        wishes = [added].concat(wishes || []);
        wishState = 'ready';
        shown += 1;
        wishForm.reset();
        setWishStatus('sent');
        deliverNote(wishKey(added), wishForm.elements.message);
      })
      .catch(function () {
        setWishStatus('sendFailed');
      })
      .then(function () {
        wishSend.disabled = false;
        wishForm.classList.remove('sending');
      });
  });

  // Re-draw the wall with the new note on top, and fly it there from the form.
  function deliverNote(key, fromEl) {
    var before = {};
    wishList.querySelectorAll('.wish').forEach(function (li) {
      before[li.dataset.key] = li.getBoundingClientRect();
    });
    renderWishes();

    var target = wishList.querySelector('.wish[data-key="' + CSS.escape(key) + '"]');
    if (!target) return;
    seenKeys[key] = true;
    if (noteWatch) noteWatch.unobserve(target);
    if (reducedMotion || !target.animate) {
      target.classList.add('seen');
      return;
    }

    // The notes already there slide over to make room.
    wishList.querySelectorAll('.wish').forEach(function (li) {
      var old = before[li.dataset.key];
      if (!old || li === target) return;
      var now = li.getBoundingClientRect();
      var dx = old.left - now.left;
      var dy = old.top - now.top;
      if (Math.abs(dx) + Math.abs(dy) < 1) return;
      li.animate(
        [{ transform: 'translate(' + dx + 'px, ' + dy + 'px)' }, { transform: 'none' }],
        { duration: 800, delay: 150, easing: 'cubic-bezier(.65, 0, .35, 1)', fill: 'backwards' }
      );
    });

    // The real envelope waits, invisible, in its final resting place (not its offset entrance position).
    target.classList.add('landing', 'arrive');
    var LAND = 1.035; // the flyer touches down a hair large, then settles into place
    var flyer;

    // Bring the landing spot into view first, while the other notes slide aside;
    // flying during the scroll would carry the envelope off the screen.
    var spot = target.getBoundingClientRect();
    if (spot.bottom > window.innerHeight - 24 || spot.top < 0) {
      window.scrollTo({ top: window.scrollY + spot.top - window.innerHeight * 0.3, behavior: 'smooth' });
      var launched = false;
      var go = function () {
        if (launched) return;
        launched = true;
        window.removeEventListener('scrollend', go);
        launch();
      };
      window.addEventListener('scrollend', go);
      setTimeout(go, 900);
    } else {
      launch();
    }

    function launch() {
      var box = target.getBoundingClientRect();
      var to = {
        width: target.offsetWidth,
        height: target.offsetHeight,
        left: box.left + box.width / 2 - target.offsetWidth / 2,
        top: box.top + box.height / 2 - target.offsetHeight / 2
      };
      var look = getComputedStyle(target);
      flyer = target.cloneNode(true);
      flyer.classList.remove('landing', 'arrive');
      flyer.classList.add('flyer');
      flyer.style.left = (to.left + window.scrollX) + 'px';
      flyer.style.top = (to.top + window.scrollY) + 'px';
      flyer.style.width = to.width + 'px';
      flyer.style.rotate = look.rotate;
      flyer.style.setProperty('--paper-tone', look.getPropertyValue('--paper-tone'));
      document.body.appendChild(flyer);

      // Starts from the message box; if that has scrolled away, it drops in from the top edge.
      var from = fromEl.getBoundingClientRect();
      var fromY = Math.max(from.top + from.height / 2, -to.height * 0.15);
      var scale = Math.min(1.1, Math.max(0.6, from.width / to.width));
      var dx = (from.left + from.width / 2) - (to.left + to.width / 2);
      var dy = fromY - (to.top + to.height / 2);
      var lift = Math.min(60, 24 + Math.abs(dy) * 0.08);
      var sway = Math.abs(dx) < 40 ? 22 : 0; // a gentle sideways float when it drops straight down
      function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

      // One smooth arc, sampled finely so speed, tilt and size all change without kinks.
      var frames = [];
      for (var i = 0; i <= 40; i++) {
        var t = i / 40;
        var p = ease(t);
        var q = 1 - p;
        var x = q * q * q * dx + 3 * q * q * p * dx + 3 * q * p * p * dx * 0.15 + sway * Math.sin(Math.PI * p);
        var y = q * q * q * dy + 3 * q * q * p * (dy - lift) + 3 * q * p * p * (-lift * 0.5);
        var s = scale + (LAND - scale) * p + Math.sin(Math.PI * p) * 0.06;
        var r = -4 * Math.sin(Math.PI * p) * (dx > 0 ? -1 : 1) * (1 - p * 0.3);
        frames.push({
          offset: t,
          opacity: Math.min(1, t / 0.12),
          transform: 'translate(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px) rotate(' + r.toFixed(2) + 'deg) scale(' + s.toFixed(4) + ')'
        });
      }
      flyer.animate(frames, { duration: 1350, easing: 'linear', fill: 'forwards' }).onfinish = land;
    }

    // On landing it glows, then opens: the seal cracks, the flap lifts, the card rises.
    function land() {
      // Swap in the real envelope already fully shown, so nothing blinks at touchdown.
      target.classList.remove('landing');
      void target.offsetWidth;
      flyer.remove();
      target.animate([{ scale: LAND }, { scale: 1 }], { duration: 420, easing: 'cubic-bezier(.3, 0, .2, 1)' });
      target.classList.add('seen', 'arrived');
      void target.offsetWidth;
      target.classList.remove('arrive');
      setTimeout(function () {
        var s = target.querySelector('.letter-seal').getBoundingClientRect();
        fx.burst(s.left + s.width / 2, s.top + s.height / 2, 34, 3.4);
      }, 520);
      setTimeout(function () {
        var c = target.querySelector('.wish-card').getBoundingClientRect();
        fx.hearts(c.left + c.width / 2, c.top + 20, 16);
      }, 1500);
      setTimeout(function () { target.classList.remove('arrived'); }, 2600);
    }
  }

  loadWishes();

  /* Sharing */

  document.getElementById('share').addEventListener('click', function () {
    var t = TEXT[lang];
    var url = window.location.origin + window.location.pathname + '?lang=' + lang;
    var data = { title: t.names, text: t.shareText, url: url };

    if (navigator.share) {
      navigator.share(data).catch(function () { /* The guest closed the share sheet. */ });
      return;
    }
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(function () {
        shareStatus.textContent = t.copied;
      }, function () {
        shareStatus.textContent = t.copyThis + url;
      });
      return;
    }
    shareStatus.textContent = t.copyThis + url;
  });

  applyLanguage(lang);
  setInterval(updateCountdown, 1000);
})();
