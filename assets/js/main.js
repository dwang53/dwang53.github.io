/* assets/js/main.js — Dongchen Wang academic website */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile hamburger menu ---------- */
  var hamburger = document.querySelector('.hamburger');
  var navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    /* Close menu when any nav link is clicked */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll fade-in animation ---------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    var viewportH = window.innerHeight || document.documentElement.clientHeight;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      fadeEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        /* Immediately show elements already within the initial viewport */
        if (rect.top < viewportH && rect.bottom > 0) {
          el.classList.add('visible');
        } else {
          observer.observe(el);
        }
      });
    } else {
      /* Fallback: show everything */
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }
  }

});
