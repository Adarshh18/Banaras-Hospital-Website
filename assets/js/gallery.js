/* =========================================================================
   BANARAS HOSPITAL — GALLERY SCRIPT
   Handles: masonry layout, scroll-reveal for tiles, and the lightbox viewer.
   ========================================================================= */
(() => {
  "use strict";

  const grid = document.querySelector("#masonry-grid");
  const items = Array.from(document.querySelectorAll(".gallery-item"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  /* ---------------- Masonry layout ---------------- */
  imagesLoaded(grid, () => {
    new Masonry(grid, {
      itemSelector: ".gallery-item",
      columnWidth: ".gallery-item",
      percentPosition: true,
      gutter: 20,
    });

    // Reveal tiles in a soft staggered wave once layout is known
    items.forEach((item, i) => {
      item.style.setProperty("--reveal-delay", `${(i % 6) * 0.06}s`);
      revealObserver.observe(item);
    });
  });

  /* ---------------- Lightbox ---------------- */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  const sources = items.map((item) => item.querySelector("img").getAttribute("src"));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function updateLightbox() {
    lightboxImg.src = sources[currentIndex];
    lightboxCounter.textContent = `${currentIndex + 1} / ${sources.length}`;
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + sources.length) % sources.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % sources.length;
    updateLightbox();
  }

  items.forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", showPrev);
  nextBtn.addEventListener("click", showNext);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
})();
