// ===== DARK MODE =====
const themeBtn = document.getElementById("themeBtn");
const body = document.body;

const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  updateIcon();
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  updateIcon();
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-mode") ? "dark" : "light",
  );
});

function updateIcon() {
  const icon = themeBtn.querySelector("i");
  if (body.classList.contains("dark-mode")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${entry.target.id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((section) => observer.observe(section));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeSlideUp 0.6s ease forwards";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
);

document
  .querySelectorAll(".project-card, .blog-card, .aside-card")
  .forEach((el) => {
    el.style.opacity = "0";
    revealObserver.observe(el);
  });

// ===== CONTACT FORM =====
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      showToast("Veuillez remplir tous les champs.", "error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Adresse email invalide.", "error");
      return;
    }

    showToast(`Merci ${name} ! Votre message a bien été envoyé. 🎉`, "success");
    form.reset();
  });
}

// ===== TOAST NOTIFICATION =====
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: ${type === "success" ? "#10b981" : "#ef4444"};
    color: white;
    padding: 14px 28px;
    border-radius: 50px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 500;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    z-index: 9999;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 90vw;
    text-align: center;
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ===== SCROLL TO TOP =====
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.setAttribute("aria-label", "Retour en haut");
scrollBtn.style.cssText = `
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: var(--text, #1a1a2e);
  color: var(--bg, #fafaf8);
  border: none;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 999;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
`;
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "flex" : "none";
});
scrollBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);
scrollBtn.addEventListener(
  "mouseover",
  () => (scrollBtn.style.transform = "translateY(-3px)"),
);
scrollBtn.addEventListener(
  "mouseout",
  () => (scrollBtn.style.transform = "translateY(0)"),
);
