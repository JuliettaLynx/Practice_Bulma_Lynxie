document.addEventListener("DOMContentLoaded", () => {
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

  // Плавная прокрутка для навигации
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Закрытие мобильного меню после клика
        const navbarMenu = document.getElementById("navbarMenu");
        const navbarBurger = document.querySelector(".navbar-burger");
        if (navbarMenu.classList.contains("is-active")) {
          navbarMenu.classList.remove("is-active");
          navbarBurger.classList.remove("is-active");
        }
      }
    });
  });
});
