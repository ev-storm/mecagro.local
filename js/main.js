document.addEventListener("DOMContentLoaded", () => {
  const catalogBtn = document.querySelector(".catalog-btn");
  const subMenuCatalog = document.querySelector(".sub-menu-catalog");
  let isMenuVisible = false;

  const showMenu = () => {
    if (!isMenuVisible) {
      catalogBtn.classList.add("active");
      subMenuCatalog.classList.add("show");
      isMenuVisible = true;
    }
  };

  const hideMenu = (event) => {
    const relatedTarget = event.relatedTarget;

    if (
      !catalogBtn.contains(relatedTarget) &&
      !subMenuCatalog.contains(relatedTarget)
    ) {
      catalogBtn.classList.remove("active");
      subMenuCatalog.classList.remove("show");
      isMenuVisible = false;
    }
  };

  catalogBtn.addEventListener("mouseenter", showMenu);
  catalogBtn.addEventListener("mouseleave", hideMenu);

  subMenuCatalog.addEventListener("mouseenter", showMenu);
  subMenuCatalog.addEventListener("mouseleave", hideMenu);
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.querySelector(".about-btn");
  const subAboutBtn = document.querySelector(".sub-about-btn");
  let isMenuVisible = false;

  const showMenu = () => {
    if (!isMenuVisible) {
      aboutBtn.classList.add("active");
      subAboutBtn.classList.add("show");
      isMenuVisible = true;
    }
  };

  const hideMenu = (event) => {
    const relatedTarget = event.relatedTarget;

    if (
      !aboutBtn.contains(relatedTarget) &&
      !subAboutBtn.contains(relatedTarget)
    ) {
      aboutBtn.classList.remove("active");
      subAboutBtn.classList.remove("show");
      isMenuVisible = false;
    }
  };

  aboutBtn.addEventListener("mouseenter", showMenu);
  aboutBtn.addEventListener("mouseleave", hideMenu);

  subAboutBtn.addEventListener("mouseenter", showMenu);
  subAboutBtn.addEventListener("mouseleave", hideMenu);
});

// // document.querySelector("#title-video").playbackRate = 0.5;
// const videoElement = document.querySelector("#title-video");
// if (videoElement) {
//   videoElement.playbackRate = 0.5;
// }
// //////////////////////////////////
// const modalButtons = document.querySelectorAll(".btn-modal-call");

// modalButtons.forEach(function (button) {
//   button.addEventListener("click", function () {
//     const modalCon = document.querySelector(".modal-con");
//     document.querySelector(".modal-con").classList.remove("hide-prev");
//     modalCon.classList.remove("hide");
//     modalCon.classList.add("show");
//   });
// });

// document
//   .querySelector(".modal-con")
//   .addEventListener("click", function (event) {
//     if (!event.target.closest(".modal")) {
//       document.querySelector(".modal-con").classList.remove("show");
//       document.querySelector(".modal-con").classList.add("hide");
//     }
//   });

// document.querySelector(".close-modal").addEventListener("click", function () {
//   document.querySelector(".modal-con").classList.remove("show");
//   document.querySelector(".modal-con").classList.add("hide");
// });
// ////////////////////////////////////////////////////////////////////////////

// if (document.querySelector(".form-commer")) {
//   const form = document.querySelector(".form-commer");

//   const telSelector = form.querySelector(".input-tel");
//   const inputmask = new Inputmask("+7 (999) 999-99-99");
//   inputmask.mask(telSelector);

//   const validation = new JustValidate(".form-commer");

//   validation
//     .addField(".input-name", [
//       {
//         rule: "minLength",
//         value: 3,
//         errorMessage: "Введите более 3 символов",
//       },
//       {
//         rule: "maxLength",
//         value: 30,
//         errorMessage: "Введите менее 30 символов",
//       },
//       {
//         rule: "required",
//         value: true,
//         errorMessage: "Введите имя",
//       },
//     ])
//     .addField(".input-tel", [
//       {
//         rule: "required",
//         value: true,
//         errorMessage: "Телефон обязателен",
//       },
//       {
//         rule: "function",
//         validator: function () {
//           const phone = telSelector.inputmask.unmaskedvalue();
//           return phone.length === 10;
//         },
//         errorMessage: "Введите корректный телефон",
//       },
//     ])
//     .onSuccess((event) => {
//       console.log("Validation passes and form submitted", event);

