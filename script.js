'use strict';

const projectDetails = {
  subscription: {
    number: '01 / FULL-STACK + AI',
    title: 'Subscription Tracker',
    intro: 'A practical way to track recurring costs, upcoming renewals and patterns in personal subscription spending.',
    challenge: 'Subscriptions become difficult to manage across different renewal dates and billing cycles. An AI assistant also needs to use the real database rather than guessing amounts.',
    build: [
      'Built a React frontend with authenticated pages for creating, editing, cancelling, reactivating and deleting subscription records.',
      'Created Node.js and Express API endpoints backed by Neon PostgreSQL, with user-specific queries protected by JWT authentication.',
      'Integrated a Groq-powered assistant that can call backend tools to retrieve spending summaries, renewal dates, subscription details and category breakdowns.'
    ],
    learned: 'Connecting separately deployed frontend and backend services, configuring environment variables, and debugging API URLs and AI integration.',
    live: 'https://subscription-tracker-eta-ten.vercel.app/',
    code: 'https://github.com/Aryannnn11/subscription-tracker'
  },
  payment: {
    number: '02 / FINTECH',
    title: 'Payment Gateway Portal',
    intro: 'A Razorpay-integrated payment workflow that shows what happens before, during and after a checkout.',
    challenge: 'A client-side success message cannot be trusted as proof of payment. Duplicate callbacks and out-of-order payment webhooks must not create conflicting records.',
    build: [
      'Used React and Express with JWT-protected transaction APIs and PostgreSQL-backed user/payment history.',
      'Created orders through Razorpay and verified payment signatures, order ownership, payment amount and status on the server.',
      'Added HMAC-verified webhooks for captured and failed events, event deduplication and transactional PostgreSQL updates. Tested the integration in Razorpay test mode.'
    ],
    learned: 'Working with payment provider APIs, HMAC signatures, webhook reliability, database constraints and idempotent processing.',
    live: 'https://payment-gateway-portal.vercel.app/',
    code: 'https://github.com/Aryannnn11/Payment-gateway-portal'
  },
  devtool: {
    number: '03 / DEVELOPER TOOLING',
    title: 'DevTool CLI',
    intro: 'An npm-published toolkit for everyday developer utilities, paired with a safe browser-based interactive terminal.',
    challenge: 'Turn unrelated developer utilities into a consistent command-line experience that can be tested, documented and distributed.',
    build: [
      'Organized Node.js commands with Commander.js for notes, GitHub metadata, JSON operations, file inspection and UUID generation.',
      'Added Vitest unit tests and GitHub Actions checks for installation, CLI behavior and npm package contents.',
      'Published aryan-devtool-cli to npm and built a separate web playground that simulates supported commands safely in the browser.'
    ],
    learned: 'CLI architecture, filesystem operations, package distribution, workflow automation and npm publishing authentication.',
    live: 'https://devtool-demo-eosin.vercel.app/',
    code: 'https://github.com/Aryannnn11/devtool',
    npm: 'https://www.npmjs.com/package/aryan-devtool-cli'
  },
  simon: {
    number: '04 / CREATIVE CODE',
    title: 'Simon Game',
    intro: 'A browser-based memory challenge where each level adds a color to an expanding sequence.',
    challenge: 'Synchronize timed sequence playback with the player input state, across both desktop and mobile devices.',
    build: [
      'Implemented randomized sequences, order validation, level progression and game-over state using vanilla JavaScript.',
      'Generated sounds with the Web Audio API and stored the highest completed level with localStorage.',
      'Made the four-color interface responsive and added a start button for touch users.'
    ],
    learned: 'Browser state management, user input timing, asynchronous animation and accessible touch interactions.',
    live: 'https://simon-game-olive-gamma.vercel.app/',
    code: 'https://github.com/Aryannnn11/Simon-game'
  }
};

const projectDialog = document.getElementById('case-dialog');
const projectDialogContent = document.getElementById('dialog-content');
const projectDialogKicker = document.getElementById('dialog-kicker');
const closeDialog = document.getElementById('dialog-close');

function textElement(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}
function addParagraph(target, heading, copy) {
  target.append(textElement('h4', heading), textElement('p', copy));
}
function addExternalLink(target, url, label) {
  const a = document.createElement('a');
  a.href = url;
  a.textContent = label + ' ↗';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  target.append(a);
}
function openProject(key) {
  const project = projectDetails[key];
  if (!project) return;
  projectDialogKicker.textContent = project.number + ' / CASE STUDY';
  projectDialogContent.replaceChildren();
  projectDialogContent.append(textElement('h2', project.title), textElement('p', project.intro));
  addParagraph(projectDialogContent, 'The problem', project.challenge);
  projectDialogContent.append(textElement('h4', 'What I built'));
  const list = document.createElement('ul');
  project.build.forEach(item => list.append(textElement('li', item)));
  projectDialogContent.append(list);
  addParagraph(projectDialogContent, 'What I learned', project.learned);
  const links = document.createElement('div');
  links.className = 'dialog-links';
  addExternalLink(links, project.live, 'Open live project');
  addExternalLink(links, project.code, 'View source');
  if (project.npm) addExternalLink(links, project.npm, 'npm package');
  projectDialogContent.append(links);
  projectDialog.showModal();
  closeDialog.focus();
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => openProject(btn.dataset.open));
});
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('keydown', event => {
    if (event.target !== card) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});
closeDialog.addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', event => { if (event.target === projectDialog) projectDialog.close(); });

