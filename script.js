const slides = Array.from(document.querySelectorAll('.slide'));
    const dotsContainer = document.getElementById('sliderDots');
    let current = 0;
    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
      Array.from(dotsContainer.children).forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
      current = idx;
    }
    // Dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    });
    // Arrows
    document.getElementById('sliderPrev').onclick = () => showSlide((current - 1 + slides.length) % slides.length);
    document.getElementById('sliderNext').onclick = () => showSlide((current + 1) % slides.length);
    // Auto-slide
    let autoSlide = setInterval(() => showSlide((current + 1) % slides.length), 6000);
    // Pause on hover
    document.getElementById('heroSlider').addEventListener('mouseenter', () => clearInterval(autoSlide));
    document.getElementById('heroSlider').addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => showSlide((current + 1) % slides.length), 6000);
    });
    // Authors slider logic (corrected)
    const authorsSlider = document.querySelector('.authors-slider');
    const authorCards = document.querySelectorAll('.author-card');
    const leftArrow = document.querySelector('.authors-arrow.left');
    const rightArrow = document.querySelector('.authors-arrow.right');
    let authorIndex = 0;

    function updateAuthorsSlider() {
      authorCards.forEach((card, idx) => {
        if (idx === authorIndex) {
          card.classList.add('active');
          card.setAttribute('aria-hidden', 'false');
          card.style.transform = 'translateX(0)';
        } else if (idx < authorIndex) {
          card.classList.remove('active');
          card.setAttribute('aria-hidden', 'true');
          card.style.transform = 'translateX(-100%)';
        } else {
          card.classList.remove('active');
          card.setAttribute('aria-hidden', 'true');
          card.style.transform = 'translateX(100%)';
        }
      });
    }

    leftArrow.addEventListener('click', () => {
      authorIndex = (authorIndex - 1 + authorCards.length) % authorCards.length;
      updateAuthorsSlider();
    });
    rightArrow.addEventListener('click', () => {
      authorIndex = (authorIndex + 1) % authorCards.length;
      updateAuthorsSlider();
    });

    updateAuthorsSlider();
    // Light/Dark mode toggle
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const darkVars = {
      '--primary': '#22223b',
      '--secondary': '#4a4e69',
      '--accent': '#9a8c98',
      '--bg': '#232136',
      '--text': '#f8f8f2',
      '--nav-bg': 'rgba(34,34,59,0.85)',
      '--nav-blur': 'blur(12px)',
      '--nav-border': 'rgba(74,78,105,0.3)'
    };
    const lightVars = {
      '--primary': '#ffb347',
      '--secondary': '#ff5e62',
      '--accent': '#36d1c4',
      '--bg': '#fffbe7',
      '--text': '#222',
      '--nav-bg': 'rgba(255,255,255,0.7)',
      '--nav-blur': 'blur(12px)',
      '--nav-border': 'rgba(255,255,255,0.3)'
    };
    function setTheme(mode) {
      const vars = mode === 'dark' ? darkVars : lightVars;
      Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
      document.body.classList.toggle('dark-mode', mode === 'dark');
      themeToggle.innerHTML = mode === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', mode);
    }
    function toggleTheme() {
      const current = localStorage.getItem('theme') || 'light';
      setTheme(current === 'light' ? 'dark' : 'light');
    }
    themeToggle.addEventListener('click', toggleTheme);
    // On load
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    // Scroll reveal animation
    function revealOnScroll() {
      const reveals = document.querySelectorAll('.reveal');
      const windowHeight = window.innerHeight;
      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight * 0.92) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    }
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    // Responsive navbar toggle
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-label', mainNav.classList.contains('open') ? 'Close navigation' : 'Open navigation');
    });
    // Close nav on link click (mobile)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 700) {
          mainNav.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-label', 'Open navigation');
        }
      });
    });