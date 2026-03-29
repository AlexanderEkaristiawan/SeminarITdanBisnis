gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }
  });

  gsap.to(".zoom", {
    scale: 1,
    duration: 0.8,
    ease: "power2.out",
  });

  $(".reveal").each(function (i, el) {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  gsap.from(".portfolio-item", {
    scrollTrigger: {
      trigger: ".portfolio",
      start: "top 80%",
    },
    scale: 0.85,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "back.out(1.5)",
  });

  function animateCounter(element, target) {
    let current = 0;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 25);
  }

  const counterSection = document.querySelector(".fullscreen-section:nth-of-type(3)");
  let countersTriggered = false;
  const observerOptions = { threshold: 0.3 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersTriggered) {
        countersTriggered = true;
        const counters = document.querySelectorAll(".counter-number");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-count"));
          animateCounter(counter, target);
        });
      }
    });
  }, observerOptions);
  if (counterSection) observer.observe(counterSection);

  $(".nav-link").on("click", function (e) {
    e.preventDefault();
    const targetPage = $(this).attr("data-nav");
    let targetOffset = 0;
    if (targetPage === "beranda") {
      targetOffset = 0;
    } else if (targetPage === "about") {
      const aboutSec = $(".welcome");
      if (aboutSec.length) targetOffset = aboutSec.offset().top - 70;
    } else if (targetPage === "event") {
      const eventSec = $(".fullscreen-section:nth-of-type(4)");
      if (eventSec.length) targetOffset = eventSec.offset().top - 70;
    }
    $("html, body").animate({ scrollTop: targetOffset }, 700);
    $(".navbar-collapse").collapse("hide");
  });

  $(".reveal").each(function () {
    if (!$(this).hasClass("gsap-processed")) {
      $(this).css("opacity", "0").css("transform", "translateY(30px)");
    }
  });

  gsap.fromTo(
    ".greeting-content",
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.9, delay: 0.4, ease: "power2.out" },
  );
});
