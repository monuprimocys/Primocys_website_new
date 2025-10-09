// ======================
// HERO ANIMATIONS
// ======================
window.addEventListener("load", () => {
    const growthH3 = document.querySelector(".growth-solution h3");
    const growthBtns = document.querySelectorAll(".growth-btn");
    const heroTitle = document.querySelector(".hero-title");
    const heroSubtitle = document.querySelector(".hero-subtitle");
    const shimmerBtn = document.querySelector(".shimmer-btn");
    const heroBottom = document.querySelector(".hero-bottom");

    // Animate H3
    if (growthH3) {
        growthH3.style.opacity = "1";
        growthH3.style.transform = "translateY(0)";
        growthH3.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    }

    // Animate buttons sequentially
    growthBtns.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = "1";
            btn.style.transform = "translateY(0)";
            btn.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }, 200 * (index + 1));
    });

    // Animate Hero Title
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.style.opacity = "1";
            heroTitle.style.transform = "translateY(0)";
            heroTitle.style.transition = "opacity 1s ease, transform 1s ease";
        }, 800);
    }

    // Animate Hero Subtitle
    if (heroSubtitle) {
        setTimeout(() => {
            heroSubtitle.style.opacity = "1";
            heroSubtitle.style.transform = "translateY(0)";
            heroSubtitle.style.transition = "opacity 1s ease, transform 1s ease";
        }, 1000);
    }

    // Animate Shimmer Button
    if (shimmerBtn) {
        setTimeout(() => {
            shimmerBtn.style.opacity = "1";
            shimmerBtn.style.transform = "translateY(0)";
            shimmerBtn.style.transition = "opacity 1s ease, transform 1s ease";
        }, 1200);
    }

    // Animate Hero Bottom
    if (heroBottom) {
        setTimeout(() => {
            heroBottom.style.opacity = "1";
            heroBottom.style.transform = "translateY(0)";
            heroBottom.style.transition = "opacity 1s ease, transform 1s ease";
        }, 1400);
    }
});

// ======================
// COUNTER ANIMATION
// ======================
function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target")) || parseInt(element.textContent);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    element.textContent = "0+";

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + "+";
    }, 16);
}

// Intersection Observer for counters
const observerOptions = { threshold: 0.3, rootMargin: "0px 0px -50px 0px" };
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.classList.contains("happy-customer-card")) {
            const counter = entry.target.querySelector(".happy-customer-count");
            if (counter) animateCounter(counter);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".happy-customer-card").forEach((card) => counterObserver.observe(card));

    // Hover effect for happy customer cards
    document.querySelectorAll(".happy-customer-card").forEach((card) => {
        card.addEventListener("mouseenter", () => (card.style.transform = "translateY(-5px) scale(1.02)"));
        card.addEventListener("mouseleave", () => (card.style.transform = "translateY(0) scale(1)"));
    });

    // Tab functionality
    document.querySelectorAll(".tab-item").forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = document.getElementById(btn.dataset.tab);
            if (!target) return;
            document.querySelectorAll(".tab-item").forEach((b) => b.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
            btn.classList.add("active");
            target.classList.add("active");
        });
    });
});

// Smooth scroll
document.documentElement.style.scrollBehavior = "smooth";

