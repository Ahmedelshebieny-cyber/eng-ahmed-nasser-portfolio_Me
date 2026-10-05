const langBtn = document.getElementById('langBtn');
const themeBtn = document.getElementById('themeBtn');
const menuBtn = document.getElementById('menuBtn');
const siteNav = document.getElementById('siteNav');
const heroTitle = document.getElementById('heroTitle');

let ar = localStorage.getItem('portfolio-lang') === 'ar';
let typeToken = 0;

function typeHero(){
  const raw = ar ? heroTitle.dataset.ar : heroTitle.dataset.en;
  const m = raw.match(/^([\s\S]*?)<span>([\s\S]*?)<\/span>([\s\S]*)$/);
  const token = ++typeToken;
  if(!m){ heroTitle.innerHTML = raw; return; }

  const [pre, mid, post] = [m[1], m[2], m[3]];
  heroTitle.innerHTML = '';
  heroTitle.classList.add('typing-cursor');

  let i = 0;
  function stepPre(){
    if(token !== typeToken) return;
    if(i <= pre.length){
      heroTitle.innerHTML = pre.slice(0,i);
      i++;
      setTimeout(stepPre,26);
    } else {
      i = 0;
      heroTitle.innerHTML = pre + '<span></span>';
      stepMid();
    }
  }
  function stepMid(){
    if(token !== typeToken) return;
    const span = heroTitle.querySelector('span');
    if(i <= mid.length){
      span.textContent = mid.slice(0,i);
      i++;
      setTimeout(stepMid,34);
    } else {
      heroTitle.innerHTML = pre + '<span>' + mid + '</span>' + post;
      heroTitle.classList.remove('typing-cursor');
    }
  }
  stepPre();
}

function applyLang(){
  document.documentElement.lang = ar ? 'ar' : 'en';
  document.body.dir = ar ? 'rtl' : 'ltr';
  langBtn.textContent = ar ? 'English' : 'العربية';
  document.title = ar
    ? 'أحمد ناصر — مطور تطبيقات موبايل متعددة المنصات'
    : 'Ahmed Naser — Cross-Platform Mobile App Developer';

  document.querySelectorAll('[data-en][data-ar]').forEach(el => {
    if(el === heroTitle) return;
    el.innerHTML = ar ? el.dataset.ar : el.dataset.en;
  });
  localStorage.setItem('portfolio-lang', ar ? 'ar' : 'en');
  typeHero();
}

function applyTheme(theme){
  document.documentElement.dataset.theme = theme;
  const isLight = theme === 'light';
  themeBtn.textContent = isLight ? '🌙' : '☀️';
  themeBtn.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  themeBtn.setAttribute('aria-label', themeBtn.title);
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme');
const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(preferredTheme);

langBtn.addEventListener('click', () => {
  ar = !ar;
  applyLang();
});

themeBtn.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light');
});

menuBtn.addEventListener('click', () => {
  const open = siteNav.querySelector('.nav-links').classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.querySelector('.nav-links').classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

applyLang();
