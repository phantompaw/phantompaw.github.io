    function showError(input, message) {
        clearError(input);
        input.style.borderColor = 'red';
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        input.parentElement.appendChild(errorSpan);
    }

    function clearError(input) {
        input.style.borderColor = '';
        const errorSpan = input.parentElement.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.remove();
        }
    }

    function validateName(name) {
        const regex = /^[a-zA-Z\u4e00-\u9fa5\s]+$/;
        return regex.test(name);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

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
    
        clearError(form.name);
        clearError(form.email);
    
        if (!validateName(name)) {
            showError(form.name, "姓名格式不正確，請勿包含符號！");
            return;
        }
        if (!validateEmail(email)) {
            showError(form.email, "電子郵件格式不正確！");
            return;
        }
    
        // 禁用送出按鈕並加入禁用樣式
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
            const response = await fetch("https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec", {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' },
            });
    
            const result = await response.json();
            if (result.message === 'Success') {
                alert('回饋已成功送出！');
                form.reset();
                setTimeout(() => window.location.reload(), 1000);
            } else {
                showError(form.feedback, `伺服器錯誤: ${result.message}`);
            }
        } catch (error) {
            console.error('提交失敗:', error.message);
            alert('提交失敗，請稍後再試！');
        } finally {
            // 重新啟用按鈕並移除禁用樣式
            submitButton.disabled = false;
            submitButton.classList.remove('disabled');
        }
    }    

    document.getElementById('feedbackForm').addEventListener('submit', handleSubmit);
