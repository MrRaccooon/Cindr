// ── Scroll reveal ────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

// ── Demo card swipe loop ──────────────────────────────────────────────────────

const card         = document.getElementById("demo-card");
const stampLike    = document.getElementById("stamp-like");
const stampSkip    = document.getElementById("stamp-skip");
const stampTrailer = document.getElementById("stamp-trailer");

if (card) {
  const phases = [
    { type: "like",    dx: 130,  dy: 0,   rot: 14  },
    { type: "skip",    dx: -130, dy: 0,   rot: -14 },
    { type: "trailer", dx: 0,   dy: -90,  rot: 0   },
  ];

  let phase = 0;
  let busy  = false;

  function resetCard() {
    card.style.transition = "none";
    card.style.transform  = "translate(0,0) rotate(0deg)";
    card.style.boxShadow  = "";
    stampLike.style.opacity = stampSkip.style.opacity = stampTrailer.style.opacity = "0";
  }

  function runPhase(p) {
    if (busy) return;
    busy = true;

    card.style.transition = "transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease";
    card.style.transform  = `translate(${p.dx}px, ${p.dy}px) rotate(${p.rot}deg)`;

    if (p.type === "like") {
      stampLike.style.opacity = "1";
      card.style.boxShadow = "0 24px 60px rgba(34,197,94,0.25)";
    } else if (p.type === "skip") {
      stampSkip.style.opacity = "1";
      card.style.boxShadow = "0 24px 60px rgba(239,68,68,0.25)";
    } else {
      stampTrailer.style.opacity = "1";
      card.style.boxShadow = "0 24px 60px rgba(216,90,48,0.25)";
    }

    setTimeout(() => {
      resetCard();
      busy = false;
    }, 1600);
  }

  // Stagger start
  setTimeout(() => {
    setInterval(() => {
      runPhase(phases[phase % phases.length]);
      phase++;
    }, 2800);
  }, 800);
}

// ── Nav scroll state ──────────────────────────────────────────────────────────

const nav = document.getElementById("nav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.style.borderBottomColor = window.scrollY > 20
      ? "rgba(255,255,255,0.1)"
      : "rgba(255,255,255,0.07)";
  }, { passive: true });
}
