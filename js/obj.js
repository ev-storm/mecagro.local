//////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////
const createAndSetupCategories = async () => {
  const dataCategories = await fetchDataCategories();

  // Проверяем, что данные загружены корректно
  if (!dataCategories || !dataCategories[0].categories) {
    console.error("Не удалось загрузить категории или они отсутствуют");
    return;
  }

  const mainCategories = document.querySelector(".main-categories");
  mainCategories.innerHTML = ""; // Очищаем предыдущее содержимое

  // Перебираем категории
  for (const [categoryName, categoryDetails] of Object.entries(
    dataCategories[0].categories
  )) {
    const categoryItem = document.createElement("li");
    categoryItem.innerHTML = `<h2 class="open-img">${categoryName}</h2>`;

    const subCategoryList = document.createElement("ul");
    subCategoryList.classList.add("main-sub_categories");
    subCategoryList.classList.add("main-items", "close");

    // Перебираем подкатегории
    for (const [subCategoryName, subCategoryDetails] of Object.entries(
      categoryDetails.subCategories
    )) {
      const subCategoryItem = document.createElement("li");
      subCategoryItem.innerHTML = `<h2 class="open-img">${subCategoryName}</h2>`;

      const objectList = document.createElement("ul");
      objectList.classList.add("main-items", "close");

      // Добавляем предметы в подкатегории
      for (const object of subCategoryDetails.object) {
        const objectItem = document.createElement("li");
        objectItem.classList.add("object-item");
        objectItem.innerHTML = `<h2 class="obj-btn">${object}</h2>`;
        objectList.appendChild(objectItem);
      }

      subCategoryItem.appendChild(objectList);
      subCategoryList.appendChild(subCategoryItem);
    }

    categoryItem.appendChild(subCategoryList);
    mainCategories.appendChild(categoryItem);
  }

  // Инициализируем переключение категорий
  setupToggleCategories();
};

const setupToggleCategories = () => {
  const openItems = document.querySelectorAll(".open-img");

  openItems.forEach((item) => {
    item.addEventListener("click", () => {
      console.log("ok");
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
};

// Запуск функции создания и настройки категорий
createAndSetupCategories();

// const createList = async () => {
//   const dataCategories = await fetchDataCategories();

//   // Проверяем, что данные загружены корректно
//   if (!dataCategories || !dataCategories[0].categories) {
//     console.error("Не удалось загрузить категории или они отсутствуют");
//     return;
//   }

//   const mainCategories = document.querySelector(".main-categories"); // Получаем один элемент

//   mainCategories.innerHTML = ""; // Очищаем предыдущее содержимое

//   // Перебираем категории
//   for (const [categoryName, categoryDetails] of Object.entries(
//     dataCategories[0].categories
//   )) {
//     const categoryItem = document.createElement("li");
//     categoryItem.innerHTML = `<h2 class="open-img">${categoryName}</h2>`;

//     const subCategoryList = document.createElement("ul"); // Список для подкатегорий
//     subCategoryList.classList.add("main-sub_categories");

//     // Перебираем подкатегории
//     for (const [subCategoryName, subCategoryDetails] of Object.entries(
//       categoryDetails.subCategories
//     )) {
//       const subCategoryItem = document.createElement("li");
//       subCategoryItem.innerHTML = `<h2 class="open-img">${subCategoryName}</h2>`;

//       const objectList = document.createElement("ul");
//       objectList.classList.add("main-items");
//       objectList.classList.add("close");

//       for (const object of subCategoryDetails.object) {
//         const objectItem = document.createElement("li");
//         objectItem.classList.add("object-item");
//         objectItem.innerHTML = `<h2 class="obj-btn">${object}</h2>`;
//         objectList.appendChild(objectItem);
//       }

//       subCategoryItem.appendChild(objectList);
//       subCategoryList.appendChild(subCategoryItem);
//     }

//     categoryItem.appendChild(subCategoryList);
//     mainCategories.appendChild(categoryItem); // Добавляем элемент категории в mainCategories
//   }
// };

// createList();
//////////////////////////////////////////////////////////
// const jsonObj = "../js/obj.json";

// const fetchDataObj = async () => {
//   try {
//     const response = await fetch(jsonObj);
//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }
//     return await response.json(); // Возвращаем загруженные данные
//   } catch (error) {
//     console.error("Ошибка загрузки данных: ", error);
//   }
// };

// const createListObject = async () => {
//   const dataObj = await fetchDataObj();
//   const catigoriesItem = document.querySelectorAll(".main-categories");

//   catigoriesItem.forEach((element) => {
//     const categoryName = element.innerText;
//     const matchedItems = dataObj.filter((item) =>
//       item.subCategories.ru.includes(categoryName)
//     );

//     if (matchedItems.length > 0) {
//       let objectList = element.querySelector(".main-sub_categories");
//       if (!objectList) {
//         objectList = document.createElement("ul");
//         objectList.classList.add("object-list", "close");
//         element.appendChild(objectList);
//       }

//       // Генерируем HTML строки для всех объектов, которые подошли под фильтрацию
//       const listItemsHTML = matchedItems
//         .map((item) => {
//           return `<li class="obj-btn"><h2>${item.name.ru}${item.cod.ru}</h2></li>`;
//         })
//         .join(""); // Объединяем все элементы в строку

//       createListObject.innerHTML += listItemsHTML; // Обновляем innerHTML списка
//     }
//   });
// };
