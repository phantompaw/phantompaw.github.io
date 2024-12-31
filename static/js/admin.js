const adminApiUrl = 'https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec'; // 替換為後端登入 API 的 URL

function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

function showError(message) {
    const errorArea = document.getElementById('loginError');
    errorArea.style.display = 'block';
    errorArea.textContent = message;
}

function handleLogin(event) {
    event.preventDefault();

    const form = document.getElementById('adminLoginForm');
    const username = sanitizeInput(form.username.value);
    const password = sanitizeInput(form.password.value);
    const csrfToken = sanitizeInput(form.csrfToken.value);

    // 驗證輸入是否完整
    if (!username || !password) {
        showError('請輸入帳號和密碼');
        return;
    }

    // 送出登入請求
    fetch(`${adminApiUrl}/admin-login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ username, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // 登入成功，跳轉至管理頁面
                window.location.href = 'manage.html';
            } else {
                // 顯示錯誤訊息
                showError(data.message || '登入失敗，請確認帳號密碼是否正確');
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            showError('伺服器錯誤，請稍後再試');
        });
}

// 初始化登入表單
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('adminLoginForm');
    loginForm.addEventListener('submit', handleLogin);
});
