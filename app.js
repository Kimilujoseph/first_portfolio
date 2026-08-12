/* ================================================
   TIMOTHY JOSEPH KIMILU - PORTFOLIO APP.JS
   Three.js Mesh Animation + Updated Projects Logic
   ================================================ */

'use strict';

/* -----------------------------------------------
   DATA
----------------------------------------------- */
const SKILLS = [
  { name: 'JavaScript', icon: '🟨' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Python', icon: '🐍' },
  { name: 'React.js', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Express.js', icon: '🚂' },
  { name: 'Django', icon: '🎸' },
  { name: 'MySQL', icon: '🗄️' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Nginx', icon: '🔵' },
  { name: 'Git', icon: '🔀' },
  { name: 'Linux', icon: '🐧' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Prometheus', icon: '📊' },
  { name: 'Jest', icon: '🃏' },
  { name: 'pytest', icon: '🧪' },
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'Redis', icon: '🔴' },
  { name: 'Puppeteer', icon: '🤖' },
  { name: 'REST APIs', icon: '🔌' },
  { name: 'Bootstrap', icon: '🅱️' },
];

const PROJECTS = [
  {
    id: 'inventory-pos',
    number: '01',
    title: 'Inventory, Multi-Shop & POS Management System',
    shortDesc: 'A client-server web application engineered to centralize operations for mobile and accessory retail, encompassing multi-branch stock control, POS checkout, staff commissions, and real-time managerial analytics.',
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'MySQL', 'Prisma ORM', 'Redis', 'BullMQ', 'Nginx', 'Tailwind CSS'],
    liveUrl: 'https://captech-limited.co.ke',
    githubUrl: '#',
    demoCredentials: {
      manager: 'manager@gmail.com',
      seller: 'seller@gmail.com',
      password: '12345678'
    },
    features: [
      'Role-Based Access Control (RBAC): Enforces granular privileges across 3 user roles (Superuser, Manager, Seller) with dynamic shop mappings and account lifecycle rules.',
      'Inventory & Multi-Location Stock Control: Real-time stock tracking across central warehouses and individual retail outlets for devices and accessories.',
      'Accountable Movement Workflows: Two-step confirmation process for warehouse-to-shop distributions and shop-to-shop inventory transfers.',
      'Stock Rejection & Audit Logging: Receiving sellers can reject deliveries with specific reasons, returning stock to the source with full audit tracking.',
      'Streamlined POS & Automated Commissions: Rapid checkout interface supporting cash, M-Pesa, card, and financing with instant per-item staff commission calculations.',
      'Analytics & Financial Dashboards: Interactive tracking of Gross Profit, Net Revenue, Operating Expenses, Net Operating Income, and Accounts Receivable with time/shop/seller filters.',
      'Superuser Sales Reversals: Restricts transaction reversals exclusively to Superusers, automatically restoring stock and reversing profits and commissions.',
      'Complete System Integrity: Detailed audit trails logging role changes, stock movements, confirmations, and reversals with timestamps and user IDs.'
    ],
    engineering: `Engineered as an N-tier client-server architecture combining a React + TypeScript frontend with a layered Node.js / Express.js REST API backend and MySQL database via Prisma ORM.

Key Engineering Highlights:
• Repository Pattern & Layered Logic: Database queries are isolated within dedicated repository classes (SalesRepository, InventoryRepository), keeping core business logic in the Service layer fully decoupled.
• Transactional Integrity (prisma.$transaction): Multi-item POS checkouts, returns reversals, and stock transfers are wrapped in atomic database transactions to enforce strict ACID compliance.
• Low-Latency Analytics Pre-Aggregation: Dashboard metrics utilize pre-aggregated analytics tables (DailySalesAnalytics, SellerPerformanceKPI) and database indexing strategies for high-speed reporting under heavy load.
• Resilient Database Infrastructure: Implements connection retry logic (connectWithRetry) on startup and a singleton PrismaClient pattern to avoid connection pool exhaustion.
• Centralized Error & Response Pipelines: Custom error classes (AppError, ValidationError, AuthenticationError) are intercepted by a global Express middleware handler to ensure safe, standardized HTTP responses without stack trace leaks.
• Production Infrastructure: Deployed on Ubuntu 22.04 LTS VPS using Nginx reverse proxy with SSL termination, PM2 process management, Redis/BullMQ task queue, and Cloudinary media uploads.`
  },
  {
    id: 'job-platform',
    number: '02',
    title: 'Gamitch Solutions Recruitment Platform',
    shortDesc: 'A scalable, full-stack recruitment ecosystem built with Python & Django that automates talent sourcing, recruiter document verification, job posting management, background web scraping, and skills-based candidate matching.',
    tech: ['Python', 'Django', 'Django REST Framework', 'MySQL', 'Celery', 'Redis', 'Django Channels', 'SimpleJWT'],
    liveUrl: 'https://careers.augustusstores.co.ke',
    githubUrl: '#',
    demoCredentials: {
      manager: 'manager@gmail.com',
      jobseeker: 'jobseeker@gmail.com',
      password: '12345678'
    },
    features: [
      'Identity & Access Management: Stateless SimpleJWT authentication with role-based routing (Job Seeker, Recruiter, Admin).',
      'Job Seeker Experience & Skill Matrix: Rich candidate profiles capturing portfolios, GitHub/LinkedIn links, summaries, and self-reported skill matrices mapped to platform entities.',
      'Recruiter Suite & Admin Document Verification: Company registration workflows with official document upload verification prior to active vacancy publishing.',
      'Structured Job Posting Engine: Full CRUD operations for vacancies with filtering by job type, experience level, and required skill tags.',
      'Automated External Web Scraper: Background scraper tasks continuously aggregate external market listings to expand candidate opportunity volume.',
      'Real-Time WebSockets & Search Engine: Django Channels powered notifications alongside platform-wide query filtering across candidates, recruiters, and open roles.'
    ],
    engineering: `Structured using a strict 3-Tier Architecture (Presentation Layer → Business Logic Service Layer → Repository Data Access Layer via Django ORM & MySQL).

Key Engineering Highlights:
• Repository Pattern Encapsulation: Database query logic is isolated in dedicated Repository classes (/repository), preventing raw database queries from leaking into REST serializers or views.
• Lean Controllers & Service Layer: Django REST views handle payload validation and serialization, delegating core business rules directly to Service Layer modules (/services).
• Asynchronous Task Engine (Celery + Redis Broker): Offloads heavy background operations—such as scraping external job platforms (job_scraper), email dispatching, and candidate resume processing—to worker pools.
• Real-Time Gateway (Django Channels): Establishes persistent WebSockets for instant applicant notifications and real-time recruitment pipeline updates.
• Normalized Data Model: Job entities are stored in structured schema format rather than raw text, creating an indexable foundation for skill matching and analytics.`
  },
  {
    id: 'ai-jadi-craft',
    number: '03',
    title: 'AI-Powered Cultural Learning & Artisan Marketplace',
    shortDesc: 'An interactive, AI-driven backend service designed to preserve cultural heritage by packaging knowledge into an intelligent chat interface with dynamic prompt orchestration, multimodal TTS narration, and an embedded artisan marketplace.',
    tech: ['Node.js', 'Express.js', 'Generative AI', 'TTS Integration', 'MySQL', 'Prisma ORM', 'Redis', 'SimpleJWT'],
    liveUrl: '#',
    githubUrl: 'https://github.com/Kimilujoseph/jadi_craft_ai_app',
    features: [
      'Prompt Orchestration & Categorization: Automatically classifies incoming user prompts into domain categories before dynamically injecting constraints and contextual vendor data.',
      'Automatic Session Titling: Captures initial user prompts to generate and persist meaningful conversation session headers in the database.',
      'Resilient Multimodal LLM & TTS: Decoupled provider layer (LLMProvider) that automatically switches to a secondary LLM if the primary model fails or times out, returning signed audio URLs (audioUrl) for accessibility.',
      'Contextual Artisan Marketplace Integration: When user queries match vendor product categories (e.g., pottery, art), the orchestrator natively weaves artisan product listings into the generated AI narrative response.',
      'Role-Based Vendor Onboarding: Explicit multi-role hierarchy (USER, VENDOR, ADMIN) for listing management, category tagging, and website link verification.',
      'Production Reliability & Guardrails: Daily request rate limiting (Redis/DB) and UUID idempotency keys to prevent duplicate LLM processing and duplicate analytics logging.',
      'Centralized Audit Logging & Observability: Logs every request payload, error state, fallback trigger, and LLM response payload to MySQL via Prisma ORM.'
    ],
    engineering: `Built using a Service-Oriented Architecture (SOA) separating the Express middleware execution flow from core prompt assembly, provider integration, and model execution.

Key Engineering Highlights:
• Decoupled Provider Pattern: High-level services interact with generic LLMProvider interfaces rather than raw SDK APIs. Swapping an LLM or TTS vendor requires zero adjustments to orchestrators or Express controllers.
• Middleware-Driven Resiliency: Custom Express middleware handles daily rate limits, JWT authorization, idempotency checks, and error transformations outside core business handlers.
• Idempotent Execution Engine: Processes client UUIDs (idempotencyKey) on requests to guarantee network glitches or client retries never re-execute expensive LLM calls or duplicate database logs.
• Modular Pipeline: User Request → Express Middleware (Rate Limit/Auth/Idempotency) → Prompt Orchestrator (Categorizer/Marketplace Fetch/Template Engine/LLM/TTS) → Persistence Layer (Prisma ORM & MySQL).`
  },
  {
    id: 'hackegerton',
    number: '04',
    title: 'HackEgerton — University Hackathon',
    shortDesc: 'Flagship hackathon organized for 60+ participants as Technical Lead of EUCOSSA (Egerton University Computer Science Club), facilitating workshops and mentorship.',
    tech: ['Event Management', 'Technical Workshops', 'Community Leadership'],
    liveUrl: 'https://hackegerton.xyz',
    githubUrl: '#',
    features: [
      'Organized technical workshops and mentorship sessions for participants',
      'Led overall hackathon planning, challenge design, and execution',
      'Managed 60+ active student members and developer teams',
      'Facilitated cross-disciplinary learning, collaborative problem solving, and mentorship',
      'Coordinated technical resources, platform infrastructure, and judging criteria'
    ],
    engineering: `As Technical Lead of EUCOSSA, I was responsible for the end-to-end technical leadership of HackEgerton. This included formulating challenge tracks, arranging mentors, structuring repository guidelines, and coordinating logistics to ensure a successful 24-hour hackathon experience for over 60 student developers.`
  }
];

/* -----------------------------------------------
   THREE.JS MESH BACKGROUND (LIGHT MODE TUNED)
----------------------------------------------- */
function initThreeJS() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 50);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0xffffff, 0);

  // Particles
  const particleCount = 140;
  const positions = new Float32Array(particleCount * 3);
  const spread = 120;

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.4;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x0284C7,
    size: 0.7,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Connecting lines
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x0284C7,
    transparent: true,
    opacity: 0.15,
  });

  const lineGroup = new THREE.Group();
  const threshold = 22;

  for (let i = 0; i < particleCount; i++) {
    for (let j = i + 1; j < particleCount; j++) {
      const xi = positions[i * 3], yi = positions[i * 3 + 1], zi = positions[i * 3 + 2];
      const xj = positions[j * 3], yj = positions[j * 3 + 1], zj = positions[j * 3 + 2];
      const dist = Math.sqrt((xi - xj) ** 2 + (yi - yj) ** 2 + (zi - zj) ** 2);
      if (dist < threshold) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(xi, yi, zi),
          new THREE.Vector3(xj, yj, zj),
        ]);
        lineGroup.add(new THREE.Line(lineGeo, lineMat));
      }
    }
  }
  scene.add(lineGroup);

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    particles.rotation.y = elapsed * 0.03 + mouseX * 0.06;
    particles.rotation.x = elapsed * 0.015 + mouseY * 0.03;
    lineGroup.rotation.y = elapsed * 0.03 + mouseX * 0.06;
    lineGroup.rotation.x = elapsed * 0.015 + mouseY * 0.03;

    particleMat.opacity = 0.45 + Math.sin(elapsed * 0.8) * 0.15;
    lineMat.opacity = 0.1 + Math.sin(elapsed * 0.5) * 0.05;

    renderer.render(scene, camera);
  }
  animate();
}

