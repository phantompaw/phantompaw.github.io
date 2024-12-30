const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

function decrypt(value) {
    if (!value) return null;
    try {
        return String.fromCharCode(...value.split('-').map(hex => parseInt(hex, 16)));
    } catch (error) {
        console.error('解密失敗：', error);
        return null;
    }
}

function toggleTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function showLoading(show) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = show ? 'flex' : 'none';
}

function validateAdmin(name, password) {
    return fetch(scriptURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ name, password }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                return true;
            } else {
                alert(data.message);
                return false;
            }
        })
        .catch(error => {
            console.error('伺服器錯誤：', error);
            alert('伺服器錯誤，請稍後再試。');
            return false;
        });
}

async function initAdmin() {
    showLoading(true);

    // 取得 localStorage 資料
    const encryptedName = localStorage.getItem('name');
    const encryptedPassword = localStorage.getItem('password');
    const theme = localStorage.getItem('theme') || 'light';

    toggleTheme(theme);

    if (!encryptedName || !encryptedPassword) {
        showLoading(false);
        alert('請重新登入！');
        window.location.href = 'login.html';
        return;
    }

    const name = decrypt(encryptedName);
    const password = decrypt(encryptedPassword);

    if (!name || !password) {
        showLoading(false);
        alert('登入資訊不正確，請重新登入！');
        window.location.href = 'login.html';
        return;
    }

    const isValid = await validateAdmin(name, password);

    showLoading(false);

    if (!isValid) {
        window.location.href = 'login.html';
    }
}

document.addEventListener('DOMContentLoaded', initAdmin);
