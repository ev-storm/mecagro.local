var objectSwiper = new Swiper(".object-swiper", {
  loop: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: ".object-swiper_mini",
  },
});

var objectSwiperMini = new Swiper(".object-swiper_mini", {
  direction: "vertical",
  loop: false,
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});

// var swiperBrend = new Swiper(".swiper-brend", {
//   slidesPerView: 5,
//   loop: true,
//   spaceBetween: 30,
//   autoplay: {
//     delay: 1500,
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

// var isMobile = window.innerWidth <= 768;

// // Инициализация Swiper
// var swiper = new Swiper(".uslugi-swiper", {
//   direction: isMobile ? "horizontal" : "vertical",
//   loop: true,
//   autoplay: {
//     delay: 2500,
//   },
//   slidesPerView: 1,
//   spaceBetween: 1,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
// });

// // Переключение слайдов по нажатию на кнопки
// document.querySelector(".sw-arrow-up").addEventListener("click", () => {
//   swiper.slidePrev(); // Переключаем слайд назад
// });

// document.querySelector(".sw-arrow-down").addEventListener("click", () => {
//   swiper.slideNext(); // Переключаем слайд вперед
// });

// // Перезапуск Swiper при изменении размера экрана (опционально)
// window.addEventListener("resize", function () {
//   var newIsMobile = window.innerWidth <= 600;

//   if (newIsMobile !== isMobile) {
//     isMobile = newIsMobile;

//     // Уничтожаем текущий экземпляр Swiper
//     swiper.destroy(true, true);

//     // Создаем новый экземпляр Swiper с обновленным направлением
//     swiper = new Swiper(".uslugi-swiper", {
//       direction: isMobile ? "horizontal" : "vertical",
//       loop: true,
//       autoplay: {
//         delay: 2500,
//       },
//       slidesPerView: 1,
//       spaceBetween: 0,
//       pagination: {
//         el: ".swiper-pagination",
//         clickable: true,
//       },
//     });
//   }
// });
