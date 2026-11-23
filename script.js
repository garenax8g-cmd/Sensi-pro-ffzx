/* FREE FIRE SENSI PRO — script.js */
(function () {
  'use strict';

  /* ---------- BASE DE DONNÉES (marque → type → puissance → modèles) ---------- */
  const DB = {
    'Samsung': {
      phone: {
        low: 'Galaxy A03,Galaxy A03s,Galaxy A04,Galaxy A04s,Galaxy A05,Galaxy A05s,Galaxy A06,Galaxy A12,Galaxy A13,Galaxy A14,Galaxy A15,Galaxy M12,Galaxy M13,Galaxy M14,Galaxy F14,Galaxy J7,Galaxy A10s,Galaxy A11,Galaxy A02s',
        mid: 'Galaxy A16,Galaxy A22,Galaxy A23,Galaxy A24,Galaxy A25,Galaxy A26,Galaxy A32,Galaxy A33,Galaxy A34,Galaxy A35,Galaxy A36,Galaxy A52,Galaxy A53,Galaxy A54,Galaxy A55,Galaxy A56,Galaxy M33,Galaxy M34,Galaxy M35,Galaxy M54,Galaxy S10',
        high: 'Galaxy S20,Galaxy S21,Galaxy S22,Galaxy S23,Galaxy S23 FE,Galaxy S24,Galaxy S24 FE,Galaxy S25,Galaxy Note 20,Galaxy Z Flip 5,Galaxy Z Fold 5'
      },
      tablet: {
        low: 'Galaxy Tab A7 Lite,Galaxy Tab A8,Galaxy Tab A9,Galaxy Tab A7',
        mid: 'Galaxy Tab A9+,Galaxy Tab S6 Lite,Galaxy Tab S7 FE,Galaxy Tab S9 FE,Galaxy Tab S9 FE+',
        high: 'Galaxy Tab S7,Galaxy Tab S8,Galaxy Tab S9,Galaxy Tab S9+,Galaxy Tab S10+,Galaxy Tab S10 Ultra'
      }
    },
    'Tecno': {
      phone: {
        low: 'Spark Go 2023,Spark Go 2024,Spark 8C,Spark 9,Spark 10,Spark 10C,Spark 20C,Pop 7,Pop 8,Camon 17',
        mid: 'Spark 20,Spark 20 Pro,Spark 30,Spark 30 Pro,Camon 19,Camon 20,Camon 30,Pova 4,Pova 5',
        high: 'Pova 5 Pro,Pova 6 Pro,Pova 7,Phantom X2,Phantom V Fold'
      },
      tablet: { low: 'Megapad 10,Tab 10', mid: 'Megapad 11,Megapad 11 Pro', high: '' }
    },
    'Infinix': {
      phone: {
        low: 'Smart 6,Smart 7,Smart 8,Smart 9,Hot 11,Hot 12,Hot 12 Play,Hot 20,Hot 20i,Hot 30i,Hot 40i',
        mid: 'Hot 30,Hot 40,Hot 40 Pro,Hot 50,Hot 50 Pro,Note 12,Note 30,Note 40,Note 50',
        high: 'Zero 30,Zero 40,GT 10 Pro,GT 20 Pro,GT 30 Pro'
      },
      tablet: { low: 'XPAD', mid: 'XPAD Pro', high: '' }
    },
    'Itel': {
      phone: {
        low: 'A49,A58,A60,A60s,A70,P40,P55,P55+,S23,S23+,Vision 3,Vision 5,City 100',
        mid: 'P65,S24,RS4',
        high: ''
      },
      tablet: { low: 'Pad One,Pad 1', mid: '', high: '' }
    },
    'Xiaomi': {
      phone: {
        low: 'Redmi 9A,Redmi 9C,Redmi 10A,Redmi 12C,Redmi 13C,Redmi A1,Redmi A2,Redmi A3,Redmi A5,POCO C40,POCO C55,POCO C65,POCO C75',
        mid: 'Redmi 10,Redmi 12,Redmi 13,Redmi Note 10,Redmi Note 11,Redmi Note 12,Redmi Note 13,Redmi Note 13 Pro,Redmi Note 14,POCO M4 Pro,POCO M5,POCO M6,POCO M6 Pro,POCO X4 GT,POCO X5',
        high: 'Redmi Note 12 Pro+,Redmi Note 13 Pro+,Redmi Note 14 Pro+,POCO X5 Pro,POCO X6,POCO X6 Pro,POCO X7 Pro,POCO F4,POCO F5,POCO F6,Xiaomi 12,Xiaomi 13,Xiaomi 14,Xiaomi 14T,Black Shark 4,Black Shark 5'
      },
      tablet: {
        low: 'Redmi Pad SE',
        mid: 'Redmi Pad,Redmi Pad Pro,POCO Pad',
        high: 'Xiaomi Pad 5,Xiaomi Pad 6,Xiaomi Pad 6S Pro,Xiaomi Pad 7'
      }
    },
    'Apple': {
      phone: {
        low: '',
        mid: 'iPhone 6s,iPhone 7,iPhone 7 Plus,iPhone 8,iPhone 8 Plus,iPhone X,iPhone XR,iPhone SE 2020',
        high: 'iPhone XS,iPhone XS Max,iPhone 11,iPhone 11 Pro,iPhone 12,iPhone 12 Pro,iPhone 13,iPhone 13 Pro Max,iPhone SE 2022,iPhone 14,iPhone 14 Pro,iPhone 15,iPhone 15 Pro Max,iPhone 16,iPhone 16 Pro'
      },
      tablet: {
        low: '',
        mid: 'iPad 6,iPad 7,iPad 8,iPad mini 5',
        high: 'iPad 9,iPad 10,iPad Air 4,iPad Air 5,iPad Air M2,iPad mini 6,iPad Pro 11,iPad Pro 12.9'
      }
    },
    'Oppo': {
      phone: {
        low: 'A15,A16,A17,A18,A38,A3x,A54,A57',
        mid: 'A58,A78,A79,A96,Reno 6,Reno 7,Reno 8,Reno 10,Reno 11,Reno 12,F21 Pro',
        high: 'Find X3 Pro,Find X5,Find X6,Find X7,Reno 12 Pro,Reno 13'
      },
      tablet: { low: '', mid: 'Oppo Pad Air,Oppo Pad Neo', high: 'Oppo Pad 2' }
    },
    'Vivo': {
      phone: {
        low: 'Y02,Y03,Y12,Y15,Y17s,Y20,Y21,Y22,Y28',
        mid: 'Y27,Y36,Y56,Y100,V21,V23,V25,V27,V29,V30',
        high: 'X80,X90,X100,iQOO 9,iQOO 11,iQOO Neo 7,iQOO Neo 9'
      },
      tablet: { low: '', mid: 'Vivo Pad Air,Vivo Pad', high: 'Vivo Pad 2' }
    },
    'Huawei': {
      phone: {
        low: 'Y5,Y6,Y6p,Y7a,Y8p,Y9 Prime,Nova Y60,Nova Y70',
        mid: 'Y9a,Nova 8i,Nova 9,Nova 10,Nova 11,Nova 12',
        high: 'P30,P30 Pro,P40,P40 Pro,P50,P60,Mate 40,Mate 50,Mate 60'
      },
      tablet: { low: 'MatePad T10,MatePad T10s,MatePad SE', mid: 'MatePad 11,MatePad 11.5', high: 'MatePad Pro 11,MatePad Pro 13.2' }
    },
    'Motorola': {
      phone: {
        low: 'Moto E7,Moto E13,Moto E14,Moto E22,Moto E32,Moto G14,Moto G24,Moto G04',
        mid: 'Moto G23,Moto G34,Moto G54,Moto G64,Moto G73,Moto G84,Moto G85',
        high: 'Edge 30,Edge 40,Edge 50,Edge 50 Pro,Razr 40'
      },
      tablet: { low: 'Moto Tab G62', mid: 'Moto Tab G70', high: '' }
    },
    'Realme': {
      phone: {
        low: 'C11,C15,C20,C21Y,C25,C30,C33,C35,C51,C53,C55,C61,C63,Narzo 50i',
        mid: '8i,9i,10,11,11x,12,12+,Narzo 50,Narzo 60,Narzo 70',
        high: '9 Pro+,10 Pro+,11 Pro+,12 Pro+,GT Neo 3,GT Neo 5,GT 5,GT 6'
      },
      tablet: { low: 'Pad Mini', mid: 'Realme Pad,Realme Pad 2', high: '' }
    },
    'OnePlus': {
      phone: {
        low: '',
        mid: 'Nord N10,Nord N20,Nord N30,Nord CE 2,Nord CE 3,Nord CE 4',
        high: 'Nord 2,Nord 3,Nord 4,OnePlus 8,OnePlus 9,OnePlus 10 Pro,OnePlus 11,OnePlus 12,OnePlus 13'
      },
      tablet: { low: '', mid: '', high: 'OnePlus Pad,OnePlus Pad 2' }
    },
    'Google': {
      phone: {
        low: '',
        mid: 'Pixel 4a,Pixel 5a,Pixel 6a,Pixel 7a',
        high: 'Pixel 6,Pixel 6 Pro,Pixel 7,Pixel 7 Pro,Pixel 8,Pixel 8 Pro,Pixel 8a,Pixel 9,Pixel 9 Pro'
      },
      tablet: { low: '', mid: '', high: 'Pixel Tablet' }
    },
    'Honor': {
      phone: {
        low: 'X5,X6,X6a,X7,X7a',
        mid: 'X8,X8a,X9,X9a,X9b,Play 40,200 Lite',
        high: '90,Magic 5 Pro,Magic 6 Pro,200 Pro'
      },
      tablet: { low: '', mid: 'Honor Pad X8,Honor Pad X9', high: 'Honor Pad 9' }
    },
    'Nokia': {
      phone: { low: 'C01,C12,C21,C22,C32,G10,G11,G21', mid: 'G42,G60,X30', high: '' },
      tablet: { low: 'T10', mid: 'T20,T21', high: '' }
    },
    'Lenovo': {
      phone: { low: '', mid: '', high: 'Legion Phone Duel 2' },
      tablet: { low: 'Tab M8,Tab M10,Tab M10 Plus', mid: 'Tab P11,Tab P11 Plus,Tab P12', high: 'Tab P12 Pro,Legion Y700' }
    },
    'Asus / ROG': {
      phone: { low: '', mid: 'Zenfone 8', high: 'ROG Phone 5,ROG Phone 6,ROG Phone 7,ROG Phone 8,ROG Phone 9' },
      tablet: { low: '', mid: '', high: '' }
    },
    'RedMagic / Nubia': {
      phone: { low: '', mid: 'Nubia Neo', high: 'RedMagic 7,RedMagic 8 Pro,RedMagic 9 Pro,RedMagic 10 Pro' },
      tablet: { low: '', mid: '', high: 'RedMagic Nova' }
    }
  };

  /* ---------- LISTE À PLAT ---------- */
  const ALL = [];
  Object.keys(DB).forEach(function (brand) {
    ['phone', 'tablet'].forEach(function (type) {
      ['low', 'mid', 'high'].forEach(function (tier) {
        var s = DB[brand][type][tier];
        if (!s) return;
        s.split(',').forEach(function (m) {
          ALL.push({ brand: brand, type: type, model: m.trim(), tier: tier });
        });
      });
    });
  });

  /* ---------- MOTEUR DE SENSI ---------- */
  var FIELDS = [
    { key: 'general', label: 'Général' },
    { key: 'red',     label: 'Point rouge' },
    { key: 's2',      label: 'Lunette 2X' },
    { key: 's4',      label: 'Lunette 4X' },
    { key: 'awm',     label: 'Sniper / AWM' },
    { key: 'free',    label: 'Vue libre' }
  ];

  // base « milieu de gamme » pour chaque style (échelle 0–200)
  var BASE = {
    headshot: { general: 192, red: 188, s2: 172, s4: 158, awm: 84, free: 128 },
    rush:     { general: 198, red: 195, s2: 160, s4: 140, awm: 78, free: 135 },
    balanced: { general: 185, red: 180, s2: 165, s4: 150, awm: 90, free: 125 },
    sniper:   { general: 178, red: 172, s2: 175, s4: 165, awm: 105, free: 120 }
  };
  // les appareils modestes ont besoin d'un peu plus de vitesse, les gaming de moins
  var TIER = {
    low:  { general: 4,  red: 4,  s2: 3,  s4: 3,  awm: 0, free: 2 },
    mid:  { general: 0,  red: 0,  s2: 0,  s4: 0,  awm: 0, free: 0 },
    high: { general: -4, red: -4, s2: -3, s4: -3, awm: 0, free: -2 }
  };
  // grand écran : le doigt parcourt plus de distance, on compense
  var TABLET = { general: 5, red: 5, s2: 3, s4: 3, awm: 2, free: 4 };

  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  // petite variation stable propre à chaque modèle : même modèle = mêmes valeurs
  function jitter(seed, n) {
    var x = hash(seed + '#' + n) % 7; // 0..6
    return x - 3;                      // -3..+3
  }
  function clamp(v) { return Math.max(0, Math.min(200, Math.round(v))); }

  function computeSensi(o) {
    var base = BASE[o.style], t = TIER[o.power];
    var seed = (o.brand + '|' + o.model).toLowerCase();
    var out = {};
    FIELDS.forEach(function (f, i) {
      var v = base[f.key] + t[f.key];
      if (o.type === 'tablet') v += TABLET[f.key];
      v += jitter(seed, i);
      // le sniper reste modéré et le général ne dépasse pas le maximum
      out[f.key] = clamp(v);
    });
    return out;
  }

  function computeExtras(o) {
    var size = { headshot: '60 – 70 %', rush: '70 – 80 %', balanced: '65 – 75 %', sniper: '55 – 65 %' }[o.style];
    if (o.type === 'tablet') size = { headshot: '55 – 65 %', rush: '65 – 75 %', balanced: '60 – 70 %', sniper: '50 – 60 %' }[o.style];
    var fingers = { headshot: '3 doigts (griffe)', rush: '4 doigts (griffe)', balanced: '3 doigts', sniper: '2 ou 3 doigts' }[o.style];
    if (o.type === 'tablet') fingers = o.style === 'rush' ? '4 doigts' : '3 doigts, tablette posée ou tenue à deux mains';
    var perf = {
      low: 'Graphismes « Fluide », FPS le plus haut disponible, ferme les autres applications',
      mid: 'Graphismes « Standard » ou « Fluide », FPS élevé',
      high: 'FPS maximum et graphismes élevés possibles'
    }[o.power];
    return [
      ['Taille du bouton de tir', size],
      ['Disposition des doigts', fingers],
      ['Performance conseillée', perf],
      ['Test conseillé', 'Salle d\'entraînement, 10 minutes']
    ];
  }

  /* ---------- ÉLÉMENTS ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var el = {
    brand: $('brand'), model: $('model'), models: $('models'), power: $('power'), style: $('style'),
    status: $('model-status'), gen: $('generate'), resCard: $('result-card'), sliders: $('sliders'),
    meta: $('result-meta'), extras: $('extras'), copy: $('copy'), share: $('share'), save: $('save'),
    reset: $('reset'), favCard: $('fav-card'), favList: $('fav-list'), search: $('search'),
    chips: $('chips'), grid: $('grid'), more: $('more'), toast: $('toast')
  };

  var state = { type: 'phone', current: null, chip: 'Tous', page: 1 };
  var PAGE = 24;
  var TIER_LABEL = { low: 'Entrée de gamme', mid: 'Milieu de gamme', high: 'Haut de gamme' };
  var STYLE_LABEL = { headshot: 'Headshot', rush: 'Rush', balanced: 'Équilibré', sniper: 'Sniper' };

  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { el.toast.classList.remove('show'); }, 2000);
  }

  /* ---------- FORMULAIRE ---------- */
  function fillBrands() {
    var brands = Object.keys(DB).filter(function (b) {
      return ALL.some(function (x) { return x.brand === b && x.type === state.type; });
    });
    var prev = el.brand.value;
    el.brand.innerHTML = '';
    var all = document.createElement('option');
    all.value = '*'; all.textContent = 'Toutes les marques';
    el.brand.appendChild(all);
    brands.forEach(function (b) {
      var o = document.createElement('option');
      o.value = b; o.textContent = b;
      el.brand.appendChild(o);
    });
    var other = document.createElement('option');
    other.value = 'Autre'; other.textContent = 'Autre marque';
    el.brand.appendChild(other);
    if (prev && Array.prototype.some.call(el.brand.options, function (o) { return o.value === prev; })) el.brand.value = prev;
  }

  function fillModels() {
    el.models.innerHTML = '';
    ALL.filter(function (x) {
      return x.type === state.type && (el.brand.value === '*' || el.brand.value === 'Autre' || x.brand === el.brand.value);
    }).forEach(function (x) {
      var o = document.createElement('option');
      o.value = x.model;
      if (el.brand.value === '*') o.label = x.brand;
      el.models.appendChild(o);
    });
  }

  function findModel(name) {
    var n = name.trim().toLowerCase();
    if (!n) return null;
    var pool = ALL.filter(function (x) { return x.type === state.type; });
    var exact = pool.filter(function (x) {
      return x.model.toLowerCase() === n && (el.brand.value === '*' || el.brand.value === 'Autre' || x.brand === el.brand.value);
    });
    if (exact.length) return exact[0];
    // accepte aussi « Samsung Galaxy A05 », ou un modèle d'une autre marque
    var full = pool.filter(function (x) { return (x.brand + ' ' + x.model).toLowerCase() === n; });
    if (full.length) return full[0];
    var any = pool.filter(function (x) { return x.model.toLowerCase() === n; });
    return any[0] || null;
  }

  function onModelInput() {
    var found = findModel(el.model.value);
    if (found) {
      el.power.value = found.tier;
      if (el.brand.value !== found.brand) { el.brand.value = found.brand; fillModels(); }
      el.status.textContent = '✓ reconnu';
      el.status.className = '';
    } else if (el.model.value.trim()) {
      el.status.textContent = 'non listé : base créée';
      el.status.className = 'warn';
    } else {
      el.status.textContent = '';
    }
  }

  function readForm() {
    var found = findModel(el.model.value);
    var brand = el.brand.value;
    if (found) brand = found.brand;
    if (brand === '*') brand = 'Autre';
    var model = el.model.value.trim() || (state.type === 'tablet' ? 'Tablette' : 'Téléphone');
    return { type: state.type, brand: brand, model: model, power: el.power.value, style: el.style.value };
  }

  /* ---------- AFFICHAGE ---------- */
  function render(o, scroll) {
    var sens = computeSensi(o);
    state.current = { o: o, sens: sens };

    el.resCard.hidden = false;
    var title = (o.brand !== 'Autre' ? o.brand + ' ' : '') + o.model;
    el.meta.textContent = (o.type === 'tablet' ? 'Tablette' : 'Téléphone') + ' · ' + title + ' · ' + TIER_LABEL[o.power] + ' · ' + STYLE_LABEL[o.style];

    el.sliders.innerHTML = '';
    FIELDS.forEach(function (f) {
      var row = document.createElement('div');
      row.className = 'row';
      row.innerHTML = '<div class="row-top"><span>' + f.label + '</span><b>' + sens[f.key] + '</b></div>' +
        '<div class="track"><div class="fill"></div></div>';
      el.sliders.appendChild(row);
      var fill = row.querySelector('.fill');
      requestAnimationFrame(function () { requestAnimationFrame(function () { fill.style.width = (sens[f.key] / 200 * 100) + '%'; }); });
    });

    el.extras.innerHTML = '';
    computeExtras(o).forEach(function (e) {
      var d = document.createElement('div');
      d.className = 'extra';
      d.innerHTML = '<span></span><b></b>';
      d.firstChild.textContent = e[0];
      d.lastChild.textContent = e[1];
      el.extras.appendChild(d);
    });

    if (scroll) el.resCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function asText() {
    if (!state.current) return '';
    var o = state.current.o, s = state.current.sens;
    var lines = ['🔥 FREE FIRE SENSI PRO', (o.brand !== 'Autre' ? o.brand + ' ' : '') + o.model + ' — ' + STYLE_LABEL[o.style], ''];
    FIELDS.forEach(function (f) { lines.push(f.label + ' : ' + s[f.key]); });
    return lines.join('\n');
  }

  /* ---------- FAVORIS ---------- */
  var KEY = 'ffsensi.favs';
  function loadFavs() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } }
  function storeFavs(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) { /* stockage indisponible */ } }

  function renderFavs() {
    var favs = loadFavs();
    el.favCard.hidden = !favs.length;
    el.favList.innerHTML = '';
    favs.forEach(function (o, i) {
      var d = document.createElement('div');
      d.className = 'fav';
      var b = document.createElement('button');
      b.className = 'load'; b.type = 'button';
      b.innerHTML = '<span></span><small></small>';
      b.firstChild.textContent = (o.brand !== 'Autre' ? o.brand + ' ' : '') + o.model;
      b.lastChild.textContent = (o.type === 'tablet' ? 'Tablette' : 'Téléphone') + ' · ' + STYLE_LABEL[o.style];
      b.addEventListener('click', function () { loadConfig(o, true); });
      var x = document.createElement('button');
      x.type = 'button'; x.setAttribute('aria-label', 'Supprimer'); x.textContent = '✕';
      x.addEventListener('click', function () {
        var a = loadFavs(); a.splice(i, 1); storeFavs(a); renderFavs();
      });
      d.appendChild(b); d.appendChild(x);
      el.favList.appendChild(d);
    });
  }

  function setType(t) {
    state.type = t;
    document.querySelectorAll('.seg-btn').forEach(function (b) {
      var on = b.dataset.type === t;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on);
    });
    fillBrands(); fillModels();
    renderChips(); renderGrid(true);
  }

  function loadConfig(o, scroll) {
    if (o.type !== state.type) setType(o.type);
    el.brand.value = o.brand;
    if (el.brand.value !== o.brand) el.brand.value = 'Autre';
    fillModels();
    el.model.value = o.model;
    el.power.value = o.power;
    el.style.value = o.style;
    onModelInput();
    render(o, scroll);
  }

  /* ---------- CATALOGUE ---------- */
  function renderChips() {
    var brands = ['Tous'].concat(Object.keys(DB).filter(function (b) {
      return ALL.some(function (x) { return x.brand === b && x.type === state.type; });
    }));
    if (brands.indexOf(state.chip) < 0) state.chip = 'Tous';
    el.chips.innerHTML = '';
    brands.forEach(function (b) {
      var c = document.createElement('button');
      c.type = 'button';
      c.className = 'chip' + (b === state.chip ? ' active' : '');
      c.textContent = b;
      c.addEventListener('click', function () { state.chip = b; renderChips(); renderGrid(true); });
      el.chips.appendChild(c);
    });
  }

  function filtered() {
    var q = el.search.value.trim().toLowerCase();
    return ALL.filter(function (x) {
      if (x.type !== state.type) return false;
      if (state.chip !== 'Tous' && x.brand !== state.chip) return false;
      return !q || (x.brand + ' ' + x.model).toLowerCase().indexOf(q) > -1;
    });
  }

  function renderGrid(reset) {
    if (reset) state.page = 1;
    var list = filtered();
    var shown = list.slice(0, state.page * PAGE);
    el.grid.innerHTML = '';
    if (!list.length) {
      el.grid.innerHTML = '<p class="empty">Aucun modèle trouvé. Écris ton modèle dans le formulaire du haut : une base sera créée pour toi.</p>';
    }
    shown.forEach(function (x) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'item';
      var s = computeSensi({ type: x.type, brand: x.brand, model: x.model, power: x.tier, style: 'headshot' });
      b.innerHTML = '<span><b></b><small></small></span><span class="badge ' + x.tier + '">' + { low: 'Modeste', mid: 'Milieu', high: 'Gaming' }[x.tier] + '</span>';
      b.querySelector('b').textContent = x.model;
      b.querySelector('small').textContent = x.brand + ' · Général ' + s.general + ' · Point rouge ' + s.red;
      b.addEventListener('click', function () {
        loadConfig({ type: x.type, brand: x.brand, model: x.model, power: x.tier, style: el.style.value }, true);
      });
      el.grid.appendChild(b);
    });
    el.more.hidden = shown.length >= list.length;
  }

  /* ---------- ÉVÉNEMENTS ---------- */
  document.querySelectorAll('.seg-btn').forEach(function (b) {
    b.addEventListener('click', function () { setType(b.dataset.type); el.model.value = ''; onModelInput(); });
  });
  el.brand.addEventListener('change', function () { fillModels(); onModelInput(); });
  el.model.addEventListener('input', onModelInput);
  el.model.addEventListener('change', onModelInput);
  el.gen.addEventListener('click', function () {
    if (!el.model.value.trim()) {
      toast('Écris ou choisis ton modèle d\'abord');
      el.model.focus();
      return;
    }
    render(readForm(), true);
  });
  el.style.addEventListener('change', function () { if (state.current) render(readForm(), false); });
  el.power.addEventListener('change', function () { if (state.current) render(readForm(), false); });

  el.copy.addEventListener('click', function () {
    var t = asText();
    function ok() { toast('Sensibilités copiées ✓'); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(ok, fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); ok(); } catch (e) { toast('Copie impossible'); }
      document.body.removeChild(ta);
    }
  });
  el.share.addEventListener('click', function () {
    window.open('https://wa.me/?text=' + encodeURIComponent(asText()), '_blank', 'noopener');
  });
  el.save.addEventListener('click', function () {
    if (!state.current) return;
    var a = loadFavs(), o = state.current.o;
    var exists = a.some(function (f) { return f.model === o.model && f.brand === o.brand && f.style === o.style && f.type === o.type; });
    if (exists) { toast('Déjà sauvegardée'); return; }
    a.unshift(o); storeFavs(a.slice(0, 20)); renderFavs(); toast('Sauvegardée ⭐');
  });
  el.reset.addEventListener('click', function () {
    el.model.value = ''; el.brand.value = '*'; el.power.value = 'mid'; el.style.value = 'headshot';
    fillModels(); onModelInput();
    el.resCard.hidden = true; state.current = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  el.search.addEventListener('input', function () { renderGrid(true); });
  el.more.addEventListener('click', function () { state.page++; renderGrid(false); });

  /* ---------- DÉMARRAGE ---------- */
  fillBrands(); fillModels(); renderChips(); renderGrid(true); renderFavs();

  // exposé pour les tests
  window.__sensi = { computeSensi: computeSensi, ALL: ALL };
})();
