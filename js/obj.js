/////////////////////////----JSON------////////////////////////////////
const jsonCategories = "../js/categories.json";

const fetchDataCategories = async () => {
  try {
    const response = await fetch(jsonCategories);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
  }
};
/////////////////////////----JSON------////////////////////////////////

/////////////////////////---- BREND ------////////////////////////////////
const activeBrend = async () => {
  const categoriesBrand = document.querySelectorAll(".categories-brand");

  categoriesBrand.forEach((item) => {
    item.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      const activeCount = Array.from(categoriesBrand).filter((el) =>
        el.classList.contains("active")
      ).length;

      if (isActive) {
        if (activeCount > 1) {
          item.classList.remove("active");
        }
      } else {
        item.classList.add("active");
      }

      const activeBrands = Array.from(categoriesBrand)
        .filter((el) => el.classList.contains("active"))
        .map((el) => el.querySelector("h2").textContent);

      if (activeBrands.length > 0) {
        const brandNames = activeBrands.join(", ");
        const tip = document.querySelector(".tip");

        tip.classList.add("active");
        tip.innerHTML = `<h3>Задан фильтр по брендам:<br> ${brandNames}</h3>`;

        createLeftMenu(activeBrands);
        createListMenu(activeBrands);
      }
    });
  });
};

activeBrend();
/////////////////////////---- BREND ------////////////////////////////////

///////////////////////---------LEFT-MENU--------///////////////////////////////////

const createLeftMenu = async (activeBrands = ["MECARGO", "BARGAM", "MOSH"]) => {
  const dataCategoriesMenu = await fetchDataCategories();
  const menuContainer = document.querySelector(".main-categories");

  menuContainer.innerHTML = "";

  let menuHTML = "";

  for (const [categoryName, categoryDetails] of Object.entries(
    dataCategoriesMenu[0].categories[langToggle]
  )) {
    let subCategoryHTML = "";

    if (categoryDetails.subCategories) {
      for (const [subCategoryName, subCategoryDetails] of Object.entries(
        categoryDetails.subCategories
      )) {
        let objectHTML = "";

        if (subCategoryDetails.object && subCategoryDetails.object.length > 0) {
          for (const object of subCategoryDetails.object) {
            if (activeBrands.some((brand) => object.brand.includes(brand))) {
              objectHTML += `
              <li class="object-item object-click"><h2 class="obj-btn">${object.name}${object.cod}</h2></li>`;
            }
          }
        }

        subCategoryHTML += `
                <li>
                  <h2 class="open-img">${subCategoryName}</h2>
                  <ul class="main-items close">${objectHTML}</ul>
                </li>`;
      }
    }

    menuHTML += `
      <li>
        <h2 class="open-img">${categoryName}</h2>
        <ul class="main-sub_categories main-items close">${subCategoryHTML}</ul>
      </li>`;
  }
  menuContainer.innerHTML = menuHTML;
  setupToggleCategories();

  objectClick();
};

createLeftMenu();
///////////////////////---------LEFT-MENU--------///////////////////////////////////

//////////////////////////------LEFT_MENU_ANIMATED--------///////////////////////////
const setupToggleCategories = () => {
  const openItems = document.querySelectorAll(".open-img");
  const objectItem = document.querySelectorAll(".object-item");

  openItems.forEach((item) => {
    item.addEventListener("click", () => {
      const subcategories = item.nextElementSibling;
      const allSubcategories = document.querySelectorAll("ul.open, ul.close");

      allSubcategories.forEach((ul) => {
        if (ul !== subcategories && !ul.contains(item)) {
          ul.classList.remove("open");
          ul.classList.add("close");
          const parentItem = ul.previousElementSibling;
          if (parentItem) {
            parentItem.classList.remove("active");
          }
        }
      });

      if (subcategories) {
        subcategories.classList.toggle("open");
        subcategories.classList.toggle("close");

        if (subcategories.classList.contains("open")) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      }
    });
  });

  objectItem.forEach((item) => {
    item.addEventListener("click", () => {
      // Удаляем класс 'active' у всех элементов
      objectItem.forEach((el) => {
        el.classList.remove("active");
      });
      // Добавляем класс 'active' к текущему элементу
      item.classList.add("active");
    });
  });
};
//

/////////////////////------LEFT_MENU_ANIMATED--------////////////////////////////

