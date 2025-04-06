const input = document.querySelector("input");

input.addEventListener("focus", (event) => {
  event.target.style.outline = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const catalogBtn = document.querySelector(".catalog-btn");
  const subMenuCatalog = document.querySelector(".menu-categories");
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
/////////////////////////////////////////////////////////////////////////////////
// const toggleCategories = () => {
//   const openItems = document.querySelectorAll(".open-img");

//   openItems.forEach((item) => {
//     item.addEventListener("click", () => {
//       console.log("ok");
//       const subcategories = item.nextElementSibling;
//       const allSubcategories = document.querySelectorAll("ul.open, ul.close");

//       allSubcategories.forEach((ul) => {
//         if (ul !== subcategories && !ul.contains(item)) {
//           ul.classList.remove("open");
//           ul.classList.add("close");
//           // Убираем класс active у заголовка, если подкатегории закрыты
//           const parentItem = ul.previousElementSibling;
//           if (parentItem) {
//             parentItem.classList.remove("active");
//           }
//         }
//       });

//       if (subcategories) {
//         subcategories.classList.toggle("open");
//         subcategories.classList.toggle("close");

//         // Переключаем класс active у заголовка, если подкатегории открыты
//         if (subcategories.classList.contains("open")) {
//           item.classList.add("active");
//         } else {
//           item.classList.remove("active");
//         }
//       }
//     });
//   });
// };

// toggleCategories();

//////////////////////////////////////////////////////////
const jsonCategoriesMenu = "../js/categories.json";

const fetchDataCategoriesMenu = async () => {
  try {
    const response = await fetch(jsonCategoriesMenu);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка загрузки данных: ", error);
  }
};

const createListMenu = async () => {
  const dataCategoriesMenu = await fetchDataCategoriesMenu();
  const menuContainer = document.querySelector(".menu-categories"); // Получаем контейнер для меню
  menuContainer.innerHTML = ""; // Очищаем предыдущее содержимое

  // Перебираем категории
  for (const [categoryName, categoryDetails] of Object.entries(
    dataCategoriesMenu[0].categories
  )) {
    const categoryItem = document.createElement("li");
    categoryItem.textContent = categoryName;

    const subCategoryList = document.createElement("ul"); // Список для подкатегорий
    subCategoryList.classList.add("menu-sub_categories");

    // Перебираем подкатегории
    for (const [subCategoryName, subCategoryDetails] of Object.entries(
      categoryDetails.subCategories
    )) {
      const subCategoryItem = document.createElement("li");
      subCategoryItem.textContent = subCategoryName;

      const objectList = document.createElement("ul"); // Список для объектов
      objectList.classList.add("menu-items");

      // Перебираем объекты в подкатегории
      for (const object of subCategoryDetails.object) {
        const objectItem = document.createElement("li");
        objectItem.textContent = object;
        objectList.appendChild(objectItem); // Добавляем объект в список объектов
      }

      subCategoryItem.appendChild(objectList); // Добавляем список объектов в подкатегорию
      subCategoryList.appendChild(subCategoryItem); // Добавляем подкатегорию в список подкатегорий
    }

    categoryItem.appendChild(subCategoryList); // Добавляем список подкатегорий в категорию
    menuContainer.appendChild(categoryItem); // Добавляем категорию в меню
  }
};

// Запускаем функцию создания списка
createListMenu();
