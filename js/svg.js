function totalSvg() {
  const paths = document.querySelectorAll("svg path");
  const btns = document.querySelectorAll(".btn-svg");

  paths.forEach(function (path) {
    let len = Math.round(path.getTotalLength());

    // Устанавливаем начальный цвет обводки
    path.style.stroke = "#58C88A";
    path.setAttribute("stroke-dasharray", len);
    path.setAttribute("stroke-dashoffset", len);

    // Добавляем анимацию для проигрывания один раз
    const animate = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("values", `${len}; 0`);
    animate.setAttribute("dur", `${len / 100}`);
    animate.setAttribute("fill", "freeze");

    path.appendChild(animate);
    animate.beginElement();
  });

  btns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      const path = this.querySelector("svg > path");

      // Меняем цвет обводки на белый при наведении
      path.style.stroke = "#fff";

      let len = Math.round(path.getTotalLength());

      const animate = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animate"
      );
      animate.setAttribute("attributeName", "stroke-dashoffset");
      animate.setAttribute("values", `${len}; 0`);
      animate.setAttribute("dur", `${len / 100}`);
      animate.setAttribute("fill", "freeze");

      path.appendChild(animate);
      animate.beginElement();
    });

    btn.addEventListener("mouseleave", function () {
      const path = this.querySelector("svg > path");

      // Возвращаем цвет обводки к исходному при уходе мыши
      path.style.stroke = "#58C88A";
    });
  });
}

function totalSvg_2() {
  const paths = document.querySelectorAll("svg path");
  const btns = document.querySelectorAll(".btn-svg_2");

  paths.forEach(function (path) {
    let len = Math.round(path.getTotalLength());

    path.setAttribute("stroke-dasharray", len);
    path.setAttribute("stroke-dashoffset", len);

    // Добавляем анимацию для проигрывания один раз
    const animate = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate"
    );
    animate.setAttribute("attributeName", "stroke-dashoffset");
    animate.setAttribute("values", `${len}; 0`);
    animate.setAttribute("dur", `${len / 100}`);
    animate.setAttribute("fill", "freeze");

    path.appendChild(animate);
    animate.beginElement();
  });

  btns.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      const path = this.querySelector("svg > path");

      let len = Math.round(path.getTotalLength());

      const animate = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animate"
      );
      animate.setAttribute("attributeName", "stroke-dashoffset");
      animate.setAttribute("values", `${len}; 0`);
      animate.setAttribute("dur", `${len / 100}`);
      animate.setAttribute("fill", "freeze");

      path.appendChild(animate);
      animate.beginElement();
    });
  });
}

// Вызываем totalSvg при загрузке страницы
document.addEventListener("DOMContentLoaded", totalSvg);
document.addEventListener("DOMContentLoaded", totalSvg_2);