const filterButtons = [...document.querySelectorAll('.filter-btn')];
const cards = [...document.querySelectorAll('.project-card')];
function setFilter(filter) {
  filterButtons.forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('selected', active);
    button.setAttribute('aria-pressed', String(active));
  });
  cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.type !== filter; });
}
filterButtons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));

const themeButton = document.getElementById('theme-toggle');
function applyTheme(theme) {
  document.body.classList.toggle('light', theme === 'light');
  themeButton.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  themeButton.querySelector('span').textContent = theme === 'light' ? 'Dark theme' : 'Light theme';
  try { localStorage.setItem('ak-v2-theme', theme); } catch {}
}
try { applyTheme(localStorage.getItem('ak-v2-theme') === 'light' ? 'light' : 'dark'); } catch { applyTheme('dark'); }
themeButton.addEventListener('click', () => applyTheme(document.body.classList.contains('light') ? 'dark' : 'light'));
document.getElementById('mobile-theme').addEventListener('click', () => applyTheme(document.body.classList.contains('light') ? 'dark' : 'light'));

document.getElementById('year').textContent = String(new Date().getFullYear());
const clock = document.getElementById('local-clock');
function updateClock() {
  try {
    const time = new Intl.DateTimeFormat('en-GB', {hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Kolkata'}).format(new Date());
    clock.textContent = 'CHENNAI / ' + time + ' IST';
  } catch { clock.textContent = 'CHENNAI · INDIA'; }
}
updateClock();
setInterval(updateClock, 60000);

const progress = document.getElementById('reading-progress');
function handleScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = max > 0 ? (scrollY / max * 100) + '%' : '0%';
}
addEventListener('scroll', handleScroll, {passive:true});
handleScroll();

if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === visible.target.id));
  }, {rootMargin:'-10% 0px -65% 0px', threshold:0});
  document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
}

const mobileMenu = document.getElementById('mobile-menu');
const mobileNav = document.getElementById('mobile-nav');
mobileMenu.addEventListener('click', () => {
  const open = mobileNav.hidden;
  mobileNav.hidden = !open;
  mobileMenu.setAttribute('aria-expanded', String(open));
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileNav.hidden = true;
  mobileMenu.setAttribute('aria-expanded', 'false');
}));

const palette = document.getElementById('palette');
const paletteInput = document.getElementById('palette-input');
const paletteResults = document.getElementById('palette-results');
const options = [
  {icon:'⌂', title:'Overview', action:() => location.hash='#home', hint:'Section'},
  {icon:'▦', title:'Projects', action:() => {setFilter('all'); location.hash='#projects';}, hint:'Section'},
  {icon:'◉', title:'About', action:() => location.hash='#about', hint:'Section'},
  {icon:'✳', title:'Tech Stack', action:() => location.hash='#stack', hint:'Section'},
  {icon:'↗', title:'Contact', action:() => location.hash='#contact', hint:'Section'},
  {icon:'01', title:'Subscription Tracker', action:() => openProject('subscription'), hint:'Case study'},
  {icon:'02', title:'Payment Gateway Portal', action:() => openProject('payment'), hint:'Case study'},
  {icon:'03', title:'DevTool CLI', action:() => openProject('devtool'), hint:'Case study'},
  {icon:'04', title:'Simon Game', action:() => openProject('simon'), hint:'Case study'},
  {icon:'PDF', title:'Open Resume', action:() => window.open('assets/resume.pdf','_blank','noopener,noreferrer'), hint:'Document'},
  {icon:'⌘', title:'GitHub Profile', action:() => window.open('https://github.com/Aryannnn11','_blank','noopener,noreferrer'), hint:'External'}
];
let matches = options;
let selected = 0;
function drawPalette() {
  const query = paletteInput.value.trim().toLowerCase();
  matches = options.filter(o => (o.title + ' ' + o.hint).toLowerCase().includes(query));
  selected = Math.min(selected, Math.max(0,matches.length-1));
  paletteResults.replaceChildren();
  if (!matches.length) {
    paletteResults.append(textElement('p','No matches — try “project” or “resume”.'));
    return;
  }
  matches.forEach((entry,index) => {
    const button = document.createElement('button');
    button.type='button';
    button.className = index === selected ? 'selected' : '';
    button.append(textElement('span',entry.icon), textElement('strong',entry.title), textElement('span',entry.hint));
    button.addEventListener('click', () => runOption(index));
    paletteResults.append(button);
  });
}
function openPalette() {
  if (projectDialog.open) projectDialog.close();
  paletteInput.value=''; selected=0; drawPalette(); palette.showModal();paletteInput.focus();
}
function runOption(index) {
  const entry = matches[index];
  if (!entry) return;
  palette.close();
  entry.action();
}
document.getElementById('palette-open').addEventListener('click',openPalette);
document.getElementById('mobile-palette').addEventListener('click',openPalette);
paletteInput.addEventListener('input', () => {selected=0;drawPalette();});
paletteInput.addEventListener('keydown',event => {
  if (event.key === 'ArrowDown') { event.preventDefault(); selected=(selected+1)%Math.max(matches.length,1);drawPalette(); }
  if (event.key === 'ArrowUp') { event.preventDefault(); selected=(selected-1+Math.max(matches.length,1))%Math.max(matches.length,1);drawPalette(); }
  if (event.key === 'Enter') {event.preventDefault(); runOption(selected);}
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {event.preventDefault(); if(!palette.open) openPalette();}
});
palette.addEventListener('click',event => {if(event.target === palette) palette.close();});