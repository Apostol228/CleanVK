window.onload = function() {
  // Печать хэша URL для отладки
  console.log("Хэш URL:", window.location.hash);

  const hash = window.location.hash;
  if (hash.includes("access_token")) {
    const params = new URLSearchParams(hash.replace("#", ""));
    const token = params.get("access_token");
    if (token) {
      document.getElementById("token").value = token;
      console.log("Токен успешно подставлен:", token); // Дополнительная отладка
    }
  } else {
    console.log("Токен не найден в URL."); // Отладка, если токен не найден
  }
};

function getToken() {
  const url = 'https://oauth.vk.com/authorize?client_id=6121396&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=groups,offline&response_type=token&v=5.199';
  window.open(url, '_blank');
}

function log(msg) {
  document.getElementById('log').innerText += msg + "\n";
}

function callFunction(action) {
  const token = document.getElementById('token').value;
  if (!token) {
    alert('Введите токен!');
    return;
  }

  log(`⏳ Выполняется: ${action}`);

  fetch(`http://localhost:8000/${action}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })
  .then(res => res.json())
  .then(data => {
    log(`✅ ${data.message}`);
  })
  .catch(err => {
    log(`❌ Ошибка: ${err}`);
  });
}