/* -----------------------------------------------
   NAVIGATION
----------------------------------------------- */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksEl.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksEl.classList.remove('open');
    });
  });

  document.getElementById('nav-logo-btn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function updateActiveLink() {
    const sections = ['home', 'projects', 'contact'];
    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
}

/* -----------------------------------------------
   SKILLS GRID
----------------------------------------------- */
function initSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = '';

  SKILLS.forEach(skill => {
    const cell = document.createElement('div');
    cell.className = 'skill-cell scroll-reveal';
    cell.innerHTML = `
      <span class="skill-icon">${skill.icon}</span>
      <span class="skill-name">${skill.name}</span>
    `;
    grid.appendChild(cell);
  });
}

/* -----------------------------------------------
   PROJECTS GRID
----------------------------------------------- */
function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  PROJECTS.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card scroll-reveal';
    card.setAttribute('data-id', project.id);

    const techTags = project.tech.slice(0, 3).map(t => `<span>${t}</span>`).join('');

    card.innerHTML = `
      <div class="project-card-header">
        <span class="project-number">PROJECT ${project.number}</span>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.shortDesc}</p>
      </div>
      <div class="project-card-footer">
        <div class="project-tech-mini">${techTags}</div>
        <button class="view-details-btn" aria-label="View details for ${project.title}">
          View Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    `;

    card.addEventListener('click', () => openProjectDetail(project.id));
    grid.appendChild(card);
  });
}

