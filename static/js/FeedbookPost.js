const scriptURL = 'https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec';
const botStatusURL = '/bot_status'; // 檢查 Discord Bot 狀態的 API 路徑

// 輔助函數: 清理輸入
function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

// 驗證姓名格式
function validateName(name) {
    const regex = /^[a-zA-Z\u4e00-\u9fa5\s]+$/; // 僅允許中英文與空格
    return regex.test(name);
}

// 驗證電子郵件格式
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 基本 Email 格式檢查
    return regex.test(email);
}

// 顯示錯誤訊息
function showError(message) {
    const errorArea = document.getElementById('errorArea');
    errorArea.style.display = "block";
    errorArea.textContent = message;
}

// 隱藏錯誤訊息
function hideError() {
    const errorArea = document.getElementById('errorArea');
    errorArea.style.display = "none";
}

// 檢查 Discord Bot 是否在線
async function checkBotStatus() {
    try {
        const response = await fetch(botStatusURL);
        const data = await response.json();
        return data.online;
    } catch (error) {
        console.error('檢查 Bot 狀態時出現錯誤:', error.message);
        return false; // 若檢查失敗，假定 Bot 不在線
    }
}

// 表單提交處理邏輯
async function handleSubmit(event) {
    event.preventDefault(); // 阻止表單的預設提交行為

    const submitButton = document.querySelector('.feedbookbtn');
    submitButton.disabled = true; // 禁用按鈕
    submitButton.classList.add('disabled'); // 添加灰色效果

    const form = document.getElementById('feedbackForm');
    const name = sanitizeInput(form.name.value);
    const email = sanitizeInput(form.email.value);
    const age = sanitizeInput(form.age.value);
    const job = sanitizeInput(form.job.value);
    const gender = sanitizeInput(form.gender.value);
    const feedback = sanitizeInput(form.feedback.value);
    const other = sanitizeInput(form.other.value);
    const csrfToken = sanitizeInput(form.csrfToken.value);

    // 驗證姓名與電子郵件格式
    if (!validateName(name)) {
        showError("姓名格式不正確，請勿包含符號！");
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
        return;
    }

    if (!validateEmail(email)) {
        showError("電子郵件格式不正確！");
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
        return;
    }

    // 檢查 Discord Bot 狀態（僅通知，不影響後續處理）
    const botOnline = await checkBotStatus();
    if (!botOnline) {
        showError("Discord Bot 未在線，無法通知管理員，但資料仍會送出！");
    }

    // 準備表單數據
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('job', job);
    formData.append('gender', gender);
    formData.append('feedback', feedback);
    formData.append('other', other);
    formData.append('csrfToken', csrfToken);

    // 發送表單數據
    try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
            },
        });

        const result = await response.json();
        if (result.message === 'Success') {
            alert('回饋已成功送出！感謝您的參與！');
            form.reset(); // 清空表單
            hideError(); // 隱藏錯誤訊息
        } else {
            showError(`伺服器返回錯誤: ${result.message}`);
        }
    } catch (error) {
        showError('發生錯誤，請稍後再試！');
        console.error('提交表單時出現錯誤:', error.message);
    } finally {
        // 重新啟用按鈕
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    }
}

// 綁定事件處理程序
document.getElementById('feedbackForm').addEventListener('submit', handleSubmit);
