'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var toursSlides = document.querySelectorAll('.tours__item');
  var toursPrev = document.querySelector('.tours__button-previous');
  var toursNext = document.querySelector('.tours__button-next');
  var toursPage = document.querySelector('.tours');
  var toursSlidesList = document.querySelector('.tours__list');
  console.log(toursSlidesList.style);

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

    next.addEventListener('click', function () {
      if ((slides.length - 1) * (-406) < acc) {
        acc += -406;
        slider.style.transform = 'translateX(' + acc + 'px)';
      }
    });

    prev.addEventListener('click', function () {
      if (acc < 0) {
        acc += 406;
        slider.style.transform = 'translateX(' + acc + 'px)';
      }
    });
  }

  function changeToursSlider() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      switchSlider(3, toursSlides, toursPrev, toursNext);
    } else if (window.matchMedia('(max-width: 1023px)').matches) {
      switchTabletSlider(toursSlidesList, toursSlides, toursPrev, toursNext);
    }
  }

  if (toursPage) {
    changeToursSlider();
    window.addEventListener('resize', changeToursSlider);
  }
});
