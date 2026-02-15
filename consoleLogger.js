document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("formValid", function (event) {
    const formData = event.detail;
    console.clear();

    console.log("ИФ:", formData.fullname);
    console.log("Email:", formData.email);
    console.log("Телефон:", formData.phone);
    console.log("Тема:", formData.topic);
    console.log("Сообщение:", formData.message);

    const timestamp = new Date().toLocaleString();
    console.log("Время отправки:", timestamp);
  });
});
