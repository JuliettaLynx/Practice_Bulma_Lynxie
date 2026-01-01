document.addEventListener("DOMContentLoaded", () => {
  initNavbarBurger();
  initSmoothScroll();
  initContactButtons();
  initScrollTopButton();
  setActiveMenuItem();
});

// 1. Функция для бургер-меню
function initNavbarBurger() {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  $navbarBurgers.forEach((el) => {
    el.addEventListener("click", () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      el.classList.toggle("is-active");
      $target.classList.toggle("is-active");
    });
  });
}

// 2. Функция для плавной прокрутки навигации
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.classList.contains("contact-button")) return;

      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const isMobile = window.innerWidth <= 1023;

        let offsetTop = targetElement.offsetTop - 40;

        if (isMobile) {
          offsetTop -= 210;
        }

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Закрытие мобильного меню после клика
        const navbarMenu = document.getElementById("navbarMenu");
        const navbarBurger = document.querySelector(".navbar-burger");
        if (navbarMenu.classList.contains("is-active")) {
          navbarMenu.classList.remove("is-active");
          navbarBurger.classList.remove("is-active");
        }

        setTimeout(() => {
          setActiveMenuItem();
        }, 300);
      }
    });
  });
}

// 3. Функция для кнопок "Записаться"
function initContactButtons() {
  document.querySelectorAll(".contact-button").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const targetElement = document.getElementById("contacts");
      const isMobile = window.innerWidth <= 1023;

      let offsetTop = targetElement.offsetTop;

      if (isMobile) {
        offsetTop = offsetTop - 80;
      }

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });
}

// 4. Функция для кнопки "Наверх"
function initScrollTopButton() {
  // Кнопка "Наверх"
  const scrollTopButton = document.getElementById("scrollTopButton");

  // Показать/скрыть кнопку при скролле
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopButton.classList.add("is-visible");
    } else {
      scrollTopButton.classList.remove("is-visible");
    }
  });

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// 5. Функция для установки активного пункта меню
function setActiveMenuItem() {
  // Убираем все активные классы
  document.querySelectorAll(".navbar-item").forEach((item) => {
    item.classList.remove("is-active");
  });

  // Определяем текущую страницу
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Ищем ссылку на текущую страницу
  let selector;
  if (currentPage === "review.html")
    selector = '.navbar-item[href="review.html"]';
  else if (currentPage === "faq.html")
    selector = '.navbar-item[href="faq.html"]';
  else selector = '.navbar-item[href="index.html"]';

  // Добавляем активный класс
  const activeLink = document.querySelector(selector);
  if (activeLink) {
    activeLink.classList.add("is-active");
  }
}