//       let formData = new FormData(event.target);

//       let xhr = new XMLHttpRequest();

//       xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//             console.log("Отправлено");

//             document.querySelector(".modal-con").classList.remove("show");
//             document.querySelector(".modal-con").classList.add("hide");

//             const banСheck = document.querySelector(".ban-check");

//             banСheck.classList.add("active");

//             setTimeout(() => {
//               banСheck.classList.remove("active");
//             }, 4000);
//           }
//         }
//       };

//       xhr.open("POST", "../mail.php", true);
//       xhr.send(formData);

//       event.target.reset();
//     });
// }

// // ...............................................
// if (document.querySelectorAll(".modal-form")) {
//   const form = document.querySelector(".modal-form");

//   const telSelector = form.querySelector(".input-tel-modal");
//   const inputmask = new Inputmask("+7 (999) 999-99-99");
//   inputmask.mask(telSelector);

//   const validation = new JustValidate(".modal-form");

//   validation
//     .addField(".input-name-modal", [
//       {
//         rule: "minLength",
//         value: 3,
//         errorMessage: "Введите более 3 символов",
//       },
//       {
//         rule: "maxLength",
//         value: 30,
//         errorMessage: "Введите менее 30 символов",
//       },
//       {
//         rule: "required",
//         value: true,
//         errorMessage: "Введите имя",
//       },
//     ])
//     .addField(".input-tel-modal", [
//       {
//         rule: "required",
//         value: true,
//         errorMessage: "Телефон обязателен",
//       },
//       {
//         rule: "function",
//         validator: function () {
//           const phone = telSelector.inputmask.unmaskedvalue();
//           return phone.length === 10;
//         },
//         errorMessage: "Введите корректный телефон",
//       },
//     ])
//     .onSuccess((event) => {
//       console.log("Validation passes and form submitted", event);

//       let formData = new FormData(event.target);

//       let xhr = new XMLHttpRequest();

//       xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//           if (xhr.status === 200) {
//             console.log("Отправлено");

//             document.querySelector(".modal-con").classList.remove("show");
//             document.querySelector(".modal-con").classList.add("hide");

//             const banСheck = document.querySelector(".ban-check");

//             banСheck.classList.add("active");

//             setTimeout(() => {
//               banСheck.classList.remove("active");
//             }, 4000);
//           }
//         }
//       };

//       xhr.open("POST", "../mail.php", true);
//       xhr.send(formData);

//       event.target.reset();
//     });
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////
// document.addEventListener("DOMContentLoaded", () => {
//   // Получаем все элементы с классом .show
//   const showElements = document.querySelectorAll(".show");

//   // Настройка IntersectionObserver
//   const observerOptions = {
//     root: null, // Наблюдение происходит относительно окна браузера (viewport)
//     rootMargin: "0px", // Без отступов
//     threshold: 0.7, // Элемент считается видимым, если 10% его высоты находятся в области видимости
//   };

//   const observerCallback = (entries, observer) => {
//     // Отслеживаем только элементы, входящие в область видимости
//     let delay = 0; // Начальная задержка для поочередного появления
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         // Устанавливаем задержку для последовательного добавления классов
//         setTimeout(() => {
//           entry.target.classList.add("active");
//         }, delay);

//         // Увеличиваем задержку для следующего элемента
//         delay += 500; // 500 мс (0,5 секунды)

//         // Перестаем наблюдать за этим элементом, чтобы не обрабатывать его повторно
//         observer.unobserve(entry.target);
//       }
//     });
//   };

//   const observer = new IntersectionObserver(observerCallback, observerOptions);

//   // Наблюдаем за каждым элементом с классом .show
//   showElements.forEach((element) => observer.observe(element));
// });

// ///////////////////////////////////////////////////////////////////////////////
// // function copyToCli() {
// //     const text = `
// //         ИНН 5040165209
// //         КПП 504001001
// //         ОГРН 1195027026435
// //         ОКПО 42673428
// //         БИК 044525225

