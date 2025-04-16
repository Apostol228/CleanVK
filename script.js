window.onload = function () {
  // Попробуем получить токен из localStorage
  const token = localStorage.getItem("vk_token");

  if (token) {
    const tokenInput = document.getElementById("token");
    if (tokenInput) {
      tokenInput.value = token;
      console.log("✅ Токен успешно подставлен из localStorage:", token);
    } else {
      console.log("⚠️ Элемент для токена не найден.");
    }
  } else {
    console.log("⚠️ Токен не найден в localStorage.");
  }
};

function getToken() {
  const url =
    "https://oauth.vk.com/authorize?client_id=6121396&display=page&redirect_uri=https://apostol228.github.io/CleanVK/redirect_page.html&scope=groups,offline&response_type=token&v=5.199";
  window.open(url, "_blank");
}

function log(msg) {
  document.getElementById("log").innerText += msg + "\n";
}

function callFunction(action) {
  const token = document.getElementById("token").value;
  if (!token) {
    alert("Введите токен!");
    return;
  }

  log(`⏳ Выполняется: ${action}`);

  fetch(`http://localhost:8000/${action}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  })
    .then((res) => res.json())
    .then((data) => {
      log(`✅ ${data.message}`);
    })
    .catch((err) => {
      log(`❌ Ошибка: ${err}`);
    });
}
