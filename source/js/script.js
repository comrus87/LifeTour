'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var toursSlides = document.querySelectorAll('.tours__item');
  var toursPrev = document.querySelector('.tours__button-previous');
  var toursNext = document.querySelector('.tours__button-next');
  var toursPage = document.querySelector('.tours');
  var toursSlidesList = document.querySelector('.tours__list');

  var instructorsSlides = document.querySelectorAll('.training__slider-item');
  var instructorsPrev = document.querySelector('.training__button-previous');
  var instructorsNext = document.querySelector('.training__button-next');
  var instructorsSlidesList = document.querySelector('.training__slider-list');

  var reviewsSlides = document.querySelectorAll('.reviews__item');
  var reviewsPrev = document.querySelector('.reviews__button-previous');
  var reviewsNext = document.querySelector('.reviews__button-next');
  var reviewsSlidesList = document.querySelector('.reviews__list');
  var reviewsPage = document.querySelector('.reviews');

  var gallerySlides = document.querySelectorAll('.gallery__item');
  var galleryPrev = document.querySelector('.gallery__button-previous');
  var galleryNext = document.querySelector('.gallery__button-next');
  var gallerySlidesList = document.querySelector('.gallery__list');
  var galleryPage = document.querySelector('.gallery');


  function switchSlider(step, slides, prev, next) {
    var startIndex = 0;
    var endIndex = step;

    function showSlide(n, k) {
      for (var j = 0; j < slides.length; j++) {
        slides[j].style.display = 'none';
      }

      for (var i = n; i < k; i++) {
        if (slides[i]) {
          slides[i].style.display = 'block';
        }
      }
    }

    showSlide(startIndex, endIndex);

    function plusSlide(n) {
      showSlide(startIndex += n, endIndex += n);
    }

    next.addEventListener('click', function () {
      if (endIndex < slides.length) {
        plusSlide(step);
      }
    });

    prev.addEventListener('click', function () {
      if (startIndex >= step) {
        plusSlide(-step);
      }
    });
  }

  function switchTabletSlider(slider, slides, prev, next) {
    var acc = 0;
    var marginRight = getComputedStyle(slides[0]).marginRight;
    var step = slides[0].offsetWidth + parseInt(marginRight, 10);

    next.addEventListener('click', function () {
      if ((slides.length - 1) * (-step) < acc) {
        acc += -step;
        slider.style.transform = 'translateX(' + acc + 'px)';
      }
    });

    prev.addEventListener('click', function () {
      if (acc < 0) {
        acc += step;
        slider.style.transform = 'translateX(' + acc + 'px)';
      }
    });
  }


  function changeToursSlider() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      switchSlider(3, toursSlides, toursPrev, toursNext);
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      switchTabletSlider(toursSlidesList, toursSlides, toursPrev, toursNext);
    } else if (window.matchMedia('(max-width: 767px)').matches) {
      switchSlider(1, toursSlides, toursPrev, toursNext);
    }
  }

  if (toursPage) {
    toursSlidesList.classList.remove('no-js');
    changeToursSlider();
    window.addEventListener('resize', changeToursSlider);
  }


  // Слайдер инструкторы

  function changeInsSlider() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      switchSlider(5, instructorsSlides, instructorsPrev, instructorsNext);
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      switchInsSlider(instructorsSlidesList, instructorsSlides, instructorsPrev, instructorsNext, 2);
    } else if (window.matchMedia('(max-width: 767px)').matches) {
      switchInsSlider(instructorsSlidesList, instructorsSlides, instructorsPrev, instructorsNext, 1);
    }
  }

  function switchInsSlider(slider, slides, prev, next, count) {
    var acc = 0;
    var marginRight = getComputedStyle(slides[0]).marginRight;
    var step = (slides[0].offsetWidth + parseInt(marginRight, 10)) * count;
    var indexSlide = 0;
    var sub = count === 2 ? 2 : 1;

    for (var i = count; i < slides.length; i++) {
      slides[i].style.opacity = '0.2';
    }

    function switchStyle() {
      slider.style.transform = 'translateX(' + acc + 'px)';

      for (var j = 0; j < slides.length; j++) {
        slides[j].style.opacity = '0.2';
      }

      slides[indexSlide].style.opacity = '1';
      if (count === 2) {
        slides[indexSlide + 1].style.opacity = '1';
      }
    }

    next.addEventListener('click', function () {
      if (((slides.length - sub) / count) * (-step) < acc) {
        acc += -step;
        indexSlide += count;
        switchStyle();
      }
    });

    prev.addEventListener('click', function () {
      if (acc < 0) {
        acc += step;
        indexSlide -= count;
        switchStyle();
      }
    });
  }

  if (instructorsSlidesList) {
    changeInsSlider();
    window.addEventListener('resize', changeInsSlider);
  }

  // Слайдер отзывы

  function changeReviewsSlider() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      switchSlider(3, reviewsSlides, reviewsPrev, reviewsNext);
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      switchTabletSlider(reviewsSlidesList, reviewsSlides, reviewsPrev, reviewsNext);
    } else if (window.matchMedia('(max-width: 767px)').matches) {
      switchSlider(1, reviewsSlides, reviewsPrev, reviewsNext);
    }
  }

  if (reviewsPage) {
    reviewsSlidesList.classList.remove('no-js');
    changeReviewsSlider();
    window.addEventListener('resize', changeReviewsSlider);
  }

  // Слайдер фотогалерея
// gallerySlides, galleryPrev, galleryNext, gallerySlidesList, galleryPage

  function switchGallerySlider(slider, slides, prev, next, count) {
    var step = 0;
    var lim = Math.ceil(slides.length / count) - 1;

    next.addEventListener('click', function () {
      if (step > (-slider.clientWidth * lim)) {
        step -= slider.clientWidth;
        slider.style.transform = 'translateX(' + step + 'px)';
      }
    });

    prev.addEventListener('click', function () {
      if (step < 0) {
        step += slider.clientWidth;
        slider.style.transform = 'translateX(' + step + 'px)';
      }
    });
  }


  function changeGallerySlider() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      switchGallerySlider(gallerySlidesList, gallerySlides, galleryPrev, galleryNext, 5);
    } else if (window.matchMedia('(min-width: 768px)').matches) {
      switchGallerySlider(gallerySlidesList, gallerySlides, galleryPrev, galleryNext, 3);
    } else if (window.matchMedia('(max-width: 767px)').matches) {
      switchGallerySlider(gallerySlidesList, gallerySlides, galleryPrev, galleryNext, 2);
    }
  }

  if (galleryPage) {
    changeGallerySlider();
    window.addEventListener('resize', changeGallerySlider);
  }

});
