// /////////////////////////----JSON------////////////////////////////////
const jsonCategories = "../js/object.json";

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
// /////////////////////////----JSON------////////////////////////////////

// /////////////////////////---- BREND ------////////////////////////////////
// const activeBrend = async () => {
//   const categoriesBrand = document.querySelectorAll(".categories-brand");

//   categoriesBrand.forEach((item) => {
//     item.addEventListener("click", () => {
//       const isActive = item.classList.contains("active");

//       const activeCount = Array.from(categoriesBrand).filter((el) =>
//         el.classList.contains("active")
//       ).length;

//       if (isActive) {
//         if (activeCount > 1) {
//           item.classList.remove("active");
//         }
//       } else {
//         item.classList.add("active");
//       }

//       const activeBrands = Array.from(categoriesBrand)
//         .filter((el) => el.classList.contains("active"))
//         .map((el) => el.querySelector("h2").textContent);

//       if (activeBrands.length > 0) {
//         const brandNames = activeBrands.join(", ");
//         const tip = document.querySelector(".tip");

//         tip.classList.add("active");
//         tip.innerHTML = `<h3>Задан фильтр по брендам:<br> ${brandNames}</h3>`;

//         createLeftMenu(activeBrands);
//         createListMenu(activeBrands);
//       }
//     });
//   });
// };

// activeBrend();
// /////////////////////////---- BREND ------////////////////////////////////

// ///////////////////////---------LEFT-MENU--------///////////////////////////////////
const renderCategories = async () => {
  const data = await fetchDataCategories();

  const categories = data[0].categories[langToggle];

  const mainCategoriesContainer = document.querySelector(".main-categories");
  mainCategoriesContainer.innerHTML = "";

  for (const categoryName in categories) {
    const categoryItem = document.createElement("li");

    categoryItem.innerHTML = `
      <h2 class="open-img">${categoryName}</h2>
      <ul class="main-sub_categories main-items close">
      </ul>
    `;
    const subCategoriesContainer = categoryItem.querySelector(
      ".main-sub_categories"
    );

    const subCategories = categories[categoryName].subCategories;
    for (const subCategoryName in subCategories) {
      const subCategoryItem = document.createElement("li");
      subCategoryItem.innerHTML = `
        <h2 class="open-img">${subCategoryName}</h2>
        <ul class="main-items close">
        </ul>
      `;

      const objectsContainer = subCategoryItem.querySelector(".main-items");

      // Обрабатываем объекты в подкатегории
      const objects = subCategories[subCategoryName].object || [];
      objects.forEach((obj) => {
        const objectItem = document.createElement("li");
        objectItem.classList.add("object-item", "object-click");
        objectItem.innerHTML = `<h2 class="obj-btn">${
          obj.name + " " + obj.cod
        }</h2>`;
        objectsContainer.appendChild(objectItem);
      });

      // Добавляем подкатегорию в категорию
      subCategoriesContainer.appendChild(subCategoryItem);
    }

    // Добавляем категорию в основной контейнер
    mainCategoriesContainer.appendChild(categoryItem);
    setupToggleCategories();
  }
};
renderCategories();
// ///////////////////////---------LEFT-MENU--------///////////////////////////////////

// //////////////////////////------LEFT_MENU_ANIMATED--------///////////////////////////
const setupToggleCategories = () => {
  const openItems = document.querySelectorAll(".open-img");
  const objectItems = document.querySelectorAll(".object-item");

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

  objectItems.forEach((item) => {
    item.addEventListener("click", () => {
      objectItems.forEach((el) => {
        el.classList.remove("active");
      });
      item.classList.add("active");

      // Открываем родительские подкатегории
      let parent = item.closest(".object-item").previousElementSibling; // Находим предыдущий элемент, который должен быть open-img
      while (parent) {
        if (parent.classList.contains("open-img")) {
          const subcategories = parent.nextElementSibling; // Получаем подкатегории
          if (subcategories) {
            subcategories.classList.remove("close");
            subcategories.classList.add("open");
            parent.classList.add("active");
          }
        }
        parent = parent.previousElementSibling; // Переходим к следующему родительскому элементу
      }
    });
  });
};
setupToggleCategories();
const expandActiveParents = (objectItems) => {
  // Получаем все элементы с классом active
  let activeItem = Array.from(objectItems).find((item) =>
    item.classList.contains("active")
  );

  // Проверка, существует ли активный элемент
  if (activeItem) {
    let parent = activeItem.closest("li"); // Получаем родительский элемент списка
    // Этот цикл открывает всех родителей
    while (parent) {
      const toggleParent = parent.querySelector(".toggle-parent"); // Находим родительскую категорию

      if (toggleParent) {
        const subcategories = parent.querySelector(".main-sub_categories"); // Получаем подкатегории
        if (subcategories) {
          subcategories.classList.remove("close");
          subcategories.classList.add("open");
          toggleParent.classList.add("active");
        }
      }

      parent = parent.parentElement.closest("li"); // Переходим к следующему родителю
    }
  } else {
    console.warn("Активный элемент не найден.");
  }
};
///////////////////////------LEFT_MENU_ANIMATED--------////////////////////////////