///////////////////////---------MENU--------///////////////////////////////////
const createListMenu = async (activeBrands = ["MECARGO", "BARGAM", "MOSH"]) => {
  const dataCategoriesMenu = await fetchDataCategories();
  const menuContainer = document.querySelector(".menu-categories");
  menuContainer.innerHTML = "";

  let menuHTML = "";

  // Готовим HTML для меню
  for (const [categoryName, categoryDetails] of Object.entries(
    dataCategoriesMenu[0].categories[langToggle]
  )) {
    let subCategoryHTML = "";

    if (categoryDetails.subCategories) {
      for (const [subCategoryName, subCategoryDetails] of Object.entries(
        categoryDetails.subCategories
      )) {
        let objectHTML = "";

        if (subCategoryDetails.object && subCategoryDetails.object.length > 0) {
          for (const object of subCategoryDetails.object) {
            if (activeBrands.some((brand) => object.brand.includes(brand))) {
              objectHTML += `
								<li class="">
									<h2 class="obj-main_menu">${object.name}${object.cod}</h2>
								</li>`;
            }
          }
        } else {
          objectHTML = "";
        }

        subCategoryHTML += `
          <li>
            ${subCategoryName}
            <ul class="menu-items object-click">
              ${objectHTML}
            </ul>
          </li>`;
      }
    }

    menuHTML += `
      <li>
        ${categoryName}
        <ul class="menu-sub_categories">
          ${subCategoryHTML}
        </ul>
      </li>`;
  }
  objectClick();
  menuContainer.innerHTML = menuHTML;
};
createListMenu();
///////////////////////---------MENU--------///////////////////////////////////

///////////////////////---------OBJECT_ANIMATED--------///////////////////////////////////
const objAnimated = () => {
  const elementsToAnimate = [
    document.querySelector(".object-prevue"),
    document.querySelector(".object-descripcion-con"),
    document.querySelector(".object-specifications"),
  ];

  const showElement = (element) => {
    element.classList.add("hide");
    setTimeout(() => {
      element.classList.remove("hide");
    }, 300);
  };

  elementsToAnimate.forEach(showElement);
};
///////////////////////---------OBJECT_ANIMATED--------///////////////////////////////////

///////////////////////--------- PHOTO -------///////////////////////////////////
function updateSlides(object) {
  // Проверяем, существует ли объект и его массив photo
  if (object && Array.isArray(object.photo)) {
    const photoUrls = []; // Создаем массив для хранения URL изображений

    // Заполняем массив photoUrls из данных объекта
    for (let i = 0; i < object.photo.length; i++) {
      photoUrls.push(object.photo[i]);
    }

    // Обновляем содержимое слайдов из photoUrls для основных слайдов
    updateSlideImages(".object-slide", photoUrls);

    // Обновляем содержимое слайдов из photoUrls для мини-слайдов
    updateSlideImages(".object-slide_mini", photoUrls);
  }
}

function updateSlideImages(selector, photoUrls) {
  const slides = document.querySelectorAll(selector);

  slides.forEach((item, index) => {
    // Проверяем, существует ли соответствующий URL для текущего слайда
    if (index < photoUrls.length) {
      // Находим img внутри текущего слайда и обновляем его src
      const img = item.querySelector("img"); // Находим изображение внутри слайда
      if (img) {
        img.src = photoUrls[index]; // Обновляем ссылку на изображение
      } else {
        // Если изображения нет, создаем его
        item.innerHTML = `<img src="${photoUrls[index]}"/>`;
      }
    }
  });
}
///////////////////////--------- PHOTO --------///////////////////////////////////

///////////////////////---------OBJECT-KLICK--------///////////////////////////////////

const objectClick = async () => {
  const objClick = document.querySelectorAll(".object-click");
  const data = await fetchDataCategories();
  const objName = document.querySelector(".object-name_main-text");
  const objDescripcion = document.querySelector(
    ".object-descripcion_main-text"
  );
  const objSubCategory = document.querySelector(".object-categoty_main-text");

  objClick.forEach((item) => {
    item.addEventListener("click", () => {
      objAnimated();

      // Получаем текстовое содержимое элемента h2 внутри текущего objItem
      const btnText = item.querySelector(".obj-btn").textContent;

      // Разделяем текст на имя и код (например, "ПлугPG 300" на "Плуг" и "PG 300")
      const regex = /(.*?)(\s*PG\s*\d+)/;
      const match = btnText.match(regex);
      if (match) {
        const name = match[1].trim(); // Получаем имя объекта
        const cod = match[2].trim(); // Получаем код объекта

        // Проходим по категориям и подкатегориям для поиска объекта
        for (const [categoryName, categoryDetails] of Object.entries(
          data[0].categories[langToggle]
        )) {
          if (categoryDetails.subCategories) {
            for (const [subCategoryName, subCategoryDetails] of Object.entries(
              categoryDetails.subCategories
            )) {
              for (const object of subCategoryDetails.object) {
                if (object.name === name && object.cod === cod) {
                  objName.textContent = object.name + " " + object.cod;
                  objDescripcion.textContent = object.description;
                  objSubCategory.innerHTML =
                    categoryName + " &nbsp; | &nbsp; " + subCategoryName;
                  updateSlides(object);
                }
              }
            }
          }
        }
      } else {
        console.error(
          "Не удалось извлечь имя и код из текста кнопки:",
          btnText
        );
      }
    });
  });
};
///////////////////////---------OBJECT-KLICK--------///////////////////////////////////

