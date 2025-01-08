// 顯示錯誤訊息
function showError(input, message) {
    clearError(input);
    input.style.borderColor = 'red';
    const errorSpan = document.createElement('span');
    errorSpan.className = 'error-message';
    errorSpan.textContent = message;
    input.parentElement.appendChild(errorSpan);
}

// 清除錯誤訊息
function clearError(input) {
    input.style.borderColor = '';
    const errorSpan = input.parentElement.querySelector('.error-message');
    if (errorSpan) {
        errorSpan.remove();
    }
}

// 驗證姓名格式 (僅允許中英文與空格)
function validateName(name) {
    const regex = /^[a-zA-Z\u4e00-\u9fa5\s]+$/;
    return regex.test(name);
}

// 驗證電子郵件格式
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// 簡單的 HTML 輸入清理功能
function sanitizeInput(input) {
    return input.trim();
}

async function handleSubmit(event) {
    event.preventDefault();

    const submitButton = document.querySelector('.feedbookbtn');
    const form = document.getElementById('feedbackForm');
    const name = sanitizeInput(form.name.value);
    const email = sanitizeInput(form.email.value);
    const age = sanitizeInput(form.age.value);
    const job = sanitizeInput(form.job.value);
    const gender = sanitizeInput(form.gender.value);
    const feedback = sanitizeInput(form.feedback.value);
    const other = sanitizeInput(form.other.value);
    const csrfToken = sanitizeInput(form.csrfToken.value);

    // 清除錯誤
    clearError(form.name);
    clearError(form.email);

    // 驗證姓名與電子郵件
    if (!validateName(name)) {
        showError(form.name, "姓名格式不正確，請勿包含符號！");
        return;
    }
    if (!validateEmail(email)) {
        showError(form.email, "電子郵件格式不正確！");
        return;
    }

    // 禁用送出按鈕，防止重複提交
    submitButton.disabled = true;
    submitButton.classList.add('disabled');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', age);
    formData.append('job', job);
    formData.append('gender', gender);
    formData.append('feedback', feedback);
    formData.append('other', other);
    formData.append('csrfToken', csrfToken);

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec", { // 替換為您的伺服器端點
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
        });

        const result = await response.json();
        if (result.message === 'Success') {
            alert('回饋已成功送出！');
            form.reset(); // 清空表單
            setTimeout(() => window.location.reload(), 1000); // 重新載入頁面
        } else {
            alert(`伺服器錯誤: ${result.message}`);
        }
    } catch (error) {
        console.error('提交失敗:', error.message);
        alert('提交失敗，請稍後再試！');
    } finally {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
    }
}

document.getElementById('feedbackForm').addEventListener('submit', handleSubmit);