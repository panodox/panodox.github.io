// ===============================
// panodox
// script.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const card = document.querySelector(".card");
    const glow = document.getElementById("cursor-glow");
    const sections = document.querySelectorAll("section");
    const footer = document.querySelector("footer");
    const comment = document.querySelector(".comment");

    // ------------------------------------
    // Fade In
    // ------------------------------------

    requestAnimationFrame(() => {
        document.body.classList.add("loaded");
    });

    // ------------------------------------
    // Random greeting (2%)
    // ------------------------------------

    const greetings = [
        "// HELLO",
        "// WELCOME",
        "// GOOD EVENING",
        "// GOOD MORNING",
        "// HI"
    ];

    if (Math.random() < 0.02) {
        comment.textContent =
            greetings[Math.floor(Math.random() * greetings.length)];
    }

    // ------------------------------------
    // Mouse Glow
    // ------------------------------------

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener("mousemove", e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {

        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;

       glow.style.left = glowX + "px";
glow.style.top = glowY + "px";

        requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // ------------------------------------
    // Card Tilt
    // ------------------------------------

    window.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 1.3;
        const rotateX = -((y - centerY) / centerY) * 1.3;

        card.style.transform =
            `
            perspective(1400px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-2px)
            `;

        const shadowX = rotateY * 5;
        const shadowY = 20 + rotateX * -4;

        card.style.boxShadow =
            `${shadowX}px ${shadowY}px 55px rgba(0,0,0,.07)`;
    });

    // ------------------------------------
    // Reset card when mouse leaves
    // ------------------------------------

    document.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1400px) rotateX(0deg) rotateY(0deg)";

        card.style.boxShadow =
            "0 18px 55px rgba(0,0,0,.07)";
    });

    // ------------------------------------
    // Stagger section reveal
    // ------------------------------------

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");
            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => observer.observe(section));

    observer.observe(footer);

    // ------------------------------------
    // Floating animation
    // ------------------------------------

    let t = 0;

    function floatCard() {

        t += 0.008;

        const y = Math.sin(t) * 2;

        card.style.marginTop = `${y}px`;

        requestAnimationFrame(floatCard);

    }

    floatCard();

    // ------------------------------------
    // Smooth hover on links
    // ------------------------------------

    document.querySelectorAll("a").forEach(link => {

        link.addEventListener("mouseenter", () => {

            glow.style.opacity = "0.9";

        });

        link.addEventListener("mouseleave", () => {

            glow.style.opacity = "0.55";

        });

    });

    // ------------------------------------
    // Keyboard easter egg
    // type "math"
    // ------------------------------------

    let typed = "";

    window.addEventListener("keydown", e => {

        typed += e.key.toLowerCase();

        if (typed.length > 10)
            typed = typed.slice(-10);

        if (typed.includes("math")) {

            document.body.classList.add("math-mode");

            setTimeout(() => {
                document.body.classList.remove("math-mode");
            }, 2500);

            typed = "";
        }

    });
// ------------------------------------
// Floating Dust
// ------------------------------------

const dust = document.getElementById("dust");

for (let i = 0; i < 45; i++) {

    const particle = document.createElement("div");

    particle.className = "dust-particle";

    particle.style.left =
        Math.random() * 100 + "%";

    particle.style.animationDuration =
        (15 + Math.random() * 25) + "s";

    particle.style.animationDelay =
        (-Math.random() * 20) + "s";

    particle.style.opacity =
        0.15 + Math.random() * 0.35;

    const size =
        1 + Math.random() * 3;

    particle.style.width =
        size + "px";

    particle.style.height =
        size + "px";

    dust.appendChild(particle);

}
    // ------------------------------------
    // Console message
    // ------------------------------------

    console.log(`
────────────────────────────

hello :)

thanks for looking around.

— panodox

────────────────────────────
`);

});