// //         Расчетный счет 40702810140000070573
// //         Банк ПАО СБЕРБАНК
// //         Корр. счет 30101810400000000225
// //         Генеральный директор САПЛИН Р.А.

// //         Юридический адрес 140182, Московская область, г. Жуковский, ул. Кооперативная, дом 14
// //         Почтовый адрес 140182, Московская область, г. Жуковский, ул. Кооперативная, дом 14
// //     `;
// //     const banCheck = document.querySelector(".ban-check");
// //     banCheck.innerHTML = `
// //         <h1>Реквизиты компании скопированы</h1>
// //     `;
// //     navigator.clipboard.writeText(text)
// //         .then(() => {
// //             banCheck.classList.add("active");
// //             setTimeout(() => {
// //                 banCheck.classList.remove("active");
// //             }, 4000);
// //         })
// //         .catch((err) => {
// //             console.error("Не удалось скопировать текст: ", err);
// //         });
// // }

// // // Обрабатываем кнопку
// const telBtn = document.querySelectorAll(".tel-item-con");
// const mailBtn = document.querySelectorAll(".mail-item-con");

// const phoneNumber = "+7 916 230-25-78";
// const mailCopy = "infomu-22@yandex.ru";

// const messageElement = document.createElement("span");
// messageElement.classList.add("copy-message");
// // messageElement.textContent = "Телефон скопирован";
// // document.querySelector(".tel-item-con").appendChild(messageElement);
// // document.querySelector(".mail-item-con").appendChild(messageElement);

// telBtn.forEach((item) => {
//   item.addEventListener("click", () => {
//     const banСheck = document.querySelector(".ban-check");
//     banСheck.innerHTML = `
// 				<h1> Телефон скопирован</h1>
// 		`;
//     navigator.clipboard

//       .writeText(phoneNumber)
//       .then(() => {
//         banСheck.classList.add("active");

//         setTimeout(() => {
//           banСheck.classList.remove("active");
//         }, 4000);
//       })
//       .catch((err) => {
//         console.error("Не удалось скопировать текст: ", err);
//       });
//   });
// });

// mailBtn.forEach((item) => {
//   item.addEventListener("click", () => {
//     const banСheck = document.querySelector(".ban-check");
//     banСheck.innerHTML = `
// 			<h1> Почта скопирована</h1>
// 	`;
//     navigator.clipboard

//       .writeText(mailCopy)
//       .then(() => {
//         banСheck.classList.add("active");

//         setTimeout(() => {
//           banСheck.classList.remove("active");
//         }, 4000);
//       })
//       .catch((err) => {
//         console.error("Не удалось скопировать текст: ", err);
//       });
//   });
// });

// function copyToCli() {
//   const text = `
//         ИНН: 5040186488
//         КПП: 504001001
//         ОГРН: 1235000099366 от 10.01.2023
//         ОКПО: 93143620
//         БИК: 044525225
//         Рассчетный счет 40702810640000097739
//         Корр. Счёт 30101810400000000225
//         Юридический адрес: 140104, Московская область, г. Жуковский, ул. Гудкова, дом 3Б стр.1, пом. 14, ком.
//         Почтовый адрес: 140104, Московская область, г. Жуковский, ул. Гудкова, дом 3Б стр.1, пом. 14, ком. 1

//     `;
//   const banCheck = document.querySelector(".ban-check");

