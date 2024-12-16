const scriptURL = 'https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec';

function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

function validateName(name) {
    const regex = /^[a-zA-Z\u4e00-\u9fa5\s]+$/; // 限制只能使用中文、英文與空格
    return regex.test(name);
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 確保包含 @ 與 .
    return regex.test(email);
}

function showError(message) {
    const errorArea = document.getElementById('errorArea');
    errorArea.style.display = "block";
    errorArea.textContent = message;
}

function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('feedbackForm');
    const name = sanitizeInput(form.name.value);
    const email = sanitizeInput(form.email.value);

    if (!validateName(name)) {
        showError("姓名格式不正確，請勿包含符號！");
        return;
    }

    if (!validateEmail(email)) {
        showError("電子郵件格式不正確！");
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('age', sanitizeInput(form.age.value));
    formData.append('job', sanitizeInput(form.job.value));
    formData.append('gender', sanitizeInput(form.gender.value));
    formData.append('feedback', sanitizeInput(form.feedback.value));
    formData.append('other', sanitizeInput(form.other.value));
    formData.append('csrfToken', sanitizeInput(form.csrfToken.value));

    fetch(scriptURL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Success') {
                alert('回饋已成功送出！感謝您的參與！');
                form.reset();
                document.getElementById('errorArea').style.display = "none";
            } else {
                showError(`伺服器返回錯誤: ${data.message}`);
            }
        })
        .catch(error => {
            showError('發生錯誤，請稍後再試！');
            console.error('Error!', error.message);
        });
}
