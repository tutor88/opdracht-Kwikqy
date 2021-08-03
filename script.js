'use strict';

const slides = document.querySelectorAll('.slides');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slidercontainer');
const allSections = document.querySelectorAll('.section');

let curSlide = 0;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

const maxSlide = slides.length - 1;

const nextSlide = function () {
  curSlide === maxSlide ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
};
const prevSlide = function () {
  curSlide === 0 ? (curSlide = maxSlide) : curSlide--;
  goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'ArrowRight') nextSlide();
});

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// window.addEventListener('load', function (section) {
//   sectionObserver.observe(section);
// });
