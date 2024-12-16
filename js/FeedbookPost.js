const scriptURL = 'https://script.google.com/macros/s/your_script_url_here/exec';

function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

function getCSRFToken() {
    const tokenField = document.getElementById('csrfToken');
    return tokenField ? tokenField.value : '';
}

function showError(message) {
    const errorArea = document.getElementById('errorArea');
    errorArea.style.display = "block";
    errorArea.textContent = message;
}

function handleSubmit(event) {
    event.preventDefault();

    const form = document.getElementById('feedbackForm');
    const formData = new FormData();
    formData.append('name', sanitizeInput(form.name.value));
    formData.append('age', sanitizeInput(form.age.value));
    formData.append('job', sanitizeInput(form.job.value));
    formData.append('gender', sanitizeInput(form.gender.value));
    formData.append('feedback', sanitizeInput(form.feedback.value));
    formData.append('other', sanitizeInput(form.other.value));
    const csrfToken = getCSRFToken();
    formData.append('csrfToken', csrfToken);

    fetch(scriptURL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) throw new Error('伺服器回應錯誤');
            return response.json();
        })
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

    return false;
}
