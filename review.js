// Класс карусели отзывов (по аналогии с вашим кодом)
class ReviewCarousel {
  constructor(container, config) {
    this.container = container;
    this.carousel = container.querySelector(config.carouselSelector);
    this.nextBtn = container.querySelector(config.nextBtnSelector);
    this.prevBtn = container.querySelector(config.prevBtnSelector);
    this.items = Array.from(
      this.carousel.querySelectorAll(config.itemSelector)
    );

    this.currentPosition = 0;
    this.totalPositions = config.totalPositions;
    this.isAnimating = false;
    this.orderFunction = config.orderFunction;

    this.init();
  }

  init() {
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }
    this.updateLayout();
  }

  async next() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    // Исчезаем
    this.carousel.classList.add("fade-out");

    // Ждем окончания анимации
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Меняем порядок
    this.currentPosition = (this.currentPosition + 1) % this.totalPositions;
    this.updateLayout();

    // Ждем окончания анимации
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Появляемся
    this.carousel.classList.remove("fade-out");

    this.isAnimating = false;
  }

  async prev() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.carousel.classList.add("fade-out");
    await new Promise((resolve) => setTimeout(resolve, 100));

    this.currentPosition =
      (this.currentPosition - 1 + this.totalPositions) % this.totalPositions;
    this.updateLayout();

    await new Promise((resolve) => setTimeout(resolve, 100));
    this.carousel.classList.remove("fade-out");

    this.isAnimating = false;
  }

  updateLayout() {
    // Создаем массив индексов для новой расстановки
    const newOrder = this.orderFunction(this.currentPosition);

    // Переставляем карточки в DOM
    newOrder.forEach((itemIndex) => {
      const item = this.items[itemIndex];
      this.carousel.appendChild(item);
    });
  }
}

// Конфигурация карусели отзывов
const REVIEW_CAROUSEL_CONFIG = {
  carouselSelector: "#reviewTrack",
  nextBtnSelector: "#nextReview",
  prevBtnSelector: "#prevReview",
  itemSelector: ".review-card",
  totalPositions: 6, // 6 отзывов, но показываем по 3

  orderFunction: (position) => {
    // 6 отзывов, показываем по 3
    switch (position) {
      case 0: // Показываем отзывы 1,2,3
        return [0, 1, 2, 3, 4, 5];
      case 1: // Показываем отзывы 2,3,4
        return [1, 2, 3, 4, 5, 0];
      case 2: // Показываем отзывы 3,4,5
        return [2, 3, 4, 5, 0, 1];
      case 3: // Показываем отзывы 4,5,6
        return [3, 4, 5, 0, 1, 2];
      case 4: // Показываем отзывы 5,6,1
        return [4, 5, 0, 1, 2, 3];
      case 5: // Показываем отзывы 6,1,2
        return [5, 0, 1, 2, 3, 4];
      default:
        return [0, 1, 2, 3, 4, 5];
    }
  },
};

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  const reviewSection = document.querySelector(".review-section");
  if (reviewSection) {
    new ReviewCarousel(reviewSection, REVIEW_CAROUSEL_CONFIG);
  }
});
