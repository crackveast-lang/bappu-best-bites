/* ==========================================================================
   Bappu Best Bites — interactions

   Selling happens on Amazon, so there is no cart here. Every product CTA is a
   direct link to that product's listing. To wire a product up, paste its
   Amazon URL into `amazon` below; anything left null falls back to
   AMAZON_STORE so no button is ever dead.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Fallback for products without their own listing link yet. */
  var AMAZON_STORE = 'https://www.amazon.in/s?k=Bappu+Best+Bites+Namkeen';

  /* ---------------------------------------------------------------- data */
  var PRODUCTS = [
    {
      id: 'ratlami-sev',
      headline: ['Eat our','hand&#8209;pressed','<em>Ratlami Sev</em>'],
      cutLg: 'assets/img/cutouts/ratlami-sev-lg.png',
      cutSm: 'assets/img/cutouts/ratlami-sev-sm.png',
      name: 'Ratlami Sev',
      tag: 'Signature',
      price: 120,
      weight: '400 g',
      heat: 3,
      cats: ['sev'],
      amazon: null,
      desc: 'Coarse-pressed besan carrying clove, black pepper and ajwain. The Malwa classic.',
      img: 'assets/img/products/ratlami-sev.jpg',
      alt: 'assets/img/products/ratlami-sev-pack.jpg',
      imgAlt: 'Blue Ratlami Sev pack standing beside a glass bowl of golden sev on a warm cream backdrop.'
    },
    {
      id: 'indori-khatta-mix',
      headline: ['Try the','sweet&#8209;and&#8209;sour','<em>Indori Khatta</em>'],
      cutLg: 'assets/img/cutouts/indori-khatta-mix-lg.png',
      cutSm: 'assets/img/cutouts/indori-khatta-mix-sm.png',
      name: 'Indori Khatta Mix',
      tag: 'Bestseller',
      price: 120,
      weight: '400 g',
      heat: 2,
      cats: ['mixture'],
      amazon: null,
      desc: 'Indore in a bowl — sweet, sour and salty at once, with peanuts and green peas.',
      img: 'assets/img/products/indori-khatta-mix.jpg',
      alt: 'assets/img/products/indori-khatta-mix-pack.jpg',
      imgAlt: 'Teal Indori Khatta Mix pack standing in dappled afternoon light against a cream wall.'
    },
    {
      id: 'ujjaini-sev',
      name: 'Ujjaini Sev',
      price: 120,
      weight: '400 g',
      heat: 2,
      cats: ['sev'],
      amazon: null,
      desc: 'A hair-fine strand fried until it shatters. Ujjain’s everyday sev, done properly.',
      img: 'assets/img/products/ujjaini-sev.jpg',
      alt: 'assets/img/products/ujjaini-sev-alt.jpg',
      imgAlt: 'Red Ujjaini Sev pack photographed from above with a bowl of fine sev and fresh curry leaves.'
    },
    {
      id: 'sada-sev',
      headline: ['Start with','the everyday','<em>Sada Sev</em>'],
      cutLg: 'assets/img/cutouts/sada-sev-lg.png',
      cutSm: 'assets/img/cutouts/sada-sev-sm.png',
      name: 'Sada Sev',
      tag: 'Mild',
      price: 120,
      weight: '400 g',
      heat: 1,
      cats: ['sev'],
      amazon: null,
      desc: 'Plain besan sev, lightly salted. The one that goes on poha every morning.',
      img: 'assets/img/products/sada-sev.jpg',
      alt: 'assets/img/products/sada-sev-pack.jpg',
      imgAlt: 'Orange Sada Sev pack lying flat beside a bowl of fine plain sev in warm sunlight.'
    },
    {
      id: 'kadipatta-mix',
      headline: ['Taste the','curry&#8209;leaf','<em>Kadipatta Mix</em>'],
      cutLg: 'assets/img/cutouts/kadipatta-mix-lg.png',
      cutSm: 'assets/img/cutouts/kadipatta-mix-sm.png',
      name: 'Kadipatta Mix',
      price: 120,
      weight: '400 g',
      heat: 3,
      cats: ['mixture'],
      amazon: null,
      desc: 'Built around curry leaf, not garnished with it. Fried whole leaves right through.',
      img: 'assets/img/products/kadipatta-mix.jpg',
      alt: 'assets/img/products/kadipatta-mix-alt.jpg',
      imgAlt: 'Green Kadipatta Mix pack standing beside a glass bowl of curry-leaf namkeen.'
    },
    {
      id: 'milan-mixture',
      headline: ['Share a bowl','of the','<em>Milan Mixture</em>'],
      cutLg: 'assets/img/cutouts/milan-mixture-lg.png',
      cutSm: 'assets/img/cutouts/milan-mixture-sm.png',
      name: 'Milan Mixture',
      price: 120,
      weight: '400 g',
      heat: 2,
      cats: ['mixture'],
      amazon: null,
      desc: 'Corn flakes, boondi, peanuts and sev in one bowl. The all-rounder for a full table.',
      img: 'assets/img/products/milan-mixture.jpg',
      alt: 'assets/img/products/milan-mixture-pack.jpg',
      imgAlt: 'Dark brown Milan Mixture pack standing in warm light against a cream backdrop.'
    },
    {
      id: 'waffer-mix',
      name: 'Waffer Mix',
      tag: 'New',
      price: 120,
      weight: '400 g',
      heat: 3,
      cats: ['mixture', 'hot'],
      amazon: null,
      desc: 'Wide wafer chips tossed with sev, roasted peanuts and a heavy hand of chilli.',
      img: 'assets/img/products/waffer-mix.jpg',
      alt: 'assets/img/products/waffer-mix-alt.jpg',
      imgAlt: 'Red Waffer Mix pack beside a glass bowl of wafer chips and peanuts in hard sunlight.'
    },
    {
      id: 'lahsun-mix',
      name: 'Lahsun Mix',
      tag: 'Extra hot',
      price: 120,
      weight: '400 g',
      heat: 4,
      cats: ['mixture', 'hot'],
      amazon: null,
      desc: 'Raw garlic and red chilli, unapologetic. For people who already know they want this.',
      img: 'assets/img/products/lahsun-mix.jpg',
      alt: 'assets/img/products/lahsun-mix-alt.jpg',
      imgAlt: 'Red Lahsun Mix pack styled on linen with a sprig of fresh greenery.'
    }
  ];

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var inr = function (n) { return '₹' + n.toLocaleString('en-IN'); };
  var buyUrl = function (p) { return p.amazon || AMAZON_STORE; };

  var AMAZON_SVG =
    '<svg class="amazon-smile" width="14" height="14" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M8 16 16 8M9 8h7v7"/></svg>';

  /* ------------------------------------------------------- render grid */
  var grid = $('#grid');

  function heatMarkup(level) {
    var bars = '';
    for (var i = 1; i <= 4; i++) bars += '<i class="' + (i <= level ? 'on' : '') + '"></i>';
    var labels = { 1: 'Mild', 2: 'Medium', 3: 'Hot', 4: 'Fiery' };
    return '<span class="heat" title="Heat: ' + labels[level] + '">' + bars +
           '<span>' + labels[level] + '</span></span>';
  }

  function cardMarkup(p, i) {
    return '' +
      '<article class="card" data-cats="' + p.cats.join(' ') + '" style="animation-delay:' + (i * 45) + 'ms">' +
        '<div class="card__media">' +
          (p.tag ? '<span class="card__tag">' + p.tag + '</span>' : '') +
          '<img src="' + p.img + '" alt="' + p.imgAlt + '" loading="lazy" decoding="async" width="825" height="1100">' +
          (p.alt ? '<img class="is-alt" src="' + p.alt + '" alt="" aria-hidden="true" loading="lazy" decoding="async">' : '') +
          '<a class="card__buy" href="' + buyUrl(p) + '" target="_blank" rel="noopener noreferrer">' +
            AMAZON_SVG + 'Buy on Amazon' +
          '</a>' +
        '</div>' +
        '<div class="card__body">' +
          '<div class="card__row">' +
            '<h3 class="card__name">' + p.name + '</h3>' +
            '<span class="card__price">' + inr(p.price) + '</span>' +
          '</div>' +
          '<p class="card__desc">' + p.desc + '</p>' +
          '<div class="card__foot">' +
            heatMarkup(p.heat) +
            '<span class="card__wt">' + p.weight + '</span>' +
          '</div>' +
        '</div>' +
      '</article>';
  }

  if (grid) grid.innerHTML = PRODUCTS.map(cardMarkup).join('');

  /* Point every standalone Amazon CTA at the right listing. */
  $$('[data-buy]').forEach(function (el) {
    var id = el.dataset.buy;
    var p = null;
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) p = PRODUCTS[i];
    el.setAttribute('href', p ? buyUrl(p) : AMAZON_STORE);
  });
  $$('[data-buy-store]').forEach(function (el) { el.setAttribute('href', AMAZON_STORE); });


  /* ======================================================== preloader ==== */
  /* Real progress where we can get it: the hero cut-outs and the logo are what
     the first screen actually waits on, so the bar tracks those decoding rather
     than running a fake timer. It never blocks longer than 3.5s. */
  (function preload() {
    var el = $('#preloader');
    if (!el) { document.body.classList.add('is-loaded'); return; }
    var bar = $('#preBar'), pct = $('#prePct');
    var hero = PRODUCTS.filter(function (p) { return p.cutLg; });
    var urls = hero.map(function (p) { return p.cutLg; }).concat(['assets/img/logo.png']);
    var done = 0, total = urls.length, shown = 0, finished = false;

    function paint(v) {
      shown = Math.max(shown, v);
      if (bar) bar.style.width = shown + '%';
      if (pct) pct.textContent = Math.round(shown) + '%';
    }
    function step() {
      done++;
      paint(Math.round((done / total) * 100));
      if (done >= total) finish();
    }
    function finish() {
      if (finished) return;
      finished = true;
      paint(100);
      setTimeout(function () {
        document.body.classList.add('is-loaded');
        startHero();
      }, 260);
    }

    urls.forEach(function (u) {
      var img = new Image();
      img.onload = img.onerror = step;
      img.src = u;
    });
    // never hold the page hostage to a slow asset
    setTimeout(finish, 3500);
    // creep forward a little while we wait so the bar never looks stuck
    var creep = setInterval(function () {
      if (finished) return clearInterval(creep);
      paint(Math.min(shown + 2, 92));
    }, 220);
  })();

  /* ==================================================== hero rotator ==== */
  var HERO = PRODUCTS.filter(function (p) { return p.cutLg; });
  var heroPack = $('#heroPack');
  var heroTitle = $('#heroTitle');
  var heroLede = $('#heroLede');
  var heroBuy = $('#heroBuy');
  var heroDots = $('#heroDots');
  var heroCount = $('#heroCount');
  var heroIndex = 0;
  var heroTimer = null;
  var swapping = false;

  var pad2 = function (n) { return (n < 10 ? '0' : '') + n; };

  if (heroDots) {
    heroDots.innerHTML = HERO.map(function (p, i) {
      return '<button class="switcher__dot" type="button" role="tab" data-go="' + i + '" ' +
             'aria-current="' + (i === 0) + '" aria-label="' + p.name + '"></button>';
    }).join('');
  }

  function paintTitle(p) {
    if (!heroTitle) return;
    heroTitle.innerHTML = p.headline.map(function (l) {
      return '<span class="ln"><span>' + l + '</span></span>';
    }).join('');
    animateTitle();
  }

  function animateTitle() {
    if (!heroTitle) return;
    $('.ln > span', heroTitle).forEach(function (s, i) {
      s.style.transform = 'translateY(105%)';
      s.style.transition = 'none';
      // next frame, release
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          s.style.transition = 'transform .95s cubic-bezier(.16,1,.3,1) ' + (i * 90 + 60) + 'ms';
          s.style.transform = 'translateY(0)';
        });
      });
    });
  }

  function showHero(i, immediate) {
    if (swapping || !HERO.length) return;
    heroIndex = (i + HERO.length) % HERO.length;
    var p = HERO[heroIndex];

    if (heroDots) {
      $('.switcher__dot', heroDots).forEach(function (d, n) {
        d.setAttribute('aria-current', String(n === heroIndex));
      });
    }
    if (heroCount) heroCount.textContent = pad2(heroIndex + 1) + ' / ' + pad2(HERO.length);
    if (heroBuy) { heroBuy.dataset.buy = p.id; heroBuy.setAttribute('href', buyUrl(p)); }

    var apply = function () {
      if (heroPack) {
        heroPack.src = p.cutLg;
        heroPack.alt = 'Bappu Best Bites ' + p.name + ', ' + p.weight + ' pack';
      }
      if (heroLede) heroLede.textContent = p.desc;
      paintTitle(p);
      if (heroPack) heroPack.classList.remove('is-swapping');
      swapping = false;
    };

    if (immediate || reduceMotion || !heroPack) { apply(); return; }
    swapping = true;
    heroPack.classList.add('is-swapping');
    setTimeout(apply, 260);
  }

  function nudge(dir) {
    showHero(heroIndex + dir);
    restartAuto();
  }
  function restartAuto() {
    if (heroTimer) clearInterval(heroTimer);
    if (reduceMotion || HERO.length < 2) return;
    heroTimer = setInterval(function () {
      if (document.hidden) return;
      showHero(heroIndex + 1);
    }, 6500);
  }

  var hPrev = $('#heroPrev'), hNext = $('#heroNext');
  if (hPrev) hPrev.addEventListener('click', function () { nudge(-1); });
  if (hNext) hNext.addEventListener('click', function () { nudge(1); });
  if (heroDots) {
    heroDots.addEventListener('click', function (e) {
      var d = e.target.closest('[data-go]');
      if (!d) return;
      showHero(parseInt(d.dataset.go, 10));
      restartAuto();
    });
  }
  var stage = document.querySelector('.hero__stage');
  if (stage) {
    stage.addEventListener('mouseenter', function () { if (heroTimer) clearInterval(heroTimer); });
    stage.addEventListener('mouseleave', restartAuto);
  }

  /* Kick off once the curtain lifts, so the entrance is actually seen. */
  function startHero() {
    showHero(0, true);
    restartAuto();
    $('[data-hero-anim]').forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      requestAnimationFrame(function () {
        el.style.transition = 'opacity .8s var(--ease-out) ' + (i * 90 + 260) + 'ms, transform .8s var(--ease-out) ' + (i * 90 + 260) + 'ms';
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
  }

  /* ============================================ confetti mouse parallax == */
  var confetti = $('#confetti');
  if (confetti && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    var bits = $('i', confetti);
    var cx = 0, cy = 0, tx = 0, ty = 0, raf = null;
    document.querySelector('.hero').addEventListener('mousemove', function (e) {
      var r = this.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(follow);
    });
    function follow() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      bits.forEach(function (b) {
        var d = parseFloat(b.dataset.depth || 20);
        b.style.setProperty('--px', (-cx * d).toFixed(1) + 'px');
        b.style.setProperty('--py', (-cy * d).toFixed(1) + 'px');
        b.style.marginLeft = (-cx * d).toFixed(1) + 'px';
        b.style.marginTop = (-cy * d).toFixed(1) + 'px';
      });
      raf = Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(follow) : null;
    }
  }

  /* ================================================== bestsellers row ==== */
  var recsRow = $('#recsRow');
  if (recsRow) {
    var star = '<svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">' +
               '<path d="M6 .5 7.5 4l3.9.3-3 2.5.9 3.8L6 8.6 2.7 10.6l.9-3.8-3-2.5L4.5 4z"/></svg>';
    recsRow.innerHTML = HERO.map(function (p) {
      return '' +
        '<article class="rec">' +
          '<div class="rec__media"><img src="' + p.cutSm + '" alt="" loading="lazy" decoding="async"></div>' +
          '<h3 class="rec__name">' + p.name + '</h3>' +
          '<div class="rec__stars" aria-label="Rated 5 out of 5">' + star + star + star + star + star + '</div>' +
          '<div class="rec__price">' + inr(p.price) + ' &middot; ' + p.weight + '</div>' +
          '<a class="rec__buy" href="' + buyUrl(p) + '" target="_blank" rel="noopener noreferrer">Order now</a>' +
        '</article>';
    }).join('');
  }

  /* ----------------------------------------------------------- filters */
  $$('.filters button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.dataset.filter;
      $$('.filters button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      $$('.card', grid).forEach(function (card, i) {
        var show = f === 'all' || card.dataset.cats.split(' ').indexOf(f) > -1;
        card.classList.toggle('is-hidden', !show);
        if (show && !reduceMotion) {
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
          card.style.animationDelay = (i * 40) + 'ms';
        }
      });
    });
  });

  /* --------------------------------------------------------- mobile nav */
  var burger = $('#burger');
  if (burger) {
    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }
  $$('#mobileNav a').forEach(function (a) {
    a.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
      if (burger) {
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open') && burger) burger.click();
  });

  /* ------------------------------------------------------ sticky header */
  var header = $('#header');
  var toTop = $('#toTop');
  var ticking = false;

  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('is-stuck', y > 12);
    if (toTop) toTop.classList.toggle('is-on', y > 700);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ------------------------------------------------------ scroll reveal */
  var revealables = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------- counting stats */
  var counters = $$('[data-count]');
  if (counters.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) {
        el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
      });
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          co.unobserve(el);
          var target = parseInt(el.dataset.count, 10);
          var pre = el.dataset.prefix || '';
          var suf = el.dataset.suffix || '';
          var start = null;
          var dur = 1200;
          function step(ts) {
            if (start === null) start = ts;
            var t = Math.min(1, (ts - start) / dur);
            var eased = 1 - Math.pow(1 - t, 3);
            el.textContent = pre + Math.round(target * eased) + suf;
            if (t < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* --------------------------------------------------------- parallax */
  var parallax = $$('[data-parallax]');
  if (parallax.length && !reduceMotion) {
    var pTicking = false;
    var runParallax = function () {
      parallax.forEach(function (el) {
        var rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        var progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = 'translate3d(0,' + (progress * -36).toFixed(2) + 'px,0)';
      });
      pTicking = false;
    };
    window.addEventListener('scroll', function () {
      if (!pTicking) { window.requestAnimationFrame(runParallax); pTicking = true; }
    }, { passive: true });
    runParallax();
  }

  /* ------------------------------------------------------- newsletter */
  var newsForm = $('#newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = $('#email');
      var msg = $('#newsMsg');
      var value = input.value.trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
      if (!ok) {
        msg.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      msg.textContent = 'Thank you — you’re on the list.';
      newsForm.reset();
    });
  }

  /* -------------------------------------------------------------- misc */
  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

})();
