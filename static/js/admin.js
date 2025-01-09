const adminApiUrl = 'https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec';

function saveToken(token) {
    localStorage.setItem('authToken', token);
}
function checkToken() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
    } else {
        validateToken(token);
    }
}

function validateToken(token) {
    fetch('https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec?route=validate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            alert('Token 驗證失敗，請重新登入');
            localStorage.removeItem('authToken');
            window.location.href = 'login.html';  // 返回登入頁面
        }
    })
    .catch(error => {
        console.error('Token 驗證失敗:', error);
        alert('伺服器錯誤，無法驗證 Token，請稍後再試');
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });
}


// 處理登入
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        showError('帳號與密碼不能為空');
        return;
    }

    fetch(`${adminApiUrl}?route=admin-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    })
        .then(response => {
            if (!response.ok) throw new Error('伺服器回應錯誤');
            return response.json();
        })
        .then(data => {
            if (data.success) {
                saveToken(data.token); // 儲存 Token
                window.location.href = 'manage.html'; // 跳轉至管理頁面
            } else {
                showError(data.message || '登入失敗，請檢查帳號密碼');
            }
        })
        .catch(error => {
            console.error('登入錯誤：', error);
            showError('伺服器連線失敗，請稍後再試');
        });
}


// 改進版錯誤顯示（加強樣式控制，避免長時間顯示）
function showError(message) {
    const errorArea = document.getElementById('loginError');
    errorArea.style.display = 'block';
    errorArea.textContent = message;
    setTimeout(() => errorArea.style.display = 'none', 5000); // 5秒後自動隱藏錯誤訊息
}


// 處理登出
function handleLogout() {
    localStorage.removeItem('authToken'); // 清除 Token
    window.location.href = 'login.html';
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('adminLoginForm');
    const logoutButton = document.getElementById('logoutButton');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    } else {
        checkToken(); // 驗證 Token
    }
});