//   if (navigator.clipboard) {
//     navigator.clipboard
//       .writeText(text)
//       .then(() => {
//         banCheck.innerHTML = "<h1>Реквизиты компании скопированы</h1>";
//         banCheck.classList.add("active");
//         setTimeout(() => {
//           banCheck.classList.remove("active");
//         }, 4000);
//       })
//       .catch((err) => {
//         console.error("Не удалось скопировать текст: ", err);
//         alert(
//           "Ошибка при копировании. Попробуйте выделить текст и скопировать вручную."
//         );
//       });
//   } else {
//     // Альтернативный способ, если API clipboard не поддерживается
//     const textArea = document.createElement("textarea");
//     textArea.value = text;
//     document.body.appendChild(textArea);
//     textArea.select();
//     try {
//       document.execCommand("copy");
//       banCheck.innerHTML = "<h1>Реквизиты компании скопированы</h1>";
//       banCheck.classList.add("active");
//     } catch (err) {
//       console.error("Не удалось скопировать текст: ", err);
//       alert(
//         "Ошибка при копировании. Попробуйте выделить текст и скопировать вручную."
//       );
//     }
//     document.body.removeChild(textArea);
//     setTimeout(() => {
//       banCheck.classList.remove("active");
//     }, 4000);
//   }
// }
// ///////////////////////////////////////////////////////

// const burger = document.querySelector(".burger");
// const close = document.querySelector(".close-mob");
// const mobMenu = document.querySelector(".mob-menu");

// burger.addEventListener("click", () => {
//   mobMenu.classList.add("active");
//   close.classList.add("show");
//   burger.classList.remove("show");
// });

// close.addEventListener("click", () => {
//   mobMenu.classList.remove("active");
//   close.classList.remove("show");
//   burger.classList.add("show");
// });

// var hammertime = new Hammer(document.body, {
//   enable: true,
//   recognizers: [[Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }]],
// });

// hammertime.on("swipeleft", function (ev) {
//   mobMenu.classList.remove("active");
//   close.classList.remove("show");
//   burger.classList.add("show");
// });

// hammertime.on("swiperight", function (ev) {
//   mobMenu.classList.add("active");
//   close.classList.add("show");
//   burger.classList.remove("show");
// });

// document.addEventListener("DOMContentLoaded", function () {
//   // Получаем все кнопки
//   const buttons = document.querySelectorAll(".plus-podmenu");
//   // Получаем все подменю
//   const submenus = document.querySelectorAll(".podmenu-mob");

//   // Добавляем обработчик событий для каждой кнопки
//   buttons.forEach((button, index) => {
//     button.addEventListener("click", function () {
//       // Убираем класс "active" у всех кнопок
//       buttons.forEach((btn) => btn.classList.remove("active"));

//       // Добавляем класс "active" к текущей кнопке
//       button.classList.add("active");

//       // Скрываем все подменю (удаляем класс "showm")
//       submenus.forEach((menu) => menu.classList.remove("showm"));

//       // Добавляем класс "showm" к текущему подменю
//       const associatedMenu = submenus[index];
//       if (associatedMenu) {
//         associatedMenu.classList.add("showm");
//       }
//     });
//   });
// });

// ///////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////

// // Указываем путь к JSON-файлу
// async function getCoordinates() {
//   const response = await fetch("../js/obj.json"); // Загружаем JSON-файл
//   if (!response.ok) {
//     throw new Error("Ошибка при загрузке файла obj.json");
//   }
//   const data = await response.json(); // Парсим JSON
//   return data; // Возвращаем данные целиком
// }

// //////////////////////////////////////////////////////////////////
// initMap();

// async function initMap() {
//   await ymaps3.ready;

//   const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } =
//     ymaps3;

//   getCoordinates().then((data) => {
//     const coordinatesArray = data.map((item) => item.map);

//     const map = new YMap(document.getElementById("map"), {
//       location: {
//         center: [37.62, 55.76],
//         zoom: 10,
//       },
//     });

//     // Добавляем слой с основными функциями
//     map.addChild(new YMapDefaultFeaturesLayer());

//     // // Добавляем слой со схемой карты и кастомизацией
//     map.addChild(
//       new YMapDefaultSchemeLayer({
//         customization: cordMarker,
//       })
//     );

//     coordinatesArray.forEach((coordinates, index) => {
//       const contentMarker = document.createElement("div");
//       contentMarker.className = "content-marker";
//       contentMarker.innerHTML = `
// 					<div class="marker-photo">
// 						<img src="/assets/img/carts/${index + 1}/1.png" alt="">
// 					</div>
// 					<div class="marker-icon">
// 						<img src="/assets/svg/map-mark.svg" alt="Маркер">
// 					</div>
// 					`;

