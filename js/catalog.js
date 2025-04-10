//////////////////////////////////////////////////////////////////////////////

// function checkWordCount() {
//   const descriptionElement = document.getElementById("description");
//   const fullText = descriptionElement.innerText.trim();
//   const words = fullText.split(/\s+/); // Разбиваем текст на слова

//   if (words.length > 40) {
//     const shortText = words.slice(0, 40).join(" ") + "..."; // Берем первые 20 слов
//     descriptionElement.innerText = shortText; // Обновляем текст в элементе
//     document.getElementById("readMoreBtn").style.display = "inline"; // Показываем кнопку
//   }
// }

// document.getElementById("readMoreBtn").onclick = function () {
//   const descriptionElement = document.getElementById("description");
//   descriptionElement.innerText =
//     descriptionElement.getAttribute("data-full-text"); // Показываем полный текст
//   this.style.display = "none"; // Скрываем кнопку
// };

// window.onload = function () {
//   // Сохраняем полный текст в атрибут data-full-text
//   const descriptionElement = document.getElementById("description");
//   descriptionElement.setAttribute(
//     "data-full-text",
//     descriptionElement.innerText
//   );
//   checkWordCount();
// };
