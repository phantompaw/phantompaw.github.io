// 1. 全域變數設定
const tokenKey = 'userToken'; // 儲存 Token 的鍵
const feedbackForm = document.getElementById('Feedback');
const loginForm = document.getElementById('Administrator');
const apiUrl = 'https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec'; // 替換 YOUR_SCRIPT_ID

// 2. 事件處理
function handleRequest(event) {
  switch (event.type) {
    case 'feedbackSubmit':
      handleFeedbackUpload(event.data);
      break;
    case 'login':
      handleLogin(event.data);
      break;
    case 'tokenValidation':
      handleTokenValidation(event.data);
      break;
    default:
      console.log('Unknown event type');
  }
}

// 3. 回饋上傳處理
function handleFeedbackUpload(data) {
  const feedbackData = {
    route: 'feedback',
    name: data.name,
    message: data.message,
  };

  if (!feedbackData.name || !feedbackData.message) {
    alert("請填寫所有欄位！");
    return;
  }

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message);
      } else {
        alert("提交失敗：" + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("提交失敗，請稍後再試！");
    });
}

// 4. 登入處理
function handleLogin(data) {
  const loginData = {
    route: 'admin-login',
    username: data.username,
    password: CryptoJS.SHA256(data.password).toString(), // 使用 SHA256 加密
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success && data.token) {
        localStorage.setItem(tokenKey, data.token);
        alert("登入成功！");
        window.location.href = 'manage.html';
      } else {
        alert("登入失敗：" + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("登入失敗，請稍後再試！");
    });
}

// 5. Token 驗證
function handleTokenValidation(token) {
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      route: 'validate-token',
      token: token,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log("Token 驗證成功！");
      } else {
        console.log("Token 無效，請重新登入！");
        localStorage.removeItem(tokenKey);
        window.location.href = 'login.html';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// 6. 表單提交監聽器
if (feedbackForm) {
  feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
      name: feedbackForm.name.value,
      message: feedbackForm.message.value,
    };
    handleRequest({ type: 'feedbackSubmit', data });
  });
}

if (loginForm) {
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
      username: loginForm.username.value,
      password: loginForm.password.value,
    };
    handleRequest({ type: 'login', data });
  });
}

// 7. 檢查 Token 是否存在並進行驗證
const token = localStorage.getItem(tokenKey);
if (token) {
  handleTokenValidation(token);
}
