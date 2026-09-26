/**
 * ==========================================================================
 * PORTFOLIO JAVASCRIPT — JEEL VACHHANI
 * Target: Aspiring AI/ML Engineer | MSc IT @ CHARUSAT University
 * Pure Vanilla JavaScript (ES6+), Zero Build Dependencies
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// 1. SINGLE CENTRALIZED PROFILE CONFIGURATION
// Replace the placeholder values below with your exact URLs and contact info.
// Every button and link on the website automatically reads from this object.
// --------------------------------------------------------------------------
const profile = {
  name: "Jeel Vachhani",
  title: "Aspiring AI/ML Engineer",
  education: "MSc Information Technology — CHARUSAT University",
  github: "ADD_GITHUB_URL",       // e.g. "https://github.com/jeelpatel3807"
  linkedin: "ADD_LINKEDIN_URL",   // e.g. "https://linkedin.com/in/yourprofile"
  email: "ADD_EMAIL",             // e.g. "jeelvachhani@example.com"
  whatsapp: "ADD_WHATSAPP_NUMBER", // e.g. "919876543210" (Country code without +)
  resume: "assets/resume/Jeel_Vachhani_Resume.pdf"
};

// --------------------------------------------------------------------------
// 2. DOM INITIALIZATION ON LOAD
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initProfileLinks();
  initTheme();
  initScrollProgress();
  initNavbar();
  initNeuralCanvas();
  initCursorGlow();
  initScrollReveal();
  initSkillFilters();
  initProjectFilters();
  initCopyEmail();
  initContactForm();
  initBackToTop();
});

// --------------------------------------------------------------------------
// 3. PROFILE LINKS BINDING (Single Source of Truth)
// --------------------------------------------------------------------------
function initProfileLinks() {
  // GitHub links
  document.querySelectorAll(".js-github-link").forEach((el) => {
    if (profile.github && profile.github !== "ADD_GITHUB_URL") {
      el.href = profile.github;
    } else {
      el.href = "https://github.com/";
      el.setAttribute("title", "GitHub URL to be configured");
    }
  });

  // LinkedIn links
  document.querySelectorAll(".js-linkedin-link").forEach((el) => {
    if (profile.linkedin && profile.linkedin !== "ADD_LINKEDIN_URL") {
      el.href = profile.linkedin;
    } else {
      el.href = "https://linkedin.com/";
      el.setAttribute("title", "LinkedIn URL to be configured");
    }
  });

  // Email links & text
  document.querySelectorAll(".js-email-link").forEach((el) => {
    if (profile.email && profile.email !== "ADD_EMAIL") {
      el.href = `mailto:${profile.email}`;
    } else {
      el.href = "mailto:hello@example.com";
    }
  });

  document.querySelectorAll(".js-email-text").forEach((el) => {
    el.textContent = profile.email;
  });

  // WhatsApp links
  document.querySelectorAll(".js-whatsapp-link").forEach((el) => {
    const defaultMsg = encodeURIComponent(
      "Hi Jeel, I reviewed your portfolio and would like to discuss an opportunity."
    );
    if (profile.whatsapp && profile.whatsapp !== "ADD_WHATSAPP_NUMBER") {
      el.href = `https://wa.me/${profile.whatsapp}?text=${defaultMsg}`;
    } else {
      el.href = `https://wa.me/?text=${defaultMsg}`;
    }
  });

  // Resume links
  document.querySelectorAll(".js-resume-link").forEach((el) => {
    el.href = profile.resume;
  });
}

// --------------------------------------------------------------------------
// 4. THEME TOGGLE (Dark / Light with LocalStorage Persistence)
// --------------------------------------------------------------------------
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggle");
  const htmlEl = document.documentElement;

  // Retrieve saved theme or prefer dark
  const savedTheme = localStorage.getItem("jv_portfolio_theme") || "dark";
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlEl.classList.contains("light") ? "light" : "dark";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("jv_portfolio_theme", newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }

  function applyTheme(theme) {
    if (theme === "light") {
      htmlEl.classList.remove("dark");
      htmlEl.classList.add("light");
    } else {
      htmlEl.classList.remove("light");
      htmlEl.classList.add("dark");
    }
  }
}

// --------------------------------------------------------------------------
// 5. TOP SCROLL PROGRESS BAR
// --------------------------------------------------------------------------
function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = `${scrolled}%`;
  }, { passive: true });
}

// --------------------------------------------------------------------------
// 6. NAVBAR & ACTIVE SECTION OBSERVER & MOBILE MENU
// --------------------------------------------------------------------------
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navMenu = document.getElementById("navMenu");
  const mobileToggle = document.getElementById("mobileNavToggle");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky navbar shadow on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.contains("mobile-active");
      if (isOpen) {
        navMenu.classList.remove("mobile-active");
        mobileToggle.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      } else {
        navMenu.classList.add("mobile-active");
        mobileToggle.classList.add("open");
        mobileToggle.setAttribute("aria-expanded", "true");
      }
    });

    // Close mobile menu on clicking any nav item
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("mobile-active");
        mobileToggle.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active Section Spy using IntersectionObserver
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => sectionObserver.observe(sec));
}

// --------------------------------------------------------------------------
// 7. INTERACTIVE NEURAL NETWORK CANVAS BACKGROUND
// --------------------------------------------------------------------------
function initNeuralCanvas() {
  const canvas = document.getElementById("neuralCanvas");
  if (!canvas) return;

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  let width, height;
  let animationId;
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 26 : 48;
  const maxDistance = 140;

  const mouse = {
    x: null,
    y: null,
    radius: 130
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.55;
      this.vy = (Math.random() - 0.5) * 0.55;
      this.radius = Math.random() * 2 + 1;
      // Palette selection: cyan, indigo, or purple
      const colors = [
        "rgba(6, 182, 212, ",
        "rgba(99, 102, 241, ",
        "rgba(168, 85, 247, "
      ];
      this.baseColor = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.4 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const dirX = dx / dist;
          const dirY = dy / dist;
          this.x -= dirX * force * 1.5;
          this.y -= dirY * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.baseColor}${this.alpha})`;
      ctx.shadowColor = `${this.baseColor}0.8)`;
      ctx.shadowBlur = 6;
      ctx.fill();
    }
  }

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting synapses
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const lineAlpha = (1 - dist / maxDistance) * 0.18;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(139, 92, 246, ${lineAlpha})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();
}

// --------------------------------------------------------------------------
// 8. INTERACTIVE CURSOR GLOW SPOT (DESKTOP)
// --------------------------------------------------------------------------
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || window.innerWidth < 1024) return;

  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}

// --------------------------------------------------------------------------
// 9. SCROLL REVEAL ANIMATIONS
// --------------------------------------------------------------------------
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px -40px 0px",
    threshold: 0.1
  });

  reveals.forEach((el) => revealObserver.observe(el));
}

// --------------------------------------------------------------------------
// 10. SKILLS CATEGORY FILTER
// --------------------------------------------------------------------------
function initSkillFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const skillBlocks = document.querySelectorAll(".skill-category-block");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-filter");

      skillBlocks.forEach((block) => {
        if (category === "all" || block.getAttribute("data-category") === category) {
          block.style.display = "flex";
          setTimeout(() => {
            block.style.opacity = "1";
            block.style.transform = "translateY(0)";
          }, 10);
        } else {
          block.style.opacity = "0";
          block.style.transform = "translateY(12px)";
          setTimeout(() => {
            block.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 11. PROJECTS CATEGORY FILTER
// --------------------------------------------------------------------------
function initProjectFilters() {
  const projBtns = document.querySelectorAll(".proj-filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  projBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      projBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-proj-filter");

      projectCards.forEach((card) => {
        const cardCats = card.getAttribute("data-category") || "";
        if (filterVal === "all" || cardCats.includes(filterVal)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.96)";
          setTimeout(() => {
            card.style.display = "none";
          }, 200);
        }
      });
    });
  });
}

// --------------------------------------------------------------------------
// 12. 1-CLICK COPY EMAIL WITH TOAST
// --------------------------------------------------------------------------
function initCopyEmail() {
  const copyBtn = document.getElementById("copyEmailBtn");
  if (!copyBtn) return;

  copyBtn.addEventListener("click", async () => {
    const emailToCopy = (profile.email && profile.email !== "ADD_EMAIL")
      ? profile.email
      : "jeelvachhani@example.com";

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = emailToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      showToast("Email address copied to clipboard!");
    } catch (err) {
      showToast("Could not copy automatically. Email: " + emailToCopy);
    }
  });
}

// --------------------------------------------------------------------------
// 13. DIRECT CONTACT FORM HANDLER
// --------------------------------------------------------------------------
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const subject = document.getElementById("formSubject").value.trim();
    const message = document.getElementById("formMessage").value.trim();

    if (!name || !email || !subject || !message) {
      showToast("Please fill in all required fields.");
      return;
    }

    // Construct Mailto URI to open default email client with populated fields
    const recipientEmail = (profile.email && profile.email !== "ADD_EMAIL")
      ? profile.email
      : "jeelvachhani@example.com";

    const bodyContent = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;

    showToast("Launching your email client...");
    window.location.href = mailtoUrl;

    contactForm.reset();
  });
}

// --------------------------------------------------------------------------
// 14. BACK TO TOP BUTTON
// --------------------------------------------------------------------------
function initBackToTop() {
  const bttBtn = document.getElementById("backToTop");
  if (!bttBtn) return;

  bttBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// --------------------------------------------------------------------------
// 15. TOAST NOTIFICATION HELPER
// --------------------------------------------------------------------------
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}