// ======================
// SHOWCASE INFINITE SLIDER
// ======================
(function () {
    const track = document.querySelector(".showcase-card-track");
    if (!track) return;
    const slides = Array.from(track.children);
    const prevBtn = document.querySelector(".leftarrowbg");
    const nextBtn = document.querySelector(".rightarrowbg");
    const container = document.querySelector(".showcase-card_mainslide");
    let index = 1;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.prepend(lastClone);
    const allSlides = Array.from(track.children);

    let slideWidth = allSlides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * index}px)`;

    window.addEventListener("resize", () => {
        slideWidth = allSlides[0].getBoundingClientRect().width;
        track.style.transition = "none";
        track.style.transform = `translateX(-${slideWidth * index}px)`;
    });

    function goToSlide(idx) {
        track.style.transition = "transform 0.7s ease-in-out";
        track.style.transform = `translateX(-${slideWidth * idx}px)`;
        index = idx;
    }

    function nextSlide() {
        if (index < allSlides.length - 1) goToSlide(index + 1);
    }
    function prevSlide() {
        if (index > 0) goToSlide(index - 1);
    }

    track.addEventListener("transitionend", () => {
        if (allSlides[index] === firstClone) {
            track.style.transition = "none";
            index = 1;
            track.style.transform = `translateX(-${slideWidth * index}px)`;
        }
        if (allSlides[index] === lastClone) {
            track.style.transition = "none";
            index = slides.length;
            track.style.transform = `translateX(-${slideWidth * index}px)`;
        }
    });

    let autoSlide = setInterval(nextSlide, 3000);
    function stopAuto() {
        clearInterval(autoSlide);
        autoSlide = null;
    }
    function startAuto() {
        if (!autoSlide) autoSlide = setInterval(nextSlide, 3000);
    }

    if (nextBtn)
        nextBtn.addEventListener("click", () => {
            nextSlide();
            stopAuto();
        });
    if (prevBtn)
        prevBtn.addEventListener("click", () => {
            prevSlide();
            stopAuto();
        });
    if (container) {
        container.addEventListener("mouseenter", stopAuto);
        container.addEventListener("mouseleave", startAuto);
    }
})();

// ======================
// MULTI-CARD SEAMLESS SLIDER
// ======================
(function () {
    const track = document.querySelector(".slider-track");
    if (!track) return;
    const cards = Array.from(track.querySelectorAll(".slider-card-border"));
    const arrowLeft = document.querySelector(".Seamless_WhiteLabel_Mobile_App_Development_arrowLeft");
    const arrowRight = document.querySelector(".Seamless_WhiteLabel_Mobile_App_Development_arrowright");
    const contentContainer = document.getElementById("slider-content");

    const visibleCount = 6;
    const totalCount = cards.length;
    let index = visibleCount;
    let selectedCard = cards[0];

    const firstClones = cards.slice(0, visibleCount).map((c) => c.cloneNode(true));
    const lastClones = cards.slice(-visibleCount).map((c) => c.cloneNode(true));
    firstClones.forEach((c, i) => {
        c.originalCard = cards[i];
        track.appendChild(c);
    });
    lastClones.reverse().forEach((c, i) => {
        c.originalCard = cards[totalCount - visibleCount + i];
        track.prepend(c);
    });

    const allSlides = Array.from(track.children);

    function getCardWidth() {
        const card = allSlides[0];
        const style = window.getComputedStyle(card);
        const gap = parseInt(style.marginRight) || 16;
        return card.offsetWidth + gap;
    }

    function moveSlider(transition = true) {
        track.style.transition = transition ? "transform 0.5s ease-in-out" : "none";
        track.style.transform = `translateX(-${getCardWidth() * index}px)`;
        highlightSelected();
    }

    function nextSlider() {
        index++;
        moveSlider();
        resetAuto();
    }
    function prevSlider() {
        index--;
        moveSlider();
        resetAuto();
    }

    track.addEventListener("transitionend", () => {
        if (index >= totalCount + visibleCount) index = visibleCount;
        if (index < visibleCount) index = totalCount + visibleCount - 1;
        moveSlider(false);
    });

    if (arrowRight) arrowRight.addEventListener("click", nextSlider);
    if (arrowLeft) arrowLeft.addEventListener("click", prevSlider);

    let autoSlide = setInterval(nextSlider, 300000000000000);
    function resetAuto() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlider, 300000000000000);
    }

    function highlightSelected() {
        allSlides.forEach((slide) => {
            const inner = slide.querySelector(".slider-card");
            if (!inner) return;
            const original = slide.originalCard || slide;
            if (original === selectedCard) {
                inner.style.background = "linear-gradient(90.38deg, #023BE2 2.06%, #00A1C5 99.67%)";
                inner.style.color = "#fff";
                inner.querySelector("img").src = "./images/selected_livestringimeApp.png";
            } else {
                inner.style.background = "#fff";
                inner.style.color = "#000";
                inner.querySelector("img").src = "./images/livestringimeApp.png";
            }
        });
    }

    function selectCard(slide) {
        selectedCard = slide.originalCard || slide;
        if (contentContainer) contentContainer.innerHTML = selectedCard.dataset.content;
        highlightSelected();
    }

    allSlides.forEach((slide) => slide.addEventListener("click", () => selectCard(slide)));
    selectCard(selectedCard);
    moveSlider(false);
})();

// ======================
// FAQ TOGGLE
// ======================
document.querySelectorAll(".cardfaq").forEach((card, idx, arr) => {
    if (idx === 0) card.classList.add("active"); // first open
    card.addEventListener("click", () => {
        arr.forEach((c) => {
            if (c !== card) c.classList.remove("active");
        });
        card.classList.toggle("active");
    });
});

// ======================
// MODAL VIDEO
// ======================
(function () {
    const modal = document.getElementById("videoModal");
    const videoFrame = document.getElementById("videoFrame");
    const closeBtn = document.querySelector(".modal .close");

    document.querySelectorAll(".play-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (!videoFrame || !modal) return;
            videoFrame.src = btn.getAttribute("data-video") + "?autoplay=1";
            modal.style.display = "block";
        });
    });

    if (closeBtn)
        closeBtn.addEventListener("click", () => {
            if (!modal || !videoFrame) return;
            modal.style.display = "none";
            videoFrame.src = "";
        });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            videoFrame.src = "";
        }
    });
})();

// ======================
// INPUT PLACEHOLDER STAR POSITIONING
// ======================
document.querySelectorAll(".input-wrapper").forEach((wrapper) => {
    const input = wrapper.querySelector("input, textarea");
    const star = wrapper.querySelector(".required-star, .required-star-project-details");
    if (!input || !star) return;

    const span = document.createElement("span");
    span.style.visibility = "hidden";
    span.style.position = "absolute";
    span.style.whiteSpace = "pre";
    document.body.appendChild(span);

    function updateStar() {
        if (input.value.trim().length === 0 && input.placeholder) {
            span.textContent = input.placeholder;
            const inputStyle = getComputedStyle(input);
            const paddingLeft = parseFloat(inputStyle.paddingLeft);
            const starLeft = paddingLeft + span.offsetWidth + 5;
            star.style.left = `${starLeft}px`;
            star.style.top = "50%";
            star.style.transform = "translateY(-50%)";
            star.style.opacity = "1";
        } else {
            star.style.opacity = "0";
        }
    }

    input.addEventListener("input", updateStar);
    input.addEventListener("focus", updateStar);
    input.addEventListener("blur", updateStar);
    updateStar();
});

// ======================
// SERVICE OPTIONS (MULTI-SELECT)
// ======================
document.querySelectorAll(".service-option").forEach((option) => {
    option.addEventListener("click", () => option.classList.toggle("selected"));
});

// ======================
// BLOG SLIDER
// ======================

(function () {
    const wrapper = document.querySelector(".blog-slider-wrapper");
    if (!wrapper) return;

    const track = wrapper.querySelector(".blog-slider-track");
    const originalCards = Array.from(track.querySelectorAll(".blog-card_values"));

    const leftBtn = document.querySelector(".left-arrow");
    const rightBtn = document.querySelector(".right-arrow");
    if (!leftBtn || !rightBtn || originalCards.length === 0) return;

    // Clone first and last card for infinite effect
    const firstClone = originalCards[0].cloneNode(true);
    const lastClone = originalCards[originalCards.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalCards[0]);

    const allCards = Array.from(track.querySelectorAll(".blog-card_values"));
    let index = 1;

    let isTransitioning = false;

    function getCardWidthWithGap() {
        const cardWidth = allCards[0].getBoundingClientRect().width;
        const style = window.getComputedStyle(track);
        const gap = parseInt(style.columnGap || style.gap) || 40; // fallback to 40 if no CSS gap
        return cardWidth + gap;
    }

    function updatePosition(noTransition = false) {
        const offset = -index * getCardWidthWithGap();
        if (noTransition) {
            track.style.transition = "none";
        } else {
            track.style.transition = "transform 0.6s ease-in-out";
        }
        track.style.transform = `translateX(${offset}px)`;
    }

    function handleTransitionEnd() {
        isTransitioning = false;
        const current = allCards[index];

        if (current === allCards[0]) {
            // Reached clone of last, jump to real last
            index = allCards.length - 2;
            updatePosition(true);
        } else if (current === allCards[allCards.length - 1]) {
            // Reached clone of first, jump to real first
            index = 1;
            updatePosition(true);
        }
    }

    function showSlide(newIndex) {
        if (isTransitioning) return;
        isTransitioning = true;
        index = newIndex;
        updatePosition();
    }

    rightBtn.addEventListener("click", () => {
        showSlide(index + 1);
        resetAuto();
    });

    leftBtn.addEventListener("click", () => {
        showSlide(index - 1);
        resetAuto();
    });

    track.addEventListener("transitionend", handleTransitionEnd);

    window.addEventListener("resize", () => {
        updatePosition(true);
    });

    // Auto Slide
    let autoSlide = setInterval(() => showSlide(index + 1), 4000);

    function resetAuto() {
        clearInterval(autoSlide);
        autoSlide = setInterval(() => showSlide(index + 1), 4000);
    }

    // Initial setup
    updatePosition(true);
})();

// About country slide

(function () {
    const wrapper = document.querySelector(".Aboutlocation_sliderWrapper");
    if (!wrapper) return;

    const track = wrapper.querySelector(".Aboutlocation_sliderTrack");
    const originalCards = Array.from(track.querySelectorAll(".cardaboutlocation"));

    const leftBtn = document.querySelector(".Aboutlocation_CountryListleftArrow");
    const rightBtn = document.querySelector(".Aboutlocation_CountryListrightArrow");
    if (!leftBtn || !rightBtn || originalCards.length === 0) return;

    // Clone first and last cards for infinite scroll effect
    const firstClone = originalCards[0].cloneNode(true);
    const lastClone = originalCards[originalCards.length - 1].cloneNode(true);
    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalCards[0]);

    const allCards = Array.from(track.querySelectorAll(".cardaboutlocation"));
    let index = 1;

    let isTransitioning = false;

    function getCardWidth() {
        const style = window.getComputedStyle(track);
        const gap = parseInt(style.gap) || 0;
        return allCards[0].getBoundingClientRect().width + gap;
    }

    function updatePosition(noTransition = false) {
        const cardWidth = getCardWidth();
        if (noTransition) {
            track.style.transition = "none";
        } else {
            track.style.transition = "transform 0.6s ease-in-out";
        }
        track.style.transform = `translateX(${-index * cardWidth}px)`;
    }

    function handleTransitionEnd() {
        isTransitioning = false;
        const current = allCards[index];
        if (current === allCards[0]) {
            index = allCards.length - 2;
            updatePosition(true);
        } else if (current === allCards[allCards.length - 1]) {
            index = 1;
            updatePosition(true);
        }
    }

    function slideNext() {
        if (isTransitioning) return;
        if (index < allCards.length - 1) {
            index++;
            isTransitioning = true;
            updatePosition();
        }
    }

    function slidePrev() {
        if (isTransitioning) return;
        if (index > 0) {
            index--;
            isTransitioning = true;
            updatePosition();
        }
    }

    rightBtn.addEventListener("click", () => {
        slideNext();
        resetAuto();
    });

    leftBtn.addEventListener("click", () => {
        slidePrev();
        resetAuto();
    });

    track.addEventListener("transitionend", handleTransitionEnd);

    window.addEventListener("resize", () => {
        updatePosition(true);
    });

    // Auto Slide (optional)
    let autoSlide = setInterval(slideNext, 3000);
    function resetAuto() {
        clearInterval(autoSlide);
        autoSlide = setInterval(slideNext, 3000);
    }

    // Initial position (after adding clones)
    updatePosition(true);
})();
