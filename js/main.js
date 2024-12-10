const scriptURL = 'https://script.google.com/macros/s/AKfycbwz2MfPProC44Tz_i0L1VZkGcP2-lTIB0tHicLbi2dm853cgMlVzSUazMv1-xUIpfTI/exec';
const form = document.getElementById('feedbackForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            alert('回饋已成功送出！感謝您的參與！');
            form.reset();
        })
        .catch(error => {
            alert('發生錯誤，請稍後再試！');
            console.error('Error!', error.message);
        });
});