/////////////////////////---------SYNS_MENU--------///////////////////////////////////
const syncMenus = async () => {
  const menuItems = document.querySelectorAll(".menu-obj-item");
  const objectItems = document.querySelectorAll(".object-item");

  menuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
      const itemText = menuItem.innerText.trim();

      objectItems.forEach((objItem) => {
        objItem.classList.remove("active");
      });

      const matchingItem = Array.from(objectItems).find((objItem) => {
        const objText = objItem.innerText.trim();
        return objText.includes(itemText);
      });

      const mainItems = document.querySelectorAll(
        ".main-items, .main-sub_categories"
      );
      mainItems.forEach((item) => {
        item.classList.remove("open");
        item.classList.add("close");
      });

      if (matchingItem) {
        matchingItem.classList.add("active");

        const parentMainItems = matchingItem.closest(".main-items");
        const parentMainSubCategories = matchingItem.closest(
          ".main-sub_categories"
        );

        if (parentMainItems) {
          parentMainItems.classList.remove("close");
          parentMainItems.classList.add("open");
        }

        if (parentMainSubCategories) {
          parentMainSubCategories.classList.remove("close");
          parentMainSubCategories.classList.add("open");
        }
      } else {
        console.warn("Соответствующий элемент не найден.");
      }
    });
  });
};
syncMenus();
// ///////////////////////---------SYNS_MENU--------///////////////////////////////////

// ///////////////////////---------MENU--------///////////////////////////////////
const createListMenu = async () => {
  const dataCategoriesMenu = await fetchDataCategories();
  const menuContainer = document.querySelector(".menu-categories");
  menuContainer.innerHTML = "";

  // Готовим HTML для меню
  const categories = dataCategoriesMenu[0].categories[langToggle];

  for (const [categoryName, categoryDetails] of Object.entries(categories)) {
    const subCategoriesHTML = Object.entries(
      categoryDetails.subCategories || {}
    )
      .map(([subCategoryName, subCategoryDetails]) => {
        const objectsHTML = (subCategoryDetails.object || [])
          .map(
            (object) => `
            <li class="menu-obj-item object-click">
              <h2 class="menu-obj-text">${object.name + " " + object.cod}</h2>
            </li>`
          )
          .join("");

        return `
          <li>
            <h2 class="menu-sub_categories-text">${subCategoryName}</h2>
            <ul class="menu-items">
              ${objectsHTML}
            </ul>
          </li>`;
      })
      .join("");

    const categoryHTML = `
      <li>
        <h2 class="menu-categories-text">${categoryName}</h2>
        <ul class="menu-sub_categories">
          ${subCategoriesHTML}
        </ul>
      </li>`;

    menuContainer.innerHTML += categoryHTML;
    syncMenus();
    objClick();
  }
};
createListMenu();
// ///////////////////////---------MENU--------///////////////////////////////////

// ///////////////////////---------OBJECT_ANIMATED--------///////////////////////////////////
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
// ///////////////////////---------OBJECT_ANIMATED--------///////////////////////////////////

// ///////////////////////--------- PHOTO -------///////////////////////////////////
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
// ///////////////////////--------- PHOTO --------///////////////////////////////////

// ///////////////////////--------- SPECIFICATION --------///////////////////////////////////
// const specificationsFunc = async () => {
//   const spec = document.querySelectorAll(".object-specifications_table");
// };

// ///////////////////////--------- SPECIFICATION --------///////////////////////////////////

// ///////////////////////---------OBJECT-KLICK--------///////////////////////////////////

const objClick = async () => {
  const objClickElements = document.querySelectorAll(".object-click");
  const objName = document.querySelector(".object-name_main-text");
  const objDescripcion = document.querySelector(
    ".object-descripcion_main-text"
  );
  const objSubCategory = document.querySelector(".object-categoty_main-text");

  const data = await fetchDataCategories(); // Загружаем данные
  objClickElements.forEach((item) => {
    item.addEventListener("click", () => {
      objAnimated();
      const activeItem = document.querySelector(".object-item.active");
      const activeItemText = activeItem.innerText.trim();

      // *** Функция для поиска объекта ***
      const findObject = (categories, text) => {
        for (const category of Object.values(categories)) {
          for (const subCategory of Object.values(category.subCategories)) {
            for (const object of subCategory.object || []) {
              // Формируем строку для сравнения
              const objectText = `${object.name} ${object.cod}`;
              if (objectText === text) {
                return object; // Возвращаем найденный объект
              }
            }
          }
        }
        return null; // Если ничего не нашли
      };
      const findsubCategory = (categories, text) => {
        for (const category of Object.values(categories)) {
          for (const subCategory of Object.values(category.subCategories)) {
            return subCategory;
          }
        }
        return null; // Если ничего не нашли
      };

      const subCategory = findsubCategory(
        data[0].categories[langToggle],
        activeItemText.trim()
      );
      const object = findObject(
        data[0].categories[langToggle],
        activeItemText.trim()
      ); // Предположим, что мы ищем на русском языке
      if (object) {
        objName.textContent = object.name + " " + object.cod;
        objDescripcion.textContent = object.description;
        objSubCategory.innerHTML = subCategory[0];
      } else {
        console.log("Объект не найден");
      }
      updateSlides(object);
    });
  });
};
// ///////////////////////---------OBJECT-KLICK--------///////////////////////////////////

// //////////////////////-----------SEARCH------------/////////////////////////////////
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
// //////////////////////-----------SEARCH------------/////////////////////////////////
// ///////////////////////---------LANG-SWICH--------///////////////////////////////////
let langToggle = "ru";

function setupLanguageSwitch() {
  const langSwitch = document.querySelectorAll(".lang-switch");

  langSwitch.forEach((item) => {
    item.addEventListener("click", () => {
      const langValue = item.value;
      langToggle = langValue === "ru" ? "ru" : "en";

      renderCategories();
      createListMenu();
      objClick;
    });
  });
}
setupLanguageSwitch();

// // ///////////////////////---------LANG-SWICH--------///////////////////////////////////()
