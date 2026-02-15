document.addEventListener("DOMContentLoaded", function () {
  initMessageCounter();
  const form = document.getElementById("feedbackForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    document
      .querySelectorAll(".input.is-danger, .textarea.is-danger")
      .forEach((el) => {
        el.classList.remove("is-danger");
      });
    document.querySelectorAll(".help.is-danger").forEach((el) => el.remove());

    let isValid = true;

    // 1. Проверка Имени (не пустое, минимум 2 слова)
    const fullname = document.getElementById("name");
    const fullnameValue = fullname.value.trim();

    if (fullnameValue === "") {
      showError(fullname, "Введите имя и фамилию");
      isValid = false;
    } else if (fullnameValue.split(" ").length < 2) {
      showError(fullname, "Введите имя и фамилию");
      isValid = false;
    }

    // 2. Проверка почты (содержит @ и .)
    const email = document.getElementById("email");
    const emailValue = email.value.trim();

    if (
      emailValue !== "" &&
      (!emailValue.includes("@") || !emailValue.includes("."))
    ) {
      showError(email, "Введите корректный email");
      isValid = false;
    }

    // 3. Проверка телефона (не пустой, 10 цифр)
    const phone = document.getElementById("phone");
    const phoneValue = phone.value.trim();
    const phoneDigits = phoneValue.replace(/\D/g, "");

    if (phoneValue === "") {
      showError(phone, "Введите номер телефона");
      isValid = false;
    } else if (phoneDigits.length < 10) {
      showError(phone, "Введите 10 цифр номера");
      isValid = false;
    }

    // 4. Проверка темы (должна быть выбрана)
    const topic = document.getElementById("topic");
    const topicValue = topic.value;

    if (!topicValue || topicValue === "") {
      showError(topic, "Выберите тему сообщения");
      isValid = false;
    }

    // 5. Проверка сообщения (не пустое, не больше 250 символов)
    const message = document.getElementById("message");
    const messageValue = message.value.trim();
    const maxLength = 250;

    if (messageValue === "") {
      showError(message, "Напишите сообщение");
      isValid = false;
    } else if (messageValue.length > maxLength) {
      showError(
        message,
        `Сообщение слишком длинное (${messageValue.length}/${maxLength})`,
      );
      isValid = false;
    }

    // Отправка формы
    if (isValid) {
      const formData = {
        fullname: fullnameValue,
        email: emailValue,
        phone: phoneValue,
        topic: topicValue,
        message: document.getElementById("message").value.trim(),
      };

      const event = new CustomEvent("formValid", { detail: formData });
      document.dispatchEvent(event);

      alert("Форма отправлена! Спасибо!");
    }
  });

  // Вывод ошибки
  function showError(input, message) {
    input.classList.add("is-danger");
    const help = document.createElement("p");
    help.classList.add("help", "is-danger");
    help.textContent = message;
    input.parentNode.parentNode.appendChild(help);
  }

  // Сброс ошибки после ввода первого символа
  document.querySelectorAll(".input, .textarea").forEach((input) => {
    input.addEventListener("input", function () {
      this.classList.remove("is-danger");
      const parent = this.parentNode.parentNode;
      const errors = parent.querySelectorAll(".help.is-danger");
      errors.forEach((el) => el.remove());
    });
  });
});

// Функция для счетчика символов
function initMessageCounter() {
  const messageField = document.getElementById("message");
  const counterElement = document.getElementById("messageCounter");
  const messageHelp = document.getElementById("messageHelp");

  if (!messageField || !counterElement) return;

  const MAX_LENGTH = 250;

  function updateCounter() {
    const currentLength = messageField.value.length;
    counterElement.textContent = `${currentLength}/${MAX_LENGTH}`;

    counterElement.classList.remove("exceeded");
    messageField.classList.remove("exceeded-limit");

    if (currentLength > MAX_LENGTH) {
      counterElement.classList.add("exceeded");
      messageField.classList.add("exceeded-limit");
      if (messageHelp) {
        messageHelp.textContent = `Превышение лимита на ${currentLength - MAX_LENGTH} символов`;
        messageHelp.classList.add("has-text-danger");
      }
    } else {
      if (messageHelp) {
        messageHelp.classList.remove("has-text-danger");
      }
    }
  }

  // Обновляем счетчик при вводе символа
  messageField.addEventListener("input", updateCounter);

  updateCounter();
}