//       const item = data[index];
//       const mapTitleH1 = document.querySelector(".map-title-h1");
//       const mapTitleH2 = document.querySelector(".map-title-h2");
//       const markerPhoto = contentMarker.querySelector(".marker-photo");
//       const cartsFullCon = document.querySelector(".carts-full-con");
//       const containerCarts = document.querySelector(".carts-swiper");

//       // Добавляем обработчик события на наведение мышки
//       contentMarker.addEventListener("mouseenter", () => {
//         mapTitleH1.textContent = item.title;
//         mapTitleH2.textContent = item.address;
//         markerPhoto.classList.add("active");
//       });

//       contentMarker.addEventListener("mouseleave", () => {
//         const markerPhoto = contentMarker.querySelector(".marker-photo");
//         markerPhoto.classList.remove("active");
//       });

//       markerPhoto.addEventListener("click", () => {
//         /////////////////////////// Функция управления отображением модального окна/////////////////////////
//         function updateSwiper(index) {
//           containerCarts.innerHTML = ""; // Очищаем слайдер
//           const swiperWrapper = document.createElement("div");
//           swiperWrapper.className = "swiper-wrapper";
//           // Создаем слайды для текущей карточки
//           for (let i = 1; i <= 5; i++) {
//             const slide = document.createElement("div");
//             slide.className = "swiper-slide carts-slide";
//             slide.innerHTML = `
//             <div class="swiper-slide carts-slide">
//               <img class="swiper-slide carts-slide-back" src="/assets/img/carts/${index}/${i}.png" alt="">
//               <h2 class="adress-full-carts">${item.address}</h2>
//               <img class="logo-swiper" style="position: absolute; top: 20px; right: 30px; width: 200px; z-index: 99999; opacity: 0.5;" src="/assets/svg/logo-2.svg" alt="">
//             </div>
//           `;
//             swiperWrapper.appendChild(slide);
//           }
//           containerCarts.appendChild(swiperWrapper);
//           new Swiper(".carts-swiper", {
//             slidesPerView: 1,
//             loop: true,
//             autoplay: { delay: 25000 },
//             navigation: {
//               nextEl: ".swiper-button-next",
//               prevEl: ".swiper-button-prev",
//             },
//             scrollbar: { el: ".swiper-scrollbar", hide: true },
//           });
//         }
//         function toggleCartsFull(action) {
//           if (action === "show") {
//             cartsFullCon.classList.remove("hide");
//             cartsFullCon.classList.add("show");
//           } else if (action === "hide") {
//             cartsFullCon.classList.remove("show");
//             cartsFullCon.classList.add("hide");
//           }
//         }
//         // Обработчик завершения анимации модального окна
//         cartsFullCon.addEventListener("animationend", (event) => {
//           if (event.animationName === "fadeOutCarts") {
//             cartsFullCon.classList.add("hide-prev"); // Скрываем окно после завершения анимации скрытия
//           } else if (event.animationName === "fadeInCarts") {
//             cartsFullCon.classList.remove("hide-prev"); // Убираем класс скрытия после анимации появления
//           }
//         });
//         // Закрытие модального окна по клику вне контента
//         cartsFullCon.addEventListener("click", (event) => {
//           if (
//             !event.target.closest(
//               ".carts-full, .swiper-button-prev, .swiper-button-next"
//             )
//           ) {
//             toggleCartsFull("hide");
//           }
//         });

//         toggleCartsFull("show");
//         updateSwiper(index + 1);
//       });

//       const marker = new YMapMarker(
//         {
//           coordinates: coordinates,
//           draggable: false,
//         },
//         contentMarker
//       );

//       map.addChild(marker);
//     });
//   });
// }
// //////////////////////////////////////////////////////////////////////////////

// // Глобальная переменная cordMarker
// let cordMarker;
// async function loadMapData() {
//   try {
//     const response = await fetch("../js/map.json");
//     if (!response.ok) {
//       throw new Error(`Ошибка загрузки файла: ${response.status}`);
//     }
//     cordMarker = await response.json();
//   } catch (error) {
//     console.error("Ошибка загрузки данных из map.json:", error);
//   }
// }
// loadMapData();