/* -----------------------------------------------
   PROJECT DETAIL VIEW
----------------------------------------------- */
function openProjectDetail(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  const projectsGrid = document.getElementById('projects-grid');
  const detailSection = document.getElementById('project-detail');

  document.getElementById('detail-title').textContent = project.title;
  document.getElementById('detail-desc').textContent = project.shortDesc;

  // Render Demo Credentials box if available
  const actionsEl = document.getElementById('detail-actions');
  actionsEl.innerHTML = '';

  if (project.demoCredentials) {
    const credsBox = document.createElement('div');
    credsBox.className = 'demo-creds-box';
    let credsContent = `<strong>🔑 Demo Login Credentials</strong>`;
    if (project.demoCredentials.manager) {
      credsContent += `<div>Manager: <code>${project.demoCredentials.manager}</code></div>`;
    }
    if (project.demoCredentials.seller) {
      credsContent += `<div>Seller: <code>${project.demoCredentials.seller}</code></div>`;
    }
    if (project.demoCredentials.jobseeker) {
      credsContent += `<div>Jobseeker: <code>${project.demoCredentials.jobseeker}</code></div>`;
    }
    if (project.demoCredentials.password) {
      credsContent += `<div>Password: <code>${project.demoCredentials.password}</code></div>`;
    }
    credsBox.innerHTML = credsContent;
    actionsEl.appendChild(credsBox);
  }

  // Buttons
  if (project.liveUrl && project.liveUrl !== '#') {
    const liveBtn = document.createElement('a');
    liveBtn.href = project.liveUrl;
    liveBtn.target = '_blank';
    liveBtn.rel = 'noopener';
    liveBtn.className = 'btn btn-primary';
    liveBtn.innerHTML = `View Live Application <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>`;
    actionsEl.appendChild(liveBtn);
  }
  if (project.githubUrl && project.githubUrl !== '#') {
    const ghBtn = document.createElement('a');
    ghBtn.href = project.githubUrl;
    ghBtn.target = '_blank';
    ghBtn.rel = 'noopener';
    ghBtn.className = 'btn btn-outline';
    ghBtn.innerHTML = `View GitHub Repository <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
    actionsEl.appendChild(ghBtn);
  }

  // Tech tags
  const tagsEl = document.getElementById('detail-tags');
  tagsEl.innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');

  // Features
  const featuresEl = document.getElementById('detail-features');
  featuresEl.innerHTML = `
    <div class="detail-block">
      <h3>Key Features</h3>
      <ul>${project.features.map(f => `<li>${f}</li>`).join('')}</ul>
    </div>
  `;

  // Engineering
  const engineeringEl = document.getElementById('detail-engineering');
  const paragraphs = project.engineering.split('\n\n');
  engineeringEl.innerHTML = `
    <div class="detail-block">
      <h3>Engineering Focus</h3>
      ${paragraphs.map(p => `<p style="margin-bottom:14px;">${p.replace(/\n/g, '<br>')}</p>`).join('')}
    </div>
  `;

  if (projectsGrid) projectsGrid.style.display = 'none';
  detailSection.classList.remove('hidden');

  const navHeight = 70;
  const targetY = detailSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
  window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
}

function closeProjectDetail() {
  const projectsGrid = document.getElementById('projects-grid');
  const detailSection = document.getElementById('project-detail');
  const projectsSection = document.getElementById('projects');

  if (detailSection) detailSection.classList.add('hidden');
  if (projectsGrid) projectsGrid.style.display = '';

  if (projectsSection) {
    const navHeight = 70;
    const targetY = projectsSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  }
}

/* -----------------------------------------------
   SCROLL REVEAL
----------------------------------------------- */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  function observeElements() {
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  }

  observeElements();
  const mutationObserver = new MutationObserver(observeElements);
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}

/* -----------------------------------------------
   CONTACT FORM
----------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const textarea = document.getElementById('contact-message');
  const counter = document.getElementById('char-counter');
  const sendBtn = document.getElementById('send-btn');

  if (textarea && counter) {
    textarea.addEventListener('input', () => {
      const remaining = 1000 - textarea.value.length;
      counter.textContent = remaining;
      counter.style.color = remaining < 100 ? '#EF4444' : '';
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email-input').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all fields.', 'error');
        return;
      }
      if (!isValidEmail(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      sendBtn.disabled = true;
      sendBtn.innerHTML = `Redirecting to WhatsApp... <span style="display:inline-block;animation:spin 1s linear infinite">⟳</span>`;

      const waText = `Hi Timothy!\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const waUrl = `https://wa.me/254757174430?text=${encodeURIComponent(waText)}`;

      setTimeout(() => {
        sendBtn.disabled = false;
        sendBtn.innerHTML = `Send via WhatsApp <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`;
        window.open(waUrl, '_blank');
        form.reset();
        if (counter) counter.textContent = '1000';
        showToast('Opening WhatsApp to send your message...', 'success');
      }, 600);
    });
  }

  const floatingChat = document.getElementById('floating-chat');
  if (floatingChat) {
    floatingChat.addEventListener('click', () => {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* -----------------------------------------------
   TOAST NOTIFICATION
----------------------------------------------- */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.cssText = `
    position: fixed; bottom: 90px; right: 24px;
    background: ${type === 'success' ? '#0F172A' : '#DC2626'};
    color: #FFFFFF; padding: 14px 22px; border-radius: 12px;
    font-size: 0.9rem; font-weight: 700; z-index: 9999;
    border: 2px solid ${type === 'success' ? '#0284C7' : '#EF4444'};
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    animation: floatIn 0.4s ease both;
    max-width: 340px; line-height: 1.4;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* -----------------------------------------------
   SMOOTH ANCHOR SCROLL
----------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');

      if (targetId === '#projects') {
        closeProjectDetail();
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 70;
        const targetY = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      }
    });
  });
}

/* -----------------------------------------------
   SPIN KEYFRAME
----------------------------------------------- */
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

/* -----------------------------------------------
   INIT ALL
----------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initThreeJS();
  initNavigation();
  initSkills();
  initProjects();
  initScrollReveal();
  initContactForm();
  initSmoothScroll();

  document.getElementById('back-btn').addEventListener('click', closeProjectDetail);
});
