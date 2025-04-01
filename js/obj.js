// Проверяем URL текущей страницы
if (window.location.pathname.endsWith("object.php")) {
  window.addEventListener("DOMContentLoaded", () => {
    // Получаем элементы интерфейса
    const container = document.getElementById("carts-container"); // Контейнер карточек
    const containerCarts = document.querySelector(".carts-swiper"); // Слайдер модального окна
    const cartsFullCon = document.querySelector(".carts-full-con"); // Модальное окно карточек
    const paginationContainer = document.getElementById("pagination"); // Контейнер пагинации
    const searchInput = document.querySelector(".search input"); // Поле поиска
    const resultsList = document.getElementById("results-list"); // Лист результатов поиска
    //const originalIndex = allCards.indexOf(item);

    // // Настройки
    let currentPage = 1; // Текущая страница
    const cardsPerPage = 6; // Количество карточек на одной странице
    let allCards = []; // Массив всех карточек для рендера и поиска
    ///////////////////////////////////////////////////////////////////
    //////////////////////////// Функция рендера карт //////////////////////////
    function renderCards() {}
    ///////////////////////////////////////////////////////////////////
    //////////////////////////// Функция рендера текущей страницы с карточками //////////////////////////
    function renderPage() {
      container.innerHTML = ""; // Очищаем контейнер
      const startIndex = (currentPage - 1) * cardsPerPage; // Начальный индекс для текущей страницы
      const pageCards = allCards.slice(startIndex, startIndex + cardsPerPage); // Карточки для текущей страницы
      pageCards.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "carts";
        card.style.backgroundImage = `url(/assets/img/carts/${
          startIndex + index + 1
        }/1.png)`;
        // Добавляем контент в карточку
        card.innerHTML = `
							<div class="carts-content">
								<h1>${item.title}</h1>
								<h2>${item.description}</h2>
								<h2><span>Адрес:</span><br>${item.address}</h2>
								<div class="carts-prop">
									<h3>Год проведения работ <br><span>${item.year}</span></h3>
									<h3>Масса м/к <br><span>${item.weight}</span></h3>
								</div>
								<div class="wu-mob-con">
									<img class="wu-mob" src="/assets/svg/wu.svg" alt="">
								</div>
							</div>
							<div class="carts-back"></div>
						`;
        // Функция для определения мобильного устройства
        function isMobileDevice() {
          return window.innerWidth <= 768; // Например, ширина экрана ≤ 768px считается мобильной
        }
        // Выбор обработчиков для мобильной и десктопной версии
        if (isMobileDevice()) {
          // Для мобильных устройств: заменить mouseenter / mouseleave на click
          card.addEventListener("click", (event) => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            // Переключение классов на click
            cartsContent.classList.toggle("show-obj");
            cartsBack.classList.toggle("show-obj");
            // Проверяем, был ли клик на carts-content
            const wuMob = card.querySelector(".wu-mob");
            if (wuMob) {
              wuMob.addEventListener("click", (event) => {
                event.stopPropagation(); // Останавливаем всплытие, чтобы избежать конфликта с кликом на `card`
                toggleCartsFull("show");
                updateSwiper(startIndex + index + 1, item); // Передаем индекс и данные текущей карточки
              });
            }
          });
        } else {
          // Для десктопных устройств: стандартные обработчики mouseenter / mouseleave
          card.addEventListener("mouseenter", () => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            cartsContent.classList.add("show-obj");
            cartsBack.classList.add("show-obj");
          });
          card.addEventListener("mouseleave", () => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            cartsContent.classList.remove("show-obj");
            cartsBack.classList.remove("show-obj");
          });
          // Обработчик клика (для десктопной версии остается на карточке)
          card.addEventListener("click", () => {
            toggleCartsFull("show");
            updateSwiper(startIndex + index + 1, item); // Передаем индекс и данные текущей карточки
            console.log(startIndex + index + 1, item.title);
          });
        }
        // Добавляем карточку в контейнер
        container.appendChild(card);
      });
      renderPagination();
    }
    ////////////////////////////////////////////////////////////////////////////////////////////
    // /////////////////////////Загрузка данных карточек из JSON-файла/////////////////////////
    fetch("../js/obj.json")
      .then((response) => {
        if (!response.ok)
          throw new Error(`HTTP error! Статус: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        allCards = data; // Сохраняем карточки в глобальной переменной
        renderPage(); // Отображаем первую страницу карточек
      })
      .catch((error) => console.error("Ошибка загрузки JSON:", error));
    ////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////// Функция управления отображением модального окна/////////////////////////
    function toggleCartsFull(action) {
      if (action === "show") {
        cartsFullCon.classList.remove("hide");
        cartsFullCon.classList.add("show");
      } else if (action === "hide") {
        cartsFullCon.classList.remove("show");
        cartsFullCon.classList.add("hide");
      }
    }
    // Обработчик завершения анимации модального окна
    cartsFullCon.addEventListener("animationend", (event) => {
      if (event.animationName === "fadeOutCarts") {
        cartsFullCon.classList.add("hide-prev"); // Скрываем окно после завершения анимации скрытия
      } else if (event.animationName === "fadeInCarts") {
        cartsFullCon.classList.remove("hide-prev"); // Убираем класс скрытия после анимации появления
      }
    });
    // Закрытие модального окна по клику вне контента
    cartsFullCon.addEventListener("click", (event) => {
      if (
        !event.target.closest(
          ".carts-full, .swiper-button-prev, .swiper-button-next"
        )
      ) {
        toggleCartsFull("hide");
      }
    });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////Функция обновления слайдера (Swiper) для модального окна/////////////////////////
    function updateSwiper(cartIndex, item) {
      containerCarts.innerHTML = ""; // Очищаем слайдер
      const swiperWrapper = document.createElement("div");
      swiperWrapper.className = "swiper-wrapper";
      // Создаем слайды для текущей карточки
      for (let i = 1; i <= 5; i++) {
        const slide = document.createElement("div");
        slide.className = "swiper-slide carts-slide";
        slide.innerHTML = `
            <div class="swiper-slide carts-slide">
              <img class="swiper-slide carts-slide-back" src="/assets/img/carts/${cartIndex}/${i}.png" alt="">
              <h2 class="adress-full-carts">${item.address}</h2>
              <img class="logo-swiper" style="position: absolute; top: 20px; right: 30px; width: 200px; z-index: 99999; opacity: 0.5;" src="/assets/svg/logo-2.svg" alt="">
            </div>
          `;
        swiperWrapper.appendChild(slide);
      }
      containerCarts.appendChild(swiperWrapper);
      new Swiper(".carts-swiper", {
        slidesPerView: 1,
        loop: true,
        autoplay: { delay: 25000 },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        scrollbar: { el: ".swiper-scrollbar", hide: true },
      });
    }
    //////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Рендер панели пагинации //////////////////////////////////////////////////
    function renderPagination() {
      paginationContainer.innerHTML = ""; // Очищаем предыдущую пагинацию
      const totalPages = Math.ceil(allCards.length / cardsPerPage); // Количество страниц
      for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.className = `pagination-btn btn ${
          i === currentPage ? "active" : ""
        }`;
        pageButton.textContent = i;
        // Обработчик нажатия на кнопку пагинации
        pageButton.addEventListener("click", () => {
          currentPage = i;
          renderPage(); // Рендерим соответствующую страницу
          scrollToSearch(); // Скроллим к поисковой строке
        });
        paginationContainer.appendChild(pageButton);
      }
    }
    //////////////////////Функция скролла к блоку с поисковой строкой
    function scrollToSearch() {
      const searchBlock = document.querySelector(".search");
      if (searchBlock) {
        searchBlock.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////// Реализация поиска карточек ////////////////////////////////////////////
    searchInput.addEventListener("input", handleSearch); // При вводе выполняем поиск
    searchInput.addEventListener("focus", showResultsList); // При фокусе показываем список

    searchInput.addEventListener("blur", () =>
      setTimeout(hideResultsList, 200)
    ); // Скрываем список

    ///////////////////////// Обработчик поиска //////////////////////////////////////////
    function handleSearch(event) {
      const searchValue = event.target.value.trim().toLowerCase(); // Приводим строку к нижнему регистру
      const filteredCards = allCards.filter((card) =>
        card.title.toLowerCase().includes(searchValue)
      );
      renderFilteredCards(filteredCards); // Отрисовываем отфильтрованные карточки
      renderResultsList(filteredCards); // Обновляем список результатов
    }
    function renderFilteredCards(filteredCards) {
      // Очищаем контейнер, чтобы удалить предыдущие карточки
      container.innerHTML = "";
      // Проверяем наличие карточек
      if (filteredCards.length === 0) {
        container.innerHTML =
          "<p>Нет объектов, соответствующих вашему запросу.</p>";
        return;
      }
      //Рендерим каждую карточку из массива `filteredCards`
      filteredCards.forEach((item) => {
        // Получаем оригинальный индекс карточки из массива allCards
        const originalIndex = allCards.indexOf(item);
        //const startIndex = (currentPage - 1) * cardsPerPage; // Начальный индекс для текущей страницы
        //Создаем карточку
        const card = document.createElement("div");
        card.className = "carts";
        card.style.backgroundImage = `url(/assets/img/carts/${
          originalIndex + 1
        }/1.png)`;
        // Добавляем контент в карточку
        card.innerHTML = `
								<div class="carts-content">
									<h1>${item.title}</h1>
									<h2>${item.description}</h2>
									<h2><span>Адрес:</span><br>${item.address}</h2>
									<div class="carts-prop">
										<h3>Год проведения работ <br><span>${item.year}</span></h3>
										<h3>Масса м/к <br><span>${item.weight}</span></h3>
									</div>
									<div class="wu-mob-con">
										<img class="wu-mob" src="/assets/svg/wu.svg" alt="">
									</div>
								</div>
								<div class="carts-back"></div>
							`;
        // Функция для определения мобильного устройства
        function isMobileDevice() {
          return window.innerWidth <= 768; // Например, ширина экрана ≤ 768px считается мобильной
        }
        // Выбор обработчиков для мобильной и десктопной версии
        if (isMobileDevice()) {
          // Для мобильных устройств: заменить mouseenter / mouseleave на click
          card.addEventListener("click", (event) => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            // Переключение классов на click
            cartsContent.classList.toggle("show-obj");
            cartsBack.classList.toggle("show-obj");
            // Проверяем, был ли клик на carts-content
            const wuMob = card.querySelector(".wu-mob");
            if (wuMob) {
              wuMob.addEventListener("click", (event) => {
                event.stopPropagation(); // Останавливаем всплытие, чтобы избежать конфликта с кликом на `card`
                toggleCartsFull("show");
                updateSwiper(originalIndex + 1, item); // Передаем индекс и данные текущей карточки
              });
            }
          });
        } else {
          // Для десктопных устройств: стандартные обработчики mouseenter / mouseleave
          card.addEventListener("mouseenter", () => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            cartsContent.classList.add("show-obj");
            cartsBack.classList.add("show-obj");
          });
          card.addEventListener("mouseleave", () => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            cartsContent.classList.remove("show-obj");
            cartsBack.classList.remove("show-obj");
          });
          // Обработчик клика (для десктопной версии остается на карточке)
          card.addEventListener("click", () => {
            toggleCartsFull("show");
            updateSwiper(originalIndex + 1, item); // Передаем индекс и данные текущей карточки
          });
        }
        // Добавляем карточку в контейнер
        container.appendChild(card);
      });
      renderPagination(); // Рендерим панель пагинации
    }
    // Рендер списка результатов поиска
    function renderResultsList(cards) {
      resultsList.innerHTML = ""; // Очищаем список
      if (cards.length === 0) {
        resultsList.textContent = "Нет актуальных элементов";
        return;
      }
      // Создаем элементы списка результатов
      cards.forEach((card) => {
        const listItem = document.createElement("div");
        listItem.textContent = card.title;
        listItem.classList.add("result-item");
        listItem.addEventListener("click", () => {
          searchInput.value = card.title;
          searchInput.focus();
          resultsList.classList.remove("visible");
          handleSearch({ target: searchInput });
        });
        resultsList.appendChild(listItem);
      });
    }
    // Показ списка результатов
    function showResultsList() {
      resultsList.classList.add("visible");
      renderResultsList(allCards);
    }
    // Скрытие списка результатов
    function hideResultsList() {
      resultsList.classList.remove("visible");
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////filter-btn////////////////////////////////////
    // Функция для очистки строки от лишних символов, оставляя только цифры в весе
    function cleanWeight(weight) {
      return parseFloat(weight.toString().replace(/[^0-9.]/g, ""));
    }
    // Фильтры
    document.querySelector(".new").addEventListener("click", () => {
      // Сортировка "Новые": от наименьшего года к большему
      const sortedCards = [...allCards].sort((a, b) => {
        // Если год "действующий объект", сортируем как самый новый
        if (a.year === "действующий объект") return -1;
        if (b.year === "действующий объект") return 1;
        return b.year - a.year;
      });
      renderFilteredCards(sortedCards); // Рендерим сортированные карточки
    });
    document.querySelector(".old").addEventListener("click", () => {
      // Сортировка "Старые": от наибольшего года к наименьшему
      const sortedCards = [...allCards].sort((a, b) => {
        if (a.year === "действующий объект") return 1;
        if (b.year === "действующий объект") return -1;
        return a.year - b.year;
      });
      renderFilteredCards(sortedCards);
    });
    document.querySelector(".max-mass").addEventListener("click", () => {
      // Сортировка "Наиболее массивные": от наименьшего к большему по весу
      const sortedCards = [...allCards].sort((a, b) => {
        const weightA = cleanWeight(a.weight);
        const weightB = cleanWeight(b.weight);
        return weightB - weightA;
      });
      renderFilteredCards(sortedCards);
    });
    document.querySelector(".min-mass").addEventListener("click", () => {
      // Сортировка "Наименее массивные": от наибольшего к наименьшему по весу
      const sortedCards = [...allCards].sort((a, b) => {
        const weightA = cleanWeight(a.weight);
        const weightB = cleanWeight(b.weight);
        return weightA - weightB;
      });
      renderFilteredCards(sortedCards);
    });
    // Функция отрисовки карточек (та же, что используется выше)
    function renderFilteredCards(filteredCards) {
      container.innerHTML = "";
      if (filteredCards.length === 0) {
        container.innerHTML =
          "<p>Нет карточек, соответствующих вашему запросу.</p>";
        return;
      }
      filteredCards.forEach((item) => {
        const originalIndex = allCards.indexOf(item);
        // Создаем карточку
        const card = document.createElement("div");
        card.className = "carts";
        // Указываем фон с использованием originalIndex
        card.style.backgroundImage = `url(/assets/img/carts/${
          originalIndex + 1
        }/1.png)`;
        // Пример заполнения карточки данными
        card.innerHTML = `
          <div class="carts-content">
            <h1>${item.title}</h1>
            <h2>${item.description}</h2>
            <h2><span>Адрес:</span><br>${item.address}</h2>
            <div class="carts-prop">
              <h3>Год проведения работ <br><span>${item.year}</span></h3>
              <h3>Масса м/к <br><span>${item.weight}</span></h3>
            </div>
    				<div class="wu-mob-con">
    					<img class="wu-mob" src="/assets/svg/wu.svg" alt="">
    				</div>
          </div>
          <div class="carts-back"></div>
        `;
        // Функция для определения мобильного устройства
        function isMobileDevice() {
          return window.innerWidth <= 768; // Например, ширина экрана ≤ 768px считается мобильной
        }
        // Выбор обработчиков для мобильной и десктопной версии
        if (isMobileDevice()) {
          // Для мобильных устройств: заменить mouseenter / mouseleave на click
          card.addEventListener("click", (event) => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            // Переключение классов на click
            cartsContent.classList.toggle("show-obj");
            cartsBack.classList.toggle("show-obj");
            // Проверяем, был ли клик на carts-content
            const wuMob = card.querySelector(".wu-mob");
            if (wuMob) {
              wuMob.addEventListener("click", (event) => {
                event.stopPropagation(); // Останавливаем всплытие, чтобы избежать конфликта с кликом на `card`
                toggleCartsFull("show");
                updateSwiper(originalIndex + 1, item); // Передаем индекс и данные текущей карточки
              });
            }
          });
        } else {
          // Для десктопных устройств: стандартные обработчики mouseenter / mouseleave
          card.addEventListener("mouseenter", () => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            cartsContent.classList.add("show-obj");
            cartsBack.classList.add("show-obj");
          });
          card.addEventListener("mouseleave", () => {
            const cartsContent = card.querySelector(".carts-content");
            const cartsBack = card.querySelector(".carts-back");
            cartsContent.classList.remove("show-obj");
            cartsBack.classList.remove("show-obj");
          });
          // Обработчик клика (для десктопной версии остается на карточке)
          card.addEventListener("click", () => {
            toggleCartsFull("show");
            updateSwiper(originalIndex + 1, item); // Передаем индекс и данные текущей карточки
          });
        }
        // Добавляем карточку в контейнер
        container.appendChild(card);
      });
      renderPagination(); // Рендерим панель пагинации
    }
  });
}

//////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