//////////////////////-----------SEARCH------------/////////////////////////////////
const search = () => {
  const langSwitch = document.querySelectorAll(".lang-switch");

  langSwitch.forEach((item) => {
    item.addEventListener("click", () => {
      const langValue = item.value;

      if (langValue === "ru") {
        langToggle = "ru";
      } else {
        langToggle = "en";
      }
    });
  });

  // Вызываем функцию для инициализации
  let langToggle = "ru"; // Переменная для текущего языка

  const searchProducts = async (query) => {
    const data = await fetchDataCategories();

    if (!data || !data.length) {
      console.error("Неверные данные");
      return;
    }

    const results = [];

    data.forEach((category) => {
      for (const categoryName in category.categories[langToggle]) {
        const subCategories =
          category.categories[langToggle][categoryName].subCategories;

        for (const subCategoryName in subCategories) {
          const products = subCategories[subCategoryName].object;

          if (Array.isArray(products)) {
            // Фильтровать продукты по запросу
            products.forEach((item) => {
              const name = item.name.toLowerCase();
              if (name.includes(query.toLowerCase())) {
                results.push(item);
              }
            });
          }
        }
      }
    });

    displayResults(results);
    console.log(results);
  };

  const displayAllProducts = async () => {
    const data = await fetchDataCategories();

    if (!data || !data.length) {
      console.error("Неверные данные");
      return;
    }

    const allProducts = [];

    data.forEach((category) => {
      for (const categoryName in category.categories[langToggle]) {
        const subCategories =
          category.categories[langToggle][categoryName].subCategories;

        for (const subCategoryName in subCategories) {
          const products = subCategories[subCategoryName].object;

          if (Array.isArray(products)) {
            allProducts.push(...products); // Собираем все товары
          }
        }
      }
    });

    // Фильтруем товары по популярности и новизне
    const popularAndNewProducts = allProducts.filter(
      (product) => (product.filter && product.filter[0]) || product.filter[1]
    );

    const otherProducts = allProducts.filter(
      (product) =>
        !((product) =>
          (product.filter && product.filter[0]) || product.filter[1])
    );

    // Объединяем массивы
    const sortedProducts = [...popularAndNewProducts, ...otherProducts];

    document
      .getElementById("searchInput")
      .addEventListener("input", (event) => {
        const query = event.target.value;
        if (query.length > 0) {
          searchProducts(query);
        } else {
          displayResults(sortedProducts);
        }
      });

    displayResults(sortedProducts); // Отображаем все товары в нужном порядке
  };

  const displayResults = (results) => {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; // Очистка предыдущих результатов

    if (results.length === 0) {
      resultsContainer.innerHTML = `<h2 class="no-search">Инструмент не найден</h2>`;
      return;
    }

    results.forEach((item) => {
      const resultItem = document.createElement("div");

      resultItem.classList.add("result-item");

      resultItem.innerHTML = `
					<div class="search-photo">
						<img src="${item.photo[0]}" alt="${item.name}">

					</div>
					<div class="search-item">
						<h1>${item.name}</h1>
						<h2>${item.cod}</h2>
						<h3>${item.filter[0] ? item.filter[0] : ""}</h3>
					</div>
				`;
      resultsContainer.appendChild(resultItem);
      // }
    });
  };

  document.getElementById("searchInput").addEventListener("focus", (event) => {
    const query = event.target.value;
    if (query.length === 0) {
      displayAllProducts();
    }
  });

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("focus", () => {
    document.querySelector("#resultsContainer").classList.add("active");
  });
  searchInput.addEventListener("blur", () => {
    document.querySelector("#resultsContainer").classList.remove("active");
  });

  searchProducts();
};
search();
//////////////////////-----------SEARCH------------/////////////////////////////////
///////////////////////---------LANG-SWICH--------///////////////////////////////////

const langSwitch = document.querySelectorAll(".lang-switch");
let langToggle = "ru";
langSwitch.forEach((item) => {
  item.addEventListener("click", () => {
    const langValue = item.value;

    if (langValue === "ru") {
      langToggle = "ru";
    } else {
      langToggle = "en";
    }

    // Обновляем меню с новым языком
    createListMenu(langToggle);
    createLeftMenu(langToggle);
    activeBrend(langToggle);
    // objectClick(langToggle);
  });
});

///////////////////////---------LANG-SWICH--------///////////////////////////////////
