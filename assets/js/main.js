/* =========================================================================
   BANARAS HOSPITAL — MAIN SCRIPT
   Handles: sticky header, mobile nav, scroll-reveal animations,
   animated stat counters, back-to-top, and the appointment form.
   ========================================================================= */
(() => {
  "use strict";

  /* ---------------- Sticky header ---------------- */
  const header = document.querySelector(".header");
  const onScroll = () => {
    header.classList.toggle("sticky", window.scrollY > 40);
    backToTop.classList.toggle("visible", window.scrollY > 500);
  };

  /* ---------------- Mobile nav ---------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("active"));
  });

  /* ---------------- Scroll-reveal animations ---------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------------- Animated stat counters ---------------- */
  const counters = document.querySelectorAll(".count");
  const animateCount = (el) => {
    const target = +el.getAttribute("data-target");
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.ceil(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => countObserver.observe(c));

  /* ---------------- Back to top ---------------- */
  const backToTop = document.querySelector(".back-to-top");
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ---------------- Appointment form submission ---------------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const modalOverlay = document.getElementById("popup-modal-overlay");
  const closeModalBtn = document.getElementById("popup-close-btn");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const response = await fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        modalOverlay.classList.add("active");
        form.reset();
        status.innerHTML = "";
        status.className = "";
      } else {
        const resData = await response.json();
        if (Object.hasOwn(resData, "errors")) {
          status.innerHTML = resData.errors.map((e) => e.message).join(", ");
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form.";
        }
        status.className = "error";
      }
    } catch (err) {
      status.innerHTML = "Oops! There was a problem submitting your form.";
      status.className = "error";
    }
  }

  if (form) form.addEventListener("submit", handleSubmit);

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => modalOverlay.classList.remove("active"));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (event) => {
      if (event.target === modalOverlay) modalOverlay.classList.remove("active");
    });
  }
})();
